<template>
	<div id="landingRoot">
		<div class="row">
			<div class="col l12 m12 s12" id="userInfoContainer">
				<h3 v-if="tipo===1"><i class="material-icons medium">person_pin</i> {{alumno.cuenta}}&nbsp;{{alumno.nombre}} - Alumno </h3>
				<h3 v-if="tipo===2"><i class="material-icons medium">work</i> {{usuario.nombre}}&nbsp;{{usuario.apellido}} - Maestro </h3>
				<h3 v-if="tipo===3"><i class="material-icons medium">vpn_key</i> {{usuario.nombre}}&nbsp;{{usuario.apellido}} - Admin </h3>
				<hr>
			</div>
		</div>
		<div class="row">
			<div class="col l10 m10 s10 offset-l1 offset-m1 offset-s1" id="userClasesContainer">
				<ul class="collection with-header">
					<li class="collection-header"><h4><i class="material-icons medium">class</i>Secciones</h4></li>
					<ul v-for="clase in clases">
						<li class="collection-item">
							<div class="row">
								<div class="col l10 m10 s10">
									<a v-on:click="redirect(clase)" href="javascript:undefined">
										{{clase.cuenta}} - {{clase.grado}} {{clase.apartado}} {{clase.ano}}
									</a>
								</div>
								<div class="col l2 m2 s2">
									<button class="btn-floating waves-effect waves-light btn buttonBorrarSeccion" v-on:click="borrarSeccion(clase)">
										<i class="material-icons">delete</i>
									</button>
								</div>
							</div>
						</li>
						<li><hr class="collectionSeparator"></li>
					</ul>

					<!-- <a v-for="clase in clases" class="collection-item" v-on:click="redirect(clase)"> 
						<div v-if="tipo===2">
							{{clase.cuenta}} - {{clase.grado}} {{clase.apartado}} {{clase.ano}} 
						</div>
						<div v-if="tipo===1">
							{{clase.cuenta}}
						</div>
						<div v-if="tipo===3" class="row"> 
							<div class="col l10 m10 s10">
								{{clase.cuenta}} - {{clase.grado}} {{clase.apartado}} {{clase.ano}} 
							</div>
							<div class="col l2 m2 s2">
								<button class="btn-floating waves-effect waves-light btn buttonBorrarSeccion" v-on:click="borrarSeccion(clase)">
									<i class="material-icons">delete</i>
								</button>
							</div>
						</div>
					</a> -->
					
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
				clases: [],
				tipo: 0
			}
		},
		methods: {
			redirect(clase){
				this.$router.push(`/clase?clase=`+clase.cuenta+'&grado='+clase.grado+'&apartado='+clase.apartado+'&year='+clase.ano);
			},
			borrarSeccion(clase){
				this.$router.push('/');
				var confirmado=false;
				swal({
					title: 'Confirme eliminacion de seccion',
					text: 'Seguro(a) que desea eliminar la seccion?',
					type: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#7D2323',
					confirmButtonText: 'Confirmar',
					closeOnConfirm: true
				}, isConfirm =>{
					if(isConfirm){
						this.$http.delete(`${baseUrl.uri}/secciones/borrar/`+clase._id).then((response)=>{
							this.clases.splice(this.clases.indexOf(clase),1);
							if(response.body.success){
								swal('Seccion borrada','Los cambios se veran reflejados cuando recargue la pagina','success');
							}else{
								swal('No se pudo borrar la seccion','Revise su conexion a internet','error');
							}
						});
					}
				});
				
			}
		},
		beforeMount() {
			var usuario=localStorage.getItem('usuario');
			if(usuario===null){
				this.$router.push('/login');
			}else{
				var user=JSON.parse(usuario);
				if(user.scope[0]==='alumno'){
					this.tipo=0;
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
											swal('Error obteniendo las secciones!','Revise su conexion a internet','error');
										}
									});
								}else{
									swal('Error obteniendo la informacion del alumno','Revise su conexion a internet','error');
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
				}else if(user.scope[0]==='maestro'){
					this.tipo=2;
					this.$http.get(`${baseUrl.uri}/usuario/`+user.cuenta).then((response)=>{
						if(response.body.success){
							this.usuario=response.body.usuario;
							this.$http.get(`${baseUrl.uri}/secciones/buscar/maestro/`+this.usuario._id).then((response2)=>{
								if(response2.body.success){
									this.clases=response2.body.secciones;
								}else{
									swal('Error obteniendo clases del maestro','Revise su conexion a internet','error');
								}
							});
						}else{
							swal('Error obteniendo informacion del maestro','Revise su conexion a internet','error');
							localStorage.removeItem('usuario');
							this.$router.push('/login');
						}
					});
				}else if(user.scope[0]==='admin'){
					this.tipo=3;
					this.$http.get(`${baseUrl.uri}/usuario/`+user.cuenta).then((response)=>{
						if(response.body.success){
							this.usuario=response.body.usuario;
							this.$http.get(`${baseUrl.uri}/secciones`).then((response2)=>{
								if(response2.body.success){
									this.clases=response2.body.secciones;
								}else{
									swal('error obteniendo las secciones','Revise su conexion a internet','error');
								}
							});
						}else{
							swal('Error obteniendo informacion del admin','Revise su conexion a internet','error');
							localStorage.removeItem('usuario');
							this.$router.push('/login');
						}
					});
				}
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

	.buttonBorrarSeccion{
		background-color: #7D2323;
	}
	
	.collectionSeparator{
		margin: 0 0;
	}
</style>