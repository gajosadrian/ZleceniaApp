import { Plugin } from '@nuxt/types'
import { Model } from '@vuex-orm/core'

const plugin: Plugin = ({ $axios }) => {
  Model.setAxios($axios)
}

export default plugin
