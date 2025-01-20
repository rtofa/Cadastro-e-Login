import supertest from 'supertest';
import routes from "../src/routes";
import {request} from "express";

describe('User Registration', () => {
    it('should successfully register a new user', async () => {
        const response = await request(routes())
            .post('/api/users') // Envia a requisição para o endpoint de registro
            .send({
                name: 'Test User',
                email: 'testuser@example.com',
                password: 'Password123',
            });

        expect(response.status).toBe(201); // Espera-se que o status da resposta seja 201 (criado)
        expect(response.body).toHaveProperty('message', 'Usuário registrado com sucesso!');
    });

    it('should return an error if email is already registered', async () => {
        const response = await request(routes())
            .post('/api/users') // Envia a requisição para o endpoint de registro
            .send({
                name: 'Test User',
                email: 'testuser@example.com',
                password: 'Password123',
            });

        expect(response.status).toBe(400); // Espera-se um erro se o email já estiver registrado
        expect(response.body).toHaveProperty('message', 'E-mail já registrado.');
    });
});