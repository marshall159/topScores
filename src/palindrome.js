class Palindrome {
  static isPalindrome(word) {
    return word.length > 0 && word.split('').reverse().join('') === word;
  }
}

module.exports = Palindrome;