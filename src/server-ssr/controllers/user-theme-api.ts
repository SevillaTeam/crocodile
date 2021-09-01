import { UserThemeService } from './user-theme-service';
import {
  ExpressRequestModeledType,
  ExpressResponseModeledType,
} from './interface';
const userThemeService = new UserThemeService();

export class UserThemeAPI {
  //    @validation({/* rules */}) // Можно использовать декораторы, можно передавать в middlewares
  public static create = async (
    req: ExpressRequestModeledType,
    res: ExpressResponseModeledType,
  ) => {
    const { body } = req;

    if (!req.body.theme) {
      res.status(400).send({
        message: 'Название темы не может быть пустым!',
      });
      return;
    }

    userThemeService
      .create(body)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            'Возникла ошибка во время создания темы пользователя',
        });
      });
  };

  public static find = async (
    req: ExpressRequestModeledType,
    res: ExpressResponseModeledType,
  ) => {
    const { query } = req;
    userThemeService
      .find(query)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            'Возникла ошибка сервере во время запроса тем пользователя',
        });
      });
  };
}
