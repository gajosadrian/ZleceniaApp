import { Model } from '@vuex-orm/core'

export default class Event extends Model {
  static entity = 'events'

  id!: number
  description!: string
  startHour!: string

  static fields() {
    return {
      id: this.number(0),
      description: this.string(''),
      startHour: this.string('')
    }
  }

  static apiConfig = {
    dataTransformer: (res: any) => {
      const data = res.data
      return {
        id: data.id,
        description: data.temat,
        startHour: data.godzina_rozpoczecia
      }
    }
  }
}
