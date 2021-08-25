import { Router } from 'express';
import { ThemeAPI, UserThemeAPI, UserAPI } from '../controllers';
import { checkAuthMiddleware } from '../controllers';

export const themesRoutes = (router: Router) => {
  const themesRouter: Router = Router();
  const userThemesRouter: Router = Router();
  const usersRouter: Router = Router();

  themesRouter
    .post('/', checkAuthMiddleware, ThemeAPI.create)
    .get('/title', checkAuthMiddleware, ThemeAPI.find)
    .get('/', checkAuthMiddleware, ThemeAPI.findAll);

  userThemesRouter
    .post('/', checkAuthMiddleware, UserThemeAPI.create)
    .delete('/', checkAuthMiddleware, UserThemeAPI.delete)
    .get('/', checkAuthMiddleware, UserThemeAPI.find);

  usersRouter
    .post('/', checkAuthMiddleware, UserAPI.create)
    .get('/', checkAuthMiddleware, UserAPI.find);

  router.use('/users', usersRouter);
  router.use('/theme/user', userThemesRouter);
  router.use('/theme', themesRouter);
};
