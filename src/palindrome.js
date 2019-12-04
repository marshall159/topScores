class Palindrome {
  static isPalindrome(word) {
    word = word.replace(/\s+/g, '');
    
    return word.length > 0 && word.toLowerCase().split('').reverse().join('') === word.toLowerCase();
  }
}

module.exports = Palindrome;