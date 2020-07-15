<template>
  <q-dialog
      v-model="dialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-deep-orange text-white">
        <q-bar>
          <q-space />

          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6 text-center">Registrar un nuevo producto</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="save" @reset="resetForm">
            <q-input
              rounded
              outlined
              v-model="selectedItem.id_producto"
              label="ID del producto"
              dark
              :rules="[ val => val && val.length > 0 || 'Requerido']"
            />
            <q-input
              rounded
              outlined
              v-model="selectedItem.codigo"
              label="Código del producto"
              dark
              :rules="[ val => val && val.length > 0 || 'Requerido']"
            />
            <q-input
              type="textarea"
              rounded
              outlined
              v-model="selectedItem.descripcion"
              label="Descripcion del producto"
              dark
              :rules="[ val => val && val.length > 0 || 'Requerido']"
            />
            <q-input
              rounded
              outlined
              v-model="selectedItem.precio"
              label="Precio"
              dark
              :rules="[ val => val && val.length > 0 || 'Requerido']"
            />
            <q-input
              rounded
              outlined
              v-model="selectedItem.adjunto"
              label="Imagen: Dirección web"
              dark
              :rules="[ val => val && val.length > 0 || 'Requerido']"
            />
            <br>
            <q-btn
              class="glossy full-width"
              rounded color="teal"
              label="Guardar"
              type="submit"
              :loading="loading"
            />
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
</template>

<script>
import { db } from '../firebase'

export default {
  name: 'Form',
  data () {
    return {
      dialog: false,
      maximizedToggle: true,
      selectedItem: {},
      loading: false
    }
  },
  mounted () {
    this.$root.$on('openDialog', () => {
      this.dialog = true
    })
  },
  methods: {
    async save () {
      try {
        this.loading = true
        await db.collection('productos').doc().set(this.selectedItem)
        this.loading = false
        this.$q.notify({
          color: 'green',
          textColor: 'white',
          icon: 'check',
          message: 'Guardado correctamente'
        })
        this.close()
      } catch (error) {
        console.log(error)
      }
    },
    resetForm () {
      this.selectedItem = {}
    },
    close () {
      this.resetForm()
      this.dialog = false
      this.loading = false
    }
  }
}
</script>
