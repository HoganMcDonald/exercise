class Timer {
  constructor(startTime) {
    this.time = startTime; // int - total seconds left
    this.secondsLeft = '00'; // str - seconds left in countdown excluding minutes
    this.minutesLeft = '0'; // str - minutes left in countdown
    this.timeLeft = `${this.minutesLeft}:${this.secondsLeft}`; // str - actual text display of timer. 0:00
  }

  // can be used to run the countdown by decrementing time and rerendering
  // it every second. does not work with angular.
  beginCountDown(seconds) {
    this.displayTime()
    setInterval(()=> {
      seconds--
      this.displayTime()
      if (seconds === 0) {
        clearInterval
      }
    }, 1000);
  }

  // decrements timer a single second when called. for use with external interval call.
  decramentTime() {
    this.time--
    this.displayTime();
  }

  // renders timer based on this.time
  displayTime() {
    // render secondsLeft
    if (this.time % 60 < 10) {
      this.secondsLeft = '0' + this.time % 60;

    } else {
      this.secondsLeft = '' + this.time % 60;
    }
    // this.time minus secondsLeft should always return a number divisible by 60
    this.minutesLeft = ((this.time - Number(this.secondsLeft)) / 60).toFixed(0);
    // render timeLeft
    this.timeLeft = `${this.minutesLeft}:${this.secondsLeft}`;
  }
}
