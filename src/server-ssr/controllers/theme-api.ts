import { ThemeService } from './theme-service';
import {
  ExpressRequestModeledType,
  ExpressResponseModeledType,
} from './interface';
const themeService = new ThemeService();

export class ThemeAPI {
  //    @validation({/* rules */}) // Можно использовать декораторы, можно передавать в middlewares

  public static create = async (
    req: ExpressRequestModeledType,
    res: ExpressResponseModeledType,
  ) => {
    const { body } = req;
    if (!req.body.theme) {
      res.status(400).send({
        message: 'Тема не может быть пустой!',
      });
      return;
    }
    if (!req.body.description) {
      res.status(400).send({
        message: 'Описание не может быть пустым!',
      });
      return;
    }

    themeService
      .create(body)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Возникла ошибка во время создания темы',
        });
      });
  };

  public static find = async (
    req: ExpressRequestModeledType,
    res: ExpressResponseModeledType,
  ) => {
    const { query } = req;

    themeService
      .find(query)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Возникла ошибка сервере во время запроса тем',
        });
      });
  };

  public static findAll = async (
    req: ExpressRequestModeledType,
    res: ExpressResponseModeledType,
  ) => {
    const { query } = req;

    themeService
      .findAll(query)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Возникла ошибка сервере во время запроса тем',
        });
      });
  };
}
