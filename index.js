const { port } = require('./utils/config')
const app = require('./app')

app.listen(port, 'localhost', () => {
    console.log(`Server running on port ${port}`)
})
