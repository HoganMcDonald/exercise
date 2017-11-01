# exercise

live demo - [Simple Workout](http://simple-workout.herokuapp.com/)
The app was designed to be viewed on mobile. Styling and some functionality may not work fully on desktop. Use the inspect tool in your browser to view the webpage as it would be on a mobile device. 

## What I learned

This was a small front-end heavy application I designed to try incorporating object oriented methodology with AngularJS. I also was looking for a simple workout app that I could use at home to put together a routine based on how much time I had. I have found it useful to use throughout the day when I need a short break from coding. I enjoyed the challenge of utilizing classes in ES6 while still benefitting from the double binding in Angular. A few portions that I am proud of include:

- the timer class (public/scripts/timer.js). There were several challenging bits involved in coding a timer that would work with Angular because the usual timeout functions break in Angular. I left methods on the class that could be used outside of angular, but ended up having to migrate the interval to the controller.
- vm.step() on the main controller. This function executes once per second and moves the program forward. It works recursively until the workout is completed.

## Tech

This application was built using Node/Express on the back end and Angular on the front end. I also relied on JQuery, SASS, Gulp and ES6. The application is hosted on a Heroku Instance.
