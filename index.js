const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
// const cookieParser = require("cookie-parser");
// const sessions = require('express-session');
const wasteRoute = require('./routes/waste');
const authRoute = require('./routes/auth');



// Initiallization
const app = express();
dotenv.config();
app.use(express.json());

// Settings
const port = process.env.PORT || 4000;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Mongodb connected");
    })
    .catch((err) => console.log(err));
    
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));     // Aceptar datos de formulario sencillo
app.use(cors());
app.use(morgan("common"));

app.use(cors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// app.use(cookieParser());
// app.use(sessions({
//     secret: "thisismysecrctekey",
//     saveUninitialized: true,
//     cookie: { maxAge: 1000 * 60 * 60 * 24 },
//     resave: false
// }));

// Routes
app.use("/api/waste", wasteRoute);
app.use("/api/auth", authRoute);

// Serve frontend (PRODUCTION)
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, './client/build')))

//     app.use('*', (req, res) => {
//         res.sendFile(
//             path.resolve(__dirname, './', 'client', 'build', 'index.html')
//         )
//     })
// } else {
//     app.get('/', (req, res) => {
//         res.send('Please set to production')
//     })
// };

// Server start
// const http = require('http'); 
// const server = http.createServer(app); server.listen(port);
app.listen(port, () => {
    console.log(`Backend server is running on port ${port}`);
});