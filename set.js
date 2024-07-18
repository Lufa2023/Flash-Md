const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0NRSnp6YWs5cTRQR1VUR3dXQWw1b2pJbFRvZjZyU1FLYVBDL2lwa3FWYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieTdIcmpWNFcwcjZZSk5Qei9zOHAzbXA4MjMzRjA1c3VZVnp2WGNmb1NUaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvUDVXazRLRms5QUlkQnVONldLb2gxM2JpejBDd0tkcE5HQlFsdnpEdzJBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtanBBbGhhZHQ0SU80Wm95ampwdlRoMWNEN3FuQ0l5WDJqOFRrZkNiSXc4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1Nb2JRZDZGaHpHekp6d0hvbEZzREx6anllREhSbE0yNzdSaTZkQTJrRTg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhzaW5OeFl4MEFtaVkzY2JHRGYrOWRYajJxRldVSXFYQlIrNjdWQkJwMHc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUpOd2tpeU5JRGVCM1ozQkRvUWhmZUhmL3dJeEF0M3lRd3U5eGplQW1XUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidENkbGVzQVNrb0crSW9Da29Tb3M0TndVenltR1VHbnlUWUJTa1hKSy8xaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImE1cEpLNnNndVdLZTUvN3lQVWgwUFQxQ2YxUzh6d3JxaUhTaEowYm04T254VFBWckhVV2RDTzl4bzdmK0RDeXZ2aDNUTTBMSXlDZ0lKSFVnMHFFN2l3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjI5LCJhZHZTZWNyZXRLZXkiOiJMK2NJanFwWjNpeGM4M0lUMmVCQUFSYTR4M3VQVVBFMUZSZmh0Um43NHVnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJFV2FGQWJENVI0YUxZcGtUcFZXWGRRIiwicGhvbmVJZCI6IjA2ZWM3MTVkLWY3NWMtNDQ4ZC1iNGRiLTc0NmQ5ZDBkMTJiNCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQZVBUc3JWM2hEaEZrUlppNSs4TFl0NVJybmM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0NuZ1NOVWJDRHdPTGhHendFNzFGT2RpekpvPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjRYU1dFSFc5IiwibWUiOnsiaWQiOiI5NDc3NTY4ODU5Nzo0M0BzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS3VQdHVFQ0VMelU0N1FHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiTzN3Z2pEZGxDNFhTRTNUYTk2SFZpNUdRSkNOWW1SM2gzd25uUGJmcld4TT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiZHVML3U1LytQRkVIcy9PdjFyVGtXRnd4dGNMbDdMYkZuWGx4UGo5Q3FZa2FMMG9CbjJoYW9BamszSTlUOGlnWFJxa1BFcDBVaWFCT0REUWIzM0xDQ1E9PSIsImRldmljZVNpZ25hdHVyZSI6IkFSTlR2c3piWjhjMkVVbDYwQ0Yxb3kzYmw4Nmxpdm9PTzZlM1pvcFI3MTAyOVpTa3hNMTdUZU5GQjRHcjY2bitIcW1OQTlEYmM4V3VrQ3hFemxUYWd3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTQ3NzU2ODg1OTc6NDNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVHQ4SUl3M1pRdUYwaE4wMnZlaDFZdVJrQ1FqV0prZDRkOEo1ejIzNjFzVCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMTI5NzQ4MH0=',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "Lufa Sensei",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "94775688597", 
             
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "off",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://graph.org/file/74b5e34027ca3dc138748.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePathpostgresql://youngzeus_user:DMK6kdUKlvnr7ydRG6a9NSM37aqKvmmF@dpg-cqbr16eehbks73dtrj90-a.oregon-postgres.render.com/youngzeuspostgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
