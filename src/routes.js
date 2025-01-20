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


routes.post('/api/auth/password-reset/request', UserController.requestPasswordReset);
routes.post('/api/auth/password-reset/reset', UserController.resetPassword);
//routes.post('/api/auth/verify-email', UserController.verifyEmail); // Verificação de código de e-mail (caso implementado futuramente)
export default routes;