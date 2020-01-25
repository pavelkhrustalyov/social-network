const express = require('express');
const dotenv = require('dotenv');
const errorHandler = require('./middlewares/error');
const path = require('path');
const cors = require('cors');
dotenv.config({ path: './config/config.env' });
const db = require('./db/db-connect');
// require routes
const compression = require('compression');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const followRoutes = require('./routes/followRoutes');
const dialogRoutes = require('./routes/dialogRoutes');
const commentRoutes = require('./routes/commentRoutes');
const feedRoutes = require('./routes/feedRoutes');

const morgan = require('morgan');

const app = express();
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
db();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/api/auth', authRoutes);

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/follow', followRoutes);
app.use('/api/dialogs/', dialogRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/feed', feedRoutes);

app.use(errorHandler);
app.use(compression());


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


const PORT = process.env.PORT || 5000;
const server = app.listen(PORT);

global.io = require('socket.io')(server);

io.on('connection', function(socket) {
    socket.on('DIALOGS:JOIN', (dialogId) => {
      socket.join(dialogId);
    });
});

process.on('uncaughtException', function (err) {
    console.log(err);
}); 
