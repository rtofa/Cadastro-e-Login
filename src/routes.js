import {Router} from 'express';
import UserController from "./controllers/UserController.js";

const routes = Router();

routes.get("/health", (req, res) => {
    return res.status(200).send({ message: 'Server is running' });
});


routes.post('/api/users', UserController.store);

routes.get('/api/users/:id', UserController.show);

routes.put('/api/users/:id', UserController.update);

routes.delete('/api/users/:id', UserController.delete);

routes.post('/api/auth/login', UserController.login);

export default routes;