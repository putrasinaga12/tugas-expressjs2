require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models')

const router = require('./routes/router');
const userRouter = require('./routes/user.router');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: true, credentials: true }));

sequelize.authenticate().then(function() {
    console.log('Database Berhasil Connect')
}).catch(function(err) {
    console.log('Database Gagal Connect', err)
})

app.use('/', router);
app.use('/', userRouter);

app.listen(process.env.SERVER_PORT, () => {console.log('Server Running')});
