<template>
	<div id="landingRoot">
		<div class="row">
			<div class="col l12 m12 s12" id="userInfoContainer">
				<h3>{{usuario.nombre}}&nbsp;{{usuario.apellido}}</h3> <!-- remover-->
				<h3><i class="material-icons medium">person_pin</i>{{alumno.nombre}} - {{alumno.cuenta}}</h3>
			</div>
		</div>
		<div class="row">
			<div class="col l10 m10 s10 offset-l1 offset-m1 offset-s1" id="userClasesContainer">
				<ul class="collection with-header">
					<li class="collection-header"><h4><i class="material-icons medium">class</i>Clases</h4></li>
					<a v-for="clase in clases" class="collection-item" v-on:click="redirect(clase)"> {{clase.cuenta}} </a>
				</ul>
				
			</div>
		</div>
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
				alumno: {

				},
				clases: []
			}
		},
		methods: {
			redirect(clase){
				this.$router.push(`/clase?clase=`+clase.cuenta+'&grado='+clase.grado+'&apartado='+clase.apartado+'&year='+clase.ano);
			}
		},
		beforeMount() {
			var usuario=localStorage.getItem('usuario');
			if(usuario===null){
				swal('No tiene acceso a esta pagina!', 'Debe hacer login primero','warning');
				this.$router.push('/login');
			}else{
				var user=JSON.parse(usuario);
				this.$http.get(`${baseUrl.uri}/usuario/`+user.cuenta).then((response)=>{
					if(response.body.success){
						this.usuario = response.body.usuario;
						//get alumno linkeado a la cuenta
						this.$http.get(`${baseUrl.uri}/usuario/alumno/`+this.usuario._id).then((response2)=>{
							if(response2.body.success){
								this.alumno=response2.body.alumno;
								var partes= this.alumno.cuenta.split('_');
								this.$http.get(`${baseUrl.uri}/usuario/secciones?grado=`+partes[0]+'&apartado='+partes[1]+'&year='+partes[2]).then((respuesta)=>{
									if(respuesta.body.success){
										this.clases=respuesta.body.secciones;
									}else{
										swal('No se obtuvieron las secciones',response.body.message,'error');
									}
								});
							}else{
								swal('nel alumno','','error');
							}
						});
					}else{
						var msg='Error indefinido';
						if(response.body.tipo==='notFound'){
							msg='No se encontro el usuario. Contacte al admin para modificar su cuenta';
						}else if(response.body.tipo==='error'){
							msg='Revise su conexion a internet o pongase en contacto con un admin';
						}
						swal('Error cargando el usuario!',msg,'error');
						this.$router.push('/login');
					}
				});
			}
		}
	}
</script>

<style scoped>
	
	#userClasesContainer{
		display: block;
		overflow-y: scroll;
		overflow-x: scroll;
		animation: slidein 2s;
	}

	#userInfoContainer{
		text-align: center;
		animation: slidein 1s;
	}

	

</style>