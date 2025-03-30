// bot.js
const { WAConnection: _WAConnection } = require('@adiwajshing/baileys');
const { MessageType } = require('@adiwajshing/baileys');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const config = require('./config');

const WAConnection = _WAConnection;

async function startBot() {
  const conn = new WAConnection();
  conn.logger.level = 'warn';

  // Generar QR
  conn.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
  });

  // Conectar
  await conn.connect({ timeoutMs: 30_000 });
  console.log('Bot conectado!');
  fs.writeFileSync('./session.json', JSON.stringify(conn.base64EncodedAuthInfo(), null, '\t'));

  // Escuchar mensajes
  conn.on('chat-update', async (message) => {
    if (!message.hasNewMessage) return;
    const m = message.messages.all()[0];
    if (!m.message) return;

    const content = m.message.conversation || m.message.extendedTextMessage?.text;
    const sender = m.key.remoteJid;

    // Ejemplo de comando
    if (content.startsWith('!ping')) {
      await conn.sendMessage(sender, '¡Pong! 🏓', MessageType.text);
    }

    // Añade más comandos aquí
  });
}

// Autenticación previa (si existe session.json)
const authInfo = fs.existsSync('./session.json') ? JSON.parse(fs.readFileSync('./session.json', 'utf-8')) : {};
startBot(authInfo);
