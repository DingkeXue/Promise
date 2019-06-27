// 首先定义 Promise 的三个状态
const PENDING = "pending";
const RESOVLED = "resolved";
const REJECTED = "rejected";

/*
*创建一个 Promise 函数，接受一个函数参数
*开始时promise状态为 pending，value 值用来保存 resolve 或 reject 中传入的值
*CallBacks 用来保存 then 中的回调函数
*/
function Promise(fn) {
  const that = this;
  that.state = PENDING;
  that.value = null;
  that.resolveCallBacks = [];
  that.rejectedCallBacks = [];
  
  // 执行 fn 函数
  try {
    fn(resolve, reject)
  } catch(err) {
    reject(err);
  }
  
  // fn 中的 resolve, reject 分别是两个函数
  function resolve(value) {
    // 首先判断状态是否为 pending, 只有状态为 pending 时才能改变状态
    if (that.state == PENDING) {
      that.state = RESOLVED;
      that.value = value;
      // 执行 then 中的回调函数
      that.resolveCallBacks.map(cb => (that.value = cb(that.value)))
    }
  }
  
  function reject(value) {
    if (that.state == PENDING) {
      that.state = REJECTED;
      that.value = value;
      that.rejectCallBacks.map(cb => (that.value = cb(that.value)))
    }
  }
}

// then
Promise.prototype.then = function(onFulfilled, onRejected) {
  const that = this;
  // 需要判断传入的参数是否为函数，如果不是函数需要创建一个函数赋值给对应参数，同时实现透传
  onFulfilled = typeof onFulfilled == 'function' ? onFulfilled : v => v;
  onRejected = typeof onRejected == 'function' ? onRejected : v =>　{ throw v }
  
  switch(that.state) {
    case PENDING:
      that.resolveCallBacks.push(onFulfilled);
      that.rejectCallBacks.push(onRejected);
      break;
    case RESLOVED:
      that.value = onFulfilled(that.value);
      break;
    case REJECTED:
      that.value = onRejeted(that.value);
      break;
    defalut: 
      break;
  }
  return that;
}

// test
new Promise(function(resolve, reject) {
  setTimeout(() => {
    resolve(1);
  }, 10)
}).then(res => {
  console.log(res) // 1
  return 2;
}).then(res => {
  console.log(res); // 2
})
