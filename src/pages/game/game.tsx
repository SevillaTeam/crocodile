import React, {useEffect} from 'react';
import {GameCanvas} from '@components/game-canvas';
import {GameChat} from '@components/game-chat';
import styles from './game.module.scss';
import {fetchEventSource} from '@microsoft/fetch-event-source'

const PLAYER_STATUSES = {
    'drawer': 0,
    'guesser': 1
}
const initPlayerStatus = PLAYER_STATUSES.drawer

interface IPayload {
    data: string
}

interface IBroadcastPayload {
    prevX: string,
    prevY: string,
    currX: string,
    currY: string,
    force?: string,
    color: string
}

interface IContext {
    username: string,
    roomId: number,
    token: string | null,
    peers?: {[key: string]: RTCPeerConnection}
    channels?: {
        [key: string]: RTCDataChannel
    }
    eventSource: Promise<void> | null
}

const context: IContext = {
    username: 'user' + parseInt(String(Math.random() * 100000)),
    roomId: 1,
    token: null,
    peers: {},
    channels: {},
    eventSource: null
};

// let imageData: IBroadcastPayload = {
//     prevX: '',
//     prevY: '',
//     currX: '',
//     currY: '',
//     color: ''
// }

const baseUrl = 'http://localhost:8081'

export const Game = (): JSX.Element => {
    const [playerStatus, setPlayerStatus] = React.useState(initPlayerStatus)
    const [imageData, setImageData] = React.useState({
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

    async function getToken() {
        const res = await fetch(baseUrl + '/access', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: context.username
            })
        });
        const token = await res.json();
        context.token = token;
    }

    async function join() {
        return fetch(baseUrl + `/${context.roomId}/join`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            }
        });
    }

    async function connect() {
        await getToken();
        context.eventSource = fetchEventSource(baseUrl + `/connect?token=${context.token}`, {
            onmessage(e) {
                console.log(e.event)
                switch (e.event) {
                    case 'connected':
                        join();
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

    const rtcConfig = {
        iceServers: [{
            urls: [
                'stun:stun.l.google.com:19302',
                'stun:global.stun.twilio.com:3478'
            ]
        }]
    };

    function addPeer(data: IPayload) {
        const message = JSON.parse(data.data);

        // @ts-ignore
        if (context.peers[message.peer.id]) {
            return;
        }

        // setup peer connection
        const peer = new RTCPeerConnection(rtcConfig);
        // @ts-ignore
        context.peers[message.peer.id] = peer;
        // handle ice candidate
        peer.onicecandidate = function (event) {
            console.log('onicecandidate')
            if (event.candidate) {
                relay(message.peer.id, 'ice-candidate', event.candidate);
            }
        };

        // generate offer if required (on join, this peer will create an offer
        // to every other peer in the network, thus forming a mesh)
        if (message.offer) {
            // create the data channel, map peer updates
            const channel = peer.createDataChannel('updates');
            channel.onmessage = function (event) {
                onPeerData(message.peer.id, event.data);
            };
            // @ts-ignore
            context.channels[message.peer.id] = channel;
            createOffer(message.peer.id, peer);
        } else {
            peer.ondatachannel = function (event) {
                // @ts-ignore
                context.channels[message.peer.id] = event.channel;
                event.channel.onmessage = function (evt) {
                    onPeerData(message.peer.id, evt.data);
                };
            };
        }
    }

    function broadcast(data: string) {
        for (const peerId in context.channels) {
            context.channels[peerId].send(data);
        }
    }

    async function relay(peerId: string, event: string, data: RTCSessionDescriptionInit | RTCIceCandidate) {
        await fetch(baseUrl + `/relay/${peerId}/${event}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            },
            body: JSON.stringify(data)
        });
    }

    async function createOffer(peerId: string, peer: RTCPeerConnection) {
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        await relay(peerId, 'session-description', offer);
    }

    async function sessionDescription(data: IPayload) {
        if (!context.peers) {
            return
        }

        const message = JSON.parse(data.data);
        const peer = context.peers[message.peer.id];

        const remoteDescription = new RTCSessionDescription(message.data);
        await peer.setRemoteDescription(remoteDescription);
        if (remoteDescription.type === 'offer') {
            const answer = await peer.createAnswer();
            await peer.setLocalDescription(answer);
            await relay(message.peer.id, 'session-description', answer);
        }
    }

    function iceCandidate(data: IPayload) {
        if (!context.peers) {
            return
        }

        const message = JSON.parse(data.data);
        const peer = context.peers[message.peer.id];
        peer.addIceCandidate(new RTCIceCandidate(message.data));
    }

    function removePeer(data: IPayload) {

        if (!context.peers) {
            return
        }

        const message = JSON.parse(data.data);
        if (context.peers[message.peer.id]) {
            context.peers[message.peer.id].close();
        }

        delete context.peers[message.peer.id];
    }

    function onPeerData(id: string, data: string) {
       setImageData(JSON.parse(data));
    }


    useEffect(() => {
        connect()
    })

    return (
        <main className={styles.gameTest}>
            <div className={styles.game}>
                <GameCanvas imageData={imageData} onBroadcast={broadcast} active={playerStatus === PLAYER_STATUSES.drawer}/>
                <GameChat active={playerStatus === PLAYER_STATUSES.guesser}/>
            </div>
            <button
                onClick={changePlayerStatus}>{playerStatus === PLAYER_STATUSES.drawer ? 'Хочу угадывать' : 'Хочу рисовать'}</button>
        </main>
    );
};
