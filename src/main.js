import Vue from 'vue'
import VueRouter from 'vue-router'
import CriarPokemon from './components/CriarPokemon.vue'
import intermediorotas from './intermediorotas.vue'
import './axios.js';

Vue.use(VueRouter);

const routes = [
    { path: '/CriarPokemon', component: CriarPokemon},
    { path: '/intermediorotas', component: intermediorotas},
];

const router = new VueRouter({
  routes,
});

new Vue({
  el: '#app',
  router,
  render: h => h(intermediorotas),

  },

)
