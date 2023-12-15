import {
	registerUser,
	loginUser,
	updateUserProfile,
	sendWelcomeEmail,
} from "../database/users.js";

export default function authRouter(app) {
	app.post("/register", async (req, res) => {
		const { email, password } = req.body;

		try {
			await registerUser(email, password);
			res.status(201).send("User created");
		} catch (err) {
			res.status(400).send(err.message);
		}
	});

	app.post("/login", async (req, res) => {
		const { email, password } = req.body;

		try {
			const user = await loginUser(email, password, req);
			res.json({ message: "Login successful", user: user.profile });
		} catch (err) {
			if (err.message === "Invalid credentials") {
				res.status(401).send("Invalid email or password");
			} else {
				console.error("Error during login:", err);
				res.status(500).send("Internal server error");
			}
		}
	});

	app.patch("/updateProfile", isAuthenticated, async (req, res) => {
		const { dietaryPreference, profilePictureUrl, wantsNewsletter, userName } =
			req.body;
		const userEmail = req.session.user.email;

		try {
			const updatedProfile = await updateUserProfile(
				userEmail,
				{ dietaryPreference, profilePictureUrl, wantsNewsletter, userName },
				req
			);
			req.session.user = {
				...req.session.user,
				dietaryPreference: updatedProfile.dietaryPreference,
				profilePictureUrl: updatedProfile.profilePictureUrl,
				wantsNewsletter: updatedProfile.wantsNewsletter,
				userName: updatedProfile.userName,
			};
			req.session.save((err) => {
				if (err) {
					console.error("Error saving session:", err);
					res.status(500).send("Session update error");
				} else {
					res.json({
						message: "Profile updated successfully",
						user: req.session.user,
					});
				}
			});
		} catch (error) {
			console.error("Error updating profile:", error);
			res.status(500).send("Failed to update profile");
		}
	});

	app.post("/logout", (req, res) => {
		req.session.destroy((err) => {
			if (err) {
				console.error("Error during logout:", err);
				return res.status(500).send("Logout error");
			}
			res.clearCookie("sid");
			res.send("Logged out");
		});
	});

	app.post("/sendEmail", isAuthenticated, async (req, res) => {
		console.log("Attempting to send email...");

		// Log the current session user details
		console.log("Session user data:", req.session.user);

		try {
			await sendWelcomeEmail(
				req.session.user.email,
				req.session.user.profile.userName || "User"
			);

			res.send("Email sent successfully");
		} catch (error) {
			console.error("Error sending email:", error);
			res.status(500).send("Failed to send email");
		}
	});

	function isAuthenticated(req, res, next) {
		if (req.session && req.session.user) {
			return next();
		}
		res.status(401).send("Not authorized");
	}
}
