// bot.js (con sintaxis ES6)
import { makeWASocket, useSingleFileAuthState } from '@adiwajshing/baileys';
import qrcode from 'qrcode-terminal';

const { state, saveState } = useSingleFileAuthState('./session.json');

async function startBot() {
  const conn = makeWASocket({
    auth: state,
    printQRInTerminal: true
  });

  conn.ev.on('creds.update', saveState);

  conn.ev.on('messages.upsert', async (message) => {
    const m = message.messages[0];
    if (!m) return;

    const sender = m.key.remoteJid;
    const content = m.message?.conversation || m.message?.extendedTextMessage?.text;

    if (content?.startsWith('!ping')) {
      await conn.sendMessage(sender, { text: '¡Pong! 🏓' });
    }
  });
}

startBot();
