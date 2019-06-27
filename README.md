# Promise
> 简单版 Promise

> Promise 是异步编程的的最终结果，Promise 有三种状态： pending、fulfilled、rejected。只有异步操作的结果可以决定当前是哪一种状态，其它任何操作都无法改变。与之进行交互的方式主要是 then 方法，该方法注册了两个回调函数，用于接收 Promise 的终值或 promise 不能执行的原因。
当 then 中的回调函数不是函数的时候，会忽略当前 then 方法，使用前一个 then 中的值，如果 then 中的回调函数没有返回值，则下一个 then 的值默认 undefined，每个 then 只可能使用前一个 then 的返回值，并且调用次数不能超过一次。
