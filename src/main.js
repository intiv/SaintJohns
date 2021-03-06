import Vue from 'vue'
import App from './App.vue'
import Main from './components/Main.vue'
import Test from './components/Test.vue'
import Login from './components/Login.vue'
import Tarea from './components/Tarea.vue'
import Clase from './components/Clase.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.http.options.credentials = true;

const router = new VueRouter({
	routes : [
		{
			name : 'Home',
			path : '/',
			//redirect : '/login',
			component : Main
		},
		{
			name : 'Test',
			path : '/test',
			component : Test,
			props: {default:true, mensaje: 'hola', msg2:'como estas inti'} 
		},
		{
			name : 'Login',
			path : '/login',
			component : Login
		},
    	{
      		name: 'Tarea',
			path: '/tarea/:id',
			component: Tarea
		},
		{
			name: 'Clase',
			path: '/clase',
			component: Clase
		}

	]
});

router.replace('/login');
new Vue({ // eslint-disable-line no-new
	router,
	render: (h) => h(App)
}).$mount('#app');