const { server, port } = require('./src/server')
const db = require('./src/lib/db')

db.connect()
  .then(() => {
    console.log('Base de datos conectada')
    server.listen(port, () => {
      console.log('servidor corriedo en el puerto: ', port)
    })
  })
  .catch(error => {
    console.error('error: ', error)
  })
