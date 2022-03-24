import { Model } from '@vuex-orm/core'
import moment from 'moment'

export default class Event extends Model {
  static entity = 'events'

  id!: number
  description!: string
  startDate!: string
  endDate!: string

  static fields() {
    return {
      id: this.number(0),
      description: this.string(''),
      startDate: this.string(''),
      endDate: this.string('')
    }
  }

  static apiConfig = {
    dataTransformer: (res: any) => {
      const data = res.data
      return {
        id: data.id,
        description: data.temat,
        startDate: data.data_rozpoczecia,
        endDate: data.data_zakonczenia
      }
    }
  }

  get startAt() {
    return moment(this.startDate)
  }

  get endAt() {
    return moment(this.endDate)
  }

  get startHour() {
    return this.startAt.format('LT')
  }

  get endHour() {
    return this.endAt.format('LT')
  }

  get duration() {
    const diff = this.endAt.diff(this.startAt)
    return moment.duration(diff)
  }

  get durationFormatted() {
    const hours = this.duration.hours()
    const minutes = this.duration.minutes()
    if (minutes === 0) {
      return `${hours} godz.`
    }
    if (hours === 0) {
      return ` ${minutes} min.`
    }
    return `${hours} godz. ${minutes} min.`
  }
}
