/*
 * 自定义Promise构造函数
 *
 */

//创建状态常量
const PENDING = 'pending'
const RESOLVED = 'fullfilled'
const REJECTED = 'rejected'

/*
 * 创建构造函数
 * 参数为构造器函数excutor()
 */
function Promise (excutor) {
//	创建需要的状态,数据,回调函数属性
	this.status = PENDING //默认状态为pending
	
	this.data = undefined //默认数据为undefined
	
	this.callbacks = [] //要执行的回调函数列表，里面每一个元素的结构为{ onResolved(){} , onRejected(){} }
	
	/*
	 * excutor中封装的方法为两种情况：
	 * 	1.封装的方法为异步，则在resolve或者reject方法中执行
	 * 	2.封装的方法为同步，则在then方法中执行
	 */
	
	/*
	 * 创建resolve方法
	 * 使用箭头函数可以保证每一次的this指针的指向都是固定的
	 */
	let resolve = (value) => {
		//当状态为pending时执行下面操作
		if( this.status == PENDING ){
			this.status = RESOLVED //修改状态
			this.data = value //将数据保存下来
			
			/*
			 * 判断callbacks是否为空
			 * 当callbacks不为空，则说明excutor封装的是异步操作
			 */
			if( this.callbacks.length > 0 ){
				this.callbacks.forEach((callObj) => {
					callObj.onResolved(value)
				})
			}
		}
	}
	
	/*
	 * 创建reject方法
	 */
	let reject =  (reason) => {
		//当状态为pending时执行下面操作
		if( this.status == PENDING ){
			this.status = REJECTED //修改状态
			this.data = reason //将数据保存下来
			
			/*
			 * 判断callbacks是否为空
			 * 当callbacks不为空，则说明excutor封装的是异步操作
			 */
			if( this.callbacks.length > 0 ){
				this.callbacks.forEach((callObj) => {
					callObj.onRejected(reason)
				})
			}
		}
	}
	
	//执行excutor函数，失败的话调用reject函数
	try{
		excutor(resolve,reject)
	}catch(error){
		reject(error)
	}
}

/*
 * 创建原型上的then方法
 * 参数为成功与失败时调用的函数
 */
Promise.prototype.then = function (onResolved,onRejected) {
	//判断成功的状态是否为函数
	onResolved = typeof 'function' ? onResolved : value => value
	//默认指定失败的回调函数(实现异常穿透的关键点)
	onRejected = typeof 'function' ? onRejected : reason => { throw reason }
	
	/*
	 * 一共分为三种情况(根据状态判断)
	 */
	
	//将this指针保存下来
	const self = this
	
	//then方法最后返回一个Promise实例对象，以此来实现promise.then的链式调用
	return new Promise((resolve,reject) => {
		/*
		* then的链式调用有三种情况：
		* 	(1)当上一个then的返回值不为promise时，发送成功状态，且值为返回值
		* 	(2)当上一个then抛异常，发送失败状态，且值为抛出值
		* 	(3)当上一个then的返回值为promise实例对象，状态与值由promise决定
		*/
		
		//封装then链式调用时所用的操作
		function chain (fn) {
			try {
				const result = fn(self.data)
				//判断上一个then的返回结果是否为promise实例对象
				if(result instanceof Promise) {
					//(3)当上一个then的返回值为promise实例对象，状态与值由promise决定
					result.then(resolve, reject)
				} else {
					//(1)当上一个then的返回值不为promise时，发送成功状态，且值为返回值
					resolve(result)
				}
			} catch(error) {
				//(2)当上一个then抛异常，发送失败状态，且值为抛出值
				reject(error)
			}
		}
			
		//1.状态为pending，将回调操作保存下来
		if( self.status == PENDING ){
			self.callbacks.push({
				onResolved (){
					chain(onResolved)
				},
				onRejected (){
					chain(onRejected)
				}
			})
		}
	
		//2.状态为resolved，异步执行成功的回调函数
		if( self.status == RESOLVED ){
			setTimeout(() => {
				chain(onResolved)		
			})
		}
	
		//3.状态为rejected，异步执行失败的回调函数
		if( self.status == REJECTED ){
			setTimeout(() => {
				chain(onRejected)			
			})
		}
	})
}

/*
 * 创建Promise原型上的catch方法
 */
Promise.prototype.catch = function (onRejected) {
	return this.then(undefined,onRejected)
}

//将Promise方法暴露出去
window.Promise = Promise;