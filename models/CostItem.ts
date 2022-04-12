import { Model } from '@vuex-orm/core'
import _ from 'lodash'
import Ware from '~/models/Ware'
import CostItemOrder from '~/models/CostItemOrder'

enum State {
  Mounted = 'zamontowane'
  // TODO
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
  public ware!: Ware
  public orderId!: number
  public order!: CostItemOrder | null
  public description!: string
  public price!: number
  public quantity!: number
  public taxRate!: number
  public state!: IState

  static fields() {
    return {
      id: this.number(0),
      serviceId: this.number(0),
      wareId: this.number(0),
      ware: this.belongsTo(Ware, 'wareId'),
      orderId: this.number(0),
      order: this.belongsTo(CostItemOrder, 'orderId'),
      description: this.string(''),
      price: this.number(0),
      quantity: this.number(0),
      taxRate: this.number(0),
      state: this.attr(null)
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
    return _.round(this.price + this.tax, 2)
  }

  get grossAmount(): number {
    return this.grossPrice * this.quantity
  }

  get tax(): number {
    return _.round(this.grossAmount / (1 + this.taxRate), 2)
  }

  get amount(): number {
    return this.grossAmount - this.tax
  }
}
