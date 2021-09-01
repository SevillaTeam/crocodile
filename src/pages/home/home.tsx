import React, {useEffect} from 'react';
import s from './home.module.scss';
import {StartGameBanner} from "@components/StartGameBanner/start-game-banner";
import {isServer} from "@/store/rootStore";

export const Home = (): JSX.Element => {

    useEffect(() => {
        console.log('enable video')
        if (!isServer) {
            enableVideo()
        }
    }, [])

    const enableVideo = async () => {
        console.log('enable video')
        //@ts-ignore
        const constraints = window.constraints = {
            audio: false,
            video: true
        }
        //@ts-ignore
        window.stream = await navigator.mediaDevices.getUserMedia(constraints);
    }

    return (
        <div className={s.homePage}>
            <StartGameBanner/>
        </div>
    );
};
