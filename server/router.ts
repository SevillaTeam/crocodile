import express, { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { IClients, IChannels, IClient, IUsers, IUser } from './interfaces';

export const router = express.Router();
const users: IUsers = { id: { id: '', username: '' } };

const chatMessages = [{ username: '', content: '' }];

let guessingWord = ''; // отдадываемое слово

const channels: IChannels = {
  //TODO add dynamic rooms
  '1': {},
};
const clients: IClients = {
  id: {
    id: '',
    user: {
      id: '',
      username: '',
    },
    peerId: '',
    emit: () => {
      // do something
    },
  },
};

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
};

const getUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.query.user_id) {
    return res.sendStatus(401);
  }
  const userId = req.query.user_id as string;
  req.user = users[userId];

  if (!req.user) {
    res.sendStatus(401);
  }

  next();
};

router.post('/create', (req, res) => {
  const user: IUser = {
    id: uuidv4(),
    username: req.body.username,
  };
  users[user.id] = user;

  return res.json(user.id);
});

guessingWord;

router.post('/word', (req, res) => {
  guessingWord = req.body.word;
  return res.json({ guessingWord });
});

router.get('/connect', getUser, (req, res) => {
  if (req.headers.accept !== 'text/event-stream') {
    return res.sendStatus(404);
  }
  res.setHeader('Cache-Control', 'no-cache');
  // устанавливаем заголовок text/event-stream
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  // создаем клиента
  const client: IClient = {
    id: req.user.id,
    user: req.user,
    emit: (event, data) => {
      res.write(`id: ${uuidv4()}\n`);
      res.write(`event: ${event}\n`);
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    },
  };

  clients[client.id] = client;

  client.emit('connected', { user: req.user });
  req.on('close', () => {
    disconnected(client);
  });
});

router.post('/:roomId/join', getUser, (req, res) => {
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
      clients[peerId].emit('add-peer', {
        peer: req.user,
        roomId,
        offer: false,
      });
      clients[req.user.id].emit('add-peer', {
        peer: clients[peerId].user,
        roomId,
        offer: true,
      });
    }
  }
  // подключен
  channels[roomId][req.user.id] = true;
  return res.sendStatus(200);
});

// передаем предложения и ответы между пирами
router.post('/relay/:peerId/:event', getUser, (req, res) => {
  const peerId = req.params.peerId;

  if (clients[peerId]) {
    clients[peerId].emit(req.params.event, { peer: req.user, data: req.body });
  }
  return res.sendStatus(200);
});

router.post('/message', (req, res) => {
  for (const peerId in channels['1']) {
    //TODO add dynamic rooms
    clients[peerId].emit('on-chat-message', req.body);
  }
  return res.sendStatus(200);
});
