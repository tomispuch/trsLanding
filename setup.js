const fs = require('fs');

// En Vercel: lee de process.env (variables del dashboard)
// En local: lee del archivo .env como fallback
let formspreeUrl = process.env.FORMSPREE_ID;

if (!formspreeUrl) {
  try {
    const env = Object.fromEntries(
      fs.readFileSync('.env', 'utf8')
        .split('\n')
        .filter(l => l.trim() && !l.startsWith('#'))
        .map(l => l.split('=').map(s => s.trim()))
    );
    formspreeUrl = env.FORMSPREE_ID;
  } catch {
    console.error('Error: FORMSPREE_ID no encontrado en el entorno ni en .env');
    process.exit(1);
  }
}

fs.writeFileSync('config.js', `window.TRS_CONFIG = ${JSON.stringify({ formspreeUrl }, null, 2)};\n`);
console.log('config.js generado correctamente.');
