import { Model } from '@vuex-orm/core'

export default class CostItem extends Model {
  static entity = 'cost_items'

  id!: number

  static fields() {
    return {
      id: this.number(0)
    }
  }
}
