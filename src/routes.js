import {Router} from 'express';
import UserController from "./controllers/UserController.js";

const routes = Router();

routes.get("/health", (req, res) => {
    return res.status(200).send({ message: 'Server is running' });
});


routes.post('/api/users', UserController.store); // Cadastro de usuário
routes.get('/api/users/:id', UserController.show); // Consulta de usuário pelo ID
routes.put('/api/users/:id', UserController.update); // Atualização de dados do usuário
routes.delete('/api/users/:id', UserController.delete); // Exclusão de usuário


routes.post('/api/auth/login', UserController.login); // Login de usuário


routes.post('/api/auth/password-reset/request', UserController.requestPasswordReset); // Solicitação de redefinição de senha
routes.post('/api/auth/password-reset/reset', UserController.resetPassword); // Redefinição de senha com código
//routes.post('/api/auth/verify-email', UserController.verifyEmail); // Verificação de código de e-mail (caso implementado futuramente)

export default routes;