let express = require('express')

let app = express()

let fs = require('fs')

//cors用来解决跨域问题
let cors = require('cors')

let router = express.Router()

router.get('/project1',function (req,res) {
	setTimeout(function () {
		res.send({
			id : 1,
			message : 'project1'
		})
	},2500)
})

router.post('/project2',function (req,res) {
	setTimeout(function () {
		res.send({
			id : req.query.id,
			message : req.query.message
		})
		//注意：request.query和.params只能接受get请求的参数
		//     post请求需要中间件，或者是使用事件机制
	},2500)
})

//配置跨域问题
app.use(cors())
app.use(router)

app.listen('5249',function () {
	console.log('服务5249已经启动')
})
