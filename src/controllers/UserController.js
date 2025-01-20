import User  from '../models/user.js';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import PasswordValidator from 'password-validator';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto from 'crypto';


const passwordSchema = new PasswordValidator();

passwordSchema
    .is().min(8)
    .is().max(20)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().symbols()
    .has().not().spaces();


const sendResetEmail = async (email, resetCode) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false, // true para 465, false para outras portas
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Redefinição de Senha - Taskify',
        text: `Seu código de redefinição de senha é: ${resetCode}`,
    };

    return transporter.sendMail(mailOptions);
};

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

            // Validar a senha
            if (!passwordSchema.validate(password)) {
                return res.status(400).send({
                    message: "A senha deve ter pelo menos 8 caracteres, incluir letras maiúsculas, minúsculas, números e caracteres especiais.",
                });
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

    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).send({
                    message: "Email e senha são obrigatórios!",
                });
            }


            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(400).send({
                    message: 'Email ou senha inválidos.',
                });
            }


            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(400).send({
                    message: 'Email ou senha inválidos.',
                });
            }

            // Gerar o token JWT
            const token = jwt.sign(
                { id: user.id, name: user.name, email: user.email },
                'secrectKey',  // Substitua por uma chave secreta em produção
                { expiresIn: '1h' }  // O token vai expirar em 1 hora
            );

            return res.status(200).json({
                message: 'Login bem-sucedido!',
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                message: 'Erro no login. Tente novamente mais tarde.',
            });
        }
    }


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

    async requestPasswordReset(req, res) {
        const { email } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).send({
                message: 'Este e-mail não está registrado.',
            });
        }


        let resetCode = crypto.randomBytes(3).toString('hex');  // Gera um código de 6 caracteres (3 bytes)


        await user.update({
            resetCode,
            resetCodeExpires: Date.now() + 3600000,  // 1 hora para expirar
        });


        try {
            await sendResetEmail(email, resetCode);
            return res.status(200).send({
                message: 'Código de redefinição de senha enviado por e-mail.',
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                message: 'Erro ao enviar o código de redefinição de senha.',
            });
        }
    }

    async resetPassword(req, res) {
        try {
            const { email, resetCode, newPassword } = req.body;


            if (!email || !resetCode || !newPassword) {
                return res.status(400).send({
                    message: 'Todos os campos são obrigatórios.',
                });
            }


            const user = await User.findOne({ where: { email, resetCode } });
            if (!user) {
                return res.status(400).send({
                    message: 'Código de redefinição inválido ou expirado.',
                });
            }


            if (Date.now() > user.resetCodeExpires) {
                return res.status(400).send({
                    message: 'Código de redefinição expirado.',
                });
            }


            const hashedPassword = await bcrypt.hash(newPassword, 10);


            await user.update({
                password: hashedPassword,
                resetCode: null,
                resetCodeExpires: null,
            });

            return res.status(200).send({
                message: 'Senha redefinida com sucesso!',
            });
        } catch (error) {
            console.error('Erro ao redefinir senha:', error);
            return res.status(500).send({
                message: 'Erro interno ao redefinir a senha. Tente novamente mais tarde.',
            });
        }
    }
}

export default new UserController();