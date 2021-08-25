import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { User } from './models/user.model';
import { UserTheme } from './models/user-theme.model';
import { SiteTheme } from './models/site-theme.model';

require('dotenv').config();

const sequelizeOptions: SequelizeOptions = {
  username: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  dialect: 'postgres',
};
const sequelize = new Sequelize(sequelizeOptions);
sequelize.addModels([UserTheme, SiteTheme, User]);

export default sequelize;
