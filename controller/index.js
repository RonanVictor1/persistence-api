const express = require('express');
const bodyParser = require('body-parser');
const PessoaService = require('../service/pessoaservice');
const Pessoa = require('../model/pessoa');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const config = {
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'database'
  };

  const pessoaservice = new PessoaService(config);

  app.post('/pessoas', (req, res) => {
    let pessoaInstance = new Pessoa(req.body.nome, req.body.sobrenome);
    pessoaservice.criarPessoa(pessoaInstance, (err, pessoa) => {
        if (err) {
            return res.status(500).json({error: err});
        }
        res.status(201).json(pessoa);
    });
  });

app.get('/pessoas', (req, res) => {
    pessoaservice.buscarTodasAsPessoas((err, pessoas) => {
        if (err) {
            return res.status(500).json({error: err});
        }    

        res.json(pessoas);
    });
});
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`)
});