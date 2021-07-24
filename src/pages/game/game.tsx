import React, {useEffect} from 'react';
import styles from './game.module.scss';
import {fetchEventSource} from '@microsoft/fetch-event-source'
import {GameChat} from "@components/GameChat";
import {GameCanvas} from "@components/GameCanvas";
import {createUser, joinRoom, relayLocalDescriptions, postChatMessage} from "@/services/game-api";
import {ChatInput} from "@components/ChatInput";
import {GamePlayers} from "@components/GamePlayers";
import {IContext, IPayload} from "../../../server/interfaces";

const RTC_CONFIG = {
    iceServers: [{
        urls: [
            'stun:stun.l.google.com:19302',
            'stun:global.stun.twilio.com:3478'
        ]
    }]
};

const ctx: IContext = {
    username: 'user' + parseInt(String(Math.random() * 100000)),
    roomId: '1',
    userId: '',
    peers: {},
    channels: {},
};
const baseUrl = 'http://localhost:8081'

export const Game = (): JSX.Element => {

    const [incomingImageData, setImageData] = React.useState({
        prevX: '',
        prevY: '',
        currX: '',
        currY: '',
        color: ''
    })

    const [chatMessages, setChatMessages] = React.useState([{content: '', username: ''}])

    const connect = async () => {
        ctx.userId = await createUser(ctx.username);
        await fetchEventSource(baseUrl + `/connect?user_id=${ctx.userId}`, {
            onmessage(e) {
                switch (e.event) {
                    case 'connected':
                        joinRoom(ctx.roomId, ctx.userId);
                        break;
                    case 'add-peer':
                        addPeer(e);
                        break;
                    case 'remove-peer':
                        removePeer(e);
                        break;
                    case 'session-description':
                        sessionDescription(e)
                        break;
                    case 'ice-candidate':
                        iceCandidate(e)
                        break;
                    case 'on-chat-message':
                        updateChatMessages(e)
                        break;
                }
            }
        });
    }

    const addPeer = async ({data}: IPayload) => {
        const message = JSON.parse(data);

        if (ctx.peers && ctx.peers[message.peer.id]) {
            return;
        }

        const peer = new RTCPeerConnection(RTC_CONFIG);

        if (ctx.peers) {
            // сохраянем подключение для клиента
            ctx.peers[message.peer.id] = peer;
        }

        peer.onicecandidate = (event) => {
            if (event.candidate) {
                relayLocalDescriptions(message.peer.id, 'ice-candidate', ctx.userId, event.candidate);
            }
        };

        // смотрим, нужно ли создавать предложение
        if (message.offer) {
            const channel = peer.createDataChannel('updates');
            channel.onmessage = (event) => {
                onPeerData(message.peer.id, event.data);
            };

            if (ctx.channels) {
                ctx.channels[message.peer.id] = channel;
            }
            createOffer(message.peer.id, peer);
        } else {
            peer.ondatachannel = (event) => {
                if (ctx.channels) {
                    ctx.channels[message.peer.id] = event.channel;
                }
                event.channel.onmessage = (evt) => {
                    onPeerData(message.peer.id, evt.data);
                };
            };
        }
    }

    const broadcast = (data: string) => {
        for (const peerId in ctx.channels) {
            ctx.channels[peerId].send(data);
        }
    }

    const createOffer = async (peerId: string, peer: RTCPeerConnection) => {
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        await relayLocalDescriptions(peerId, 'session-description', ctx.userId, offer);
    }

    const sessionDescription = async (data: IPayload) => {
        if (!ctx.peers) {
            return
        }

        const message = JSON.parse(data.data);
        const peer = ctx.peers[message.peer.id];
        const remoteDescription = new RTCSessionDescription(message.data);
        await peer.setRemoteDescription(remoteDescription);
        if (remoteDescription.type === 'offer') {
            const answer = await peer.createAnswer();
            await peer.setLocalDescription(answer);
            await relayLocalDescriptions(message.peer.id, 'session-description', ctx.userId, answer);
        }
    }

    const iceCandidate = (data: IPayload) => {
        if (!ctx.peers) {
            return
        }

        const message = JSON.parse(data.data);
        const peer = ctx.peers[message.peer.id];
        peer.addIceCandidate(new RTCIceCandidate(message.data));
    }

    const removePeer = (data: IPayload) => {

        if (!ctx.peers) {
            return
        }

        const message = JSON.parse(data.data);
        if (ctx.peers[message.peer.id]) {
            ctx.peers[message.peer.id].close();
        }

        delete ctx.peers[message.peer.id];
    }

    const onPeerData = async (id: string, data: string) => {
        setImageData(JSON.parse(data));
    }

    const updateChatMessages = ({data}: IPayload) => {
        setChatMessages((prevState) => {
          return [...prevState, JSON.parse(data)]
        })
    }

    const sendChatMessage = (message: string) => {
            postChatMessage({username: ctx.username, content: message})
    }
    useEffect(() => {
        connect()
    }, [])

    return (
        <main className={styles.gameWrapper}>
            <div className={styles.game}>
                <GameCanvas incomingImageData={incomingImageData} onBroadcast={broadcast}/>
                <GameChat messages={chatMessages} />
            </div>
                <GamePlayers />
                <ChatInput sendMessage={sendChatMessage}/>
        </main>
    );
};
