class Timer {
  constructor(startTime) {
    this.time = startTime;
    this.secondsLeft = '00';
    this.minutesLeft = '0';
    this.timeLeft = `${this.minutesLeft}:${this.secondsLeft}`;
  }

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

  decramentTime() {
    this.time--
    this.displayTime();
  }

  displayTime() {
    if (this.time % 60 < 10) {
      this.secondsLeft = '0' + this.time % 60;

    } else {
      this.secondsLeft = '' + this.time % 60;
    }
    // this.time minus secondsLeft should always return a number divisible by 60
    this.minutesLeft = ((this.time - Number(this.secondsLeft)) / 60).toFixed(0);
    this.timeLeft = `${this.minutesLeft}:${this.secondsLeft}`;
  }
}
