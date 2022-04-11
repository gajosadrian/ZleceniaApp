import { Model } from '@vuex-orm/core'

interface ISatisfaction {
  id: number
  text: string
  description: string
  icon: string
  color: string
}

export default class Customer extends Model {
  static entity = 'customers'

  public id!: number
  public name!: string
  public postalCode!: string
  public city!: string
  public street!: string
  public phones!: string[]
  public phone!: string
  public satisfaction!: ISatisfaction

  static fields() {
    return {
      id: this.number(0),
      name: this.string(''),
      postalCode: this.string(''),
      city: this.string(''),
      street: this.string(''),
      phones: this.attr(null),
      phone: this.string(''),
      satisfaction: this.attr(null)
    }
  }

  static apiConfig = {
    dataTransformer: (res: any) => {
      const data = res.data
      return {
        id: data.id,
        name: data.nazwa,
        postalCode: data.kod_pocztowy,
        city: data.miasto_short,
        street: data.adres,
        phones: data.telefony,
        phone: data.telefon,
        satisfaction: <ISatisfaction>{
          id: data.data.happy_type.id,
          text: data.data.happy_type.text,
          description: data.data.happy_type_description ?? '',
          icon: data.data.happy_type.icon,
          color: data.data.happy_type.color
        }
      }
    }
  }
}
