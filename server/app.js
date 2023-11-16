import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import session from 'express-session';
import rateLimit from 'express-rate-limit';
import bodyParser from 'body-parser';
import path from 'path';
import "dotenv/config";	
const app = express();
const PORT = process.env.PORT || 8080;
import authRouter from './routes/auth.js';

app.use(express.static(path.resolve("../client/vite-project/dist")));
app.use(express.json()); 

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
  }));
app.use(helmet());

// use sessions from .env file, set cookie to secure = true, if code is in production -> (if using https)
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));


app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error during logout:', err);
            return res.status(500).send('Logout error');
        }
        console.log('Logged out successfully');
        res.send('Logged out');
    });
});

function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }
    res.status(401).send('Not authorized');
}

authRouter(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  