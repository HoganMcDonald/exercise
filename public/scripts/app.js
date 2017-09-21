const app = angular.module('myApp', []);

app.controller('mainController', function($interval) {
  let vm = this;

  vm.timer = new Timer(120);

  // will decrament the timer on page load. runs as many times as timer is set to run.
  $interval(()=> {
    vm.timer.decramentTime();
  }, 1000, vm.timer.time); // end $interval
});
