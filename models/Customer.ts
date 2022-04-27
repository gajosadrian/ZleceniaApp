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
  public symbol!: string
  public name!: string
  public postalCode!: string
  public city!: string
  public street!: string
  public addressForSearch!: string
  public phones!: string[]
  public phone!: string
  public satisfaction!: ISatisfaction

  static fields() {
    return {
      id: this.number(0),
      symbol: this.string(''),
      name: this.string(''),
      postalCode: this.string(''),
      city: this.string(''),
      street: this.string(''),
      addressForSearch: this.string(''),
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
        symbol: data.symbol,
        name: data.nazwa,
        postalCode: data.kod_pocztowy,
        city: data.miasto_short,
        street: data.adres,
        addressForSearch: data.adres_search,
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

  get googleMapsLink() {
    return `https://www.google.com/maps/search/?api=1&query=${this.addressForSearch}`
  }

  get yanosikLink() {
    return 'https://play.google.com/store/apps/details?id=pl.neptis.yanosik.mobi.android&launch=true'
  }

  get autoMapaLink() {
    return `intent://q=${this.addressForSearch}/#Intent;package=pl.aqurat.automapa;scheme=geo;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;end`
  }
}
