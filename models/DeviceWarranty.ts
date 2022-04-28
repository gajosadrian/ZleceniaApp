import { Model } from '@vuex-orm/core'
import moment from 'moment'

export default class DeviceWarranty extends Model {
  static entity = 'device_warranties'

  public id!: number
  protected startDateString!: string
  protected durationInMonths!: number

  static fields() {
    return {
      id: this.number(0),
      startDateString: this.string(''),
      durationInMonths: this.number(0)
    }
  }

  get startAt() {
    return moment(this.startDateString).startOf('day')
  }

  get duration() {
    return moment.duration(this.durationInMonths, 'month')
  }

  get endAt() {
    return this.startAt.clone().add(this.duration).endOf('day')
  }

  get isDuring() {
    return this.endAt.isAfter()
  }
}
