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

  // creates queue and changes partial
  vm.sendForm = ()=> {
    for (var i = 0; i < vm.reps; i++) {
      vm.queue.push(new Workout(i, intervalLength, false));
      vm.queue.push(new Workout(i, restLength, true));
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
    vm.execute();
  }; // end retrieveCache

  // executes workouts
  vm.execute = function() {
    // store the first index and last index in vm.queue
    let current = 0; // int
    let end = vm.queue.length - 1; // int

    
  }; // end execute

});
