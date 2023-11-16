import { connectToDatabase } from './connection.js';
import bcrypt from 'bcrypt';

export async function registerUser(email, password) {
    
    if (!email || !password) {
        throw new Error("Missing required parameters: email or password");
      }

  const db = await connectToDatabase();

     // Hash password and store the new user
     try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err, results) => {
            if (err) {
                console.error('Database error during user registration:', err);
                return res.status(500).send('Server error');
            }
            console.log('User created successfully');
            res.status(201).send('User created');
        });
    } catch (hashError) {
        console.error('Error hashing password:', hashError);
        res.status(500).send('Error hashing password');
    }finally {
        db.end();
    }
}


export async function loginUser(email, password) {
    const db = await connectToDatabase();

    try {
        const [results] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (results.length === 0) {
            console.log('No user found with this email');
            throw new Error('Invalid credentials');
        }

        const user = results[0];
        const hashedPassword = user.password;


        if (!(await bcrypt.compare(password, hashedPassword))) {
            console.log('Password does not match');
            throw new Error('Invalid credentials');
        }

        console.log('Login successful');

        return { email: user.email }; // Return only what's needed
    } catch (err) {
        console.error('Error during login:', err);
        throw err; // rethrow the error to handle it in the calling context
    } finally {
        db.end();
    }
}


//needs more info
export async function updateUserProfile(req, res) {
    const { dietaryPreference, profilePictureUrl } = req.body;
    const userEmail = req.session.user.email; // Assuming you store user's email in session

    if (dietaryPreference && typeof dietaryPreference !== "string") {
        throw new Error("dietaryPreference must be a string");
      }
      if (profilePictureUrl && typeof profilePictureUrl !== "string") {
        throw new Error("profilePictureUrl must be a string");
      }

    db.query('UPDATE users SET dietary_preference = ?, profile_picture_url = ? WHERE email = ?', 
             [  dietaryPreference, 
                profilePictureUrl, 
                userEmail], 
                (err, results) => {
        if (err) {
            console.error('Database error during profile update:', err);
            return res.status(500).send('Server error');
        }
        res.send('Profile updated successfully');
    });
};
