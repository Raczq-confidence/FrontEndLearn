/* 
	通过获取可视窗口的高度window.innerHeight
		以及元素距离浏览器顶部的高度进行比较 dom.getBoundingClientRect().top
	对滚动事件进行监听
 */
let images = document.querySelectorAll('img')

let wHeight = window.innerHeight

// 加入节流操作后就可以大幅度减少scroll调用的次数
window.addEventListener('scroll',throttle((e) => {
	// 获取元素距离顶部的高度
	let height = images[0].getBoundingClientRect().top
	
	// 在这里添加滚动可以看到滚动事件及其消耗性能，
	// 所以我们可以尝试为滚动事件添加上节流操作
	console.log('滚动');
	
	if(height<wHeight) {
		images.forEach(image => {
			let arr = image.getAttribute('data-src')
			image.setAttribute('src',arr)
		})
	}
	
}))

// 定义节流函数
function throttle (fn, delay = 500) {
	let timer = null
	
	return function() {
		
		if(timer) {
			return
		}
		
		timer = setTimeout(() => {
			
			fn.apply(this,arguments)
			timer = null
			
		},delay)
		
	}
	
	
}