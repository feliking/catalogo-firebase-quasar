<template>
  <q-dialog
      v-model="dialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-teal text-white">
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
          <div class="text-h6 text-center">Editar producto</div>
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
              rounded color="orange"
              label="Guardar Cambios"
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
      selectedItem: {
        adjunto: '',
        descripcion: '',
        codigo: '',
        precio: '',
        id_producto: ''
      },
      loading: false
    }
  },
  props: ['item'],
  mounted () {
    this.$root.$on('openDialogEdit', item => {
      this.dialog = true
      this.selectedItem = item
    })
  },
  methods: {
    async save () {
      try {
        this.loading = true
        await db.collection('productos').doc(this.selectedItem.id).update(this.selectedItem)
        this.loading = false
        this.$q.notify({
          color: 'green',
          textColor: 'white',
          icon: 'check',
          message: 'Editado correctamente'
        })
        this.close()
      } catch (error) {
        console.log(error)
        this.$q.notify({
          color: 'red',
          textColor: 'white',
          icon: 'clear',
          message: 'Verifique su conexión'
        })
      }
    },
    resetForm () {
      this.selectedItem = {}
    },
    close () {
      this.$root.$emit('closeDialogEdit', this.selectedItem)
      this.resetForm()
      this.dialog = false
      this.loading = false
    }
  }
}
</script>
