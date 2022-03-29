import { Model } from '@vuex-orm/core'

export default class Test extends Model {
  static entity = 'tests'

  id!: string
  name!: string

  static fields() {
    return {
      id: this.uid(),
      name: this.string('')
    }
  }
}
