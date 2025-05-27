const mineflayer = require('mineflayer');


const HOST =  'Rezero1r.aternos.me';
const PORT =  '33197';

let i = 0;
function next() {
  if (i < 5) {
    i++;
    setTimeout(() => {
      createBot(`bot${i}`);
      next();
    }, 500); // تقليل الضغط على السيرفر
  }
}
next();

function createBot(name) {
  const bot = mineflayer.createBot({
    host: HOST,
    port: PORT,
    username: name
  });

  bot.on('spawn', () => {
    console.log(`${name} joined the server.`);
  });

  bot.on('end', () => {
    console.log(`${name} disconnected.`);
  });

  bot.on('error', (err) => {
    console.log(`${name} error:`, err.message);
  });
}
