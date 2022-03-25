import { Model } from '@vuex-orm/core'

interface Note {
  idx: number
  type:
    | 'notatka'
    | 'technik'
    | 'sms'
    | 'sms-auto'
    | 'header_poprzednio'
    | 'header_teraz'
  date: string | null
  author: string | null
  content: string
  original: string
}

export default class Service extends Model {
  static entity = 'services'

  id!: number
  number!: string
  foreignNumber!: string
  description!: string
  noteGroups!: Note[][]
  isReadyForService!: boolean
  hasToClarify!: boolean
  hasToDeliver!: boolean
  isAtWorkshop!: boolean
  isWarranty!: boolean
  isPaid!: boolean
  isInsurance!: boolean
  hasToCall!: boolean
  isVisitConfirmed!: boolean
  isFinished!: boolean
  isCompleted!: boolean

  static fields() {
    return {
      id: this.number(0),
      number: this.string(''),
      foreignNumber: this.string(''),
      description: this.string(''),
      noteGroups: this.attr(null),
      isReadyForService: this.boolean(false),
      hasToClarify: this.boolean(false),
      hasToDeliver: this.boolean(false),
      isAtWorkshop: this.boolean(false),
      isWarranty: this.boolean(false),
      isPaid: this.boolean(false),
      isInsurance: this.boolean(false),
      hasToCall: this.boolean(false),
      isVisitConfirmed: this.boolean(false),
      isFinished: this.boolean(false),
      isCompleted: this.boolean(false)
    }
  }

  static apiConfig = {
    dataTransformer: (res: any) => {
      const data = res.data
      return {
        id: data.id,
        number: data.nr,
        foreignNumber: data.nr_obcy,
        description: data.opis,
        noteGroups: data.opis_array,
        isReadyForService: data.is_gotowe_do_naprawy,
        hasToClarify: data.is_do_wyjasnienia,
        hasToDeliver: data.is_do_odwiezienia,
        isAtWorkshop: data.is_na_warsztacie,
        isWarranty: data.is_gwaranja,
        isPaid: data.is_odplatne,
        isInsurance: data.is_ubezpieczenie,
        hasToCall: data.is_dzwonic,
        isVisitConfirmed: data.is_umowiono,
        isFinished: data.is_zakonczone,
        isCompleted: data.is_soft_zakonczone
      }
    }
  }
}
