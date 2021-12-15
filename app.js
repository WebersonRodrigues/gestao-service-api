const app = require('./src/config/server');
const porta = process.env.PORTA;

app.listen(porta, () => console.log("Api rodando na porta "+ porta))