import { Model } from '@vuex-orm/core'
import Event from './Event'

export default class Schedule extends Model {
  static entity = 'schedules'

  id!: string
  eventIds!: number[]
  dateString!: string
  events!: Event[]

  static fields() {
    return {
      id: this.attr(null),
      eventIds: this.attr(null),
      dateString: this.string(''),
      events: this.hasManyBy(Event, 'eventIds')
    }
  }

  static apiConfig = {
    dataTransformer: (res: any) => {
      const data = res.data
      return {
        id: data.id,
        eventIds: data.terminy_ids,
        dateString: data.date_string,
        events: data.terminy.map((termin: any) =>
          Event.apiConfig.dataTransformer({ data: termin })
        )
      }
    }
  }

  static fetch({ dateString }: { dateString: string }) {
    return this.api().get(`/zlecenia/grafik?date_string=${dateString}`)
  }
}