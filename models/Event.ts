import { Model } from '@vuex-orm/core'
import moment from 'moment'
import Service from '~/models/Service'

export default class Event extends Model {
  static entity = 'events'

  id!: number
  serviceId!: number
  description!: string
  startDate!: string
  endDate!: string
  service!: Service | null

  static fields() {
    return {
      id: this.number(0),
      serviceId: this.number(0),
      description: this.string(''),
      startDate: this.string(''),
      endDate: this.string(''),
      service: this.belongsTo(Service, 'serviceId')
    }
  }

  static apiConfig = {
    dataTransformer: (res: any) => {
      const data = res.data
      return {
        id: data.id,
        serviceId: data.zlecenie_id,
        description: data.temat,
        startDate: data.data_rozpoczecia,
        endDate: data.data_zakonczenia,
        service: data.zlecenie
          ? Service.apiConfig.dataTransformer({ data: data.zlecenie })
          : null
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
