/**
 * 請根據字母順序 A, B, C ..., Z 找出 Array 中最順序前面的字母
 * input : [G, H, E, Z, Y]
 * output: E
 */

function findFrontLetter(letters) {
  let frontLetter = letters[0];
  for (let i = 1; i < letters.length; i++) {
    if (letters[i] < frontLetter) {
      frontLetter = letters[i];
    }
  }
  return frontLetter;
}

const input = ["G", "H", "E", "Z", "Y"];
const output = findFrontLetter(input);
console.log(output);
