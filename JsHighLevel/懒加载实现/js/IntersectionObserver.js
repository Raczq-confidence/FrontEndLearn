/* 
	此案例通过Intersection Observer来实现懒加载
	Intersection Observer存在着浏览器的兼容问题(IE完全不支持)
	具体用法请参见MDN文档https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver
 */

let images = document.querySelectorAll('img')

let observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if(entry.isIntersecting) {
			let image = entry.target
			observer.unobserve(image)
			let arr = image.getAttribute('data-src')
			image.setAttribute('src',arr)
		}
		
	})
})

images.forEach(image => {
	// 监听所有的图片标签
	observer.observe(image)
})
