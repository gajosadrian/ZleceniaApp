import { Model } from '@vuex-orm/core'
import moment from 'moment'

enum Kind {
  StatutoryWarranty = 'J',
  Warranty = 'A',
  PaidWarranty = 'I',
  Insurance = 'H',
  Paid = 'B',
  DeviceAssembly = 'E',
  SaleOfWare = 'E',
  SaleOfDevice = 'D',
  Reclamation = 'G'
}

interface IKind {
  id: Kind | null
  name: string
  nameFormatted: string
  icon: string
  color: string
}

enum ExpertiseStatus {
  Uninformed = 0,
  Informed = 1
}

interface IExpertise {
  status: ExpertiseStatus
  labor: number
  travel: number
  dateString: string
}

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

  public id!: number
  public number!: string
  public foreignNumber!: string
  public description!: string
  public noteGroups!: Note[][]
  public isReadyForService!: boolean
  public hasToClarify!: boolean
  public hasToDeliver!: boolean
  public hasToCall!: boolean
  public isInWorkshop!: boolean
  public isWarranty!: boolean
  public isPaid!: boolean
  public isInsurance!: boolean
  public isSale!: boolean
  public isComplaint!: boolean
  public isFinished!: boolean
  public isCompleted!: boolean
  public isCostAccepted!: boolean
  public kind!: IKind
  public expertise!: IExpertise
  protected lastStatusDate!: string
  protected durationInDays!: number
  protected durationInWeekdays!: number

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
      isFinished: this.boolean(false),
      isCompleted: this.boolean(false),
      isCostAccepted: this.boolean(false),
      kind: this.attr(null),
      expertise: this.attr(null),
      lastStatusDate: this.string(''),
      durationInDays: this.number(0),
      durationInWeekdays: this.number(0)
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
        isFinished: data.is_zakonczone,
        isCompleted: data.is_soft_zakonczone,
        isCostAccepted: data.is_akc_kosztow,
        kind: <IKind>{
          id: data.znacznik.id,
          name: data.znacznik.nazwa,
          nameFormatted: data.znacznik_formatted,
          icon: data.znacznik.icon,
          color: data.znacznik.color
        },
        expertise: <IExpertise>{
          status: data.dane.spr_status,
          labor: data.dane.spr_sprawdzenie,
          travel: data.dane.spr_dojazd,
          dateString: data.dane.spr_data
        },
        lastStatusDate: data.data_statusu_formatted,
        durationInDays: data.czas_trwania,
        durationInWeekdays: data.czas_trwania_robocze
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
}
