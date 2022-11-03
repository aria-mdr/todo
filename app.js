const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const todoRoutes = require('./todo_module/route')
const { getConnection } = require('./db/db')
const app = express();
const port = 8484;


app.use(express.static(path.join(__dirname, 'client/public')))
app.use(bodyParser.json())

todoRoutes(app);

const startServer = async () => {
    await getConnection()
    app.listen(port, async() => {
        console.log(`Server listening on port ${port}`);
    })
}

startServer();

