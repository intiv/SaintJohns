<template>
  <div id="app">
    <div class="row">
      <div id="navBar" v-if="checkPath() === true" class="col l12 m12 s12">
        <nav>
          <div class="nav-wrapper">
            <div class="row">
              <div class="col l2 m2 s2" id="logoContainer">
                  <a href="#">
                    <img class="responsive-img circle" src="./imgs/icon.jpg" alt="icono" id="icono">
                  </a>
              </div>
              <div class="col l10 m10 s10 ">
                <div class="row">
                  <div class="col l4 m4 s4">
                    <router-link to="/">
                      <a class="brand-logo">&nbsp;Saint John's Bilingual School &nbsp;</a>
                    </router-link>
                  </div>
                  <div class="col l8 m8 s8">
                    <a href="#" v-if="tipo!=1" data-activates="mobile-demo" class="button-collapse right"><i class="material-icons">menu</i></a>
                    <ul v-if="tipo!=1" class="side-nav" id="mobile-demo">
                      <li><router-link to="/alumnos">Estudiantes</router-link></li>
                      <li><router-link to="/maestros">Maestros</router-link></li>
                    </ul>
                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                      <li><router-link to="/alumnos">Estudiantes</router-link></li>
                      <li><router-link to="/maestros">Maestros</router-link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
    <div class="row">
      <div id="sideNav" v-if="checkPath() === true" class="col l3 m3 s3">
        <aside>
          <div class="sideContent">
            <a href="#"><p>Hoja de Tareas</p></a>
          </div>
          <div class="sideContent">
            <a v-on:click="showModal=true"><p>Notas</p></a>
          </div>
          <div class="sideContent">
            <a href="#"><p>Anuncios</p></a>
          </div>
        </aside>
      </div>
      <div id="contentRender" v-if="checkPath() === true" class="col l9 m9 s9">
        <router-view></router-view>
      </div>
      <div id="loginRender" v-if="checkPath() === false" class="col l9 m9 s9">
        <router-view></router-view>
      </div>
    </div>
    
  </div>
</template>

<script>
  import modal1 from './components/modal1.vue'
	export default {
  		name: 'app',
      data(){
        return{
          ruta : '/',
          showModal : false,
          tipo: 0
        }
      },
      components: {
        modal1
      },
      methods : {
        checkPath(){
          var ruta=this.$route.path;
          switch(ruta){
            case '/' : return true; break;
            case '/login' : return false; break;
            case '/register' : return false; break;
            default : return true; break;
          }
        }
      },
      mounted() {
        $(".button-collapse").sideNav();
      },
      beforeMount(){
        if(localStorage.getItem('usuario')===null){
          this.$router.push('/login');
        }else{
          var user=JSON.parse(localStorage.getItem('usuario'));
          if(user.scope[0]==='alumno'){
            this.tipo=1;
          }else if(user.scope[0]==='admin'){
            this.tipo=3;
          }else if(user.scope[0]==='maestro'){
            this.tipo=2;
          }
        }
      }
	}
</script>

<style>

  @keyframes fadein {
      0% { opacity: 0; }
      80%   { opacity: 0; }
      90% {opacity: 0.5;}
      100% {opacity: 1;}
  }

  @keyframes slidein {
      0% { opacity: 0; }
      80%   { opacity: 0; }
      90% {opacity: 0.5;}
      100% {opacity: 1;}
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

  html{
    font-family: "Roboto", sans-serif;
  }

  #icono{
    position: absolute;
    height: 100%;
    width: 13%; 
  }

  #app{
    margin-top: 5px;
    width: 100vw;
    
  }

  #mobile-demo{
    z-index: 9998;
  }

  nav{
    -webkit-animation: fadein 1s; /* Safari, Chrome and Opera > 12.1 */
    -moz-animation: fadein 1s; /* Firefox < 16 */
    -ms-animation: fadein 1s; /* Internet Explorer */
    -o-animation: fadein 1s; /* Opera < 12.1 */
    animation: fadein 1s;
    background-color: #2B455E;
    filter: saturate(200%);
    width: 95vw;
    height: 10vh;
    font-size: 10vw;
    display: block;
    box-shadow: 10px 0 5px #888888;
    margin-left:2%;
    
  }

  #navBar{
    width: 100vw;
  }

  .sideContent{
    padding: 5%;
    height: 10%;

  }

  .sideContent:hover{
    background-color: red;
    filter: saturate(60%);
    transition: background-color 0.3s ease-in-out;
  }

  .brand-logo:hover {
    background-color: #13416D;
    transition: background-color 0.3s ease-in-out;
  }

  .brand-logo{
    height: 100%;
    position: absolute;
    font-size: 15vh;
  }

  #nav-mobile>li>a{
    position: relative;
    height: 10vh;
  }

  aside{
    -webkit-animation: fadein 1.5s; /* Safari, Chrome and Opera > 12.1 */
    -moz-animation: fadein 1.5s; /* Firefox < 16 */
    -ms-animation: fadein 1.5s; /* Internet Explorer */
    -o-animation: fadein 1.5s; /* Opera < 12.1 */
    animation: fadein 1.5s;
    border: 1px solid red;
    background-color: red;
    filter: saturate(35%);
    height: 85vh;
    width: 13vw;
    text-align: center;
    margin-bottom: 5px;
    margin-top: 10px;
    margin-right: 10px;
  }

  #sideNav{
    width: 13vw;
    margin-right: 10px;
    margin-left:2%;
  }

  .sideContent{
    margin-top: 10vh;
    margin-bottom: 10vh;
    border-radius: 1px;
  }

  .sideContent p{
    color: white;
  }

  body{
    background-color: #F7F7F8;
  }

  #logoContainer:hover{
    background-color: #13416D;
    transition: background-color 0.3s ease-in-out;
  }

  .row{
    margin: 0 auto;
  }

  .col{
    padding: 0px !important;
  }

  #contentRender{
    -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
    -moz-animation: fadein 2s; /* Firefox < 16 */
    -ms-animation: fadein 2s; /* Internet Explorer */
    -o-animation: fadein 2s; /* Opera < 12.1 */
    animation: fadein 2s;
    padding-left: 10px !important;
    border: 1px solid lightgrey;
    margin-top: 10px;
    display: block;
    height: 85vh;
    width: 81.3vw;
    max-height: 88vh;
    max-width: 83vw;
    background-color: lightgrey;
    box-shadow: 10px 0 5px #888888;  
    overflow: scroll scroll;

  }
</style>
