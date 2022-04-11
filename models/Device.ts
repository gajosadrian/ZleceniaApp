import { Model } from '@vuex-orm/core'

export default class Device extends Model {
  static entity = 'devices'

  id!: number
  brand!: string
  name!: string
  model!: string
  serialNumber!: string
  productCode!: string

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
}
