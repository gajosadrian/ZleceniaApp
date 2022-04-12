import { Model } from '@vuex-orm/core'

export default class Device extends Model {
  static entity = 'devices'

  public id!: number
  public brand!: string
  public name!: string
  public model!: string
  public serialNumber!: string
  public productCode!: string

  static fields() {
    return {
      id: this.number(0),
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
        brand: data.producent,
        name: data.nazwa,
        model: data.model,
        serialNumber: data.nr_seryjny,
        productCode: data.kod_wyrobu
      }
    }
  }
}
