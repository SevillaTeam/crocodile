export interface IClient {
    id: string,
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

export interface EmittingData {
    [key: string]: any
}

export interface IUsers {
    [key: string]: IUser
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

export interface IPayload {
    data: string
}

export interface IContext {
    username: string,
    roomId: string,
    userId: string,
    peers?: { [key: string]: RTCPeerConnection }
    channels?: {
        [key: string]: RTCDataChannel
    }
}
