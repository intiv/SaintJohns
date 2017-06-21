<template>
	<div id="loginRoot">
		<div id="container">
			<div class="row" id="header">
				<div class="col l4 m4 s4">
					<img src="../imgs/icon.jpg" class="circle responsive-image" alt="icono" id="logo">
				</div>
				<div class="col l8 m8 s8" id="title">
					<h3>Saint John's </h3>
					<h3>Bilingual School</h3>
				</div>
			</div>
			<div id="body">
				<div class="row">
					<div class="input-field col l10 m10 s10 offset-l1 offset-m1 offset-s1">
						<input type="text" id="username" placeholder="Username" class="validate" v-model="user.usuario">	
					</div>
				</div>
				<div class="row">
					<div class="col l10 m10 s10 offset-l1 offset-m1 offset-s1 input-field">
						<input type="password" name="password" id="password" placeholder="Password" v-model="user.contrasena">
					</div>
				</div>
				<div class="row" id="boton">
					<div class="col l12 m12 s12">
						<button class="btn" v-on:click="verify()">Ingresar</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import baseUrl from '../../config'
	export default {
		name : 'login',
		data() {
			return {
				user: {
					usuario: '',
					contrasena:''
				},
				valid: true
			}
		},
		mounted() {
		},
		methods : {
			verify(){
				var message='';
				if(this.user.usuario.length==0){
					this.valid=false;
					message+='-Usuario no puede ser vacio\n';
				}
				if(this.user.contrasena.length==0){
					this.valid=false;
					message+='-Contraseña no puede ser vacia\n';
				}
				if(/^[a-zA-z0-9]+$/.test(this.user.usuario) && /^[a-zA-z0-9]+$/.test(this.user.contrasena)){
					this.valid=true;
				}else{
					message+='-Usuario y contraseña solo deben tener letras y numeros';
					this.valid=false;
				}
				if(this.valid){
					if(this.valid){
						this.$http.post(`${baseUrl.uri}/login`,this.user).then((response)=>{
							if(response.body.success){
								swal({
									title: 'Bienvenido(a)!',
									type: 'success'
								});
								alert(JSON.stringify(response.body.usuario));
								localStorage.setItem(
									'usuario',
									JSON.stringify({
										usuario: response.body.usuario, 
										scope: response.body.scope, 
										cuenta: response.body.cuenta
									})
								);
								this.$router.push('/');
							}else{
								if(response.body.tipo==='length' || response.body.tipo==='null'){
									message+='-Usuario no encontrado. Verifique sus credenciales';
								}else if(response.body.tipo==='err'){
									message+='-Ocurrio un error con la BD. Verifique su coneccion a internet e intente de nuevo';
								}
								swal({
									title: 'Login falló!',
									text: 'Razones:\n'+message,
									type: 'error'
								});
							}
						});
					}
				}else{
					swal({
						title: 'Login falló!',
						text: 'Razones:\n'+message,
						type: 'error'
					});
					this.valid=true;
				}
			}
		},
		beforeMount(){
			if(localStorage.getItem('usuario')!=null){
				localStorage.removeItem('usuario');
				// this.$http.put(`${baseUrl.uri}/logout`).then((response)=>{
					
				// });
			}
		}
	}
</script>

<style scoped>

	h3{
		font-size: 3vw;
		color: white;
	}

	#loginRoot{
		width:100vw;
		height: 100vh;
		background-image: url('../../imgs/bluegradient.jpg');
		background-repeat: no-repeat;
		background-size: cover;
		padding-top: 10%;
		-webkit-animation: fadein 1s; /* Safari, Chrome and Opera > 12.1 */
        -moz-animation: fadein 1s; /* Firefox < 16 */
        -ms-animation: fadein 1s; /* Internet Explorer */
        -o-animation: fadein 1s; /* Opera < 12.1 */
        animation: fadein 1s;
	}

	#container{
		margin-left: 26.5%;
		margin-right: 25%;
		width: 45vw;
		height: 70vh;
		background-color: lightgrey;
		border-radius: 4px;
	}

	#header{
		width: 100%;
		background-color: #7B2323;
		padding-left: 10px;
		font-size: 5vh;
		padding-top: 10px;
		border-radius: 4px;
	}

	#logo{
		-webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
        -moz-animation: fadein 2s; /* Firefox < 16 */
        -ms-animation: fadein 2s; /* Internet Explorer */
        -o-animation: fadein 2s; /* Opera < 12.1 */
        animation: fadein 2s;

	}

	
	#title{
		-webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
        -moz-animation: fadein 2s; /* Firefox < 16 */
        -ms-animation: fadein 2s; /* Internet Explorer */
        -o-animation: fadein 2s; /* Opera < 12.1 */
        animation: fadein 2s;
	}

	@keyframes fadein {
	    from { opacity: 0; }
	    to   { opacity: 1; }
	}

	/* Firefox < 16 */
	@-moz-keyframes fadein {
	    from { opacity: 0; }
	    to   { opacity: 1; }
	}

	/* Safari, Chrome and Opera > 12.1 */
	@-webkit-keyframes fadein {
	    from { opacity: 0; }
	    to   { opacity: 1; }
	}

	/* Internet Explorer */
	@-ms-keyframes fadein {
	    from { opacity: 0; }
	    to   { opacity: 1; }
	}

	#body{
		width: 100%;
		background-color: lightgrey;
		padding-top: 20px;
	}

	#app{
		background-image: url('../../imgs/bluegradient.jpg');
		background-size: cover;
	}

	#boton{
		margin-left: 40%;
	}

	.btn{
		background-color: #7B2323;
	}

	input{
		height: 5vh;
	}

	input::placeholder{
		color: black;
	}

	@media (min-width: 700px)
	and (max-width: 1800px){
		#logo{
			height: 12vw;
		}
	}
</style>
