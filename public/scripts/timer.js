class Timer {
  constructor(startTime) {
    this.time = beginCountDown(startTime)
    this.secondsLeft = '00';
    this.minutesLeft = '0';
    this.timeLeft = `${this.minutesLeft}:${this.secondsLeft}`;
  }

  beginCountDown(seconds) {
    this.timeLeft = displayTime(this.time)
    while (this.time >= 0) {
      setTimeout(()=> {
        this.time --
        this.timeLeft = displayTime(this.time)
      }, 1000)
    }
  }

  displayTime(seconds) {
    if (this.time % 60 < 10) {
      this.secondsLeft = '0' + this.time % 60;
    } else {
      this.secondsLeft = '' + this.time % 60;
    }
    // total seconds minus secondsLeft should always return a number divisible by 60
    this.minutesLeft = Number(((this.time - Number(this.secondsLeft)) / 60).toFixed(0));
    this.timeLeft = `${this.minutesLeft}:${this.secondsLeft}`;
  }
}
