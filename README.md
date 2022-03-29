# Desafio 01 - Construindo com serverless

## 💻 Sobre o desafio

Nesse desafio você irá recriar uma parte da API de _todos_ que foi desenvolvida no desafio [Conceitos do Node.js](https://www.notion.so/Desafio-01-Conceitos-do-Node-js-59ccb235aecd43a6a06bf09a24e7ede8) mas dessa vez deverá ser usado o framework [Serverless](https://www.serverless.com/).

Cada funcionalidade deverá ser criada em um arquivo de função separada de acordo com o que foi visto nesse último módulo.
As rotas que deverão existir são:

**POST -** `/todos/{userid}`

**GET-** `/todos/{userid}`

### Sobre as rotas

- **POST -** `/todos/{userid}`
  Essa rota deve receber o `id` de um usuário pelo `pathParameters` (você pode criar esse id manualmente apenas para preencher o campo) e os seguintes campos no corpo da requisição: `title` e `deadline`, onde `deadline` é a data limite para o _todo_.
  O _todo_ deverá ser salvo com os seguintes campos no DynamoDB:
  ```json
  {
  	id: 'uuid', // id gerado para garantir um único todo com o mesmo id
  	user_id: 'uuid' // id do usuário recebido no pathParameters
  	title: 'Nome da tarefa',
  	done: false, // inicie sempre como false
  	deadline: new Date(deadline)
  }
  ```
- **GET-** `/todos/{userid}`
  Essa rota deve receber o `id` de um usuário pelo `pathParameters` (o mesmo id que foi usado para criar algum _todo_).
  A rota deve retornar os _todos_ que possuírem o `user_id` igual ao `id` recebido pelos parâmetros.

## 📅 Entrega

<aside>
⚠️ Não é necessário fazer o deploy desse desafio na AWS.

</aside>

Esse desafio deve ser entregue a partir da plataforma da Rocketseat. Envie o link do repositório que você fez suas alterações. Após concluir o desafio, além de ter mandado o código para o GitHub, fazer um post no Linkedin é uma boa forma de demonstrar seus conhecimentos e esforços para evoluir na sua carreira para oportunidades futuras.

Feito com 💜 por Rocketseat 👋 Participe da nossa [comunidade aberta!](https://discord.gg/pUU3CG4Z)
