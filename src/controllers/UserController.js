import User  from '../models/user.js';
import bcrypt from 'bcryptjs';
import validator from 'validator';

class UserController {
    // Função para cadastrar um noovo usuário
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

            const userAlreadyExists = await User.findOne({where: {email} });
            if (userAlreadyExists) {
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

    // Função para buscar um usuário
    async show(req, res) {
        try {
            const { id } = req.params;

            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).send({
                    message: 'Usuário não encontrado.'
                });
            }

            return res.status(200).json({
                id: user.id,
                name: user.name,
                email: user.email,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                message: 'Erro ao buscar usuário. Tente novamente mais tarde.'
            });
        }
    }

    // Função para atualizar um usuário
    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, email, password } = req.body;

            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).send({
                    message: 'Usuário não encontrado.'
                });
            }

            if (email && !validator.isEmail(email)) {
                return res.status(400).send({
                    message: "Formato de email inválido!"
                });
            }

            const updatedUser = await user.update({ name, email, password });

            return res.status(200).json({
                message: "Usuário atualizado com sucesso!",
                user: {
                    id: updatedUser.id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                },
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                message: 'Erro ao atualizar o usuário. Tente novamente mais tarde.'
            });
        }
    }

    // Função para deletar um usuário
    async delete(req, res) {
        try {
            const { id } = req.params;

            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).send({
                    message: 'Usuário não encontrado.'
                });
            }

            await user.destroy();

            return res.status(200).send({
                message: 'Usuário deletado com sucesso.'
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                message: 'Erro ao deletar o usuário. Tente novamente mais tarde.'
            });
        }
    }

    // Função de login do usuário
    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).send({
                    message: 'Email e senha são obrigatórios.'
                });
            }

            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(404).send({
                    message: 'Usuário não encontrado.'
                });
            }

            const isPasswordCorrect = await bcrypt.compare(password, user.password);

            if (!isPasswordCorrect) {
                return res.status(401).send({
                    message: 'Senha incorreta.'
                });
            }

            return res.status(200).json({
                message: 'Login bem-sucedido!',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                message: 'Erro ao fazer login. Tente novamente mais tarde.'
            });
        }
    }
}

export default new UserController();