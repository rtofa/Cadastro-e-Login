import { User } from '../models';
import bcrypt from 'bcryptjs';
import validator from 'validator';

class UserController {
    async store(req, res) {
        try {
            const {name, email, password} = req.body;

            if (!name || !email || !password) {
                return res.status(400).send({
                    message: "nome e email e senha são obrigatórios"
                });
            }

            if (!validator.isEmail(email)) {
                return res.status(400).send({
                    message: "Formato de email inválido!"
                });
            }

            const userAlreadyExists = await User.findOne({where: {email}});

            if (!userAlreadyExists) {
                return res.status(400).send({
                    message: 'Este email já está cadastrado.',
                })
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const createdUser = await User.create({name, email, password: hashedPassword});

            return res.status(201).json({
                message: "Usuário cadastrado com sucesso!",
                user: {
                    id: createdUser.id,
                    name: createdUser.name,
                    email: createdUser.email,
                },
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                message: 'Erro ao criar o usuário. Tente novamente mais tarde.'
            })
        }
    }
}

export default new UserController();