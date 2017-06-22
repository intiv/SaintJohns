<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
	        <div class="modal-header">
	        	<!-- tarea-->
	        	<slot name="header" v-if="modo==='tarea'">
	        		<h4 v-if="!modify">Nueva Tarea</h4>
	        		<h4 v-if="modify">Modificar Tarea</h4>
		        	<p>{{tarea.seccion}}<br>Parcial: {{tarea.parcial}}</p>
	          	</slot>
				<!-- seccion -->
	          	<slot name="header" v-if="modo==='seccion'">
					<h4>Nueva Seccion</h4>
	          	</slot>	
	        </div>
	        <div class="modal-body">
	 	       <slot name="body">
	    	        <div class="row">
	    	        	<div class="col l10 m10 s10 offset-l1 offset-m1 offset-s1" v-if="modo==='tarea'">
	    	        		<label for="tituloTarea">Titulo</label>
	    	        		<input type="text" id="tituloTarea" v-model="tarea.titulo" class="validate">
	    	        	</div>
	    	        	<div class="col l10 m10 s10 offset-l1 offset-m1 offset-s1" v-if="modo==='seccion'">
	    	        		<label for="claseSeccion">Clase</label>
	    	        		<input type="text" id="claseSeccion" v-model="section.cuenta" class="validate">
	    	        	</div>
	    	        </div>

	    	        <div class="row">
	    	        	<div class="col l10 m10 s10 offset-l1 offset-m1 offset-s1" v-if="modo==='tarea'">
	    	        		<label for="descTarea" class="active">Descripcion</label>
	    	        		<input type="text" id="descTarea" v-model="tarea.descripcion">
	    	        	</div>
	    	        	
	    	        </div>
	    	        <div class="row">
	    	        	<div class="col l4 m4 s4 offset-l1 offset-m1 offset-s1" v-if="modo==='tarea'">
	    	        		<label for="fecha1Tarea">Fecha Inicial</label>
	    	        		<input type="text" id="fecha1Tarea" v-model="tarea.fecha_de_envio" placeholder="ej: 17/Junio/2017">
	    	        		
	    	        	</div>
	    	        	<div class="col l4 m4 s4 offset-l1 offset-m1 offset-s1" v-if="modo==='tarea'">
	    	        		<label for="fecha2Tarea">Fecha Final</label>
	    	        		<input type="text" id="fecha2Tarea" v-model="tarea.fecha_de_entrega" placeholder="ej: 20/Junio/2017">
	    	        	</div>


	    	        	<div class="col l4 m4 s4 offset-l1 offset-m1 offset-s1" v-if="modo==='seccion'">
	    	        		<label for="gradoSeccion" class="active">Grado</label>
	    	        		<input type="text" id="gradoSeccion" v-model="section.grado">
	    	        	</div>
	    	        	<div class="col l4 m4 s4 offset-l1 offset-m1 offset-s1" v-if="modo==='seccion'">
	    	        		<label for="apartadoSeccion" class="active">Apartado</label>
	    	        		<input type="text" id="apartadoSeccion" v-model="section.apartado">
	    	        	</div>
	    	        </div>
	    	        
	    	        <div class="row" v-if="modo==='tarea'">
	    	        	<div class="col l1 m1 s1 offset-l1 offset-m1 offset-s1">
	    	        		<p id="pts">Puntos: </p>
	    	        	</div>
	    	        	<div class="col l1 m1 s1">
	    	        		<input type="text" v-model="tarea.valor">
	    	        	</div>
	    	        </div>
	    	        <div class="row" v-if="modo==='seccion'">
	    	        	<div class="col l1 m1 s1">
	    	        		Año
	    	        	</div>
	    	        	<div class="col l2 m2 s2">
	    	        		<input type="text" v-model="section.ano">
	    	        	</div>
	    	        	<div class="col l7 m7 s7 offset-l1 offset-m1 offset-s1">
	    	        		<select v-model="seccionMaestro">
	    	        			<option v-for="maestro in maestros" :value="maestro">{{maestro.nombre}}</option>
	    	        		</select>
	    	        	</div>
	    	        </div>
		        </slot>
	        </div>
	        <div class="modal-footer">
	            <slot name="footer">
	            	<div class="row" v-if="modo==='tarea'">
	            		<div class="col 4 m4 s4 offset-l1 offset-m1 offset-s1">
	            			<button class="btn waves-effect waves-light" v-on:click="addTarea()">
	            				Finalizar
	            			</button>
	            		</div>
		              	<div class="col l4 m4 s4 offset-l1 offset-m1 offset-s1">
			            	<button class="modal-default-button btn waves-effect waves-light" v-on:click="$emit('close')">
			            		Cancelar
			              	</button>
		              	</div>
	              	</div>
	              	<div class="row" v-if="modo==='seccion'">
	              		<div class="col 4 m4 s4 offset-l1 offset-m1 offset-s1">
	            			<button class="btn waves-effect waves-light" v-on:click="addSeccion()">
	            				Finalizar
	            			</button>
	            		</div>
		              	<div class="col l4 m4 s4 offset-l1 offset-m1 offset-s1">
			            	<button class="modal-default-button btn waves-effect waves-light" v-on:click="$emit('close')">
			            		Cancelar
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
		name: 'modalTarea',
		data() {
			return {
				tarea: {
					porcentaje_obtenido: 0
				},
				section: {

				},
				maestros: {

				},
				seccionMaestro: {

				}
			}
		},
		props: ['parcial','seccion','modify','homework','modo'],
		methods : {
			addTarea(){
				if(!this.modify){
					this.$http.post(`${baseUrl.uri}/tareas/crear`,this.tarea).then((response)=>{
						if(response.body.success){
							swal('Tarea creada con exito!','','success');
						}else{
							swal('Error creando la tarea!','Revise su conexion a internet','error');
						}
					});
				}else{
					this.$http.put(`${baseUrl.uri}/tareas/modificar/`+this.tarea._id, this.tarea).then((response)=>{
						if(response.body.success){
							swal('Tarea modificada con exito!','Los cambios se reflejaran hasta que recargue la pagina','success');
						}else{
							swal('Error modificando la tarea!','Revise su conexion a internet','error');
						}
					});
				}
				this.$emit('done');
			},
			addSeccion(){
				
				if(!this.seccionMaestro._id){
					swal('Debe elegir un maestro para la seccion','','warning');
				}else{
					var index=this.maestros.indexOf(this.seccionMaestro);
					if(index>-1){
						this.section.maestro=this.seccionMaestro._id;
						this.section.info='';
						this.$http.post(`${baseUrl.uri}/secciones/crear`,this.section).then((response)=>{
							if(response.body.success){
								swal('Seccion creada con exito!','','success');
								this.$emit('done',this.section);
							}else{
								swal('Error al crear seccion!','Revise su conexion a internet y vuelva a intentar','error');
								this.$emit('close');
							}
							
						});
					}else{
						swal('Ocurrio un error con el maestro','Vuelva a intentar','warning');
					}
				}
			}
		},
		beforeMount(){
			alert(this.modo);
			if(this.modo==='seccion'){
				this.$http.get(`${baseUrl.uri}/usuarios/maestros`).then((response)=>{
					if(response.body.success){
						this.maestros=response.body.teachers;
						alert(JSON.stringify(this.maestros));
					}else{
						swal('Error obteniendo maestros','Revise su conexion a internet','error');
						this.$emit('close');
					}
				});
			}
			if(!this.modify){
				this.tarea.seccion=this.seccion;
				this.tarea.parcial=this.parcial;
			}else{
				this.tarea._id=''+this.homework._id;
				this.tarea.seccion=''+this.homework.seccion;
				this.tarea.parcial=this.homework.parcial;
				this.tarea.titulo=''+this.homework.titulo;
				this.tarea.descripcion=''+this.homework.descripcion;
				this.tarea.fecha_de_envio=''+this.homework.fecha_de_envio;
				this.tarea.fecha_de_entrega=''+this.homework.fecha_de_entrega;
				this.tarea.valor=''+this.homework.valor;
			}
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
	#pts{
		color: #B6B6B6;
	}
	.modal-wrapper {
	  display: table-cell;
	  vertical-align: middle;
	}
	.greenTest{
		background-color: darkgreen !important;
	}
	.modal-container {
		width: 45vw;
		height: 70vh;
		max-height: 90vh;
		margin: 0 auto;
		padding: 20px 30px;
		background-color: #fff;
		border-radius: 2px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
		transition: all .3s ease;
		font-family: Helvetica, Arial, sans-serif;
		display: block;
		overflow-y: auto;
		overflow-x: hidden;
	}
	.modal-footer{
		padding-bottom: 7px;
		padding-left: 10%;
	}
	.modal-header h3 {
	  margin-top: 0;
	  margin-left: 25%;
	  color: #42b983;
	}
	select{
		display: inline;
	}
	.modal-body {
	  margin: 20px 0;
	  margin-left: 25px;
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

	button{
		width: 10vw;
		font-size: 1vw;
		text-align: center;
	}
</style>