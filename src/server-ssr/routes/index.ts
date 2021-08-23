import { Router } from 'express';
import { themesRoutes } from './router-themes-routes';

const router: Router = Router();

themesRoutes(router);

export default router;
