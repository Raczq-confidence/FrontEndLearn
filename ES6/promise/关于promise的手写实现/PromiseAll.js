/* 
	Promise.all方法是实现一个所有数组中的promise对象,当数组中存在不为Promise对象的时候，直接将该值添加到数组当中
	它本身也是一个Promise对象
	它成功的返回值为所有Promies对象成功的返回值数组
	它失败的返回值就是失败时Promise对象的返回值
 */
Promise.myAll = function(array = []) {
	if(!Array.isArray(array)) return Promise.reject('传入参数不是数组')
	return new Promise((resolve,reject) => {
		let size = 0
		let result = []
		for(let promise of array) {
			size++
			Promise.resolve(promise)
			 .then(val => {
				result.push(val)
				if(size === array.length) {
					resolve(result)
				}
			 })
			 .catch(err => {
				reject(err)
			 })
			
			
			/* 
				下面的写法存在错误
			 */
			/* if(!promise instanceof Promise) reject(`第${size+1}不为Promise对象`)
			size++
			promise
			 .then(val => {
				 result.push(val)
				 if(size === array.length) {
				 	resolve(result)
				 }
			 })
			 .catch(err => {
				 reject(err)
			 }) */
		}
	})
}