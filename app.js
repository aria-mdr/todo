const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { engine } = require('express-handlebars')
const todoRoutes = require('./todo_module/route')
const userRoutes = require('./user_module/route')
const { getConnection } = require('./db/db')
const app = express();
const port = 8484;

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')


app.use(express.static(path.join(__dirname, 'client/public')))
app.use(bodyParser.json())
app.use(cookieParser())

todoRoutes(app);
userRoutes(app);

const startServer = async () => {
    await getConnection()
    app.listen(port, async() => {
        console.log(`Server listening on port ${port}`);
    })
}

startServer();

