# Log Your Limit

I created an app that logs your workouts.
It has authentication features such as:
-	sign-up, sign-in, sign-out, and change password
The workout log allows you to:
-	create a workout with categories of: title, description, date, distance, time, start and end date (in theory that you could have an event on the cal extend multiple days)
-	update your workout
-	delete your workout
-	view your workouts

#### Links to repos and deployed sites:
Git-hub Log Your Limit Front End https://github.com/binnsy/log-your-limit-react-client

Git-hub Log Your Limit Back End: https://github.com/binnsy/log-your-limit-rails-api

Deployed Log Your Limit Front End : https://binnsy.github.io/log-your-limit-react-client/#/

Deployed Log Your Limit Back End: https://log-your-limit.herokuapp.com/

##### Technologies and applications used:
- Javascript
- HTML 5
- Bootstrap-React
- SASS
- CSS
- JSX
- React
- Ruby on Rails
- Heroku
- Github

##### Planning:
I wanted to try and create a calendar app that logged workouts, so I started by deciding which back end I wanted to use and what calendar npm install I wanted to use. I knew I wanted to use react even though I was not comfortable with it. My wireframe (see below) was very advanced as to what I actually accomplished. I had created and hard coded most of the features on my wireframe already on a test front end app I was using, but not using react. I thought it would be relatively simple to convert over, but because React is still new to me and the time span to complete the project was relatively short, I didn’t get to most of them. My goal was to get CRUD done on my project by the third day and deploy it then focus on more styling and squishing bugs on the final day.
Wireframe: https://imgur.com/QkJKqk4

##### Challenges/Obstacles:

I think my biggest challenge came from adding nickname to my auth. I somehow ran my migrations out of order, so my back end was not recognizing a column even though my schema displayed it. I had to delete a few migrations, drop and re-create my backend and front end. I set up my backend before I realized that it was not compatible with my npm install for calendar.

##### User Stories:
•    As an unregistered user, I would like to sign up with email and password.
•    As a registered user, I would like to sign in with email and password.
•    As a signed in user, I would like to change password.
•    As a signed in user, I would like to sign out.
•    As a signed in user, I would like to create a workout with a title and date.
•    As a signed in user, I would like to update my workout.
•    As a signed in user, I would like to delete my workout.
•    As a signed in user, I would like to see all of my workouts.

##### Setup and installation instructions:
- Fork
- Clone
- install dependencies npm install

##### For the Future:
-	change my backend so it returns my events in the calendar!
-	style some more
-	tie the countdown to backend
-	include a pace calculator
-	calculate some data

![Screen Shot 2019-06-07 at 8 27 55 AM](https://user-images.githubusercontent.com/27842159/59103981-4b6cc100-88fe-11e9-9c09-a6b6f261cabe.png)
