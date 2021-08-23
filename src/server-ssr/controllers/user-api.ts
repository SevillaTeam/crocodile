import { UserService } from './user-service';
import {
  ExpressRequestModeledType,
  ExpressResponseModeledType,
} from './interface';
const userService = new UserService();

export class UserAPI {
  //    @validation({/* rules */}) // Можно использовать декораторы, можно передавать в middlewares
  public static create = async (
    req: ExpressRequestModeledType,
    res: ExpressResponseModeledType,
  ) => {
    const { body } = req;

    if (!req.body.id) {
      res.status(400).send({
        message: 'Необходим Id для создания пользователя',
      });
      return;
    }

    userService
      .create(body)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Возникла ошибка во время создания пользователя',
        });
      });
  };

  public static find = async (
    req: ExpressRequestModeledType,
    res: ExpressResponseModeledType,
  ) => {
    const { query } = req;
    userService
      .find(query)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            'Возникла ошибка сервере во время запроса инофрмации пользователя',
        });
      });
  };
}
