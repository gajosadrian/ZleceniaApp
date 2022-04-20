import { Model } from '@vuex-orm/core'
import _ from 'lodash'
import moment from 'moment'
import Ware from '~/models/Ware'
import CostItemOrder from '~/models/CostItemOrder'
import User from '~/models/User'
import TechnicianStock from '~/models/TechnicianStock'

export enum Type {
  Labor,
  Delivery,
  Part,
  Shipping,
  Settlement
}

export enum State {
  Prepared = 'odlozone',
  Mounted = 'zamontowane',
  Sold = 'sprzedane',
  Fake = 'rozpisane',
  Ordered = 'zamowione',
  Estimate = 'wycena',
  Deposit = 'depozyt',
  ToShipping = 'do_wyslania',
  Shipped = 'wyslane',
  Saleable = 'chodliwe',
  ForAnotherDate = 'na_inny_termin',
  Unnecessary = 'niepotrzebne',
  Unsettled = 'nierozliczone'
}

interface IState {
  id: State
  name: string
  icon: string
  color: string
  isVisible: boolean
}

export default class CostItem extends Model {
  static entity = 'cost_items'

  public id!: number
  public serviceId!: number
  public wareId!: number
  public ware!: Ware | null
  public orderId!: number
  public order!: CostItemOrder | null
  public technicianStock!: TechnicianStock | null
  public createdUserId!: number
  public createdUser!: User | null
  public updatedUserId!: number
  public updatedUser!: User | null
  public typeId!: Type
  public description!: string
  public price!: number
  public quantity!: number
  public taxRate!: number
  public state!: IState | null
  protected createdDateString!: string
  protected updatedDateString!: string

  static fields() {
    return {
      id: this.number(0),
      serviceId: this.number(0),
      wareId: this.number(0),
      ware: this.belongsTo(Ware, 'wareId'),
      orderId: this.number(0),
      order: this.belongsTo(CostItemOrder, 'orderId'),
      typeId: this.attr(null),
      createdUserId: this.number(0),
      createdUser: this.belongsTo(User, 'createdUserId'),
      updatedUserId: this.number(0),
      updatedUser: this.belongsTo(User, 'updatedUserId'),
      technicianStock: this.hasOne(TechnicianStock, 'costItemId'),
      description: this.string(''),
      price: this.number(0),
      quantity: this.number(0),
      taxRate: this.number(0),
      state: this.attr(null),
      createdDateString: this.string(''),
      updatedDateString: this.string('')
    }
  }

  static apiConfig = {
    dataTransformer: (res: any) => {
      const data = res.data
      return {
        id: data.id,
        serviceId: data.zlecenie_id,
        wareId: data.towar_id,
        ware: data.towar
          ? Ware.apiConfig.dataTransformer({ data: data.towar })
          : null,
        orderId: data.zamowienie_obj_id,
        order: data.zamowienie_obj,
        technicianStock:
          data.naszykowana_czesc && data.naszykowana_czesc?.is_naszykowane
            ? TechnicianStock.apiConfig.dataTransformer({
                data: data.naszykowana_czesc
              })
            : null,
        createdUserId: data.user_id,
        createdUser: data.user,
        updatedUserId: data.updated_user_id,
        updatedUser: data.user_updated,
        typeId: data.is_robocizna
          ? Type.Labor
          : data.is_dojazd
          ? Type.Delivery
          : data.is_transport
          ? Type.Shipping
          : data.is_rozliczenie
          ? Type.Settlement
          : Type.Part,
        description: data.opis,
        price: data.cena,
        quantity: data.ilosc,
        taxRate: data.vat,
        state: data.state_key
          ? <IState>{
              id: data.state.id,
              name: data.state.nazwa,
              icon: data.state.icon,
              color: data.state.color,
              isVisible: data.state.visible
            }
          : null
      }
    }
  }

  get isOrder(): boolean {
    return !!this.orderId
  }

  get grossPrice(): number {
    return _.round(this.price * (1 + this.taxRate), 2)
  }

  get grossAmount(): number {
    return this.grossPrice * this.quantity
  }

  get tax(): number {
    return this.grossAmount - this.amount
  }

  get amount(): number {
    return _.round(this.grossAmount / (1 + this.taxRate), 2)
  }

  get createdAt() {
    if (!this.createdDateString) return null
    return moment(this.createdDateString)
  }

  get updatedAt() {
    if (!this.updatedDateString) return null
    return moment(this.updatedDateString)
  }
}
