//创建一个IIFE函数
(function () {
	//定义三个状态常量
	const PENDING = 'pending'
	const RESOLVED = 'resolved'
	const REJECTED = 'rejected'
	
	//创建Promise构造函数
	function Promise (excutor) {
		
		this.status = PENDING
		
		this.data = undefined
		
		this.callbacks = []
		
		//成功时
		let resolve = (value) => {
			//状态是pending时才能进行下列操作
			if(this.status == PENDING){
				//修改状态为成功并保存数据
				this.status = RESOLVED
				this.data = value
				
				//判断回调队列是否为空，不为空则调用成功回调
				if(this.callbacks.length!=0){
					this.callbacks.forEach( callbacksObj => {
						setTimeout(function () {
							callbacksObj.onResolved(value);
						})
					})
				}
			}
		}
		
		//失败时
		let reject = (reason) => {
				//状态是pending时才能进行下列操作
				if(this.status == PENDING){
					//修改状态为成功并保存数据
					this.status = REJECTED
					this.data = reason
					
					//判断回调队列是否为空，不为空则调用成功回调
					if(this.callbacks.length!=0){
						this.callbacks.forEach( callbacksObj => {
							setTimeout(function () {
								callbacksObj.onRejected(reason);
							})
						})
					}
				}
		}
		
		try{
			excutor(resolve,reject)
		}catch(error){
			reject(error)
		}
		
	}
	
	//创建Promise对象的then方法
	Promise.prototype.then = function (onResolved,onRejected) {
		if(this.status == PENDING){
			this.callbacks.push({
				onResolved,
				onRejected
			})
		}
		
		if(this.status == RESOLVED){
			onResolved(this.data)
		}
			
		if(this.status == REJECTED){
			onRejected(this.data)
		}
	}
	
	//将构造函数暴露出去
	window.Promise = Promise
})()
