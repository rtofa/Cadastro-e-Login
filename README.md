# 🛠️ Backend de Cadastro e Login com Node.js e Express

![Badge](https://img.shields.io/badge/Status-Concluído-green)
![Node.js](https://img.shields.io/badge/Node.js-16%2B-green)
![Express](https://img.shields.io/badge/Express-4.x-blue)
![Tests](https://img.shields.io/badge/Tests-Jest-orange)


Um backend modular e escalável para sistemas de autenticação, oferecendo funcionalidades de **cadastro de usuários**, **login seguro** e **testes automatizados**. Este projeto foi desenvolvido com o objetivo de oferecer uma base sólida para autenticação em aplicações web ou mobile.

---

## 🎯 **Funcionalidades**

- **📥 Cadastro de usuários:** Crie perfis de usuário com validação de dados e armazenamento seguro.
- **🔑 Login com autenticação JWT:** Oferece autenticação segura por meio de tokens JSON Web Token (JWT).
- **🛡️ Senhas seguras:** As senhas dos usuários são armazenadas de forma segura utilizando hashing com o bcrypt.
- **🧪 Testes Automatizados:** Testes unitários e de integração configurados com Jest e Supertest.
- **📄 Documentação dos endpoints:** Documentação clara e objetiva para facilitar a integração com front-end ou outros serviços.

---

## 🚀 **Tecnologias Utilizadas**

| Tecnologia   | Descrição                                                                 |
|--------------|---------------------------------------------------------------------------|
| Node.js      | Ambiente de execução JavaScript para back-end.                           |
| Express      | Framework para criação de APIs RESTful.                                  |
| bcrypt       | Biblioteca para hash seguro de senhas.                                   |
| JSON Web Token (JWT) | Autenticação de usuários com tokens seguros.                     |
| Jest         | Framework de testes automatizados.                                       |
| Supertest    | Testes de endpoints HTTP.                                                |

---

## 📂 **Estrutura do Projeto**

```plaintext
.
├── src
│   ├── controllers        # Lógica de controle das rotas
│   ├── routes.js          # Definição das rotas da API
│   ├── services           # Serviços e regras de negócio
│   ├── utils              # Funções auxiliares (ex: geração de JWT)
│   └── app.js             # Configuração principal do Express
├── tests                  # Testes automatizados
│   └── user.test.js       # Testes de cadastro e login
├── package.json           # Dependências e scripts do projeto
└── README.md              # Documentação
```

## Endpoints da API ->
### 📥 Cadastro de Usuário
- **POST** `/api/users`
- **Descrição**: Cria um novo usuário no sistema.
- **Corpo da requisição**:
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "123456"
  }

### 🧑‍💻 Exibir Informações do Usuário
- **GET** `/api/users/:id`
- **Descrição**: Retorna os detalhes de um usuário específico pelo ID.
- **Resposta**:
```json
 {
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@example.com"
 }
```
### ✏️ Atualizar Informações do Usuário
- **PUT** `/api/users/:id`
- **Descrição**: Atualiza as informações de um usuário pelo ID.
- **Corpo da requisição**:
  ```json
  {
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "novaSenha123"
  }
  
  ```
  ### 🗑️ Deletar Usuário
- **DELETE** `/api/users/:id`
- **Descrição**: Exclui um usuário pelo ID.
- **Resposta**:
  ```json
  {
  "message": "Usuário excluído com sucesso."
  }
    ```
  
  ### 🔑 Login de Usuário
- **POST** `/api/auth/login`
- **Descrição**: Realiza o login de um usuário.
- **Corpo da requisição**:
  ```json
  {
  "email": "johndoe@example.com",
  "password": "123456"
  }
  ```
- **Resposta**:
    ```json
  {
  "message": "Login realizado com sucesso!",
  "token": "seu-token-jwt-aqui"
  }
  ```

  ### 🔑 Solicitação de Redefinição de Senha
- **POST** `/api/auth/password-reset/request`
- **Descrição**: Solicita a redefinição de senha para um usuário.
- **Corpo da requisição**:
  ```json
  {
  "email": "johndoe@example.com"
  }
  ```
- **Resposta**:
    ```json
  {
  "message": "Instruções para redefinir a senha foram enviadas para o e-mail."
  }
  ```
  
  ### 🔒 Redefinir Senha
- **POST** `/api/auth/password-reset/reset`
- **Descrição**: Redefine a senha de um usuário.
- **Corpo da requisição**:
  ```json
  {
  "token": "seu-token-de-redirecionamento",
  "password": "novaSenha123"
   }
  ```
- **Resposta**:
    ```json
  {
  "message": "Senha redefinida com sucesso!"
  }
  ```
## Como Usar

1. **Clone o Repositório**

    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    cd seu-repositorio
    ```

2. **Instale as Dependências**

    ```bash
    npm install
    ```

3. **Configure as Variáveis de Ambiente**  
   Crie um arquivo `.env` com os seguintes valores:
    ```env
    PORT=3000
    JWT_SECRET=sua-chave-secreta-aqui
    ```

4. **Inicie o Servidor**

    ```bash
    npm start
    ```

   O servidor estará disponível em `http://localhost:3000`.

5. **Execute os Testes**

    ```bash
    npm test
    ```

## Diferenciais do Projeto

* **Código limpo e modular**: Segue boas práticas para fácil manutenção e escalabilidade.
* **Testes automatizados**: Garante a confiabilidade dos endpoints e facilita futuras melhorias.
* **Segurança em primeiro lugar**: Implementação cuidadosa com foco na proteção de dados do usuário.
* **Facilidade de integração**: Estrutura clara e bem documentada para integração com sistemas externos.

## Possíveis Melhorias

* Adicionar suporte a autenticação por redes sociais (OAuth).
* Configurar banco de dados para armazenamento persistente.

## Contato

Gostou do projeto? Entre em contato comigo:

* **Email**: ryantofanini@gmail.com 
* **LinkedIn**: ryan-tofanini
* **GitHub**: rtofa