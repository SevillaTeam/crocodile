import React, {useEffect, FC} from 'react';
import {useStore} from 'react-redux';
import {useHistory} from 'react-router-dom';
import s from './home.module.scss';
import {StartGameBanner} from '@components/StartGameBanner/start-game-banner';
import * as api from '../../services/api';
import {getAuthCodeFromQuery} from '../../utlis/get-auth-code-from-query';
import {
    changeUserLoggedInStatus,
    getUserDataStart,
} from '@components/Profile/redux-sagas/actions';
import {WelcomeComp} from '@/components/WelcomeComp';
import {connector} from './container';
import {ISelection} from './container';
import {isServer} from "@/store/rootStore";

export const HomeComp: FC<ISelection> = (props): JSX.Element => {
    const {userData} = props;
    const store = useStore();
    const history = useHistory();

    useEffect(() => {
        if (!isServer) {
            enableVideo()
        }

        const authCode = getAuthCodeFromQuery();

        // if (authCode)
        //     api
        //         .OAuthLogin({
        //             code: authCode,
        //             redirect_uri: 'https://localhost:5000',
        //         })
                // .then((res) => {
                    store.dispatch(changeUserLoggedInStatus({isLoggedIn: true}));
                    // store.dispatch(getUserDataStart());
                    // history.push('/');
                // })
                // .catch((err) => console.log(err));
    }, []);

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
            {userData?.isLoggedIn || history.location.search ? (
                <StartGameBanner/>
            ) : (
                <WelcomeComp/>
            )}
        </div>
    );
};

export const Home = connector(HomeComp);
