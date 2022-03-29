import { Model } from '@vuex-orm/core'
import moment from 'moment'
import Event from '~/models/Event'
import Technician from '~/models/Technician'

export default class Schedule extends Model {
  static entity = 'schedules'

  id!: string
  technicianId!: number | null
  eventIds!: number[]
  dateString!: string
  technician!: Technician
  events!: Event[]

  static fields() {
    return {
      id: this.string(''),
      technicianId: this.number(0),
      eventIds: this.attr(null),
      dateString: this.string(''),
      technician: this.belongsTo(Technician, 'technicianId'),
      events: this.hasManyBy(Event, 'eventIds')
    }
  }

  static apiConfig = {
    dataTransformer: (res: any) => {
      const data = res.data
      return {
        id: data.id,
        technicianId: data.technik_id,
        eventIds: data.terminy_ids,
        dateString: data.date_string,
        technician: data.technik
          ? Technician.apiConfig.dataTransformer({ data: data.technik })
          : null,
        events: data.terminy.map((termin: any) =>
          Event.apiConfig.dataTransformer({ data: termin })
        )
      }
    }
  }

  static fetch({ dateString }: { dateString: string }) {
    const params = { date_string: dateString }
    const queryString = new URLSearchParams(params).toString()
    return this.api().get('/zlecenia/grafik?' + queryString)
  }

  get date() {
    return moment(this.dateString)
  }
}
