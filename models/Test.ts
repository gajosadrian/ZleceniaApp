import { Model } from '@vuex-orm/core'

export default class Test extends Model {
  static entity = 'tests'

  static fields() {
    return {
      id: this.uid(),
      name: this.string('')
    }
  }

  id!: string
  name!: string
}
