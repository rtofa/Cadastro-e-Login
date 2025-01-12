import {Router} from 'express';

const routes = Router();

routes.get("/health", (req, res) => {
    return res.status(200).send({ message: 'Hello world!' });
});

export default routes;