let App = {
	template : `
		<div>
			<div class="header">
				传智后台管理系统
			</div>
			<div class="main">
				<div class="left">
					<ul>
						<li><router-link to="/users">用户管理</router-link></li>
						<li><router-link to="/rights">权限管理</router-link></li>
						<li><router-link to="/goods">商品管理</router-link></li>
						<li><router-link to="/orders">订单管理</router-link></li>
						<li><router-link to="/systems">系统设置</router-link></li>
					</ul>
				</div>
				<div class="container">
					<router-view></router-view>	
				</div>
			</div>
			<div class="clearfix"></div>
			<div class="footer">
				版权信息
			</div>
		</div>
	`
}

const userInfo = {
	props : ['id'],
	template : `
		<div>
			<h2>用户详情页-----用户id为{{ id }}</h2>
			<button @click="goBack">后退</button>
		</div>
	`,
	methods : {
		goBack(){
			this.$router.go(-1)
		}
	}
}

const User = {
	data : function(){
		return {
			list : [
				{ id : 1, name : 'zq', age : 16 },
				{ id : 2, name : 'szg', age : 17 },
				{ id : 3, name : 'wy', age : 18 },
				{ id : 4, name : 'wp', age : 19 },
				{ id : 5, name : 'lqb', age : 20 },
			]
		}
	},
	methods : {
		goDetail(id){
			console.log(id)
			this.$router.push('/userinfo'+ id)
		}
	},
	template : `
		<div>
			<h2>用户管理</h2>
			<table>
				<thead>
					<tr>
						<th>编号</th>
						<th>姓名</th>
						<th>年龄</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in list" :key="item.id">
						<td>{{ item.id }}</td>
						<td>{{ item.name }}</td>
						<td>{{ item.age }}</td>
						<td><a href="javascript:;" @click="goDetail(item.id)">详情</a></td>
					</tr>
				</tbody>
			</table>
		</div>
	`
}

const Order = {
	template : `
		<h2>订单管理</h2>
	`
}

const Right = {
	template : `
		<h2>权限管理</h2>
	`
}

const Good = {
	template : `
		<h2>商品管理</h2>
	`
}

const System = {
	template : `
		<h2>系统设置</h2>
	`
}

let vr = new VueRouter({
	routes : [
		{ path : '/', component : App, redirect:'/users', children : [
			{ path : '/users', component: User },
			{ path : '/rights', component: Right },
			{ path : '/goods', component: Good },
			{ path : '/orders', component: Order },
			{ path : '/systems', component: System },
			{ path : '/userinfo:id', component: userInfo, props: true }
		] }
	]
})

let vm = new Vue({
	el : '#app',
	router : vr
})
