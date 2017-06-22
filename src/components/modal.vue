<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
	        <div class="modal-header">
	        	<slot name="header">
	        		<label >Agregar un nuevo Maestro</label>

	          	</slot>
	        </div>
	        <div class ="modal-body">
	 	       <slot name="body">
	    	       <div class="row">
         <form class="col s12">
            <div class="row">
               <div class="input-field col s5">
                  <i class="material-icons prefix">account_circle</i>
                  <input  id="name" type="text" class="active validate" v-model="maestro.nombre" >
                  <label for="name">Nombre</label>
               </div>
               <div class="input-field col s7">      
               		<div id="ape">
               		
                  <input  type="text" class="active validate" v-model="maestro.apellido">
                  <label for="name">Apellido</label>
                  </div>
                            
               </div>
            </div>
            <div class="row">
               <div class="input-field col s12">
               		 <i class="material-icons prefix">email</i>
                  <input  id="email" type="email" class="validate" v-model="maestro.correo">
                  <label for="email">Correo Electronico</label>
               </div>
            </div>
            <div class="row">
               <div class="input-field col s12">
			      <i class="material-icons prefix">mode_edit</i>
                  <textarea id="address" class="materialize-textarea" v-model="maestro.direccion"></textarea>
                  <label for="address">Dirección</label>
               </div>
            </div>			
             <div class="row">
              <div class="input-field col s5">
          		<i class="material-icons prefix">phone</i>
          		<input id="icon_telephone" type="tel" class="validate" v-model="maestro.telefono">
          		<label for="icon_telephone">Teléfono</label>
        	</div>
        	
            <div class="input-field col s7">
				<div id="ano">     
                  <input id="año" class="validate" v-model="maestro.fecha" type="text">
                  <label for="año">Año de Nacimiento</label>
               </div>

            </div>			
           
           
        	</div>
        	 <div class="row">
               <div class="input-field col s12">
               		 <i class="material-icons prefix">lock_outline</i>
                  <input id="contrasena" type="text" class="validate" v-model="maestro.contrasena">
                  <label for="Contraseña">Contraseña</label>
               </div>
            </div>

             
         </form>       
      </div>
		        </slot>
	        </div>
	        <div class="modal-footer">
	            <slot name="footer">
	            	<div class="row" id="buttonsMaestroContainer">
		            	<div id="boton_Aceptar" class="col l4 m4 s4 offset-l1 offset-m1 offset-s1">
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
		name: 'modal',
		data() {
			return{
				maestro : {
					nombre: '',
					apellido: '',
					fecha: '',
					direccion: '',
					telefono: '',
					tipo: 'maestro',
					correo: '',
					scope:['maestro'],
					contrasena: '',
					usuario:'',
					id:0 					
				}
			
			}
		},
		methods : {
			createBook(){
					this.maestro.usuario=this.maestro.correo;
					this.$http.post(`${baseUrl.uri}/usuarios/crear`,this.maestro).then((response)=>{
						swal({
							title: 'Maestro(a) creado con èxito!',
							text: '',
							type: 'success'
						});
					
					});
					this.$emite('close');

			}
			
		},
		beforeMount(){

		}
		
	}
</script>

<style scoped>
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

	#buttonsMaestroContainer{
		margin-left: 15%;
	}
	.modal-wrapper {
	  display: table-cell;
	  vertical-align: middle;
	}

	.modal-container {
	  width: 900px;
	  height: 600px;
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