<template>
	<div id="root">
		<div v-bind:style="{ backgroundImage: 'url(../back_blue.jpg)'}">
		<div> 
			<input type="text " name="buscar_maestros" v-model="con">
		</div>
		<div id="botondemodal">
			<button id="show-modal" v-on:click="showModal = true"  class="btn">Crear nuevo Alumno</button>
		</div>
		
		<div class="row" >
			<div class="col l10 offset-l1" id="tablaContainer">
				<table id="tabla" class="centered bordered white">
					<colgroup>
						<col style="width:20%">
						<col style="width:20%">
						<col style="width:10%">
						<col style="width:3%">
						<col style="width:12%">
						<col style="width:15%">
						<col style="width:10%">
						<col style="width: 10%">
					</colgroup>
					<thead>
						<tr>
							<td>Nombre</td>
							<td>Apellido</td>
							<td>Fecha de Nacimiento</td>
							<td>Teléfono</td>
							<td>Dirección</td>
							<td>Correo</td>
							<td>Borrar</td>
							<td>Cuenta</td>
						</tr>
					</thead>
					<tbody>
						<tr v-for="row in rows">
							<td>{{row.nombre}}</td>
							<td>{{row.apellido}}</td>
							<td>{{row.fecha_de_nacimiento}}</td>
							<td>{{row.telefono}}</td>
							<td>{{row.direccion}}</td>
							<td>{{row.correo}}</td>
							
							<td>
								<button v-on:click="removeMaestro(row)"><i class="small material-icons">delete</i></button>

						
							</td>
							<td>
								<button v-on:click="obteneralumno(row)"><i class="small material-icons">delete</i></button>				
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		</div>
		<modal1 v-if="showModal" @close="showModal = false">

		</modal1>
	</div>
</template>

<script>
import modal1 from './modal1.vue'
import baseUrl from '../../config'
	export default{
		name: 'principal',
		data(){
			return{
				showModal:false,
				rows: [],
				grado:'',
				con:''

			}
				
			
		},
		watch:{
			con: function () {
				if(this.con===""){
					this.$http.get(`${baseUrl.uri}/usuarios/alumnos`).then((response)=>{
					this.rows=response.body.alumnos;
				
					});
				}else{
    			this.$http.get(`${baseUrl.uri}/usuarios/filtro1/`+this.con).then((response)=>{
					this.rows=response.body.users;
				
			});		  
    		}
   			}
		},
		methods : {
			
			removeMaestro(row){
				var index=this.rows.indexOf(row);
				this.$http.delete(`${baseUrl.uri}/usuarios/borrar/`+ this.rows[index]._id).then((response)=>{
				});
				this.rows.splice(index,1);	
				if(this.rows.length==0){
					this.rows='false';
				}
				
			},
			obteneralumno(row){
				var index=this.rows.indexOf(row);
				this.$http.get(`${baseUrl.uri}/alumnos/buscar/idu/`+ this.rows[index]._id).then((response)=>{
					swal({
						title: response.body.student.cuenta,
						text: '',
						type: 'success'
					});
				});
			}
		},
		components : {
			modal1
		},

		beforeMount(){
			this.$http.get(`${baseUrl.uri}/usuarios/alumnos`).then((response)=>{
					this.rows=response.body.alumnos;
				
			});
		}

	}
</script>

<style scoped>
table{
		max-height: 100% !important;
		height: 70vh;
		width: 66.25vw;
		overflow-y: scroll;
		overflow-x: auto;
		display: block;
		border: none;
		font-size: 2vh;
	}   
th,td{
		border: 1px solid black;
		border-collapse: collapse;
	}
	th{
		text-align: center;
		filter: saturate(40%);
		
		border: 2px solid black;
	}
	thead{
		background-color: lightgrey;
	}
	td{
		text-align: left;
	}
	tbody{
		overflow-y: scroll;
	}

	#root{
		margin: 1% 25% 2% 2%;	
		background-image: url('../back_blue.jpg');
		background-size: cover;	
		font-family: "Roboto";
	}

	#inputs{
		border-radius: 8px;
		border: solid lightgrey;
		padding: 2%;
		background-color: #0C374D;
	}

	.input-field input[type="text"]:focus + label{
		color: #2890CC !important;
	}

	.input-field input[type="text"]:focus{
		border-bottom: 1px solid #2890CC;
		box-shadow: 0 1px 0 0 #2890CC;
	}

	.input-field input[type="text"]{
		border-bottom: 1px solid white;
		box-shadow: 0 1px 0 0 white;
		color: white;
	}

	.input-field label{
		color: white;
		font-size: 14px !important;
	}

	h2{
		text-align: center;
		color: white;
	}

	.btn{
		background-color: #2890CC !important; 
	}

	table{
		border: 0.5px solid black;
		text-align: center;
	}
</style>