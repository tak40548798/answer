/**
 * 將 Object key 攤平成 String
 * input : {a: { b: 5, c: {d: 3} }, e: { f: ‘foo’ } }
 * output: { ‘a.b’: 5 , ‘a.c.d’: 3, ‘e.f’: ‘foo’ }
 */

function flattenObject(srcObj) {
  const result = {};

  for (const srcKey in srcObj) {
    // 下層物件
    if (typeof srcObj[srcKey] === "object") {
      const obj = flattenObject(srcObj[srcKey]);
      // 合併字串
      for (let key in obj) {
        result[srcKey + "." + key] = obj[key];
      }
    } else {
      // b:5
      // d:3
      // f:"foo"
      result[srcKey] = srcObj[srcKey];
    }
  }

  return result;
}

const input = {
  a: { b: 5, c: { d: 3 } },
  e: { f: "foo" },
};
const output = flattenObject(input);
console.log(output);
