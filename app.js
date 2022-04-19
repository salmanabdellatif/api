const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.end('hello server')
})

app.listen(3000, () => {
  console.log('server listening on port 3000...')
})
