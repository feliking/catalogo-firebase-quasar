<template>
  <q-dialog
      v-model="dialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
    <FormEdit />
    <q-card class="my-card">
      <q-img :src="selectedItem.adjunto" />

      <q-card-section>
        <div class="text-h6">{{ selectedItem.descripcion }}</div>
        <div class="text-subtitle2">{{ selectedItem.codigo }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ selectedItem.precio }} Bolivianos.
      </q-card-section>

      <div class="row">
        <div class="col" style="height: 100px"></div>
      </div>

      <q-dialog v-model="confirm" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="delete" color="red" text-color="white" />
            <span class="q-ml-sm">¿Esta seguro que desea eliminar este elemento?</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="NO" color="primary" v-close-popup @click="confirm; false" />
            <q-btn flat label="SI" color="primary" v-close-popup @click="deleteProducto" />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn class="glossy" fab icon="keyboard_backspace" color="teal" @click="close" />
      </q-page-sticky>

      <q-page-sticky position="bottom-left" :offset="[18, 18]">
        <q-btn-group rounded>
          <q-btn color="primary" rounded glossy icon="edit" @click="editar" />
          <q-btn color="red" rounded glossy icon="delete" @click="confirm = true" />
        </q-btn-group>
      </q-page-sticky>
    </q-card>
  </q-dialog>
</template>

<script>
import FormEdit from './FormEdit'
import { db } from '../firebase'

export default {
  components: {
    FormEdit
  },
  data () {
    return {
      dialog: false,
      selectedItem: {
        adjunto: '',
        descripcion: '',
        codigo: '',
        precio: ''
      },
      maximizedToggle: true,
      confirm: false
    }
  },
  props: ['item', 'retorno'],
  mounted () {
    this.$root.$on('openDialogDetail', item => {
      this.dialog = true
      this.selectedItem = item
    })
    this.$root.$on('closeDialogEdit', retorno => {
      this.selectedItem = retorno
    })
  },
  methods: {
    close () {
      this.dialog = false
      this.selectedItem = {
        adjunto: '',
        descripcion: '',
        codigo: '',
        precio: ''
      }
      this.$root.$emit('closeDialogDetail')
    },
    editar () {
      this.$root.$emit('openDialogEdit', this.selectedItem)
    },
    async deleteProducto () {
      try {
        this.loading = true
        await db.collection('productos').doc(this.selectedItem.id).delete()
        this.loading = false
        this.$q.notify({
          color: 'green',
          textColor: 'white',
          icon: 'check',
          message: 'Eliminado correctamente'
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
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
</style>
