<template>
	<div id="claseRoot">
		
		<div id="claseInfo">
			<h3><b><u> {{seccion.cuenta}} </u></b></h3>
			<ul>
				<li>Grado: {{seccion.grado}} </li>
				<li>Apartado: {{seccion.apartado}} </li>
				<li>Año: {{seccion.ano}} </li>
				<li>Maestro: {{seccion.maestro}} </li>
				<li><hr></li>
				<li><h5>Descripcion de la clase</h5></li>
				<div class="row">
					<div class="col l10 m10 s10 offset-l1 offset-m1 offset-s1" v-if="!modifyingInfo">
						<div class="row">
							<div class="col l10 m10 s10 push-l1 push-m1 push-s1">

								<li> {{seccion.info}}</li>
							</div>
							<div class="col l1 m1 s1 push-l1 push-m1 push-s1">
								<button class="btn-floating waves-light waves-effect btn" v-on:click="modifyingInfo=true"><i class="material-icons">create</i></button>
							</div>
						</div>
					</div>
					<div class="col l10 m10 s10 " v-if="modifyingInfo">
						<li>
							<input type="text" id="modifySeccionInfo" v-model="seccion.info">
						</li>
					</div>
					<div class="col l2 m2 s2" v-if="modifyingInfo">
						<button class=" waves-light waves-effect btn" v-on:click="updateInfo()">Terminar</button>
					</div>
				</div>
			</ul>
		</div>
		<hr>
		<h4><i class="material-icons small">list</i>Tareas</h4>
		<div id="tareasContainer">
			<ul class="collapsible" data-collapsible="accordion">
				<li>
					<div v-on:click="collapse" class="collapsible-header">
						<div class="row">
							<div class="col l10 m10 s10">
								Parcial 1
							</div>
							<div class="col l2 m2 s2">
								<button class="buttonAgregarTarea btn-floating waves-effect waves-light btn" v-on:click="nuevaTarea(1)">
									<i class="material-icons agregar">add</i>
								</button>
							</div>
						</div>
					</div>
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
											<button class="buttonAccionTarea waves-effect waves-light btn" v-on:click="redirect(tarea._id)" v-if="isStudent===0">
												<div class="buttonText" v-if="isStudent===0">Agregar</div>
												<div class="buttonText" v-if="isStudent===1">Revisar</div>
											</button>
										</div>
										<div class="col l1 m1 s1">
											<button :v-if="(isStudent===1||isStudent===2)" class="buttonModificarTarea btn-floating waves-effect waves-light btn orange" v-on:click="modificar(tarea)"> 
												<i class="material-icons">create</i>
											</button>
										</div>
										<div class="col l1 m1 s1">
											<button v-if="isStudent===0" class="buttonBorrarTarea btn-floating waves-effect waves-light btn" v-on:click="borrar(1,tarea)">
												<i class="material-icons">delete</i>
											</button>
										</div>
									</div>
								</div>
							</li>
							<hr>
						</ul>
					</div>
				</li>
				<li>
					<div v-on:click="collapse" class="collapsible-header">
						<div class="row">
							<div class="col l10 m10 s10">
								Parcial 2
							</div>
							<div class="col l2 m2 s2">
								<button class="buttonAgregarTarea btn-floating waves-effect waves-light btn" v-on:click="nuevaTarea(2)">
									<i class="material-icons agregar">add</i>
								</button>
							</div>
						</div>						
					</div>
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
										<div class="col l1 m1 s1">
											<button :v-if="(isStudent===1||isStudent===2)" class="buttonModificarTarea btn-floating waves-effect waves-light btn orange" v-on:click="modificar(tarea)"> 
												<i class="material-icons">create</i>
											</button>
										</div>
										<div class="col l1 m1 s1">
											<button v-if="isStudent===1||isStudent===2" class="buttonBorrarTarea btn-floating waves-effect waves-light btn" v-on:click="borrar(2,tarea)">
												<i class="material-icons small">delete</i>
											</button>
										</div>
									</div>
								</div>
							</li>
							<li><hr></li>	
						</ul>
					</div>
				</li>
				<li>
					<div v-on:click="collapse" class="collapsible-header">
						<div class="row">
							<div class="col l10 m10 s10">
								Parcial 3
							</div>
							<div class="col l2 m2 s2">
								<button class="buttonAgregarTarea btn-floating waves-effect waves-light btn" v-on:click="nuevaTarea(3)">
									<i class="material-icons agregar">add</i>
								</button>
							</div>
						</div>

					</div>
					<div class="collapsible-body">
						<ul class="collapsible" data-collapsible="accordion" v-for="tarea in parcial3">
							<li>
								<div v-on:click="collapse" class="collapsible-header">
									<div class="row">
										<div class="col l12 m12 s12">
											{{tarea.titulo}} - {{tarea.parcial}}: {{tarea.valor}} Puntos
										</div>
										
									</div>
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
										<div class="col l1 m1 s1">
											<button :v-if="(isStudent===1||isStudent===2)" class="buttonModificarTarea btn-floating waves-effect waves-light btn orange" v-on:click="modificar(tarea)"> 
												<i class="material-icons">create</i>
											</button>
										</div>
										<div class="col l1 m1 s1">
											<button :v-if="(isStudent===1||isStudent===2)" class="buttonBorrarTarea btn-floating waves-effect waves-light btn"  v-on:click="borrar(3,tarea)">
												<i class="material-icons">delete</i>
											</button>
										</div>
									</div>
								</div>
							</li>
							<li><hr></li>	
						</ul>
					</div>
				</li>
				<li>
					<div v-on:click="collapse" class="collapsible-header">
						<div class="row">
							<div class="col l10 m10 s10">
								Parcial 4
							</div>
							<div class="col l2 m2 s2">
								<button class="buttonAgregarTarea btn-floating waves-effect waves-light btn" v-on:click="nuevaTarea(4)">
									<i class="material-icons agregar">add</i>
								</button>
							</div>
						</div>
					</div>
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
										<div class="col l1 m1 s1">
											<button :v-if="(isStudent===1||isStudent===2)" class="buttonModificarTarea btn-floating waves-effect waves-light btn orange" v-on:click="modificar(tarea)"> 
												<i class="material-icons">create</i>
											</button>
										</div>
										<div class="col l1 m1 s1">
											<button v-if="isStudent===1" class="buttonBorrarTarea btn-floating waves-effect waves-light btn" v-on:click="borrar(4,tarea)">
												<i class="material-icons">delete</i>
											</button>
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
		<modalTarea v-if="showModal" @close="showModal=false" @done="finishModal()" :parcial="parcial" :seccion="sec"></modalTarea>
		<modalTarea v-if="showModify" @close="showModify=false" @done="finishModal()" :modify="true" :homework="tareaToModify"></modalTarea>
	</div>
</template>

<script>
	import baseUrl from '../../config'
	import modalTarea from './ModalTarea.vue'
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
				sec: '',
				showModal: false,
				showModify: false,
				tareaToModify: {

				},
				parcial: 0,
				modifyingInfo: false
			}
		},
		components: {
			modalTarea
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
				this.parcial1= [];
				this.parcial2= [];
				this.parcial3= [];
				this.parcial4= [];
				
				this.deleteTarea(tarea._id);
				$('.collapsible')
			},
			deleteTarea(id){
				this.$http.delete(`${baseUrl.uri}/tareas/borrar/`+id).then((response)=>{
					if(response.body.success){
						swal('Tarea borrada con exito!','','success');
						this.getTareas();
					}else{
						swal('Error borrando la tarea!','Revise su conexion a internet','error');
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
								if(this.parcial3.indexOf(currHW)===-1){
									this.parcial3.push(currHW);
								}
							}else if(currHW.parcial===3){
								if(this.parcial3.indexOf(currHW)===-1){
									this.parcial3.push(currHW);
								}
							}else if(currHW.parcial===4){
								if(this.parcial3.indexOf(currHW)===-1){
									this.parcial3.push(currHW);
								}
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
			},
			nuevaTarea(parcial){
				this.parcial=parcial;
				this.showModal=true;
			},
			finishModal(){
				// this.parcial1=[],
				// this.parcial2=[],
				// this.parcial3=[],
				// this.parcial4=[],
				this.showModal=false;
				this.showModify=false;
				// this.getTareas();
				// $('.collapsible').collapsible();
			},
			modificar(tarea){
				this.tareaToModify=tarea;
				this.showModify=true;
			},
			updateInfo(){
				this.$http.put(`${baseUrl.uri}/secciones/info/`+this.seccion._id,this.seccion).then((response)=>{
					if(!response.body.success){
						swal('No se actualizo la informacion!','Revise su conexion a internet','error');
					}
					this.modifyingInfo=false;
					//modify
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
				var scope=JSON.parse(localStorage.getItem('usuario')).scope;
				if(scope=='admin'){
					this.isStudent=2;
				}else if(scope=='maestro'){
					this.isStudent=1;
				}
				this.$http.get(`${baseUrl.uri}/seccion/buscar?cuenta=`+query.clase+'&grado='+query.grado+'&year='+query.year+'&apartado='+query.apartado).then((response)=>{
					if(response.body.success){
						
						this.sec=(query.year+'_'+query.grado+'_'+query.apartado+'_'+query.clase);
						this.getTareas();
						this.seccion=response.body.seccion;
						this.$http.get(`${baseUrl.uri}/usuarios/maestros/`+this.seccion.maestro).then((respuesta)=>{
							if(respuesta.body.success){
								this.seccion.maestro=respuesta.body.teacher.nombre;
							}else{
								this.seccion.maestro='';
								swal('Error obteniendo maestro',respuesta.body.message,'error');
							}
						});
												
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
		font-size: 1vw;
		text-align: center;
	}

	.buttonAccionTarea{
		width: 10vw;
		font-size: 1vw;
		background-color: #15497B;
		text-align: center;
	}

	.buttonAgregarTarea{
		padding-left: 1.7%;
		font-size: 1vw;
		text-align: center;
		width: 2.5vw;
		height: 5vh;
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