// Leer .env y generar config.js
const fs = require('fs');

const env = Object.fromEntries(
  fs.readFileSync('.env', 'utf8')
    .split('\n')
    .filter(l => l.trim() && !l.startsWith('#'))
    .map(l => l.split('=').map(s => s.trim()))
);

const config = `window.TRS_CONFIG = ${JSON.stringify({
  formspreeUrl: env.FORMSPREE_ID
}, null, 2)};\n`;

fs.writeFileSync('config.js', config);
console.log('config.js generado correctamente.');
