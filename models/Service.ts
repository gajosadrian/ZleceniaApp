import { Model } from '@vuex-orm/core'
import moment from 'moment'

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

interface Kind {
  id: string | null
  name: string
  icon: string
  color: string
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
  hasToCall!: boolean
  isInWorkshop!: boolean
  isWarranty!: boolean
  isPaid!: boolean
  isInsurance!: boolean
  isSale!: boolean
  isComplaint!: boolean
  isArranged!: boolean
  isFinished!: boolean
  isCompleted!: boolean
  isCostAccepted!: boolean
  lastStatusDate!: string
  kind!: Kind
  kindFormatted!: string
  durationInDays!: number
  durationInWeekdays!: number
  arrangedDate!: string

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
      hasToCall: this.boolean(false),
      isInWorkshop: this.boolean(false),
      isWarranty: this.boolean(false),
      isPaid: this.boolean(false),
      isInsurance: this.boolean(false),
      isSale: this.boolean(false),
      isComplaint: this.boolean(false),
      isArranged: this.boolean(false),
      isFinished: this.boolean(false),
      isCompleted: this.boolean(false),
      isCostAccepted: this.boolean(false),
      lastStatusDate: this.string(''),
      kind: this.attr(null),
      kindFormatted: this.string(''),
      durationInDays: this.number(0),
      durationInWeekdays: this.number(0),
      arrangedDate: this.string('')
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
        hasToCall: data.is_dzwonic,
        isInWorkshop: data.is_na_warsztacie,
        isWarranty: data.is_gwaranja,
        isPaid: data.is_odplatne,
        isInsurance: data.is_ubezpieczenie,
        isSale: data.is_sprzedaz,
        isComplaint: data.is_nks,
        isArranged: data.is_umowiono,
        isFinished: data.is_zakonczone,
        isCompleted: data.is_soft_zakonczone,
        isCostAccepted: data.is_akc_kosztow,
        lastStatusDate: data.data_statusu_formatted,
        kind: {
          id: data.znacznik.id,
          name: data.znacznik.nazwa,
          icon: data.znacznik.icon,
          color: data.znacznik.color
        },
        kindFormatted: data.znacznik_formatted,
        durationInDays: data.czas_trwania,
        durationInWeekdays: data.czas_trwania_robocze,
        arrangedDate: data.umowiono_data
      }
    }
  }

  get isMinCostVisible() {
    return this.isPaid && !this.isSale && !this.isComplaint
  }

  get lastStatusAt() {
    return moment(this.lastStatusDate)
  }

  get duration() {
    return moment.duration(this.durationInDays, 'day')
  }

  get durationByWeekdays() {
    return moment.duration(this.durationInWeekdays, 'day')
  }

  get arrangedAt() {
    return moment(this.arrangedDate)
  }
}
