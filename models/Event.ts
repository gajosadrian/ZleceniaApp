import { Model } from '@vuex-orm/core'
import moment from 'moment'
import Service from '~/models/Service'
import Appointment from '~/models/Appointment'
import Customer from '~/models/Customer'

export default class Event extends Model {
  static entity = 'events'

  public id!: number
  public appointmentId!: number
  public appointment!: Appointment | null
  public serviceId!: number
  public service!: Service | null
  public customerId!: number
  public customer!: Customer | null
  public description!: string
  protected startDateString!: string
  protected endDateString!: string

  static fields() {
    return {
      id: this.number(0),
      appointmentId: this.number(0),
      appointment: this.belongsTo(Appointment, 'appointmentId'),
      serviceId: this.number(0),
      service: this.belongsTo(Service, 'serviceId'),
      customerId: this.number(0),
      customer: this.belongsTo(Customer, 'customerId'),
      description: this.string(''),
      startDateString: this.string(''),
      endDateString: this.string('')
    }
  }

  static apiConfig = {
    dataTransformer: (res: any) => {
      const data = res.data
      return {
        id: data.id,
        appointmentId: data.umowiono_id,
        appointment: data.umowiono,
        serviceId: data.zlecenie_id,
        service: data.zlecenie
          ? Service.apiConfig.dataTransformer({ data: data.zlecenie })
          : null,
        customerId: data.klient_id,
        customer: data.klient
          ? Customer.apiConfig.dataTransformer({ data: data.klient })
          : null,
        description: data.temat,
        startDateString: data.data_rozpoczecia,
        endDateString: data.data_zakonczenia
      }
    }
  }

  get startAt() {
    return moment(this.startDateString)
  }

  get endAt() {
    return moment(this.endDateString)
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
      return `${hours}h`
    }
    if (hours === 0) {
      return `0h${minutes}`
    }
    return `${hours}h${minutes}`
  }

  get isAppointment(): boolean {
    return !!this.appointmentId
  }
}
