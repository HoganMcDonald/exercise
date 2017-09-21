// methods that can be used anywhere. provide general utility.
class Utility {
  // generate random number
  static random(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
  }; // end random
}
