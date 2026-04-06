app.get('/webhook', (req, res) => {
  const verify_token = 'tokenok'; // O mesmo que você digitou na imagem

  // Parâmetros enviados pela Meta
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === verify_token) {
      console.log('WEBHOOK_VERIFIED');
      // RETORNE APENAS O CHALLENGE COM STATUS 200
      return res.status(200).send(challenge); 
    } else {
      return res.sendStatus(403);
    }
  }
});
