import { Model } from '@vuex-orm/core'
import moment from 'moment'

export default class CostItemOrder extends Model {
  static entity = 'cost_item_orders'

  public id!: number
  public number!: string
  public isInProgress!: boolean
  public dateString!: string

  static fields() {
    return {
      id: this.number(0),
      number: this.string(''),
      isInProgress: this.boolean(false),
      dateString: this.string('')
    }
  }

  get date() {
    return moment(this.dateString)
  }
}
