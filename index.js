const express = require('express');
const app = express();

// O Railway injeta a porta automaticamente nesta variável
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rota de verificação (o GET que a Meta usa)
app.get('/webhook', (req, res) => {
  const verify_token = 'tokenok'; // O mesmo que você colocou no painel da Meta
  
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === verify_token) {
    console.log('WEBHOOK_VERIFICADO');
    return res.status(200).send(challenge);
  } else {
    return res.sendStatus(403);
  }
});

// Rota para receber as mensagens (o POST que a Meta envia depois)
app.post('/webhook', (req, res) => {
  console.log('Mensagem recebida:', JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// ESSA LINHA É ESSENCIAL: Faz o servidor "acordar" no Railway
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
