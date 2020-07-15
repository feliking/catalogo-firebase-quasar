<template>
  <q-page padding>
    <Form />
    <DetailProducto />
    <div class="row">
      <div class="col">
        <q-inner-loading :showing="visible">
          <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>
        <q-input
          rounded
          outlined
          v-model="valor"
          label="Buscar..."
          v-if="filter == true"
          @keyup.enter="search_element"
        />
        <q-list v-if="busqueda.length == 0">
          <q-item v-for="(item, index) in productos" :key="index">
            <q-item-section top thumbnail class="q-ml-none">
              <q-img
                @click="detailProduct(item)"
                :src="item.adjunto"
                ratio="2"
                class="rounded-borders"
                style="width: 90px; height: 90px"></q-img>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.descripcion }}</q-item-label>
              <q-item-label caption>{{ item.codigo }}</q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-item-label caption>{{ item.precio }} Bs.</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <q-list v-if="busqueda.length > 0">
          <q-item v-for="(item, index) in busqueda" :key="index">
            <q-item-section top thumbnail class="q-ml-none">
              <q-img
                @click="detailProduct(item)"
                :src="item.adjunto"
                ratio="2"
                class="rounded-borders"
                style="width: 90px; height: 90px"></q-img>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.descripcion }}</q-item-label>
              <q-item-label caption>{{ item.codigo }}</q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-item-label caption>{{ item.precio }} Bs.</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <div class="row">
          <div class="col" style="height: 100px"></div>
        </div>
      </div>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn class="glossy" fab icon="search" color="primary" :loading="loading" @click="search_product()" />
      <q-btn class="glossy" fab icon="add" color="deep-orange" :loading="loading" @click="add_product()" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import Form from './Form'
import DetailProducto from './DetailProduct'
import { db } from '../firebase'

export default {
  name: 'catalogo',
  components: {
    Form,
    DetailProducto
  },
  data () {
    return {
      productos: [],
      loading: false,
      visible: true,
      filter: false,
      valor: '',
      busqueda: []
    }
  },
  mounted () {
    this.getData()
    this.$root.$on('closeDialogDetail', () => {
      this.getData()
    })
  },
  methods: {
    add_product () {
      this.$root.$emit('openDialog')
    },
    async getData () {
      this.productos = []
      await db.collection('productos').orderBy('created_at').onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.productos.push({ ...doc.data(), id: doc.id })
        })
      })
    },
    search_product () {
      this.filter = !this.filter
      this.busqueda = []
      this.valor = ''
    },
    detailProduct (item) {
      this.$root.$emit('openDialogDetail', item)
    },
    search_element () {
      this.busqueda = []
      const productos = this.productos
      productos.forEach(item => {
        let descripcion = String(item.descripcion)
        descripcion = descripcion.toLowerCase()
        const valor = this.valor.toLowerCase()
        if (descripcion.indexOf(valor) !== -1) {
          this.busqueda.push(item)
        }
      })
    }
  }
}
</script>
