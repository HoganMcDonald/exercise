class Workout {
  // index - int: number in order
  // durration - int: time for this cycles
  // rest - boolean: True is for a rest
  constructor(index, durration, rest) {
    this.index = index;
    this.timer = new Timer(durration);
    this.rest = rest;
    this.workout = this.pickWorkout();
  }

  // will select a workout from array exercises in exercises.js
  pickWorkout() {
    if (this.rest) {
      return exercises[exercises.length - 1]; // returns rest data if this.rest is true
    } else {
      return exercises[Utility.random(exercises.length - 2, 0)]; // returns a random workout with no regard for what has already been selected. Excludes rest.
    }
  } // end pick workout

  // used to replace current workout with another. Will pick at random excluding current.
  differentWorkout() {
    // checks if rest is true. IMPORTANT: this prevents infinite loop because do/while would always return the same index.
    if (!this.rest) {
      let excluded = this.workout.id;
      let replacement = this.pickWorkout();
      // will populate replacement and continue repopulating until replacement is not
      while (replacement.id === excluded) {
        replacement = this.pickWorkout();
      }
      this.workout = replacement;
    } // end check if rest
  } // end differentWorkout
}
