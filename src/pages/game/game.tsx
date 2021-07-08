import React, {useEffect} from 'react';
import styles from './game.module.scss';
import {fetchEventSource} from '@microsoft/fetch-event-source'
import {GameChat} from "@components/GameChat";
import {GameCanvas} from "@components/GameCanvas";
import {getToken, joinRoom, relay} from "@/services/api";

const PLAYER_STATUSES = {
    'drawer': 0,
    'guesser': 1
}
const initPlayerStatus = PLAYER_STATUSES.drawer

const RTC_CONFIG = {
    iceServers: [{
        urls: [
            'stun:stun.l.google.com:19302',
            'stun:global.stun.twilio.com:3478'
        ]
    }]
};

interface IPayload {
    data: string
}

interface IContext {
    username: string,
    roomId: number,
    token: string,
    peers?: { [key: string]: RTCPeerConnection }
    channels?: {
        [key: string]: RTCDataChannel
    }
}

const ctx: IContext = {
    username: 'user' + parseInt(String(Math.random() * 100000)),
    roomId: 1,
    token: '',
    peers: {},
    channels: {},
};


const baseUrl = 'http://localhost:8081'

export const Game = (): JSX.Element => {
    const [playerStatus, setPlayerStatus] = React.useState(initPlayerStatus)
    const [incomingImageData, setImageData] = React.useState({
        prevX: '',
        prevY: '',
        currX: '',
        currY: '',
        color: ''
    })
    const changePlayerStatus = () => {
        const status = playerStatus === PLAYER_STATUSES.drawer ? PLAYER_STATUSES.guesser : PLAYER_STATUSES.drawer
        setPlayerStatus(status)
    }

    const connect = async () => {
        ctx.token = await getToken(ctx.username);
        await fetchEventSource(baseUrl + `/connect?token=${ctx.token}`, {
            onmessage(e) {
                switch (e.event) {
                    case 'connected':
                        joinRoom(ctx.roomId.toString(), ctx.token);
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
                relay(message.peer.id, 'ice-candidate', ctx.token, event.candidate);
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
        await relay(peerId, 'session-description', ctx.token, offer);
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
            await relay(message.peer.id, 'session-description', ctx.token, answer);
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


    useEffect(() => {
        connect()
    })

    return (
        <main className={styles.gameTest}>
            <div className={styles.game}>
                <GameCanvas incomingImageData={incomingImageData} onBroadcast={broadcast}
                            active={playerStatus === PLAYER_STATUSES.drawer}/>
                <GameChat active={playerStatus === PLAYER_STATUSES.guesser}/>
            </div>
            <button
                onClick={changePlayerStatus}>{playerStatus === PLAYER_STATUSES.drawer ? 'Хочу угадывать' : 'Хочу рисовать'}</button>
        </main>
    );
};
