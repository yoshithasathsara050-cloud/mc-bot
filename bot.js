const mineflayer = require('mineflayer')
const http = require('http')

// Keep alive
http.createServer((req, res) => res.end('alive')).listen(3000)

function createBot() {
  const bot = mineflayer.createBot({
    host: 'newy.aternos.me',
    port: 29303,
    username: '_jinwu',
    version: '1.20.1'
  })

  bot.on('spawn', () => {
    console.log('✅ Bot online!')

    // Step 1 - Register/Login (2s wait)
    setTimeout(() => {
      bot.chat('/register BotPassword123 BotPassword123')
      console.log('📝 Registering...')
    }, 2000)

    // Step 2 - Login (4s wait)
    setTimeout(() => {
      bot.chat('/login BotPassword123')
      console.log('🔑 Logging in...')
    }, 4000)

    // Step 3 - Survival server යන්න (6s wait)
    setTimeout(() => {
      bot.chat('/survival')
      console.log('🌍 Going to survival...')
    }, 6000)

    // Step 4 - AFK command (10s wait)
    setTimeout(() => {
      bot.chat('/afk')
      console.log('💤 AFK mode on!')
    }, 10000)

    // AFK kick වෙන්නේ නෑ - jump every 30s
    setInterval(() => {
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 500)
    }, 30000)
  })

  // Chat messages log කරන්න
  bot.on('message', (message) => {
    console.log('💬 Chat:', message.toString())
  })

  // Kicked වුණාත් rejoin
  bot.on('kicked', (reason) => {
    console.log('⚠️ Kicked! Reconnecting in 5s...')
    console.log('Reason:', reason)
    setTimeout(createBot, 5000)
  })

  bot.on('error', (err) => {
    console.log('❌ Error:', err)
    setTimeout(createBot, 5000)
  })

  bot.on('end', () => {
    console.log('🔴 Disconnected! Reconnecting in 5s...')
    setTimeout(createBot, 5000)
  })
}

createBot()
