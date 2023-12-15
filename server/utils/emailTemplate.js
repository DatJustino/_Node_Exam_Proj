export function welcomeEmailTemplate(userName) {
    return `<!DOCTYPE html>
    <html>
    <head>
        <style>
            :root {
                font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
                line-height: 1.5;
                font-weight: 400;
                color: rgba(255, 255, 255, 0.87);
                background-color: #242424;
                font-synthesis: none;
                text-rendering: optimizeLegibility;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                -webkit-text-size-adjust: 100%;
            } 

            body {
              font-family: sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f2f2f2;
            }
        
            h1 {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 20px;
            }
        
            p {
              font-size: 16px;
              line-height: 1.5;
              margin-bottom: 10px;
            }
        
            .container {
              width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 10px;
            }
        
            .workout-schedule, .eating-tips {
              border: 1px solid #ccc;
              padding: 10px;
              margin-bottom: 20px;
            }
        
            .workout-schedule h2, .eating-tips h2 {
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 10px;
            }
        
            .workout-schedule ul, .eating-tips ul {
              list-style: none;
              margin: 0;
              padding: 0;
            }
        
            .workout-schedule li, .eating-tips li {
              margin-bottom: 5px;
            }
          </style>
    </head>
    <body>
<div class="container">
            <h1>Welcome to the Fitness Journey!</h1>  
            <p>Hi ${userName},</p>
            <p>Welcome to the world of fitness! We're thrilled to have you join our community of health and wellness enthusiasts. Embark on a journey of transformation with us, where you'll discover the power of exercise and nutrition to achieve your fitness goals.</p>
            
            <!-- Workout Schedule -->
            <h2>7-Day Workout Schedule</h2>

To kickstart your fitness journey, here's a sample 7-day workout schedule that targets all major muscle groups:

<div class="workout-schedule">
<h2>Day 1: Chest and Triceps</h2>

<ul>
<li>Barbell Bench Press: 3 sets of 8-12 reps</li>
<li>Incline Dumbbell Press: 3 sets of 8-12 reps</li>
<li>Decline Dumbbell Press: 3 sets of 8-12 reps</li>
<li>Triceps Pushdowns: 3 sets of 10-15 reps</li>
<li>Overhead Triceps Extensions: 3 sets of 10-15 reps</li>
</ul>
</div>


<div class="workout-schedule">
<h2>Day 2: Back and Biceps</h2>

<ul>
<li>Pull-ups: 3 sets of as many reps as possible</li>
<li>Barbell Rows: 3 sets of 8-12 reps</li>
<li>Seated Cable Rows: 3 sets of 10-15 reps</li>
<li>Bicep Curls: 3 sets of 10-15 reps</li>
<li>Hammer Curls: 3 sets of 10-15 reps</li>
</ul>
</div>

<div class="workout-schedule">
<h2>Day 3: Rest</h2>
</div>


<div class="workout-schedule">
<h2>Day 4: Legs and Shoulders</h2>

<ul>
  <li>Barbell Squats: 3 sets of 8-12 reps</li>
  <li>Leg Press: 3 sets of 10-15 reps</li>
  <li>Leg Extensions: 3 sets of 10-15 reps</li>
  <li>Hamstring Curls: 3 sets of 10-15 reps</li>
  <li>Military Press: 3 sets of 8-12 reps</li>
  <li>Lateral Raises: 3 sets of 10-15 reps</li>
</ul>
</div>

<div class="workout-schedule">
<h2>Day 5: Rest</h2>
</div>

<div class="workout-schedule">
<h2>Day 6: Cardio</h2>

<p>Engage in any form of cardio for 30-45 minutes, such as running, swimming, or cycling.</p>
</div>

<div class="workout-schedule">
<h2>Day 7: Rest</h2>
</div>

<h2>Eating Tips for Bulk Gaining</h2>

<p>To fuel your muscle growth, follow these eating tips:</p>

<div class="eating-tips">
<h2>1. Increase Calorie Intake</h2>

<p>Consume more calories than you burn to promote muscle growth. Aim for a surplus of 300-500 calories per day.</p>
</div>

<div class="eating-tips">
<h2>2. Prioritize Protein</h2>

<p>Protein is the building block of muscle. Aim for 1 gram of protein per pound of body weight daily.</p>
</div>

<div class="eating-tips">
<h2>3. Consume Complex Carbohydrates</h2>

<p>Complex carbs provide sustained energy for workouts. Include whole grains, fruits, and vegetables in your diet.</p>
</div>

<div class="eating-tips">
<h2>4. Incorporate Healthy Fats</h2>

<p>Healthy fats provide essential fatty acids and support hormone production and muscle growth. Include sources of healthy fats in your diet.</p>

<ul>
<li>Avocados: Avocados are rich in monounsaturated fats, fiber, and vitamins.</li>
<li>Nuts and seeds: Nuts and seeds are a great source of healthy fats, protein, and fiber. Choose nuts like almonds, walnuts, and cashews, and seeds like chia seeds, flaxseeds, and pumpkin seeds.</li>
<li>Olive oil: Use olive oil as a cooking oil and in salad dressings.</li>
<li>Fatty fish: Fatty fish like salmon, tuna, and mackerel are rich in omega-3 fatty acids, which are beneficial for heart and brain health.</li>
</ul>
</div>

<div class="eating-tips">
<h2>5. Stay Hydrated</h2>

<p>Drinking plenty of water throughout the day is essential for overall health and muscle function. Aim to drink at least eight glasses of water per day.</p>
</div>
<p>Remember, consistency is key to achieving your fitness goals. Stick to your workout schedule, maintain a healthy diet, and gradually increase the intensity of your workouts as you progress.</p>

<p>We're here to support you every step of the way. Feel free to reach out to our community for motivation, advice, and encouragement. We're all in this together!</p>

<p>Happy sweating,</p>

<p>The Fitness Team</p>
        </div>
        <div class="footer">
            <p>© 2023 The Fitness Team. All rights reserved.</p>
        </div>
    </body>
    </html>
    `;
}