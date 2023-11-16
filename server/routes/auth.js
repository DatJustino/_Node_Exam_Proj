import { registerUser, loginUser } from '../database/users.js';

export default function authRouter(app) {
  app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
      await registerUser(email, password);
      res.status(201).send('User created');
    } catch (err) {
      res.status(400).send(err.message);
    }
  });

  app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await loginUser(email, password);
      req.session.user = user; 
      req.session.save();
      console.log(req.session); // This should show the session object including `user`
      res.send('Login successful');
    } catch (err) {
      res.status(401).send(err.message);
    }
  });
}