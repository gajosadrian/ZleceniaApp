import { Model } from '@vuex-orm/core'
import moment from 'moment'
import User from '~/models/User'

export default class Appointment extends Model {
  static entity = 'appointments'

  public id!: number
  public userId!: number
  public user!: User | null
  public hasToCall!: boolean
  protected dateString!: string

  static fields() {
    return {
      id: this.number(0),
      userId: this.number(0),
      user: this.belongsTo(User, 'userId'),
      hasToCall: this.boolean(false),
      dateString: this.string('')
    }
  }

  get date() {
    return moment(this.dateString)
  }
}
