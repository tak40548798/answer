/**
 * 請根據輸入的數字區間找出數字 1 到 20 間重疊與未包含的數字區間
 * input : [[6, 11], [5, 8], [17, 20], [7], [14,17]]
 * output: { overlap: [[6, 8], [17]], notInclude: [[1, 4], [12, 13]] }
 */

function getRange(array) {
  let min = Math.min(...array);
  let max = Math.max(...array);
  if (min === max) {
    return [min];
  } else {
    return [min, max];
  }
}

function getOverlayAndNotInclude(input) {
  const numMap = {};

  for (let i = 1; i <= 20; i++) {
    numMap[i] = 0;
  }
  // 計算出現次數，用來計算 重疊 和 不存在 區間
  for (let i = 0; i < input.length; i++) {
    let start = input[i][0];
    let end = input[i][input[i].length - 1];
    for (let j = start; j <= end; j++) {
      numMap[j] = numMap[j] + 1;
    }
  }

  let overlap = [];
  let overlapArray = [];

  let notInclude = [];
  let notInlcudeArray = [];

  for (const numKey in numMap) {
    let counter = numMap[numKey];
    // 處理重疊的區間
    if (counter <= 1 && overlapArray.length) {
      overlap.push(getRange(overlapArray));
      overlapArray = [];
    }
    // 處理不存在的區間
    if (counter > 0 && notInlcudeArray.length) {
      notInclude.push(getRange(notInlcudeArray));
      notInlcudeArray = [];
    }
    // 重疊的部分
    if (counter > 1) {
      overlapArray.push(numKey);
    }
    // 不存在的部分
    if (counter === 0) {
      notInlcudeArray.push(numKey);
    }
  }

  if (notInlcudeArray.length) {
    notInclude.push(getRange(notInlcudeArray));
  }

  return {
    overlap: overlap,
    notInclude: notInclude,
  };
}

const input1 = [[6, 11], [5, 8], [17, 20], [7], [14, 17]];
const input2 = [[], [2, 4], [2, 3], [2, 3]];
const input3 = [[]];
const output = getOverlayAndNotInclude(input3);
console.log(output);

// 01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20
//  0  0  0  0  0  1  1  1  1  1  1  0  0  0  0  0  0  0  0  0  6-11
//  0  0  0  0  1  1  1  1  0  0  0  0  0  0  0  0  0  0  0  0  5-8
//  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  1  1  1  1  17-20
//  0  0  0  0  0  0  1  0  0  0  0  0  0  0  0  0  0  0  0  0  7
//  0  0  0  0  0  0  0  0  0  0  0  0  0  1  1  1  1  0  0  0  14-17

//  0  0  0  0  1  2  3  2  1  1  1  0  0  1  1  1  2  1  1  1  numMap
//                 ○  ○  ○                          ○           overlay
//  x  x  x  x                       x  x                       notInclude
