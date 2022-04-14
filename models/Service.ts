import { Model } from '@vuex-orm/core'
import moment from 'moment'
import Customer from '~/models/Customer'
import Device from '~/models/Device'
import CostItem from '~/models/CostItem'
import Photo from '~/models/Photo'
import PhotoType, { Type as PhotoTypeId } from '~/models/PhotoType'

export enum Kind {
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

export enum ExpertiseStatus {
  Uninformed = 0,
  Informed = 1
}

interface IExpertise {
  status: ExpertiseStatus
  labor: number
  delivery: number
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
  public customerId!: number
  public customer!: Customer | null
  public deviceId!: number
  public device!: Device | null
  public costItems!: CostItem[]
  public photosService!: Photo[]
  public photosDevice!: Photo[]
  public requiredPhotoTypeIds!: PhotoTypeId[]
  public requiredPhotoTypes!: PhotoType[]
  public number!: string
  public foreignNumber!: string
  public description!: string
  public noteGroups!: Note[][]
  public isReadyForService!: boolean
  public hasToClarify!: boolean
  public hasToDeliver!: boolean
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
  public expertise!: IExpertise | null
  protected lastStatusDate!: string
  protected durationInDays!: number
  protected durationInWeekdays!: number

  static fields() {
    return {
      id: this.number(0),
      customerId: this.number(0),
      customer: this.belongsTo(Customer, 'customerId'),
      deviceId: this.number(0),
      device: this.belongsTo(Device, 'deviceId'),
      costItems: this.hasMany(CostItem, 'serviceId'),
      photosService: this.hasMany(Photo, 'serviceId', 'id'),
      photosDevice: this.hasMany(Photo, 'deviceId', 'deviceId'),
      requiredPhotoTypeIds: this.attr(null),
      requiredPhotoTypes: this.hasManyBy(PhotoType, 'requiredPhotoTypeIds'),
      number: this.string(''),
      foreignNumber: this.string(''),
      description: this.string(''),
      noteGroups: this.attr(null),
      isReadyForService: this.boolean(false),
      hasToClarify: this.boolean(false),
      hasToDeliver: this.boolean(false),
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
        customerId: data.klient_id,
        customer: data.klient
          ? Customer.apiConfig.dataTransformer({ data: data.klient })
          : null,
        deviceId: data.urzadzenie_id,
        device: data.urzadzenie
          ? Device.apiConfig.dataTransformer({ data: data.urzadzenie })
          : null,
        costItems: data.kosztorys_pozycje.map((costItem: any) =>
          CostItem.apiConfig.dataTransformer({ data: costItem })
        ),
        photosService: data.zdjecia_do_zlecenia.map((photo: any) =>
          Photo.apiConfig.dataTransformer({ data: photo })
        ),
        photosDevice: data.zdjecia_do_urzadzenia.map((photo: any) =>
          Photo.apiConfig.dataTransformer({ data: photo })
        ),
        requiredPhotoTypeIds: data.required_photos,
        number: data.nr,
        foreignNumber: data.nr_obcy,
        description: data.opis,
        noteGroups: data.opis_array,
        isReadyForService: data.is_gotowe_do_naprawy,
        hasToClarify: data.is_do_wyjasnienia,
        hasToDeliver: data.is_do_odwiezienia,
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
        expertise:
          data.dane.spr_status !== null
            ? <IExpertise>{
                status: data.dane.spr_status,
                labor: data.dane.spr_sprawdzenie ?? 0,
                delivery: data.dane.spr_dojazd ?? 0,
                dateString: data.dane.spr_data
              }
            : null,
        lastStatusDate: data.data_statusu,
        durationInDays: data.czas_trwania,
        durationInWeekdays: data.czas_trwania_robocze
      }
    }
  }

  get isMinCostVisible() {
    return this.isPaid && !this.isSale && !this.isComplaint
  }

  get lastStatusAt() {
    if (!this.lastStatusDate) return null
    return moment(this.lastStatusDate)
  }

  get duration() {
    return moment.duration(this.durationInDays, 'day')
  }

  get durationByWeekdays() {
    return moment.duration(this.durationInWeekdays, 'day')
  }

  get photos() {
    return [...this.photosService, ...this.photosDevice]
  }
}
