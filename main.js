"use strict";
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1'; 
import './config.js';
import {createRequire} from 'module';
import path, {join} from 'path';
import {fileURLToPath, pathToFileURL} from 'url';
import {platform} from 'process';
import {readdirSync, statSync, unlinkSync, existsSync, readFileSync, watch} from 'fs';
import yargs from 'yargs';
import {spawn} from 'child_process';
import lodash from 'lodash';
import chalk from 'chalk';
import syntaxerror from 'syntax-error';
import {format} from 'util';
import pino from 'pino';
import Pino from 'pino';
import {Boom} from '@hapi/boom';
import {makeWASocket, protoType, serialize} from './src/libraries/simple.js';
import {Low, JSONFile} from 'lowdb';
import store from './src/libraries/store.js';
const {DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, jidNormalizedUser, PHONENUMBER_MCC} = await import("baileys");
import readline from 'readline';
import NodeCache from 'node-cache';

// Configuración básica
const __dirname = global.__dirname(import.meta.url);
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
global.prefix = /^[.!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\-.@]/;
global.db = new Low(new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}database.json`));

// Función principal
async function startBot() {
  const {state, saveCreds} = await useMultiFileAuthState(global.authFile);
  const {version} = await fetchLatestBaileysVersion();
  
  const conn = makeWASocket({
    logger: Pino({ level: 'silent' }),
    printQRInTerminal: true,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: 'fatal' })),
    },
    version
  });

  // Comando .menu
  conn.ev.on('messages.upsert', async ({ messages }) => {
    if (!messages[0]?.message) return;
    const m = messages[0];
    const content = m.message.conversation || m.message.extendedTextMessage?.text;
    
    if (content?.startsWith('.menu')) {
      const menu = `
        *Zero Bot Menu*
        .menu - Mostrar este menú
      `;
      await conn.sendMessage(m.key.remoteJid, { text: menu });
    }
  });

  // Mantener sesión activa
  conn.ev.on('creds.update', saveCreds);
}

startBot();
