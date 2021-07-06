Vue.component('comtBox',{
			data(){
				return {
					id : '',
					user : '',
					content : ''
				}
			},
			template : ` 
				<div>
					<label>
						评论人：
						<input type="text" v-model="user" class="cuser" />
					</label>
					
					<label>
						评论内容：
						<input type="text" v-model="content" class="container" />
					</label>
					
					<label>
						<input type="button" value="发表评论" class="btn" @click="postComment"/>
					</label>
				</div>
			`,
			methods : {
				postComment(){
					//发表评论的方法
					/*
					 * 方法的业务逻辑分析：
					 *   1.数据应该存储在localStorage中，使用setItem()将数据存储进去
					 * 	 2.localStorage中存储的类型应该为string，使用JSON.stringify将数组转换为字符串存储进去
					 *   3.从localStorage中故取数据时应使用getItem()
					 *   4.读取出来的数据应使用JSON.parse()将字符串转换为对象数组
					 *   5.如果localStorage中没有数据，则返回一个'[]'
					 * 
					 */
					let comment = {
						id : Date.now(),
						user : this.user,
						content : this.content
					}
					
					let list = JSON.parse(localStorage.getItem('cmts') || '[]')
					
					list.push(comment)
					
					localStorage.setItem('cmts',JSON.stringify(list))
					
					this.user = this.content = ''
					
					this.$emit('func')
					
				}
			}
		})

let vm = new Vue({
	el : '#app',
	data : {
		//评论数组
		list : [
			{ id : Date.now(), user : 'liu', content : 'qwertyuiop' },
			{ id : Date.now(), user : 'wang', content : 'qwertyuiop' },
			{ id : Date.now(), user : 'zhao', content : 'qwertyuiop' },
		]
	},
	methods : {
		loadCmt(){
			//从本地的localStorage加载评论数组
			let list = JSON.parse(localStorage.getItem('cmts') || '[]')
			
			this.list = list
		}
	},
	created(){
		this.loadCmt()
	}
})
