import { generateWAMessageFromContent } from "baileys";
import { smsg } from './src/libraries/simple.js';
import { format } from 'util';
import { fileURLToPath } from 'url';
import path, { join } from 'path';
import { unwatchFile, watchFile } from 'fs';
import fs from 'fs';
import chalk from 'chalk';
import mddd5 from 'md5';
import ws from 'ws';
let mconn;

/**
 * @type {import("baileys")}
 */
const { proto } = (await import("baileys")).default;
const isNumber = (x) => typeof x === 'number' && !isNaN(x);
const delay = (ms) => isNumber(ms) && new Promise((resolve) => setTimeout(function () {
  clearTimeout(this);
  resolve();
}, ms));

/**
 * Handle messages upsert
 * @param {import("baileys").BaileysEventMap<unknown>['messages.upsert']} groupsUpdate
 */
export async function handler(chatUpdate) {
  this.msgqueque = this.msgqueque || [];
  this.uptime = this.uptime || Date.now();
  if (!chatUpdate) {
    return;
  }
  this.pushMessage(chatUpdate.messages).catch(console.error);
  let m = chatUpdate.messages[chatUpdate.messages.length - 1];
  if (!m) {
    return;
  }
  if (global.db.data == null) await global.loadDatabase();
  
  /* ------------------------------------------------*/
  try {
    m = smsg(this, m) || m;
    if (!m) {
      return;
    }
    global.mconn = m
    mconn = m
    m.exp = 0;
    m.money = false;
    m.limit = false;
    try {
      // TODO: use loop to insert data instead of this
      const user = global.db.data.users[m.sender]
      if (typeof user !== 'object') {
        global.db.data.users[m.sender] = {};
      }
      if (user) {
        // im gona cook this
        // why the fuck nobody put the code like this in 3 years??????
        // credit to zero-md or skidy89
        const dick = {
          afk: -1,
          wait: 0,
          afkReason: '',
          age: -1,
          agility: 16,
          anakanjing: 0,
          anakcentaur: 0,
          anakgriffin: 0,
          anakkucing: 0,
          anakkuda: 0,
          anakkyubi: 0,
          anaknaga: 0,
          anakpancingan: 0,
          anakphonix: 0,
          anakrubah: 0,
          anakserigala: 0,
          anggur: 0,
          anjing: 0,
          anjinglastclaim: 0,
          antispam: 0,
          antispamlastclaim: 0,
          apel: 0,
          aqua: 0,
          arc: 0,
          arcdurability: 0,
          arlok: 0,
          armor: 0,
          armordurability: 0,
          armormonster: 0,
          as: 0,
          atm: 0,
          autolevelup: true,
          axe: 0,
          axedurability: 0,
          ayam: 0,
          ayamb: 0,
          ayambakar: 0,
          ayamg: 0,
          ayamgoreng: 0,
          babi: 0,
          babihutan: 0,
          babipanggang: 0,
          bandage: 0,
          bank: 0,
          banned: false,
          BannedReason: '',
          Banneduser: false,
          banteng: 0,
          batu: 0,
          bawal: 0,
          bawalbakar: 0,
          bayam: 0,
          berlian: 10,
          bibitanggur: 0,
          bibitapel: 0,
          bibitjeruk: 0,
          bibitmangga: 0,
          bibitpisang: 0,
          botol: 0,
          bow: 0,
          bowdurability: 0,
          boxs: 0,
          brick: 0,
          brokoli: 0,
          buaya: 0,
          buntal: 0,
          cat: 0,
          catlastfeed: 0,
          catngexp: 0,
          centaur: 0,
          centaurexp: 0,
          centaurlastclaim: 0,
          centaurlastfeed: 0,
          clay: 0,
          coal: 0,
          coin: 0,
          common: 0,
          crystal: 0,
          cumi: 0,
          cupon: 0,
          diamond: 3,
          dog: 0,
          dogexp: 0,
          doglastfeed: 0,
          dory: 0,
          dragon: 0,
          dragonexp: 0,
          dragonlastfeed: 0,
          emas: 0,
          emerald: 0,
          esteh: 0,
          exp: 0,
          expg: 0,
          exphero: 0,
          expired: 0,
          eleksirb: 0,
          emasbatang: 0,
          emasbiasa: 0,
          fideos: 0,
          fishingrod: 0,
          fishingroddurability: 0,
          fortress: 0,
          fox: 0,
          foxexp: 0,
          foxlastfeed: 0,
          fullatm: 0,
          gadodado: 0,
          gajah: 0,
          gamemines: false,
          mute: false,
          ganja: 0,
          gardenboxs: 0,
          gems: 0,
          glass: 0,
          gold: 0,
          griffin: 0,
          griffinexp: 0,
          griffinlastclaim: 0,
          griffinlastfeed: 0,
          gulai: 0,
          gurita: 0,
          harimau: 0,
          haus: 100,
          healt: 100,
          health: 100,
          healtmonster: 100,
          hero: 1,
          herolastclaim: 0,
          hiu: 0,
          horse: 0,
          horseexp: 0,
          horselastfeed: 0,
          ikan: 0,
          ikanbakar: 0,
          intelligence: 10,
          iron: 0,
          jagung: 0,
          jagungbakar: 0,
          jeruk: 0,
          job: 'Pengangguran',
          joincount: 2,
          joinlimit: 1,
          judilast: 0,
          kaleng: 0,
          kambing: 0,
          kangkung: 0,
          kapak: 0,
          kardus: 0,
          katana: 0,
          katanadurability: 0,
          kayu: 0,
          kentang: 0,
          kentanggoreng: 0,
          kepiting: 0,
          kepitingbakar: 0,
          kerbau: 0,
          kerjadelapan: 0,
          kerjadelapanbelas: 0,
          kerjadua: 0,
          kerjaduabelas: 0,
          kerjaduadelapan: 0,
          kerjaduadua: 0,
          kerjaduaempat: 0,
          kerjaduaenam: 0,
          kerjadualima: 0,
          kerjaduapuluh: 0,
          kerjaduasatu: 0,
          kerjaduasembilan: 0,
          kerjaduatiga: 0,
          kerjaduatujuh: 0,
          kerjaempat: 0,
          kerjaempatbelas: 0,
          kerjaenam: 0,
          kerjaenambelas: 0,
          kerjalima: 0,
          kerjalimabelas: 0,
          kerjasatu: 0,
          kerjasebelas: 0,
          kerjasembilan: 0,
          kerjasembilanbelas: 0,
          kerjasepuluh: 0,
          kerjatiga: 0,
          kerjatigabelas: 0,
          kerjatigapuluh: 0,
          kerjatujuh: 0,
          kerjatujuhbelas: 0,
          korbanngocok: 0,
          kubis: 0,
          kucing: 0,
          kucinglastclaim: 0,
          kuda: 0,
          kudalastclaim: 0,
          kumba: 0,
          kyubi: 0,
          kyubilastclaim: 0,
          labu: 0,
          laper: 100,
          lastadventure: 0,
          lastberbru: 0,
          lastberkebon: 0,
          lastbunga: 0,
          lastbunuhi: 0,
          lastcoins: 0,
          lastclaim: 0,
          lastcode: 0,
          lastcofre: 0,
          lastcrusade: 0,
          lastdaang: 0,
          lastdagang: 0,
          lastdiamantes: 0,
          lastduel: 0,
          lastdungeon: 0,
          lasteasy: 0,
          lastfight: 0,
          lastfishing: 0,
          lastgojek: 0,
          lastgrab: 0,
          lasthourly: 0,
          lasthunt: 0,
          lastjb: 0,
          lastkill: 0,
          lastlink: 0,
          lastlumber: 0,
          lastmancingeasy: 0,
          lastmancingextreme: 0,
          lastmancinghard: 0,
          lastmancingnormal: 0,
          lastmining: 0,
          lastmisi: 0,
          lastmonthly: 0,
          lastmulung: 0,
          lastnambang: 0,
          lastnebang: 0,
          lastngocok: 0,
          lastngojek: 0,
          lastopen: 0,
          lastpekerjaan: 0,
          lastpago: 0,
          lastpotionclaim: 0,
          lastramuanclaim: 0,
          lastspam: 0,
          lastrob: 0,
          lastroket: 0,
          lastseen: 0,
          lastSetStatus: 0,
          lastsironclaim: 0,
          lastsmancingclaim: 0,
          laststringclaim: 0,
          lastswordclaim: 0,
          lastturu: 0,
          lastwarpet: 0,
          lastweaponclaim: 0,
          lastweekly: 0,
          lastwork: 0,
          lbars: '[▒▒▒▒▒▒▒▒▒]',
          legendary: 0,
          lele: 0,
          leleb: 0,
          lelebakar: 0,
          leleg: 0,
          level: 0,
          limit: 20,
          limitjoinfree: 1,
          lion: 0,
          lionexp: 0,
          lionlastfeed: 0,
          lobster: 0,
          lumba: 0,
          magicwand: 0,
          magicwanddurability: 0,
          makanan: 0,
          makanancentaur: 0,
          makanangriffin: 0,
          makanankyubi: 0,
          makanannaga: 0,
          makananpet: 0,
          makananphonix: 0,
          makananserigala: 0,
          mana: 20,
          mangga: 0,
          misi: '',
          money: 15,
          monyet: 0,
          mythic: 0,
          naga: 0,
          nagalastclaim: 0,
          name: m.name,
          net: 0,
          nila: 0,
          nilabakar: 0,
          note: 0,
          ojekk: 0,
          oporayam: 0,
          orca: 0,
          pancingan: 1,
          panda: 0,
          pasangan: '',
          paus: 0,
          pausbakar: 0,
          pc: 0,
          pepesikan: 0,
          pet: 0,
          phonix: 0,
          phonixexp: 0,
          phonixlastclaim: 0,
          phonixlastfeed: 0,
          pickaxe: 0,
          pickaxedurability: 0,
          pillhero: 0,
          pisang: 0,
          pointxp: 0,
          potion: 10,
          premium: false,
          premiumTime: 0,
          ramuan: 0,
          ramuancentaurlast: 0,
          ramuangriffinlast: 0,
          ramuanherolast: 0,
          ramuankucinglast: 0,
          ramuankudalast: 0,
          ramuankyubilast: 0,
          ramuannagalast: 0,
          ramuanphonixlast: 0,
          ramuanrubahlast: 0,
          ramuanserigalalast: 0,
          registered: false,
          reglast: 0,
          regTime: -1,
          rendang: 0,
          rhinoceros: 0,
          rhinocerosexp: 0,
          rhinoceroslastfeed: 0,
          rock: 0,
          quita cualquier indice de texto traducido (o sea de alguna carpeta par eso) y deja solo los que esten en español: 

          roket: 0,

          role: 'Novato',

          roti: 0,

          rtrofi: 'bronce',

          rubah: 0,

          rubahlastclaim: 0,

          rumahsakit: 0,

          sampah: 0,

          sand: 0,

          sapi: 0,

          sapir: 0,

          seedbayam: 0,

          seedbrokoli: 0,

          seedjagung: 0,

          seedkangkung: 0,

          seedkentang: 0,

          seedkubis: 0,

          seedlabu: 0,

          seedtomat: 0,

          seedwortel: 0,

          semangka: 0,

          serigala: 0,

          serigalalastclaim: 0,

          sewa: false,

          shield: 0,

          skill: '',

          skillexp: 0,

          snlast: 0,

          soda: 0,

          sop: 0,

          spammer: 0,

          spinlast: 0,

          ssapi: 0,

          stamina: 100,

          steak: 0,

          stick: 0,

          strength: 30,

          string: 0,

          stroberi: 0,

          superior: 0,

          suplabu: 0,

          sushi: 0,

          sword: 0,

          sworddurability: 0,

          tigame: 50,

          tiketcoin: 0,

          title: '',

          tomat: 0,

          tprem: 0,

          trash: 0,

          trofi: 0,

          troopcamp: 0,

          tumiskangkung: 0,

          udang: 0,

          udangbakar: 0,

          umpan: 0,

          uncoommon: 0,

          unreglast: 0,

          upgrader: 0,

          vodka: 0,

          wallet: 0,

          warn: 0,

          weapon: 0,

          weapondurability: 0,

          wolf: 0,

          wolfexp: 0,

          wolflastfeed: 0,

          wood: 0,

          wortel: 0,

          language: 'es',

          gameglx: {},

        }

      for (const dicks in dick) {

        if (user[dicks] === undefined || !user.hasOwnProperty(dicks)) {

          user[dicks] = dick[dicks] // god pls forgive me

        }

      }}

      const akinator = global.db.data.users[m.sender].akinator;

      if (typeof akinator !== 'object') {

        global.db.data.users[m.sender].akinator = {};

      }

      if (akinator) {

        const akiSettings = {

          sesi: false,

          server: null,

          frontaddr: null,

          session: null,

          signature: null,

          question: null,

          progression: null,

          step: null,

          soal: null,

        };

        for (const aki in akiSettings) {

          if (akinator[aki] === undefined || !akinator.hasOwnProperty(aki)) {

            akinator[aki] = akiSettings[aki] ?? {};

          }

        }

      }

      let gameglx = global.db.data.users[m.sender].gameglx

      if (typeof gameglx !== 'object') {

        global.db.data.users[m.sender].gameglx = {}

      }

      if (gameglx) {

        const gameGalaxy = { // i want to assign dick instead gameGalaxy

          status: false,

          notificacao: {

            recebidas: []

          },

          perfil: {

            xp: 112,

            nivel: {

              nome: 'Iniciante',

              id: 0,

              proximoNivel: 1

            },

            poder: 500,

            minerando: false,

            nome: null,

            username: null,

            id: null, // Id do Jogador

            idioma: 'pt-br',

            casa: {

              id: null, // id do grupo ou seja do planeta casa

              planeta: null,

              idpelonome: 'terra',

              colonia: {

                id: 1,

                nome: null,

                habitante: false,

                posicao: {

                  x: 0,

                  y: 0,

                }

              }

            },

            carteira: {

              currency: 'BRL',

              saldo: 1500,

            },

            localizacao: {

              status: false,

              nomeplaneta: null,  // id do grupo...

              id: null,

              idpelonome: null,

              viajando: false,

              posicao: {

                x: 0,

                y: 0,

              }

            },

            nave: {

              status: false,

              id: null,

              nome: null,

              velocidade: null,

              poder: null,

              valor: null,

            },

            bolsa: {

              itens: {

                madeira: 1,

                ferro: 1,

                diamante: 1,

                esmeralda: 2,

                carvao: 1,

                ouro: 1,

                quartzo: 1

              },

              naves: {

                status: false,

                compradas: []

              }

            },

            ataque: {

              data: {

                hora: 0,

                contagem: 0 

              },

              sendoAtacado: {

                status: false,

                atacante: null,

              },

              forcaAtaque: {

                ataque: 10

              }

            },

            defesa: {

              forca: 200,

              ataque: 30

            }

          }

        }

        for (const game in gameGalaxy) {

          if (gameglx[game] === undefined || !gameglx.hasOwnProperty(game)) {

            gameglx[game] = gameGalaxy[game] ?? {} // ctrl + v moment 

          }

        }

      }





      const chat = global.db.data.chats[m.chat];

      if (typeof chat !== 'object') {

        global.db.data.chats[m.chat] = {};

      }

      if (chat) {

        

      const chats = { // i want to assign dick instead chats

          isBanned: false,

          welcome: true,

          detect: true,

          detect2: false,

          sWelcome: '',

          sBye: '',

          sPromote: '',

          sDemote: '',

          antidelete: false,

          modohorny: true,

          autosticker: false,

          audios: true,

          antiLink: false,

          antiLink2: false,

          antiviewonce: false,

          antiToxic: false,

          antiTraba: false,

          antiArab: false,

          antiArab2: false,

          antiporno: false,

          modoadmin: false,

          simi: false,

          game: true,

          expired: 0,

          language: 'es',

        }

        for (const chatss in chats) {

          if (chat[chatss] === undefined || !chat.hasOwnProperty(chatss)) {

            chat[chatss] = chats[chatss] ?? {}// ctrl + v moment

          }

        }

      }

      const settings = global.db.data.settings[this.user.jid];

      if (typeof settings !== 'object') global.db.data.settings[this.user.jid] = {};

      if (settings) {

       const setttings = { // yk the drill 

          self: false,

          autoread: false,

          autoread2: false,

          restrict: false,

          antiCall: false,

          antiPrivate: false,

          modejadibot: true,

          antispam: false,

          audios_bot: true,

          modoia: false

        };

        for (const setting in settings) {

          if (settings[setting] === undefined || !settings.hasOwnProperty(setting)) {

            settings[setting] = setttings[setting] ?? {} // ctrl + v moment

          }

        }

      }

    } catch (e) {

      console.error(e);

    }



    const idioma = global.db.data.users[m.sender]?.language || global.defaultLenguaje; // is null? np the operator ?? fix that (i hope)

    const _translate = JSON.parse(fs.readFileSync(`./src/languages/${idioma}.json`))

    const tradutor = _translate.handler.handler



    if (opts['nyimak']) {

      return;

    }

    if (!m.fromMe && opts['self']) {

      return;

    }

    if (opts['pconly'] && m.chat.endsWith('g.us')) {

      return;

    }

    if (opts['gconly'] && !m.chat.endsWith('g.us')) {

      return;

    }

    if (opts['swonly'] && m.chat !== 'status@broadcast') {

      return;

    }

    if (typeof m.text !== 'string') {

      m.text = '';

    }

    const isROwner = [...global.owner.map(([number]) => number)].map((v) => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);

    const isOwner = isROwner || m.fromMe;

    const isMods = isOwner || global.mods.map((v) => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);

    const isPrems = isROwner || isOwner || isMods || global.db.data.users[m.sender].premiumTime > 0; // || global.db.data.users[m.sender].premium = 'true'



    if (opts['queque'] && m.text && !(isMods || isPrems)) {

      const queque = this.msgqueque; const time = 1000 * 5;

      const previousID = queque[queque.length - 1];

      queque.push(m.id || m.key.id);

      setInterval(async function () {

        if (queque.indexOf(previousID) === -1) clearInterval(this);

        await delay(time);

      }, time);

    }



    if (m.isBaileys || isBaileysFail && m?.sender === mconn?.conn?.user?.jid) {

      return;

    }



    m.exp += Math.ceil(Math.random() * 10);



    let usedPrefix;

    const _user = global.db.data && global.db.data.users && global.db.data.users[m.sender];



    const groupMetadata = (m.isGroup ? ((conn.chats[m.chat] || {}).metadata || await this.groupMetadata(m.chat).catch((_) => null)) : {}) || {};

    const participants = (m.isGroup ? groupMetadata.participants : []) || [];

    const user = (m.isGroup ? participants.find((u) => conn.decodeJid(u.id) === m.sender) : {}) || {}; // User Data

    const bot = (m.isGroup ? participants.find((u) => conn.decodeJid(u.id) == this.user.jid) : {}) || {}; // Your Data

    const isRAdmin = user?.admin == 'superadmin' || false;

    const isAdmin = isRAdmin || user?.admin == 'admin' || false; // Is User Admin?

    const isBotAdmin = bot?.admin || false; // Are you Admin?



    const ___dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), './plugins');

    for (const name in global.plugins) {

      const plugin = global.plugins[name];

      if (!plugin) {

        continue;

      }

      if (plugin.disabled) {

        continue;

      }

      const __filename = join(___dirname, name);

      if (typeof plugin.all === 'function') {

        try {

          await plugin.all.call(this, m, {

            chatUpdate,

            __dirname: ___dirname,

            __filename,

          });

        } catch (e) {

          // if (typeof e === 'string') continue

          console.error(e);

          /* for (const [jid] of global.reportes_solicitudes.filter(([number]) => number)) {

            const data = (await conn.onWhatsApp(jid))[0] || {};

            if (data.exists) {

              await m.reply(`*[ ⚠️ 𝚁𝙴𝙿𝙾𝚁𝚃𝙴 𝙳𝙴 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 𝙲𝙾𝙽 𝙵𝙰𝙻𝙻𝙾𝚂 ⚠️ ]*\n\n*—◉ 𝙿𝙻𝚄𝙶𝙸𝙽:* ${name}\n*—◉ 𝚄𝚂𝚄𝙰𝚁𝙸𝙾:* ${m.sender}\n*—◉ 𝙲𝙾𝙼𝙰𝙽𝙳𝙾:* ${m.text}\n\n*—◉ 𝙴𝚁𝚁𝙾𝚁:*\n\`\`\`${format(e)}\`\`\`\n\n*[❗] 𝚁𝙴𝙿𝙾𝚁𝚃𝙴𝙻𝙾 𝙰𝙻 𝙲𝚁𝙴𝙰𝙳𝙾𝚁 𝙳𝙴𝙻 𝙱𝙾𝚃 𝙿𝙰𝚁𝙰 𝙳𝙰𝚁𝙻𝙴 𝚄𝙽𝙰 𝚂𝙾𝙻𝚄𝙲𝙸𝙾𝙽, 𝙿𝚄𝙴𝙳𝙴 𝚄𝚂𝙰𝚁 𝙴𝙻 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 #reporte*`.trim(), data.jid);

            }

          }*/

          const md5c = fs.readFileSync('./plugins/' + m.plugin);

          fetch('https://themysticbot.cloud:2083/error', {

            method: 'POST',

            headers: { 'Content-Type': 'application/json' },

            body: JSON.stringify({ number: conn.user.jid, plugin: m.plugin, command: `${m.text}`, reason: format(e), md5: mddd5(md5c) }),

          });

        }

      }

      if (!opts['restrict']) {

        if (plugin.tags && plugin.tags.includes('admin')) {

          // global.dfail('restrict', m, this)

          continue;

        }

      }

      const str2Regex = (str) => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');

      const _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : global.prefix;

      const match = (_prefix instanceof RegExp ? // RegExp Mode?

        [[_prefix.exec(m.text), _prefix]] :

        Array.isArray(_prefix) ? // Array?

          _prefix.map((p) => {

            const re = p instanceof RegExp ? // RegExp in Array?

              p :

              new RegExp(str2Regex(p));

            return [re.exec(m.text), re];

          }) :

          typeof _prefix === 'string' ? // String?

            [[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]] :

            [[[], new RegExp]]

      ).find((p) => p[1]);

      if (typeof plugin.before === 'function') {

        if (await plugin.before.call(this, m, {

          match,

          conn: this,

          participants,

          groupMetadata,

          user,

          bot,

          isROwner,

          isOwner,

          isRAdmin,

          isAdmin,

          isBotAdmin,

          isPrems,

          chatUpdate,

          __dirname: ___dirname,

          __filename,

        })) {

          continue;

        }

      }

      if (typeof plugin !== 'function') {

        continue;

      }

      if ((usedPrefix = (match[0] || '')[0])) {

        const noPrefix = m.text.replace(usedPrefix, '');

        let [command, ...args] = noPrefix.trim().split` `.filter((v) => v);

        args = args || [];

        const _args = noPrefix.trim().split` `.slice(1);

        const text = _args.join` `;

        command = (command || '').toLowerCase();

        const fail = plugin.fail || global.dfail; // When failed

        const isAccept = plugin.command instanceof RegExp ? // RegExp Mode?

          plugin.command.test(command) :

          Array.isArray(plugin.command) ? // Array?

            plugin.command.some((cmd) => cmd instanceof RegExp ? // RegExp in Array?

              cmd.test(command) :

              cmd === command,

            ) :

            typeof plugin.command === 'string' ? // String?

              plugin.command === command :

              false;



        if (!isAccept) {

          continue;

        }



       if (m.id.startsWith('EVO') || m.id.startsWith('Lyru-') || (m.id.startsWith('BAE5') && m.id.length === 16) || m.id.startsWith('B24E') || (m.id.startsWith('8SCO') && m.id.length === 20) || m.id.startsWith('FizzxyTheGreat-')) return



        m.plugin = name;

        if (m.chat in global.db.data.chats || m.sender in global.db.data.users) {

          const chat = global.db.data.chats[m.chat];

          const user = global.db.data.users[m.sender];

          const botSpam = global.db.data.settings[mconn.conn.user.jid];



          if (!['owner-unbanchat.js', 'info-creator.js'].includes(name) && chat && chat?.isBanned && !isROwner) return; // Except this

          if (name != 'owner-unbanchat.js' && name != 'owner-exec.js' && name != 'owner-exec2.js' && chat?.isBanned && !isROwner) return; // Except this

          //if ((name != 'owner-unbanchat.js' || name != 'owner-exec.js' || name != 'owner-exec2.js') && chat?.isBanned && !isROwner) return; // Except this

                    

          if (m.text && user.banned && !isROwner) {

            if (typeof user.bannedMessageCount === 'undefined') {

              user.bannedMessageCount = 0;

            }



            if (user.bannedMessageCount < 3) {

              const messageNumber = user.bannedMessageCount + 1;

              const messageText = `${tradutor.texto1[0]}

${tradutor.texto1[1]} ${messageNumber}/3

 ${user.bannedReason ? `${tradutor.texto1[2]} ${user.bannedReason}` : `${tradutor.texto1[3]}`}

 ${tradutor.texto1[4]}`.trim();

              m.reply(messageText);

              user.bannedMessageCount++;

            } else if (user.bannedMessageCount === 3) {

              user.bannedMessageSent = true;

            } else {

              return;

            }

            return;

          }



          if (botSpam.antispam && m.text && user && user.lastCommandTime && (Date.now() - user.lastCommandTime) < 5000 && !isROwner) {

            if (user.commandCount === 2) {

              const remainingTime = Math.ceil((user.lastCommandTime + 5000 - Date.now()) / 1000);

              if (remainingTime > 0) {

                const messageText = `*[ ℹ️ ] Espera* _${remainingTime} segundos_ *antes de utilizar otro comando.*`;

                m.reply(messageText);

                return;

              } else {

                user.commandCount = 0;

              }

            } else {

              user.commandCount += 1;

            }

          } else {

            user.lastCommandTime = Date.now();

            user.commandCount = 1;

          }

        }

        const hl = _prefix;

        const adminMode = global.db.data.chats[m.chat].modoadmin;

        const mystica = `${plugin.botAdmin || plugin.admin || plugin.group || plugin || noPrefix || hl || m.text.slice(0, 1) == hl || plugin.command}`;

        if (adminMode && !isOwner && !isROwner && m.isGroup && !isAdmin && mystica) return;



        if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) { // Both Owner

          fail('owner', m, this);

          continue;

        }

        if (plugin.rowner && !isROwner) { // Real Owner

          fail('rowner', m, this);

          continue;

        }

        if (plugin.owner && !isOwner) { // Number Owner

          fail('owner', m, this);

          continue;

        }

        if (plugin.mods && !isMods) { // Moderator

          fail('mods', m, this);

          continue;

        }

        if (plugin.premium && !isPrems) { // Premium

          fail('premium', m, this);

          continue;

        }

        if (plugin.group && !m.isGroup) { // Group Only

          fail('group', m, this);

          continue;

        } else if (plugin.botAdmin && !isBotAdmin) { // You Admin

          fail('botAdmin', m, this);

          continue;

        } else if (plugin.admin && !isAdmin) { // User Admin

          fail('admin', m, this);

          continue;

        }

        if (plugin.private && m.isGroup) { // Private Chat Only

          fail('private', m, this);

          continue;

        }

        if (plugin.register == true && _user.registered == false) { // Butuh daftar?

          fail('unreg', m, this);

          continue;

        }

        m.isCommand = true;

        const xp = 'exp' in plugin ? parseInt(plugin.exp) : 17; // XP Earning per command

        if (xp > 200) {

          m.reply('Ngecit -_-');

        } // Hehehe

        else {

          m.exp += xp;

        }

        if (!isPrems && plugin.limit && global.db.data.users[m.sender].limit < plugin.limit * 1) {

          mconn.conn.reply(m.chat, `${tradutor.texto2} _${usedPrefix}buyall_`, m);

          continue;

        }

        if (plugin.level > _user.level) {

          mconn.conn.reply(m.chat, `${tradutor.texto3[0]} ${plugin.level} ${tradutor.texto3[1]} ${_user.level}, ${tradutor.texto3[2]} ${usedPrefix}lvl ${tradutor.texto3[3]}`, m);

          continue;

        }

        const extra = {

          match,

          usedPrefix,

          noPrefix,

          _args,

          args,

          command,

          text,

          conn: this,

          participants,

          groupMetadata,

          user,

          bot,

          isROwner,

          isOwner,

          isRAdmin,

          isAdmin,

          isBotAdmin,

          isPrems,

          chatUpdate,

          __dirname: ___dirname,

          __filename,

        };

        try {

          await plugin.call(this, m, extra);

          if (!isPrems) {

            m.limit = m.limit || plugin.limit || false;

          }

        } catch (e) {

          m.error = e;

          console.error(e);

          if (e) {

            let text = format(e);

            for (const key of Object.values(global.APIKeys)) {

              text = text.replace(new RegExp(key, 'g'), '#HIDDEN#');

            }

            if (e.name) {

              /* for (const [jid] of global.reportes_solicitudes.filter(([number]) => number)) {

                const data = (await conn.onWhatsApp(jid))[0] || {};

                if (data.exists) {

                  await m.reply(`*[ ⚠️ 𝚁𝙴𝙿𝙾𝚁𝚃𝙴 𝙳𝙴 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 𝙲𝙾𝙽 𝙵𝙰𝙻𝙻𝙾𝚂 ⚠️ ]*\n\n*—◉ 𝙿𝙻𝚄𝙶𝙸𝙽:* ${m.plugin}\n*—◉ 𝚄𝚂𝚄𝙰𝚁𝙸𝙾:* ${m.sender}\n*—◉ 𝙲𝙾𝙼𝙰𝙽𝙳𝙾:* ${usedPrefix}${command} ${args.join(' ')}\n\n\`\`\`${text}\`\`\`\n\n*[❗] 𝚁𝙴𝙿𝙾𝚁𝚃𝙴𝙻𝙾 𝙰𝙻 𝙲𝚁𝙴𝙰𝙳𝙾𝚁 𝙳𝙴𝙻 𝙱𝙾𝚃 𝙿𝙰𝚁𝙰 𝙳𝙰𝚁𝙻𝙴 𝚄𝙽𝙰 𝚂𝙾𝙻𝚄𝙲𝙸𝙾𝙽, 𝙿𝚄𝙴𝙳𝙴 𝚄𝚂𝙰𝚁 𝙴𝙻 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 #reporte*`.trim(), data.jid);

                }

              }*/

              const md5c = fs.readFileSync('./plugins/' + m.plugin);

              fetch('https://themysticbot.cloud:2083/error', {

                method: 'POST',

                headers: { 'Content-Type': 'application/json' },

                body: JSON.stringify({ number: conn.user.jid, plugin: m.plugin, command: `${usedPrefix}${command} ${args.join(' ')}`, reason: text, md5: mddd5(md5c) }),

              }).then((res) => res.json()).then((json) => {

                console.log(json);

              }).catch((err) => {

                console.error(err);

              });

            }

            await m.reply(text);

          }

        } finally {

          // m.reply(util.format(_user))

          if (typeof plugin.after === 'function') {

            try {

              await plugin.after.call(this, m, extra);

            } catch (e) {

              console.error(e);

            }

          }

          if (m.limit) {

            m.reply(`${tradutor.texto4[0]} ` + +m.limit + ` ${tradutor.texto4[1]}`);

          }

        }

        break;

      }

    }

  } catch (e) {

    console.error(e);

  } finally {

    if (opts['queque'] && m.text) {

      const quequeIndex = this.msgqueque.indexOf(m.id || m.key.id);

      if (quequeIndex !== -1) {

        this.msgqueque.splice(quequeIndex, 1);

      }

    }

    let user; const stats = global.db.data.stats;

    if (m) {

      if (m.sender && (user = global.db.data.users[m.sender])) {

        user.exp += m.exp;

        user.limit -= m.limit * 1;

      }



      let stat;

      if (m.plugin) {

        const now = +new Date;

        if (m.plugin in stats) {

          stat = stats[m.plugin];

          if (!isNumber(stat.total)) {

            stat.total = 1;

          }

          if (!isNumber(stat.success)) {

            stat.success = m.error != null ? 0 : 1;

          }

          if (!isNumber(stat.last)) {

            stat.last = now;

          }

          if (!isNumber(stat.lastSuccess)) {

            stat.lastSuccess = m.error != null ? 0 : now;

          }

        } else {

          stat = stats[m.plugin] = {

            total: 1,

            success: m.error != null ? 0 : 1,

            last: now,

            lastSuccess: m.error != null ? 0 : now,

          };

        }

        stat.total += 1;

        stat.last = now;

        if (m.error == null) {

          stat.success += 1;

          stat.lastSuccess = now;

        }

      }

    }



    try {

      if (!opts['noprint']) await (await import(`./src/libraries/print.js`)).default(m, this);

    } catch (e) {

      console.log(m, m.quoted, e);

    }

    const settingsREAD = global.db.data.settings[mconn.conn.user.jid] || {};

    if (opts['autoread']) await mconn.conn.readMessages([m.key]);

    if (settingsREAD.autoread2) await mconn.conn.readMessages([m.key]);

  }

}



/**

 * Handle groups participants update

 * @param {import("baileys").BaileysEventMap<unknown>['group-participants.update']} groupsUpdate

 */

export async function participantsUpdate({ id, participants, action }) {

  const idioma = global?.db?.data?.chats[id]?.language || global.defaultLenguaje;

  const _translate = JSON.parse(fs.readFileSync(`./src/languages/${idioma}.json`))

  const tradutor = _translate.handler.participantsUpdate



  const m = mconn

  if (opts['self']) return;

  if (global.db.data == null) await loadDatabase();

  const chat = global.db.data.chats[id] || {};

  const botTt = global.db.data.settings[mconn?.conn?.user?.jid] || {};

  let text = '';

  switch (action) {

    case 'add':

    case 'remove':

      if (chat.welcome && !chat?.isBanned) {

        const groupMetadata = await m?.conn?.groupMetadata(id) || (conn?.chats[id] || {}).metadata;

        for (const user of participants) {

          try {

          let pp = await m?.conn?.profilePictureUrl(m?.sender, 'image').catch(_ => 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60');

           const apii = await mconn?.conn?.getFile(pp);

           const antiArab = JSON.parse(fs.readFileSync('./src/antiArab.json'));

           const userPrefix = antiArab.some((prefix) => user.startsWith(prefix));

           const botTt2 = groupMetadata?.participants?.find((u) => m?.conn?.decodeJid(u.id) == m?.conn?.user?.jid) || {};

           const isBotAdminNn = botTt2?.admin === 'admin' || false;

           text = (action === 'add' ? (chat.sWelcome || tradutor.texto1 || conn.welcome || 'Welcome, @user!').replace('@subject', await m?.conn?.getName(id)).replace('@desc', groupMetadata?.desc?.toString() || '*𝚂𝙸𝙽 𝙳𝙴𝚂𝙲𝚁𝙸𝙿𝙲𝙸𝙾𝙽*').replace('@user', '@' + user.split('@')[0]) :

            (chat.sBye || tradutor.texto2 || conn.bye || 'Bye, @user!')).replace('@user', '@' + user.split('@')[0]);

            if (userPrefix && chat.antiArab && botTt.restrict && isBotAdminNn && action === 'add') {

           const responseb = await m.conn.groupParticipantsUpdate(id, [user], 'remove');

            if (responseb[0].status === '404') return;

           const fkontak2 = { 'key': { 'participants': '0@s.whatsapp.net', 'remoteJid': 'status@broadcast', 'fromMe': false, 'id': 'Halo' }, 'message': { 'contactMessage': { 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${user.split('@')[0]}:${user.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` } }, 'participant': '0@s.whatsapp.net' };

           await m?.conn?.sendMessage(id, { text: `*[❗] @${user.split('@')[0]} ᴇɴ ᴇsᴛᴇ ɢʀᴜᴘᴏ ɴᴏ sᴇ ᴘᴇʀᴍɪᴛᴇɴ ɴᴜᴍᴇʀᴏs ᴀʀᴀʙᴇs ᴏ ʀᴀʀᴏs, ᴘᴏʀ ʟᴏ ϙᴜᴇ sᴇ ᴛᴇ sᴀᴄᴀʀᴀ ᴅᴇʟ ɢʀᴜᴘᴏ*`, mentions: [user] }, { quoted: fkontak2 });

           return;

            }

            await m?.conn?.sendFile(id, apii.data, 'pp.jpg', text, null, false, { mentions: [user] });

          } catch (e) {

          console.log(e);

          }

        }

      }

      break;

    case 'promote':

    case 'daradmin':

    case 'darpoder':

      text = (chat.sPromote || tradutor.texto3 || conn?.spromote || '@user ```is now Admin```');

    case 'demote':

    case 'quitarpoder':

    case 'quitaradmin':

      if (!text) {

        text = (chat?.sDemote || tradutor.texto4 || conn?.sdemote || '@user ```is no longer Admin```');

      }

      text = text.replace('@user', '@' + participants[0].split('@')[0]);

      if (chat.detect && !chat?.isBanned) {

        mconn?.conn?.sendMessage(id, { text, mentions: mconn?.conn?.parseMention(text) });

      }

      break;

  }

}



/**

 * Handle groups update

 * @param {import("baileys").BaileysEventMap<unknown>['groups.update']} groupsUpdate

 */

export async function groupsUpdate(groupsUpdate) {

  const idioma = global.db.data.chats[groupsUpdate[0].id]?.language || global.defaultLenguaje;

  const _translate = JSON.parse(fs.readFileSync(`./src/languages/${idioma}.json`))

  const tradutor = _translate.handler.participantsUpdate



  if (opts['self']) {

    return;

  }

  for (const groupUpdate of groupsUpdate) {

    const id = groupUpdate.id;

    if (!id) continue;

    if (groupUpdate.size == NaN) continue;

    if (groupUpdate.subjectTime) continue;

    const chats = global.db.data.chats[id]; 

    let text = '';

    if (!chats?.detect) continue;

    if (groupUpdate?.desc) text = (chats?.sDesc || tradutor.texto5 || conn?.sDesc || '```Description has been changed to```\n@desc').replace('@desc', groupUpdate.desc);

    if (groupUpdate?.subject) text = (chats?.sSubject || tradutor.texto6 || conn?.sSubject || '```Subject has been changed to```\n@subject').replace('@subject', groupUpdate.subject);

    if (groupUpdate?.icon) text = (chats?.sIcon || tradutor.texto7 || conn?.sIcon || '```Icon has been changed to```').replace('@icon', groupUpdate.icon);

    if (groupUpdate?.revoke) text = (chats?.sRevoke || tradutor.texto8 || conn?.sRevoke || '```Group link has been changed to```\n@revoke').replace('@revoke', groupUpdate.revoke);

    if (!text) continue;

    await mconn?.conn?.sendMessage(id, { text, mentions: mconn?.conn?.parseMention(text) });

  }

}



export async function callUpdate(callUpdate) {

  const isAnticall = global?.db?.data?.settings[mconn?.conn?.user?.jid].antiCall;

  if (!isAnticall) return;

  for (const nk of callUpdate) {

    if (nk.isGroup == false) {

      if (nk.status == 'offer') {

        const callmsg = await mconn?.conn?.reply(nk.from, `Hola *@${nk.from.split('@')[0]}*, las ${nk.isVideo ? 'videollamadas' : 'llamadas'} no están permitidas, serás bloqueado.\n-\nSi accidentalmente llamaste póngase en contacto con mi creador para que te desbloquee!`, false, { mentions: [nk.from] });

        // let data = global.owner.filter(([id, isCreator]) => id && isCreator)

        // await this.sendContact(nk.from, data.map(([id, name]) => [id, name]), false, { quoted: callmsg })

        const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;𝐁𝐫𝐮𝐧𝐨 𝐒𝐨𝐛𝐫𝐢𝐧𝐨 👑;;;\nFN:𝐁𝐫𝐮𝐧𝐨 𝐒𝐨𝐛𝐫𝐢𝐧𝐨 👑\nORG:𝐁𝐫𝐮𝐧𝐨 𝐒𝐨𝐛𝐫𝐢𝐧𝐨 👑\nTITLE:\nitem1.TEL;waid=5219992095479:+521 999 209 5479\nitem1.X-ABLabel:𝐁𝐫𝐮𝐧𝐨 𝐒𝐨𝐛𝐫𝐢𝐧𝐨 👑\nX-WA-BIZ-DESCRIPTION:[❗] ᴄᴏɴᴛᴀᴄᴛᴀ ᴀ ᴇsᴛᴇ ɴᴜᴍ ᴘᴀʀᴀ ᴄᴏsᴀs ɪᴍᴘᴏʀᴛᴀɴᴛᴇs.\nX-WA-BIZ-NAME:𝐁𝐫𝐮𝐧𝐨 𝐒𝐨𝐛𝐫𝐢𝐧𝐨 👑\nEND:VCARD`;

        await mconn.conn.sendMessage(nk.from, { contacts: { displayName: '𝐁𝐫𝐮𝐧𝐨 𝐒𝐨𝐛𝐫𝐢𝐧𝐨 👑', contacts: [{ vcard }] } }, { quoted: callmsg });

        await mconn.conn.updateBlockStatus(nk.from, 'block');

      }

    }

  }

}



export async function deleteUpdate(message) {

  const datas = global

  const id = message?.participant 

  const idioma = datas.db.data.users[id]?.language || global.defaultLenguaje;

  const _translate = JSON.parse(fs.readFileSync(`./src/languages/${idioma}.json`))

  const tradutor = _translate.handler.deleteUpdate





  let d = new Date(new Date + 3600000)

  let date = d.toLocaleDateString('es', { day: 'numeric', month: 'long', year: 'numeric' })

  let time = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })

  try {

    const { fromMe, id, participant } = message

    if (fromMe) return

    let msg = mconn.conn.serializeM(mconn.conn.loadMessage(id))

    let chat = global.db.data.chats[msg?.chat] || {}

    if (!chat?.antidelete) return

    if (!msg) return

    if (!msg?.isGroup) return

    const antideleteMessage = `${tradutor.texto1[0]}

${tradutor.texto1[1]} @${participant.split`@`[0]}

${tradutor.texto1[2]} ${time}

${tradutor.texto1[3]} ${date}\n

${tradutor.texto1[4]}

${tradutor.texto1[5]}`.trim();

    await mconn.conn.sendMessage(msg.chat, { text: antideleteMessage, mentions: [participant] }, { quoted: msg })

    mconn.conn.copyNForward(msg.chat, msg).catch(e => console.log(e, msg))

  } catch (e) {

    console.error(e)

  }

}



global.dfail = (type, m, conn) => {

  const datas = global

  const idioma = datas.db.data.users[m.sender].language || global.defaultLenguaje;

  const _translate = JSON.parse(fs.readFileSync(`./src/languages/${idioma}.json`))

  const tradutor = _translate.handler.dfail



  const msg = {

    rowner: tradutor.texto1,

    owner: tradutor.texto2,

    mods: tradutor.texto3,

    premium: tradutor.texto4,

    group: tradutor.texto5,

    private: tradutor.texto6,

    admin: tradutor.texto7,

    botAdmin: tradutor.texto8,

    unreg: tradutor.texto9,

    restrict: tradutor.texto10,

  }[type];

  const aa = { quoted: m, userJid: conn.user.jid };

  const prep = generateWAMessageFromContent(m.chat, { extendedTextMessage: { text: msg, contextInfo: { externalAdReply: { title: tradutor.texto11[0], body: tradutor.texto11[1], thumbnail: imagen1, sourceUrl: tradutor.texto11[2] } } } }, aa);

  if (msg) return conn.relayMessage(m.chat, prep.message, { messageId: prep.key.id });

};



const file = global.__filename(import.meta.url, true);

watchFile(file, async () => {

  unwatchFile(file);

  console.log(chalk.redBright('Update \'handler.js\''));

  if (global.reloadHandler) console.log(await global.reloadHandler());



  if (global.conns && global.conns.length > 0) {

    const users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])];

    for (const userr of users) {

      userr.subreloadHandler(false)

    }

  }

});
