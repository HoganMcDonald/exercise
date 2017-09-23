class Workout {
  // index - int: number in order
  // durration - int: time for this cycles
  // rest - boolean: True is for a rest
  constructor(index, durration, rest) {
    this.index = index;
    this.time = durration;
    this.rest = rest;
    this.workout = this.pickWorkout(this.rest);
  }

  pickWorkout() {
    
  }
}
