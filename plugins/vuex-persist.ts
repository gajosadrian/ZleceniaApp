import { VuexPersistence } from 'vuex-persist'
import { Plugin } from '@nuxt/types'

const plugin: Plugin = ({ store }) => {
  new VuexPersistence({}).plugin(store)
}

export default plugin
