<template>
	<div id="claseRoot">
		
		<div id="claseInfo">
			<h3>{{seccion.cuenta}}</h3>
			<ul>
				<li>Grado: {{seccion.grado}} </li>
				<li>Apartado: {{seccion.apartado}} </li>
				<li>Año: {{seccion.ano}} </li>
				<li>Maestro: {{seccion.maestro}} </li>
			</ul>
		</div>
		<hr>
		<h4><i class="material-icons small">list</i>Tareas</h4>
		<div id="tareasContainer">
			<ul class="collapsible" data-collapsible="accordion">
				<li>
					<div v-on:click="collapse" class="collapsible-header">Parcial 1</div>
					<div class="collapsible-body">
						<ul class="collapsible" data-collapsible="accordion" v-for="tarea in parcial1">
							<li>
								<div v-on:click="collapse" class="collapsible-header">
									{{tarea.titulo}} - Parcial {{tarea.parcial}}: {{tarea.valor}} Puntos
								</div>
								<div class="collapsible-body">
									<div class="row">
										<div class="col l18 m8 s8">
											<span>{{tarea.descripcion}} <br>
												Fecha asignada: {{tarea.fecha_de_envio}}<br>
												Fecha maxima de entrega: {{tarea.fecha_de_entrega}}
											</span> 
										</div>
										<div class="col l2 m2 s2">
											<button id="" class="buttonAccionTarea waves-effect waves-light btn" v-on:click="redirect(tarea._id)" v-if="isStudent===0">
												<div class="buttonText" v-if="isStudent===0">Agregar</div>
												<div class="buttonText" v-if="isStudent===1">Revisar</div>
											</button>
										</div>
										<div class="col l2 m2 s2">
											<button v-if="isStudent===0" class="buttonBorrarTarea btn-floating waves-effect waves-light btn" v-on:click="borrar(1,tarea)">X</button>
										</div>
									</div>
								</div>
							</li>
							<hr>
						</ul>
					</div>
				</li>
				<li>
					<div v-on:click="collapse" class="collapsible-header">Parcial 2</div>
					<div class="collapsible-body">
						<ul class="collapsible" data-collapsible="accordion" v-for="tarea in parcial2">
							<li>
								<div v-on:click="collapse" class="collapsible-header">{{tarea.titulo}} - {{tarea.parcial}}: {{tarea.valor}} Puntos</div>
								<div class="collapsible-body">
									<div class="row">
										<div class="col l8 m8 s8">
											<span>{{tarea.descripcion}} <br>
												Fecha asignada: {{tarea.fecha_de_envio}}<br>
												Fecha maxima de entrega: {{tarea.fecha_de_entrega}}
											</span> 
										</div>
										<div class="col l2 m2 s2">
											<button class="buttonAccionTarea waves-effect waves-light btn" v-on:click="redirect(tarea._id)" v-if="isStudent===0">
												<div class="buttonText" v-if="isStudent===0">Agregar</div>
												<div class="buttonText" v-if="isStudent===1">Revisar</div>
											</button>
										</div>
										<div class="col l2 m2 s2">
											<button v-if="isStudent===0" class="buttonBorrarTarea btn-floating waves-effect waves-light btn" v-on:click="borrar(2,tarea)">X</button>
										</div>
									</div>
								</div>
							</li>
							<li><hr></li>	
						</ul>
					</div>
				</li>
				<li>
					<div v-on:click="collapse" class="collapsible-header">Parcial 3</div>
					<div class="collapsible-body">
						<ul class="collapsible" data-collapsible="accordion" v-for="tarea in parcial3">
							<li>
								<div v-on:click="collapse" class="collapsible-header">
									{{tarea.titulo}} - {{tarea.parcial}}: {{tarea.valor}} Puntos
								</div>
								<div class="collapsible-body">
									<div class="row">
										<div class="col l8 m8 s8">
											<span>{{tarea.descripcion}} <br>
												Fecha asignada: {{tarea.fecha_de_envio}}<br>
												Fecha maxima de entrega: {{tarea.fecha_de_entrega}}
											</span> 
										</div>
										<div class="col l2 m2 s2">
											<button class="buttonAccionTarea waves-effect waves-light btn" v-on:click="redirect(tarea._id)" v-if="isStudent===0">
												<div class="buttonText" v-if="isStudent===0">Agregar</div>
												<div class="buttonText" v-if="isStudent===1">Revisar</div>
											</button>
										</div>
										<div class="col l2 m2 s2">
											<button v-if="isStudent===0" class="buttonBorrarTarea btn-floating waves-effect waves-light btn"  v-on:click="borrar(3,tarea)">X</button>
										</div>
									</div>
								</div>
							</li>
							<li><hr></li>	
						</ul>
					</div>
				</li>
				<li>
					<div v-on:click="collapse" class="collapsible-header">Parcial 4</div>
					<div class="collapsible-body">
						<ul class="collapsible" data-collapsible="accordion" v-for="tarea in parcial4">
							<li>
								<div v-on:click="collapse" class="collapsible-header">
									{{tarea.titulo}} - {{tarea.parcial}}: {{tarea.valor}} Puntos
								</div>
								<div class="collapsible-body">
									<div class="row">
										<div class="col l8 m8 s8">
											<span>{{tarea.descripcion}} <br>
												Fecha asignada: {{tarea.fecha_de_envio}}<br>
												Fecha maxima de entrega: {{tarea.fecha_de_entrega}}
											</span> 
										</div>
										<div class="col l2 m2 s2">
											<button id="" class="buttonAccionTarea waves-effect waves-light btn" v-on:click="redirect(tarea._id)" v-if="isStudent===0">
												<div class="buttonText" v-if="isStudent===0">Agregar</div>
												<div class="buttonText" v-if="isStudent===1">Revisar</div>
											</button>
										</div>
										<div class="col l2 m2 s2">
											<button v-if="isStudent===0" class="buttonBorrarTarea btn-floating waves-effect waves-light btn" v-on:click="borrar(4,tarea)">X</button>
										</div>
									</div>
								</div>
							</li>
							<li><hr></li>	
						</ul>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import baseUrl from '../../config'
	export default{
		name: 'Clase',
		data() {
			return{
				parcial1: [],
				parcial2: [],
				parcial3: [],
				parcial4: [],
				seccion: {
					cuenta: '',
					grado: '',
					apartado: '',
					maestro: '',
					ano: ''
				},
				colapsado: false,
				isStudent: 0,
				sec: ''
			}
		},
		methods : {
			collapse(){
				if(!this.colapsado){
					$('.collapsible').collapsible();
					this.colapsado=true;
				}
			},
			redirect(id){
				this.$router.push('/tarea?id='+id);
			},
			borrar(indice,tarea){
				if(indice===1){
					this.parcial1= [];
				}else if(indice===2){
					this.parcial2= [];
				}else if(indice===3){
					this.parcial3= [];
				}else if(indice===4){
					this.parcial4= [];
				}
				this.deleteTarea(tarea._id);
			},
			deleteTarea(id){
				this.$http.delete(`${baseUrl.uri}/tareas/borrar/`+id).then((response)=>{
					if(response.body.success){
						swal('awilson','','success');
						this.getTareas();
					}else{
						swal('Error!',response.body.message,'error');
					}
				});
			},
			getTareas(){
				this.$http.get(`${baseUrl.uri}/tareas/buscar/seccion/`+this.sec).then((response)=>{
					if(response.body.success){
						for(var i =0; i<response.body.tareas.length; i++){
							var currHW = response.body.tareas[i];
							if(currHW.parcial===1){
								if(this.parcial1.indexOf(currHW)===-1){
									this.parcial1.push(currHW);
								}
							}else if(currHW.parcial===2){
								this.parcial2.push(currHW);
							}else if(currHW.parcial===3){
								this.parcial3.push(currHW);
							}else if(currHW.parcial===4){
								this.parcial4.push(currHW);
							}
						}
					}else{
						swal(
							'Error obteniendo tareas',
							'Revise su conexion a internet o pongase en contacto con los desarrolladores',
							'error'
						);
					}
				});
			}
		},
		beforeMount(){
			$('.collapsible').collapsible();
			var query = this.$route.query;
			if(JSON.parse(localStorage.getItem('usuario'))===null){
				swal('No puede acceder a esta pagina!','Debe hacer login antes de acceder a la pagina','warning');
				this.$router.push('/login');
			}else{
				this.$http.get(`${baseUrl.uri}/seccion/buscar?cuenta=`+query.cuenta+'&grado='+query.grado+'&year='+query.year+'&apartado='+query.apartado).then((response)=>{
					if(response.body.success){
						this.seccion=response.body.seccion;
						this.$http.get(`${baseUrl.uri}/usuarios/maestros/`+this.seccion.maestro).then((respuesta)=>{
							if(respuesta.body.success){
								this.seccion.maestro=respuesta.body.teacher.nombre;
							}else{
								swal('Error obteniendo maestro',respuesta.body.message,'error');
							}
						});
						this.sec=(query.year+'_'+query.grado+'_'+query.apartado+'_'+query.cuenta);
						this.getTareas();						
					}else{
						swal('Error obteniendo seccion',response.body.message+', '+response.body.tipo,'error');
					}
				});
			}
		}
	}
</script>

<style scoped>

	#claseInfo{
		text-align: center;
	}

	#tareasContainer{
		max-height: 50vh;
		overflow-y: scroll;
		overflow-x: auto;
		display: block;
	}

	.buttonText{
		font-size: 1vw;
	}

	.buttonBorrarTarea{
		width: 3vw;
		background-color: #7D2323;
	}

	.buttonAccionTarea{
		width: 10vw;
		font-size: 1vw;
		background-color: #15497B;
	}

	.buttonBorrarTarea:hover{
		background-color: #612B2B;
		transition: background-color 0.3s ease-in-out;
	}

	.buttonAccionTarea:hover{
		background-color: #13416D;
		transition: background-color 0.3s ease-in-out;
	}

</style>