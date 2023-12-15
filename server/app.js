import express from "express";
import helmet from "helmet";
import cors from "cors";
import session from "express-session";
import rateLimit from "express-rate-limit";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import "dotenv/config";
import authRouter from "./routes/auth.js";
import http from "http";
import { Server } from "socket.io";
import TicTacToeGame from './utils/ticTacToeGame.js';
const app = express();
const PORT = process.env.PORT || 8080;
const server = http.createServer(app);
const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
});
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["*"]
    }
});
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
let sessionId = 100;
const gameSessions = new Map();

io.use(wrap(sessionMiddleware));
app.use(helmet());
app.use(sessionMiddleware);
app.use(express.static(path.resolve("../client/vite-project/dist")));
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	}));

authRouter(app);

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  let game;

  socket.on('startNewGame', () => {
    const sessionId = generateRandomSessionId();
    const newGame = new TicTacToeGame();
    gameSessions.set(sessionId, newGame);

    socket.emit('gameUpdate', {
      board: newGame.getBoard(),
      turn: newGame.currentTurn,
      winner: null,
      draw: false,
      sessionId: sessionId  });
  });

  socket.on('joinGame', (sessionId) => {
    if (gameSessions.has(sessionId)) {
      game = gameSessions.get(sessionId);
    } else {
      game = new TicTacToeGame();
      gameSessions.set(sessionId, game);
    }
  });

  socket.on('makeMove', (position) => {
    game.makeMove(position);
    const winner = game.checkForWin();
    const draw = game.isDraw();

    const update = {
      board: game.getBoard(),
      turn: game.currentTurn,
      winner: winner,
      draw: draw
    };

    io.emit('gameUpdate', update);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});


function generateRandomSessionId() {
  return sessionId++; 
}
app.post('/workouts', (req, res) => {
	const sessionId = generateRandomSessionId();
    const game = new TicTacToeGame();
    gameSessions.set(sessionId, game);

    res.json({ sessionId, board: game.getBoard() });
});


app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
