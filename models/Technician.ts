import { Model } from '@vuex-orm/core'

export default class Technician extends Model {
  static entity = 'technicians'

  public id!: number
  public firstName!: string
  public lastName!: string
  public symbolKey!: string
  public laborSymbol!: string
  public deliverySymbol!: string
  public settlementSymbol!: string

  static fields() {
    return {
      id: this.number(0),
      firstName: this.string(''),
      lastName: this.string(''),
      symbolKey: this.string(''),
      laborSymbol: this.string(''),
      deliverySymbol: this.string(''),
      settlementSymbol: this.string('')
    }
  }

  static apiConfig = {
    dataTransformer: (res: any) => {
      const data = res.data
      return {
        id: data.id,
        firstName: data.imie,
        lastName: data.nazwisko,
        symbolKey: data.symbol_key,
        laborSymbol: data.symbol_robocizna,
        deliverySymbol: data.symbol_dojazd,
        settlementSymbol: data.symbol_rozliczone
      }
    }
  }

  get name() {
    return `${this.firstName} ${this.lastName}`
  }

  get invertedName() {
    return `${this.lastName} ${this.firstName}`
  }

  get shortName() {
    return `${this.firstName} ${this.lastName.substr(0, 1)}.`
  }

  get acronym() {
    return this.firstName.substr(0, 1) + this.lastName.substr(0, 1)
  }

  get initials() {
    return `${this.firstName.substr(0, 1)}.${this.lastName.substr(0, 1)}.`
  }
}
