/* 
	封装一个ajax请求,成功时或失败将数据返回，两秒没有相应输出请求未响应
	@param {string} url 请求的路径
	@param {string} method 请求的方法
	@param {Object} params 请求的参数对象
 */

function ajax(url,method,params) {
	return new Promise((resolve,reject) => {
		let xhr = new XMLHttpRequest()
		
		// 当method为get请求时需要对数据进行拼接
		if((method === 'get' || method === 'GET') && params) {
			// 对params进行拼接
			let arr = []
			Object.keys(params).forEach(key => {
				arr.push(`${key}=${params[key]}`)
			})
			url = url + `?${arr.join('&')}`
			console.log(url);
			xhr.open(method,url)
			xhr.send()
		} else {
			xhr.open(method,url)
			if(params) {
				xhr.send(params)
			}else {
				xhr.send()
			}
		}
		
		xhr.onreadystatechange = function () {
			if(this.readyState === 4) {
				if(this.status === 200) {
					resolve(JSON.parse(this.responseText))
				} else {
					reject(this.statusText)
				}
			}
		}
		
		setTimeout(()=> {
			if(xhr.readyState !== 4) {
				// 调用了abort方法后，请求会终止，并且将xhr的两项属性置为0
				reject('请求超时')
				xhr.abort()
			}
		},2000)
		
		// 请求超时还有另一种写法，就是通过Promise.race方法
		
	})
}