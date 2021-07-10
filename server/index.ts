import express, { NextFunction} from 'express';
import http from 'http';
import cors from 'cors';
import path from 'path';
import jwt from "jsonwebtoken"
import {v4 as uuidv4} from "uuid"
import {IClients, IChannels, IClient, IUser} from "./interfaces";


const channels: IChannels = {
    '1': {}
};
const clients: IClients = {
    'id': {
        id: 0,
        user: {
            id: '',
            username: '',
        },
        peerId: '',
        emit: () => {
            // do something
        },
    }
};
const jwtToken = '48753614e534c72bb014d54065a4cbe01345135156f7f677b8fe48d9468ccf4d3d7565b27c2357799a6dd1e80e9eab38c50d395811c64b218f6ee9d57656c83b'

const app = express();

const allowedOrigins = ['http://localhost:4000'];

const options: cors.CorsOptions = {
    origin: allowedOrigins
};
app.use(cors(options));
app.use(express.json())

const server = http.createServer(app);

const disconnected = (client: IClient) => {
    delete clients[client.id];
    for (const roomId in channels) {
        const channel = channels[roomId];
        if (channel[client.id]) {
            for (const peerId in channels[roomId]) {
                // clients[peerId].emit('remove-peer', { peer: client.user, roomId });
            }
            delete channel[client.id];
        }
        if (Object.keys(channel).length === 0) {
            delete channels[roomId];
        }
    }
}

// по токену определяем, какой пользователь стучится
const auth = (req: express.Request, res: express.Response, next: NextFunction) => {
    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.query.token) {
        token = req.query.token;
    }
    if (typeof token !== 'string') {
        return res.sendStatus(401);
    }

    jwt.verify(token, jwtToken, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}

app.post('/access', (req, res) => {
    if (!req.body.username) {
        return res.sendStatus(403);
    }
    const user = {
        id: uuidv4(),
        username: req.body.username
    };

    const token = jwt.sign(user, jwtToken, { expiresIn: '3600s' });
    return res.json(token);
});

app.get('/connect', auth, (req, res) => {
    if (req.headers.accept !== 'text/event-stream') {
        return res.sendStatus(404);
    }
    res.setHeader('Cache-Control', 'no-cache');
    // устанавливаем заголовок text/event-stream
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.flushHeaders();


    // создаем клиента
    const client: IClient = {
        id: req.user.id,
        user: req.user,
        emit: (event, data) => {
            res.write(`id: ${uuidv4()}\n`);
            res.write(`event: ${event}\n`);
            res.write(`data: ${JSON.stringify(data)}\n\n`);
        }
    };

    clients[client.id] = client;

    client.emit('connected', { user: req.user })
    req.on('close', () => {
        disconnected(client);
    });
});


app.post('/:roomId/join', auth, (req, res) => {
    const roomId = req.params.roomId;
    //  если такой клиент уже подключен
    if (channels[roomId] && channels[roomId][req.user.id]) {
        return res.sendStatus(200);
    }

    if (!channels[roomId]) {
        channels[roomId] = {};
    }
    // проходимся по всем пирам в комнате - определяем для кого создавать предложение
    for (const peerId in channels[roomId]) {
        if (clients[peerId] && clients[req.user.id]) {
            clients[peerId].emit('add-peer', { peer: req.user, roomId, offer: false });
            clients[req.user.id].emit('add-peer', { peer: clients[peerId].user, roomId, offer: true });
        }
    }
    // подключен
    channels[roomId][req.user.id] = true;
    return res.sendStatus (200);
});

// передаем сигналы между пирами
app.post('/relay/:peerId/:event', auth, (req, res) => {
    const peerId = req.params.peerId;
    if (clients[peerId]) {
        clients[peerId].emit(req.params.event, { peer: req.user, data: req.body });
    }
    return res.sendStatus(200);
});


server.listen(process.env.PORT || 8081, () => {
   // @ts-ignore
    console.log(`Started server on port ${server.address().port}`);
});

