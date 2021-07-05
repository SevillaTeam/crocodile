export interface IClient {
    id: number,
    user: IUser,
    peerId?: string,
    emit: (event: string, data: IData) => void
}

export interface IClients {
    [key: string]: IClient
}

export interface IUser {
    id: string,
    username: string
}

interface IData {
    peer?: IUser,
    roomId?: string,
    offer?: boolean,
    user?: IUser,
    data?: string,
}

export interface IChannel {
    [key: string]: boolean,
}

export interface IChannels {
    [key: string]: IChannel
}
