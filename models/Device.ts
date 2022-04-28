import { Model } from '@vuex-orm/core'
import DeviceWarranty from '~/models/DeviceWarranty'

export default class Device extends Model {
  static entity = 'devices'

  public id!: number
  public warrantyId!: number
  public warranty!: DeviceWarranty | null
  public brand!: string
  public name!: string
  public model!: string
  public serialNumber!: string
  public productCode!: string

  static fields() {
    return {
      id: this.number(0),
      warrantyId: this.number(0),
      warranty: this.belongsTo(DeviceWarranty, 'warrantyId'),
      brand: this.string(''),
      name: this.string(''),
      model: this.string(''),
      serialNumber: this.string(''),
      productCode: this.string('')
    }
  }

  static apiConfig = {
    dataTransformer: (res: any) => {
      const data = res.data
      return {
        id: data.id,
        warrantyId: data.id,
        warranty: data.is_set_gwarancja
          ? {
              id: data.id,
              startDateString: data.data_instalacji,
              durationInMonths: data.okres_gwarancji
            }
          : null,
        brand: data.producent,
        name: data.nazwa,
        model: data.model,
        serialNumber: data.nr_seryjny,
        productCode: data.kod_wyrobu
      }
    }
  }
}
