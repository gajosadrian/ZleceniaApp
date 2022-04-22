import { Model } from '@vuex-orm/core'
import moment from 'moment'
import Event from '~/models/Event'
import Technician from '~/models/Technician'

export default class Schedule extends Model {
  static entity = 'schedules'

  public id!: string
  public technicianId!: number | null
  public technician!: Technician | null
  public eventIds!: number[]
  public events!: Event[]
  protected dateString!: string

  static fields() {
    return {
      id: this.string(''),
      technicianId: this.number(0),
      technician: this.belongsTo(Technician, 'technicianId'),
      eventIds: this.attr(null),
      events: this.hasManyBy(Event, 'eventIds'),
      dateString: this.string('')
    }
  }

  static apiConfig = {
    dataTransformer: (res: any) => {
      const data = res.data
      return {
        id: data.id,
        technicianId: data.technik_id,
        technician: data.technik
          ? Technician.apiConfig.dataTransformer({ data: data.technik })
          : null,
        eventIds: data.terminy_ids,
        events: data.terminy.map((event: any) =>
          Event.apiConfig.dataTransformer({ data: event })
        ),
        dateString: data.date_string
      }
    }
  }

  static fetch({ dateString }: { dateString: string }) {
    const params = { date_string: dateString }
    const queryString = new URLSearchParams(params).toString()
    return this.api().get('/zlecenia/grafik?' + queryString, {
      persistBy: 'create'
    })
  }

  get date() {
    return moment(this.dateString)
  }
}
