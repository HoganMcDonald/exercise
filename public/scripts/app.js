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
  sv.overWriteCache = function() {

  };
});

app.controller('mainController', function($interval, $location, cache) {
  let vm = this;

  vm.intervalLength = intervalLength; // durration of each exercise
  vm.restLength = restLength; // duration of each rest period
  vm.reps = reps; // total number of cycles
  vm.queue = []; // que of alternating workouts and rests executed from [0] - [queue.length-1]

  // creates queue and changes partial
  vm.sendForm = ()=> {
    for (var i = 0; i < vm.reps; i++) {
      vm.queue.push(new Workout(i, intervalLength, false));
      vm.queue.push(new Workout(i, restLength, true));
    }
    console.log(vm.queue);
    $location.path('/workout');
  };

  vm.timer = new Timer(120);

  // will decrament the timer on page load. runs as many times as timer is set to run.
  $interval(()=> {
    vm.timer.decramentTime();
  }, 1000, vm.timer.time); // end $interval
});
