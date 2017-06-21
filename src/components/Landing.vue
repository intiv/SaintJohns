<template>
	<div id="landingRoot">
		
	</div>
</template>

<script>
	import baseUrl from '../../config'
	export default{

		name: 'landing',
		data(){
			return {
				usuario: {
				},
				parcial1: [],
				parcial2: [],
				parcial3: [],
				parcial4: []
			}
		},
		beforeMount() {
			if(localStorage.getItem('usuario')===null){
				swal('No tiene acceso a esta pagina!', 'Debe hacer login primero','warning');
				this.$router.push('/login');
			}else{
				var user=JSON.parse(localStorage.getItem('usuario')).usuario;
				alert(user);
				this.$http.get(`${baseUrl.uri}/usuarios/buscar/id/asd`).then((response)=>{
				});
			}
		}
	}
</script>

<style scoped>
	
</style>