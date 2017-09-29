const intervalLength = 60;
const restLength = 30;
const reps = 20;

const app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/partials/settings.html',
      controller: 'mainController as mc'
    })
    .when('/workout', {
      templateUrl: 'views/partials/workout.html',
      controller: 'mainController as mc'
    })
});

// service used for storing session information when partial is switched
app.service('cache', function() {
  let sv = this;

  // cached values. start with defaults identical to those in controller
  sv.queue = [];
  sv.intervalLength = intervalLength; // durration of each exercise
  sv.restLength = restLength; // duration of each rest period
  sv.reps = reps; // total number of cycles

  // function that overwrites cache defaults
  sv.overwriteCache = function(queue) {
    sv.queue = queue;
    sv.intervalLength = queue[0].timer.time; // grabs intervalLength from first item in queue
    sv.restLength = queue[1].timer.time; // grabs restLength from second item in queue
    sv.reps = queue.length / 2; // determines number of cycles from queue
  }; // end overwrites
});

app.controller('mainController', function($interval, $location, cache) {
  let vm = this;

  vm.intervalLength = intervalLength; // durration of each exercise
  vm.restLength = restLength; // duration of each rest period
  vm.reps = reps; // total number of cycles
  vm.queue = []; // que of alternating workouts and rests executed from [0] - [queue.length-1]
  vm.pause = false; // when true, timer will not decrament when step is called
  vm.playPauseIcon = 'assets/icons/pause.svg';
  vm.progressPercentage = 0; // int - represents how far in the queue you are. Used for css style.

  // creates queue and changes partial
  vm.sendForm = ()=> {
    // items are added in pairs so i increments by 2. workout.index is equal to position in array for reference later.
    for (var i = 0; i < vm.reps * 2; i+= 2) {
      vm.queue.push(new Workout(i, vm.intervalLength, false));
      vm.queue.push(new Workout(i + 1, vm.restLength, true));
    }
    cache.overwriteCache(vm.queue);
    $location.path('/workout');
  };

  // pulls data from cache service and replaces them on controller
  vm.retrieveCache = function() {
    vm.queue = cache.queue;
    vm.intervalLength = cache.intervalLength;
    vm.restLength = cache.restLength;
    vm.reps = cache.reps;
    console.log(vm.queue);
    vm.execute(); // run the routine
  }; // end retrieveCache

  // executes workouts
  vm.execute = function() {
    // store the first index and last index in vm.queue
    let end = vm.queue[vm.queue.length - 1]; // last object in array
    let currentIndex = 0; // int - start of array
    vm.current = vm.queue[0]; // current workout object
    vm.updateProgress();
    vm.step();
  }; // end execute

  // a single step in the loop. used recursively.
  vm.step = function() {
    $interval(()=> {
      if (!vm.pause) {
        vm.current.timer.decramentTime();
        if (vm.current.timer.time === 0) {
          vm.current = vm.queue[vm.current.index + 1];
          vm.updateProgress();
          vm.step()
        } // end check if at the end of timer
      } // end check if timer is paused
    }, 1000, vm.current.timer.time); // end interval
  }; // end step

  // changes the workout on the current item in the queue. Will not restart the timer.
  vm.changeWorkout = function() {
    vm.current.differentWorkout();
  }; // end changeWorkout

  // will pause the countdown and change button
  vm.togglePlay = function functionName() {
    vm.pause = !vm.pause;
    if (vm.playPauseIcon === 'assets/icons/play.svg') {
      vm.playPauseIcon = 'assets/icons/pause.svg';
    } else {
      vm.playPauseIcon = 'assets/icons/play.svg';
    }
  }; // end togglePlay

  // will skip to the next item in the queue
  vm.nextWorkout = function() {
    vm.current = vm.queue[vm.current.index + 1];
    vm.updateProgress();
  }; // end nextWorkout

  // returns to home screen
  vm.back = function() {
    $location.path('/');
  }; // end back function

  // adjust progressBar
  vm.updateProgress = function() {
    // .progressBar - container div
    // .completed - orange bar on workout view
    let queueLength = vm.queue.length;
    let currentPosition = vm.current.index + 1;
    console.log(queueLength);
    console.log(currentPosition);
    vm.progressPercentage = (currentPosition / queueLength * 100).toFixed(0);
    console.log(vm.progressPercentage);
    $('.completed').css('width', vm.progressPercentage + '%');
  }; // end update progressBar

});
