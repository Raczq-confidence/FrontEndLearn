//创建局部组件
let cartHead = {
//	获取父组件中的名字
	props : ['uname'],
	template : `
		<div class="header">{{ uname }}的商品</div>
	`
}

let cartList = {
	props : ['list'],
	template : `
		<div class="items">
			<div class="item" v-for="item in list" :key="item.id">
				<div class="name">{{ item.name }}</div>
				<div class="change">
					<a @click="subNum(item.id)">-</a>
					<input type="text" :value="item.num"/>
					<a @click="addNum(item.id)">+</a>
				</div>
				<div class="del" @click="delItem(item.id)">×</div>
			</div>
		</div>
	`,
	methods : {
		delItem(id){
			this.$emit('del-item',id);
		},
		subNum(id){
			this.$emit('sub-num',id);
		},
		addNum(id){
			this.$emit('add-num',id);
		}
	}
}

let cartFoot = {
	props : ['sum'],
	template : `
		<div class="footer">合计:{{ sum }}</div>
	`
}

//创建全局组件
Vue.component('my-cart',{
	data : function(){
		return {
			list : [
				{
					id : 0,
					name : '冰箱',
					num : 1,
					price : 1000
				},
				{
					id : 1,
					name : '电视',
					num : 1,
					price : 1000
				},
				{
					id : 2,
					name : '茶几',
					num : 1,
					price : 1000
				},
				{
					id : 3,
					name : '床铺',
					num : 1,
					price : 1000
				}
			],
			uname : '张三'
		}
	},
	components : {
		'cart-head' : cartHead,
		'cart-list' : cartList,
		'cart-foot' : cartFoot
	},
	template : `
		<div class="container">
			<cart-head :uname="uname"></cart-head>	
			<cart-list :list="list" @del-item="delItem($event)" @sub-num="subNum($event)" @add-num="addNum($event)"></cart-list>	
			<cart-foot :sum="sum"></cart-foot>	
		</div>	
	`,
	computed : {
		sum(){
			let sum = 0;
			for(let i of this.list){
				sum += i.num * i.price;
			}
			return sum;
		}
	},
	methods : {
		delItem(id){
			//findIndex的值必须是一个返回值，因为是箭头函数所以可以省略return
			let index = this.list.findIndex(
				(item) => item.id == id
			);
			console.log(index);//-1
			this.list.splice(index,1);
		},
		subNum(id){
			let index = this.list.findIndex(
				(item) => item.id == id
			);
			if(this.list[index].num>0){
				this.list[index].num--
			}
			
		},
		addNum(id){
			let index = this.list.findIndex(
				(item) => item.id == id
			);
			this.list[index].num++
		}
	}
})

let vue = new Vue({
	el : '#app'
})
