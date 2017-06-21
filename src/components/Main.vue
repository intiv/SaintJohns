<template>
	<div id="root">
		<div class="row" id="contentContainer">
		</div>
	</div>
</template>

<script>
	export default {
		name : 'main',
		data(){
			return{
				nombre : 'Main Page',
				show : 'true'
			}
		},
		methods : {
			getNombre() {
				return this.nombre;
			},
			toggleShow() {
				if(this.show ==='true'){
					this.show ='false';
				}else{
					this.show ='true';
				}
			}
		},
		beforeMount(){
			// if(JSON.parse(localStorage.getItem('usuario'))===null){
			// 	this.$router.push('/login');
			// }
		}
	}
</script>

<style scoped>
	

</style>