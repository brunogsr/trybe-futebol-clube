  ![Exemplo app front](front-example.png)

  O `Trybe Futebol Clube` é um site informativo sobre partidas e classificações de futebol
  Nesse projeto o back-end está dockerizado usando modelagem de dados através do Sequelize, desenvolvido para interagir corretamente com a tabela mostrada no exemplo acima.

<details>
    <summary><strong>Tecnologias utilizadas</summary><br />

- **Node.js:** Plataforma que permite a execução de código JavaScript no servidor.
- **Express:** Framework web para Node.js que simplifica a criação de APIs RESTful.
- **TypeScript:** Superconjunto tipado de JavaScript que traz segurança e facilidade de manutenção ao código.
- **MySQL:** Sistema de gerenciamento de banco de dados relacional para armazenamento de dados.
- **Sequelize:** ORM (Object-Relational Mapping) para interação com o banco de dados MySQL, facilitando a manipulação de dados.
- **Docker:** Plataforma de contêiner para controlar as versões das dependências e garantir a consistência do ambiente de desenvolvimento.
- **Programação Orientada a Objetos (POO):** O projeto é desenvolvido com princípios de programação orientada a objetos, tornando o código mais organizado e manutenível.
- **Bcrypt, Joi e JWT (JSON Web Tokens):** Utilizados para autenticação e autorização, permitindo que os usuários acessem recursos protegidos de forma segura.
- **Mocha, Sinon e Chai:** Bibliotecas para criação e execução de testes.

</details>

## Rodando o projeto
Para rodar o projeto utilizando docker, no diretório da aplicação execute o comando:

`docker-compose up -d`
ou
`npm run compose:up`

Para acompanhar os logs do container do servidor backend, com nodemon já em execução:

`docker logs -n 90 -f app_backend`
ou
`npm run logs backend`
