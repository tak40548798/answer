/**
 * 請使用正規表達式實作數字加上千分位
 * input : -7855948.9527 
 * output: -7,855,948.9527
 */

function numberAddCommas(num) {
  let parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}
const input = -7855948.9527;
const output = numberAddCommas(input);
console.log(output); // -7,855,948.9527
