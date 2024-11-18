const express = require('express')
const session = require('express-session')
const db = require('./config/dbConfig')
const MySqlStore = require('express-mysql-session')(session)
const dotenv = require('dotenv')
const path = require('path')
dotenv.config()
const authRoutes = require('./routes/authRoutes')

const app = express()

const storeOptions = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
};

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MySqlStore(storeOptions, db),
    cookie: {
        maxAge: 1000 * 60 * 60 ,
        secure: false
    }
}))

const clientPath = path.join(__dirname, '../client')

app.use(express.static(clientPath))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.use('/auth', authRoutes)

const port = process.env.PORT

app.listen(port, (err, res) =>{
    console.log(`Server Running on http://localhost:${port}/`)
    
})