const app = angular.module('myApp', []);

app.controller('mainController', function($interval) {
  let vm = this;

  vm.timer = new Timer(120);

  console.log(vm.timer);
  $interval(()=> {
    vm.timer.decramentTime();
    console.log(vm.timer);
  }, 1000, vm.timer.time);
});
