const mineflayer = require('mineflayer');


const HOST =  'Rezero1r.aternos.me';
const PORT =  '33197';

let i = 0;
function next() {
  if (i < 5) {
    i++;
    setTimeout(() => {
      createBot(`bbot${i}`);
      next();
    }, 500);
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

  // يحاول النوم عندما يحل الليل أو أثناء العاصفة
  bot.on('time', () => {
    const time = bot.time.timeOfDay;
    const isNight = time > 13000 && time < 24000;

    if (isNight && !bot.isSleeping) {
      const bed = bot.findBlock({
        matching: block => bot.isABed(block),
        maxDistance: 10
      });

      if (bed) {
        bot.sleep(bed).then(() => {
          
        }).catch(err => {
          
        });
      } else {
        
      }
    }
  });

  bot.on('wake', () => {
    
  });

  // يتحرك بشكل دوري لمنع الطرد من Aternos
  setInterval(() => {
    if (bot.entity && bot.entity.position) {
      const yaw = Math.random() * Math.PI * 2;
      bot.look(yaw, 0, true); // يدور
      bot.setControlState('jump', true); // يقفز
      setTimeout(() => bot.setControlState('jump', false), 300);
    }
  }, 60000); // كل دقيقة

  bot.on('end', () => {
    
  });

  bot.on('error', (err) => {
    
  });
}
