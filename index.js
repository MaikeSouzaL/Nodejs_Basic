const express = require("express");
const uuid = require("uuid"); // IMPORTAMOS O UUID

const app = express();

app.use(express.json());

const Users = []; // simulando um banco de dados

// middlewares
const CheckUserId = (req, res, next) => {
  const { id } = req.params; // pegamos o id do Params

  const index = Users.findIndex((user) => user.id === id);
  if (index < 0) {
    return res.status(404).json({ message: "User Not Found" });
  }
  req.userIndex = index;
  next();
};

// app.use(CheckUserId);

// Rora para buscar todos os Usuários
app.get("/users", (req, res) => {
  return res.json(Users);
});

// Rota para criar um novo usuário
app.post("/users/", (req, res) => {
  const { name, age } = req.body;
  // montando os dados para cadastrar  o usuario
  const user = { id: uuid.v4(), name, age }; // vamos gerar um ID único com o uuid e passa as informações do body.
  Users.push(user);
  return res.status(201).json(user); // vamos retornar apenas o usuario que criamos mas agora vamos mandar o status 201 de criado com sucesso
});

// Rota para atualizar um novo Usuario
app.put("/users/:id", CheckUserId, (req, res) => {
  const {id} = req.params;
  const { name, age } = req.body; // pegamos o name e o age do body

  const index = req.userIndex;
  const updateUser = { id, name, age };

  Users[index] = updateUser; // Atualizamos o array com as informações
  return res.status(200).json(updateUser); //  Retornamos o User Atualizado
});

// Rota para deletar um usuario
app.delete("/users/:id", CheckUserId, (req, res) => {
  const index = req.userIndex;
  Users.splice(index, 1);

  return res.status(204).send(); // sem conteúdo, apenas uma confirmação de sucesso!
});

app.listen(3333, () => {
  console.log("Aplicação está rodando");
});
