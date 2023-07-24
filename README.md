# 面試答案

第一題

使用 Linked List 實作 Stack  
實作需包含以下方法。  
push() : 添加新元素。  
pop():移除元素並返回被移除的元素  
size():返回所有元素數量。  
const myStack = new Stack()  
myStack.push(1)  
myStack.push(2)  
myStack.push(3)  
myStack.pop() // 3  
myStack.size() // 2

```javascript
class Node {
  constructor(value, next) {
    this.value = value === undefined ? null : value;
    this.next = next === undefined ? null : next;
  }
}
class Stack {
  constructor() {
    this.top = null; // 最上面的元素參考
    this.bottom = null; // 最下面的元素參考
    this.length = 0;
  }

  push(value) {
    let newNode = new Node(value);
    // 首個進入堆疊的元素
    if (this.length === 0) {
      this.top = newNode; // 最上面的元素
      this.bottom = newNode; // 最下面的元素
    } else {
      newNode.next = this.top; // 進入堆疊的元素，連結到最上面的元素
      this.top = newNode; //  最上面的元素，就是目前進入堆疊的元素
    }
    this.length++;
  }

  pop() {
    if (!this.top) {
      return null;
    }
    // 最後一個元素離開堆疊時
    if (this.top === this.bottom) {
      this.bottom = null;
    }
    let topNode = this.top; // 暫存最上面的元素
    this.top = this.top.next; // 把最上面的元素，連結到到下一層的元素，相當於最上面的元素離開堆疊
    this.length--;
    return topNode.value;
  }
  
  size() {
    return this.length;
  }
}

const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.pop()); // 3
console.log(stack.size()); // 2
console.log(stack.pop()); // 2
```

第二題

請根據字母順序 A, B, C ..., Z 找出 Array 中最順序前面的字母  
input : [G, H, E, Z, Y]  
output: E

```javascript
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
```

第三題

將 Object key 攤平成 String  
input : {a: { b: 5, c: {d: 3} }, e: { f: ‘foo’ } }  
output: { ‘a.b’: 5 , ‘a.c.d’: 3, ‘e.f’: ‘foo’ }

```javascript
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
```

第四題

請根據輸入的數字區間找出數字 1 到 20 間重疊與未包含的數字區間  
input : [[6, 11], [5, 8], [17, 20], [7], [14,17]]  
output: { overlap: [[6, 8], [17]], notInclude: [[1, 4], [12, 13]] }

```javascript
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
```

第五題

請使用正規表達式實作數字加上千分位  
input : -7855948.9527  
output: -7,855,948.9527

```javascript
function numberAddCommas(num) {
  let parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

const input = -7855948.9527;
const output = numberAddCommas(input);
console.log(output); // -7,855,948.9527
```

第六題

擇一實作 Debounce 或 Throttle  
debounce 是在 delay 時間內如果重新觸發會取消前一次並保留當下觸發的執行。  
throttle 在觸發後的 timeout 時間內只會執行一次。  
建立函式 debounce 或 throttle 帶入參數如下範例:  
const debounceFunc = debounce(func, delay)  
const throttleFunc = throttle(func, timeout)

```javascript
function debounce(func, delay = 1000) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

const debounceFunc = debounce(() => {
  console.log("debounce");
}, 300);

let intervalId = setInterval(debounceFunc, 250);
setTimeout(() => {
  clearInterval(intervalId);
  intervalId = setInterval(debounceFunc, 350);
}, 3000);
```

第七題
使用 Event Loop 結合實際操作範例擇一敘述 Debounce 或 Throttle 的運作方式  
如文字輸入、scroll 操作與 button 連續點擊,或是其他可結合 Debounce 或 Throttle 的行為都可以拿來當作操作範例。

```html
<style>
  .output {
    height: auto;
    border: 1px solid red;
  }
</style>
<body>
  <div>
    document.body.width DefaultOutput:
    <div class="output defaultOutput"></div>
  </div>
  <div>
    document.body.width DebounceOutput:
    <div class="output debounceOutput"></div>
  </div>
  <div>
    document.body.width ThrottleOutput:
    <div class="output throttleOutput"></div>
  </div>
</body>
<script>
  /*
    模擬需要 resize 事件動態改動 dom 元素尺寸時的狀況
    */
  let defaultOutput = document.querySelector(".defaultOutput");
  let debounceOutput = document.querySelector(".debounceOutput");
  let throttleOutput = document.querySelector(".throttleOutput");

  window.addEventListener("resize", (e) => {
    defaultResize(defaultOutput);
    debounceResize(debounceOutput);
    throttleResize(throttleOutput);
  });

  const defaultResize = (outputElement) => {
    let { width } = document.body.getBoundingClientRect();
    width = width / 2;
    outputElement.innerHTML = `${width.toFixed(1)}px`;
    outputElement.style.width = `${width.toFixed(1)}px`;
  };

  const throttleResize = throttle(defaultResize, 300);
  const debounceResize = debounce(defaultResize, 200);

  function debounce(func, delay = 1000) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  function throttle(func, timeout = 1000) {
    let begin = 0;
    return function (...args) {
      let end = new Date().getTime();
      if (end - begin > timeout) {
        func(...args);
        begin = end;
      }
    };
  }
</script>
```
