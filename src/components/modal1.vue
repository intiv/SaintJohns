<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
	        <div class="modal-header">
	        	<slot name="header">
	        		<label >Agregar un nuevo Alumno</label>

	          	</slot>
	        </div>
	        <div class ="modal-body">
	 	       <slot name="body">
			    	   <div class="row">
		         
			               <div class="input-field col s5">
			                  <i class="material-icons prefix">account_circle</i>
			                  <input  id="name" type="text" class="active validate" v-model="alumno.nombre" >
			                  <label for="name">Nombre</label>
			               </div>
			           <div class="input-field col s6">      
			               	<div id="ape">
			               		
			                  <input  type="text" class="active validate" v-model="alumno.apellido">
			                  <label for="name">Apellido</label>
			                </div>
		                            
		               </div>
		          
		            </div>
		            <div class="row">
		            	<div class="col l1">
		            		<label>Apartado</label>
		            	</div>
				      	<div class="col l4">
							<select v-model="apartado">
								<option value="" disabled selected>Apartado</option>
								<option value="A">A</option>
								<option value="B">B</option>
							</select>          
				      	</div>
				      	<div class="col l1 push-l1">
				      		<label>Grado</label>
				      	</div>
				       	<div class="col l4 push-l1">
							<select v-model="grado">
								<option value="" disabled selected>Grado</option>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
								<option value="6">6</option>
								<option value="7">7</option>
								<option value="8">8</option>
								<option value="9">9</option>
								<option value="10">10</option>
								<option value="11">11</option>
							</select>         
				      	</div>
				     </div>
		            <div class="row">
		               <div class="input-field col l11 s11 m11">
		               		<i class="material-icons prefix">email</i>
		                	<input  id="email" type="email" class="validate" v-model="alumno.correo">
		                	<label for="email">Correo Electronico</label>
		               </div>
		            </div>
		            <div class="row">
		               	<div class="input-field col s11">
					    	<i class="material-icons prefix">mode_edit</i>
		                	<textarea id="address" class="materialize-textarea" v-model="alumno.direccion"></textarea>
		                	<label for="address">Dirección</label>
		               	</div>
		            </div>			
		            <div class="row">
		              	<div class="input-field col s5">
			          		<i class="material-icons prefix">phone</i>
			          		<input id="icon_telephone" type="tel" class="validate" v-model="alumno.telefono">
			          		<label for="icon_telephone">Teléfono</label>
						</div>
						<div class="input-field col s6">
							<div id="ano">     
								<input id="año" class="validate" v-model="alumno.fecha" type="text">
								<label for="año">Año de Nacimiento</label>
							</div>
						</div>
		            </div>	
		             
		        	<div class="row">
		                <div class="input-field col s11">
		               		<i class="material-icons prefix">lock_outline</i>
		                    <input id="contrasena" type="text" class="validate" v-model="alumno.contrasena">
		                    <label for="Contraseña">Contraseña</label>
		               </div>
		            </div>
		        </slot>
		    </div>
	        <div class="modal-footer">
	            <slot name="footer">
		            <div class="row" id="buttonsCrearAlumnoContainer">

		              	<div id="boton_Aceptar" class="col l4 m4 s4 offset-l1">
							<button class="btn" v-on:click="createBook">Finalizar</button>
						</div>
						<div class="col l6 m6 s6">
			            	<button class="modal-default-button btn" v-on:click="$emit('close')">
			            		Cerrar
			              	</button>
		              	</div>
					</div>
	            </slot>
	        </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import baseUrl from '../../config'
	export default{
		name: 'modal1',
		data() {
			return{
				alumno : {
					nombre: '',
					apellido: '',
					fecha: '',
					direccion: '',
					telefono: '',
					tipo: 'alumno',
					correo: '',
					scope:['alumno'],
					contrasena: '',
					usuario:'',
					id:0 					
				},
				apartado:'A',
				grado:'5',
				ano:'2017',
				id:'',
				alum:{
					id_padre:'',
					cuenta:'',
					id_user:'',
					nombre:''

				}	

			}
		},
		methods : {
			createBook(){
					this.alumno.usuario=this.alumno.correo;
					
					this.$http.post(`${baseUrl.uri}/usuarios/crear`,this.alumno).then((response)=>{
						if(response.body.success){
							this.alum.cuenta=this.grado+'_'+this.apartado+'_'+'2017';
							this.alum.id_user=response.body.user._id;
							this.alum.nombre=(this.alumno.nombre+' '+this.alumno.apellido);
							this.$http.post(`${baseUrl.uri}/alumnos/crear`,this.alum).then((response2)=>{
								if(response2.body.success){
									swal('Alumno creado con exito!','','success');
								}else{
									swal('Error creando alumno!','Revise su conexion a internet','error');
								}
						
							});	
						}else{
							swal('Error creando el usuario para el alumno!','Revise su conexion a internet','error');
						}		
					});
			},
			obteneralumno(){
				
			}	
			
		},
		beforeMount(){

		}
		
	}
</script>

<style scoped>

	select{
		display: block;
	}
	.modal-mask {
		position: fixed;
		z-index: 9998;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
		display: table;
		transition: opacity .3s ease;
	}

	.modal-wrapper {
	  display: table-cell;
	  vertical-align: middle;
	}

	#buttonsCrearAlumnoContainer{
		margin-left: 17%;
	}

	.modal-container {
	  width: 60vw;
	  height: 80vh;
	  margin: 0px auto;
	  padding: 20px 30px;
	  background-color: #fff;
	  border-radius: 2px;
	  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
	  transition: all .3s ease;
	  font-family: Helvetica, Arial, sans-serif;
	}

	.modal-header h3 {
	  margin-top: 0;
	  color: #42b983;
	}

	.modal-body {
	  margin: 20px 0;
	}

	.modal-enter {
	  opacity: 0;
	}

	.modal-leave-active {
	  opacity: 0;
	}

	.modal-enter .modal-container,
	.modal-leave-active .modal-container {
	  -webkit-transform: scale(1.1);
	  transform: scale(1.1);
	}
	#ape{
		margin-left: 3vw;
	}
	#ano{
		margin-left: 3vw;
	}
	
	.btn{
		background-color: #2890CC !important; 
	}

</style>