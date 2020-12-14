<template>
<div id="estilo">
  <h1>Rotas</h1>
    <router-link to="/CriarPokemon">Pokemons</router-link>
 <br>
 <br>

    <router-view></router-view>

    </div>
</template>

<script>
export default {
  name: "intermediorotas",
  data() {
    return {
    };
  },
}; 

</script>

<style>
*{
  background:none;
}
div#estilo{
 width: 100%;
  height: 50px;
  text-align: center;
  background-color:black;
  color: white;
  padding-bottom: 20px;

  /* pura mágica */
  position: absolute;
 /* posiciona na metade da tela */
}
</style>
