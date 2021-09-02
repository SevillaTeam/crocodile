import React, {useEffect, useContext, FC} from 'react';
import {useStore} from 'react-redux';
import {useHistory} from 'react-router-dom';
import s from './home.module.scss';
import {StartGameBanner} from '@components/StartGameBanner/start-game-banner';
import * as api from '../../services/api';
import {getAuthCodeFromQuery} from '@/utlis/get-auth-code-from-query';
import {
    changeUserLoggedInStatus,
    getUserDataStart,
} from '@components/Profile/redux-sagas/actions';

import {WelcomeComp} from '@/components/WelcomeComp';
import {connector} from './container';
import {ISelection} from './container';
import * as themesApi from '../../server-ssr/themes-api';
import {isServer} from "@/store/rootStore";
import {ThemeContext} from '@/context';
import {baseUrl} from "@/utlis/const";

const queryString = require('query-string');

export const HomeComp: FC<ISelection> = (props): JSX.Element => {
    const {userData} = props;
    const store = useStore();
    const history = useHistory();
    const {theme, setTheme} = useContext(ThemeContext);

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

    useEffect(() => {
        if (!isServer) {
            enableVideo()
        }

        const authCode = getAuthCodeFromQuery();

        if (authCode)
            api
                .OAuthLogin({
                    code: authCode,
                    redirect_uri: baseUrl,
                })
                .then((res) => {
                    store.dispatch(changeUserLoggedInStatus({isLoggedIn: true}));
                    store.dispatch(getUserDataStart());
                    history.push('/');
                })
                .catch((err) => console.log(err));

        const {id} = userData;
        if (id) {
            const queryStr = `/?${queryString.stringify({
                id: userData.id,
            })}`;
            themesApi
                .getUser(queryStr)
                .then((response) => {
                    if (response.reason === 'Пользователь не существует') {
                        const bodyToSend = {
                            id,
                        };
                        themesApi
                            .createUser(bodyToSend)
                            .then((response) => {
                                console.log('Используем тему по умолчанию');
                                // передавать тему по умолчанию не надо, т.к. она и так используется
                            })
                            .catch((err) => console.log(err));
                    } else {
                        // Берем тему пользователя и кладем в контекст
                        const queryStr = `/?${queryString.stringify({
                            ownerId: userData.id,
                        })}`;

                        themesApi
                            .getSiteThemeByOwnerId(queryStr)
                            .then((response) => {
                                if (response.length) {
                                    // @ts-ignore
                                    const {theme} = response[0];
                                    if (theme) setTheme(theme);
                                }
                                if (!response.length) {
                                    console.log('У пользователя нет тем');
                                }
                            })
                            .catch((err) => console.log(err));
                    }
                })
                .catch((err) => console.log(err));
        }
    }, [userData.id]);

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
