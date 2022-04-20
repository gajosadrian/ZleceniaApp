import { Model } from '@vuex-orm/core'

export default class TechnicianStock extends Model {
  static entity = 'technician_stocks'

  public id!: number
  public costItemId!: number
  public quantity!: number

  static fields() {
    return {
      id: this.number(0),
      costItemId: this.number(0),
      quantity: this.number(0)
    }
  }

  static apiConfig = {
    dataTransformer: (res: any) => {
      const data = res.data
      return {
        id: data.id,
        costItemId: data.kosztorys_pozycja_id,
        quantity: data.ilosc
      }
    }
  }
}
