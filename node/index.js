const express = require("express");
const app = express();
const port = 3000;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const mysql = require('mysql2');
const connection = mysql.createConnection(config);

const nomes = ["Wesley", "Ana", "Carlos", "Julia", "Pedro", "Maria"];

app.get("/", (req, res) => {
    const nome = nomes[Math.floor(Math.random() * nomes.length)];

    connection.query("INSERT INTO people (name) VALUES (?)", [nome], (err) => {
        if (err) return res.status(500).send("Erro ao inserir: " + err.message);
    })

    // Busca os nomes
    connection.query("SELECT name FROM people", (err, rows) => {
        if (err) return res.status(500).send("Erro ao buscar: " + err.message);

        const list = rows.map((r) => `<li>${r.name}</li>`).join("");


        // 3. Retorna a lista completa
        res.send(`
        <h1>Full Cycle Rocks!</h1>
        <ul>${list}</ul>
      `);

    })
});

app.listen(port, () => {
    console.log("Rodando na porta " + port);
});