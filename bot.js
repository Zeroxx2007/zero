// bot.js
const { makeWASocket, MessageType, useSingleFileAuthState } = require('@adiwajshing/baileys');
const { state, saveState } = useSingleFileAuthState('./session.json');
const qrcode = require('qrcode-terminal');
const config = require('./config');

async function startBot() {
  const conn = makeWASocket({
    auth: state,
    printQRInTerminal: true // Muestra el QR directamente en la terminal
  });

  // Guardar sesión automáticamente
  conn.ev.on('creds.update', saveState);

  // Escuchar mensajes
  conn.ev.on('messages.upsert', async ({ messages }) => {
    const m = messages[0];
    if (!m.message) return;

    const sender = m.key.remoteJid;
    const content = m.message.conversation || m.message.extendedTextMessage?.text;

    // Ejemplo de comando
    if (content?.startsWith(config.prefix + 'ping')) {
      await conn.sendMessage(sender, { text: '¡Pong! 🏓' });
    }

    // Añade más comandos aquí
  });
}

startBot();
