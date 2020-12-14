<template>
<div>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

     <div class="container">
        <section id="corpo">
          <div id="titulopokemon">
            <legend>Criar Pokémon</legend>
          </div>
          <form method="POST">
            <input type="hidden" name="id" v-model="pokemon.id" />
            <fieldset id="usuario">
              <p id="pokemontipo">
                <select
                  v-model="pokemon.tipo"
                >
                  <option value="">
                    Tipo do Pokémon
                  </option>
                  <option value="Fogo">Fogo</option>
                  <option value="Água">Água</option>
                  <option value="Elétrico">Elétrico</option>
                  <option value="Lutador">Lutador</option>
                  <option value="Fada">Fada</option>
                  <option value="Pedra">Pedra</option>
                  <option value="Gelo">Gelo</option>
                </select>
              </p>

              <p id="pokemonnome">
                <a id="valoo"><label for="cTot">Nome</label></a
                ><input
                  type="name"
                  v-model="pokemon.nome"
                  placeholder="Nome Pokémon"
                />
              </p>

              <p id="pokemondesc">
                <a id="emiss">Descrição Pokémon</a>
                <input
                  type="name"
                  v-model="pokemon.desc"
                  placeholder="Descrição do Pokémon"
                />
              </p>
            <div id="salvar">
              <button
                type="button"
                class="btn btn-primary btn-lg"
                @click="addPokemon()"
              >
                Adicionar Pokémon
              </button>
            </div>
                      </fieldset>
          </form>
        </section>
      </div>




          <div id="titulopokemon">
            <legend>Lista de Pokémons</legend>
          </div>
             <tr v-for="pokemon in pokemons" :key="pokemon.id">
              <td id="icone">
                <button
                  type="button"
                  @click="
                    editPokemon(pokemon), $refs.modalName.openModal(pokemon)
                  "
                >
                  <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                </button>
              </td>
              <td id="primeiro">{{ pokemon.tipo }}</td>
              <td>{{ pokemon.nome }}</td>
              <td>{{ pokemon.desc }}</td>
              <td>
                <button
                  type="button"
                  @click.prevent="deletePokemon(pokemon.id)"
                >
                  <i class="deletar">[X]</i>
                </button>
              </td>
            </tr>  















        <div class="container-modal1">
          <modal ref="modalName">
            <template v-slot:header>
              <h1>Editar Pokemon</h1>
            </template>

            <template v-slot:body>
              <section id="corponovo">
                <div>
                  <legend>Editar Pokemon</legend>
                </div>
                <form>
                  <fieldset>
                    <p>
                  <select
                  v-model="pokemon.tipo">
                  <option value="">
                    Tipo do Pokémon
                  </option>
                  <option value="Fogo">Fogo</option>
                  <option value="Água">Água</option>
                  <option value="Elétrico">Elétrico</option>
                  <option value="Lutador">Lutador</option>
                  <option value="Fada">Fada</option>
                  <option value="Pedra">Pedra</option>
                  <option value="Gelo">Gelo</option>
                </select>
                    </p>

               <p id="pokemonnome">
                <a id="valoo"><label for="cTot">Nome</label></a
                ><input
                  type="name"
                  v-model="pokemon.nome"
                  placeholder="Nome Pokémon"
                />
              </p>

              <p id="pokemondesc">
                <a id="emiss">Descrição Pokémon</a>
                <input
                  type="name"
                  v-model="pokemon.desc"
                  placeholder="Descrição do Pokémon"
                />
              </p>
                    </fieldset>
                  <div id="salvarnovo">
                    <div class="form-group">
                      <button
                        class="btn btn-primary"
                        @click="
                          updatePokemon(pokemon), $refs.modalName.closeModal()
                        "
                      >
                        Editar
                      </button>
                    </div>
                  </div>
                </form>
              </section>
            </template>
          </modal>
        </div>


</div>
</template>



<script>
import axios from "axios";
import Modal from "./../modal/Modal.vue";
export default {
  name: "CriarPokemon",
  components: {
    Modal,
  },
  data() {
    return {
      pokemons: [],
      pokemon: {
        tipo: "",
        nome: "",
        desc: "",
      },
    };
  },
  created() {
    this.getPokemon();
  },
   methods: {
    async getPokemon() {
      const response = await axios
        .get("api/pokemons")
        .then((response) => {
          this.pokemons = response.data.data;
        })
        .catch(function (error) {
          console.warn(error);
        });
    },
    async deletePokemon(id) {
      if (confirm("Você quer mesmo deletar?")) {
        const response = await axios
          .delete("api/pokemons/" + id)
          .then((response) => {
            this.pokemons.splice(this.pokemons.indexOf(id), 1);
            this.getPokemon();
          });
      }
    },
    async addPokemon() {
      let uri = "api/pokemons";
      const response = await axios.post(uri, this.pokemon).then((response) => {
        this.pokemons.push({
          tipo: this.pokemon.tipo,
          nome: this.pokemon.nome,
          desc: this.pokemon.desc,
        });
        this.pokemon.tipo = "";
        this.pokemon.nome = "";
        this.pokemon.desc = "";
        this.getPokemon();
      });
    },
    async updatePokemon(pokemon) {
      const response = await axios
        .put("api/pokemons/" + pokemon, {
           tipo: this.pokemon.tipo,
          nome: this.pokemon.nome,
          desc: this.pokemon.desc,
        })

        .then((response) => {
          console.log(response.data);
          this.pokemon.tipo = "";
          this.pokemon.nome = "";
          this.pokemon.desc = "";
          this.getPokemon();
          alert("Pokémon Alterado!");

        })
        .catch((err) => {
          console.log(err);
        });
    },
    editPokemon(pokemon) {
       this.pokemon.tipo = pokemon.tipo;
      this.pokemon.nome = pokemon.nome;
      this.pokemon.desc = pokemon.desc;
    },
  },
}; 
</script>

<style scoped>

#titulopokemon {
  color:black;
}

#pokemontipo {
  font-size: 20px;
}

#pokemonnome {
  font-size: 20px;
  margin-right: 66px;
}
#pokemondesc {
  font-size: 20px;
  margin-right: 180px;
  text-align:center;
}



@media(max-width: 600px) {

  .container {
    width: 100%;
  }

}

</style>



<style lang="scss">
.btn {
  padding: 8px 16px;
  border-radius: 5px;
  &--primary {
    background-color: green;
    color: #fff;
  }
  &--secondary {
    background-color: #dddd;
    color: #000;
  }
}
.overflow-hidden {
  overflow: hidden;
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.d-flex {
  display: flex;
}
.align-items-center {
  align-items: center;
}
.justify-content-between {
  justify-content: space-between;
}

button {
  background: none;
  border: none;
  outline: inherit;
  cursor: pointer;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}
</style>
