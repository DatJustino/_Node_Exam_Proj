import { connectToDatabase } from "./connection.js";
import { welcomeEmailTemplate } from "../utils/emailTemplate.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

const saltRounds = 15;

export async function registerUser(email, password) {
	if (!email || !password) {
		throw new Error("Missing required parameters: email or password");
	}
	if (typeof email !== "string" || typeof password !== "string") {
		throw new Error(
			"Invalid parameter types: email and password must be strings"
		);
	}
	if (password.length < 8) {
		throw new Error("Password must be at least 8 characters");
	}
	if (!email.includes("@")) {
		throw new Error("Email must be valid");
	}

	const db = await connectToDatabase();

	try {
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		db.query(
			"INSERT INTO users (email, password) VALUES (?, ?)",
			[email, hashedPassword],
			(err, results) => {
				if (err) {
					console.error("Database error during user registration:", err);
					return res.status(500).send("Server error");
				}
				res.status(201).send("User created");
			}
		);
	} catch (hashError) {
		console.error("Error hashing password:", hashError);
		res.status(500).send("Error hashing password");
	} finally {
		db.end();
	}
}

export async function loginUser(email, password, req) {
	const db = await connectToDatabase();
	try {
		const [results] = await db.query(
			`
          SELECT * FROM users WHERE email = ?`,
			[email]
		);
		if (results.length === 0) {
			throw new Error("Invalid credentials");
		}
		const user = results[0];
		const hashedPassword = user.password;

		if (!(await bcrypt.compare(password, hashedPassword))) {
			throw new Error("Invalid credentials");
		}

		const userWithoutPassword = {
			email: user.email,
			dietaryPreference: user.dietary_preference,
			profilePictureUrl: user.profile_picture_url,
			wantsNewsletter: user.wants_newsletter,
			userName: user.user_name,
		};
		req.session.user = { email: user.email, profile: userWithoutPassword };
		console.log("Fetched user from database:", user);

		return new Promise((resolve, reject) => {
			req.session.save((err) => {
				if (err) {
					console.error("Error saving session:", err);
					reject(err);
				} else {
					resolve({ email: user.email, profile: userWithoutPassword });
				}
			});
		});
	} catch (err) {
		console.error("Error during login:", err);
		throw err;
	} finally {
		db.end();
	}
}

export async function updateUserProfile(userEmail, profileData, req) {
	const { dietaryPreference, profilePictureUrl, wantsNewsletter, userName } =
		profileData;
	const db = await connectToDatabase();

	if (dietaryPreference && typeof dietaryPreference !== "string") {
		throw new Error("dietaryPreference must be a string");
	}
	if (profilePictureUrl && typeof profilePictureUrl !== "string") {
		throw new Error("profilePictureUrl must be a string");
	}

	try {
		await db.query(
			"UPDATE users SET dietary_preference = ?, profile_picture_url = ?, wants_newsletter = ?, user_name = ? WHERE email = ?",
			[
				dietaryPreference,
				profilePictureUrl,
				wantsNewsletter,
				userName,
				userEmail,
			]
		);

		req.session.user = {
			email: userEmail,
			dietaryPreference,
			profilePictureUrl,
			wantsNewsletter,
			userName,
		};
		return {
			email: userEmail,
			dietaryPreference,
			profilePictureUrl,
			wantsNewsletter,
			userName,
		};
	} catch (err) {
		console.error("Database error during profile update:", err);
		throw err; // Rethrow to be handled by the caller
	} finally {
		db.end();
	}
}

const transporter = nodemailer.createTransport({
	host: "smtp.simply.com",
	port: 587,
	secure: false,
	auth: {
		user: "ian.j@justino.dk",
		pass: process.env.MAIL_PASSWORD,
	},
	tls: {
		rejectUnauthorized: false,
	},
});

export async function sendWelcomeEmail(userEmail, userName) {
	const emailHtmlContent = welcomeEmailTemplate(userName);

	await transporter.sendMail({
		from: "ian.j@justino.dk",
		to: userEmail,
		subject: "Welcome to the Fitness Team newsletter!",
		html: emailHtmlContent,
	});
}
