const mineflayer = require('mineflayer')
const http = require('http')

// Keep alive
http.createServer((req, res) => res.end('alive')).listen(3000)

function createBot() {
  const bot = mineflayer.createBot({
    host: 'arts-unashamed.gl.joinmc.link',  // ← Server IP මෙතන දාන්න
    port: 25565,
    username: '_jinwu',
    version: '1.21.8'
  })

  bot.on('spawn', () => {
    console.log('✅ Bot online!')
    setInterval(() => {
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 500)
    }, 30000)
  })

  // Kicked වුණාත් rejoin
  bot.on('kicked', () => {
    console.log('Kicked! Reconnecting...')
    setTimeout(createBot, 5000)
  })

  bot.on('error', () => {
    setTimeout(createBot, 5000)
  })
}

createBot()
