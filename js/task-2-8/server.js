const express = require('express')
const app = express()

app.use(express.static('public'))

const port = 4321
app.listen(port, () => {
  console.log(`Simple server listening on port ${port}`)
})
