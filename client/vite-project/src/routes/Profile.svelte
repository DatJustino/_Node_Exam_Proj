<script>
	import { onMount } from "svelte";
	import { user } from "../store/store.js";
	import { navigate } from "svelte-navigator";
	import toast, { Toaster } from "svelte-french-toast";

	let userProfile = {
		dietaryPreference: "",
		profilePictureUrl: "",
		wantsNewsletter: false,
   		userName: "",
	};
	let showToast = false;
	let toastMessage = "";

	function initializeUserProfile() {
		
		if ($user) {
			userProfile = { ...$user };
			console.log("Initialized userProfile with $user data:", userProfile);

		} else {
			userProfile = {
				dietaryPreference: "",
				profilePictureUrl: "",
				wantsNewsletter: false,
        		userName: "",
			};
			console.log("Initialized userProfile with default values:", userProfile);

		}
	}

	onMount(() => {
		user.refreshFromSession();
		const sessionUser = sessionStorage.getItem("user");

		if (sessionUser) {
			const userData = JSON.parse(sessionUser);
			user.set(userData);
			initializeUserProfile();
		} else {
			navigate("/login");
		}
	});

	$: showProfileData = userProfile && Object.keys(userProfile).length > 0;
	$: isVisible = $user !== null;

	async function updateProfile() {
		const changes = getChanges();

		try {
			const response = await fetch("http://localhost:8080/updateProfile", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(userProfile),
				credentials: "include",
			});

			if (!response.ok) {
				console.error("Error response from server:", await response.text());
				throw new Error("Failed to update profile");
			}
			const responseData = await response.json();
			if (responseData.user) {
				const updatedProfileData = responseData.user;

				sessionStorage.setItem("user", JSON.stringify(updatedProfileData));
				user.set(updatedProfileData);
			} else {
				console.error("Updated profile data is missing in the response");
			}

			return { message: "Update successful!", changes };
		} catch (error) {
			throw new Error(error.message || "Could not save.");
		}
	}
	function saveProfile() {
		toast.promise(updateProfile(), {
			loading: "Saving...",
			success: (data) =>
				data.message + ` You've changed the following: ${data.changes}`,
			error: (error) => error.toString(),
		});
	}
	function getChanges() {
		if (!$user) return "";

		const originalUserProfile = JSON.parse(sessionStorage.getItem("user"));

		return Object.entries(userProfile)
			.filter(([key, value]) => value !== originalUserProfile[key])
			.map(([key, value]) => `${key}: ${value}`)
			.join(", ");
	}

	function cancelChanges() {
		initializeUserProfile();
	}

	async function sendEmail() {
		if (!$user || !$user.email) {
			console.error("User is not logged in or email is not available");
			return;
		}

		try {
			const response = await fetch("http://localhost:8080/sendEmail", {
				method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: $user.userName || 'User' }),
				credentials: "include",
			});

			if (response.ok) {
				console.log("Email sent successfully");
				toastMessage = "Email sent successfully";
				showToast = true;
			} else {
				throw new Error("Failed to send email");
			}
		} catch (error) {
			console.error("Error sending email:", error);
			toastMessage = error.message;
			showToast = true;
		}
	}
</script>

<form on:submit|preventDefault={saveProfile}>
	<label for="diet">Dietary Preference:</label>
	<select id="diet" bind:value={userProfile.dietaryPreference}>
		<option value="">Please select</option>
		<option value="vegetarian">Vegetarian</option>
		<option value="vegan">Vegan</option>
		<option value="omnivorous">Omnivorous</option>
	</select>
  <label for="userName">Name/Alias:</label>
  <input type="text" id="userName" bind:value={userProfile.userName} />
	<label for="profilePicUrl">Profile Picture URL:</label>
	<input
		type="text"
		id="profilePicUrl"
		bind:value={userProfile.profilePictureUrl}
	/>

	<label for="newsletter">Subscribe to newsletter:</label>
	<input
		type="checkbox"
		id="newsletter"
		bind:checked={userProfile.wantsNewsletter}
	/>

	<button type="submit">Save</button>
	<button type="button" on:click={cancelChanges}>Cancel</button>
</form>

{#if showProfileData}
	<div class="profile-data">
		<h2>Your Profile</h2>
		{#if userProfile.profilePictureUrl}
			<div class="profile-picture">
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img src={userProfile.profilePictureUrl} alt="Profile Picture" />
			</div>
		{/if}
		<p>
			<strong>Dietary Preference:</strong>
			{userProfile.dietaryPreference || "Not set"}
		</p>
		<p>
			<strong>Subscribed to Newsletter:</strong>
			{userProfile.wantsNewsletter ? "Yes" : "No"}
		</p>
    <p>
      <strong>Profile name/alias:</strong>
      {userProfile.userName}
	</p>
	</div>
{/if}

{#if showToast}
	<div class="toast">
		<p>{toastMessage}</p>
	</div>
{/if}

{#if isVisible}
	<button type="button" on:click={sendEmail}>Send Test Email</button>
{/if}

<style>
	.profile-data {
		margin-top: 20px;
		padding: 15px;
		border: 1px solid #ddd;
		border-radius: 8px;
	}

	.profile-picture img {
		max-width: 200px;
		max-height: 200px;
		border-radius: 50%;
	}
</style>
