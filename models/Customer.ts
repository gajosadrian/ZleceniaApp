import { Model } from '@vuex-orm/core'

interface ISatisfaction {
  id: number
  text: string
  icon: string
  color: string
}

export default class Customer extends Model {
  static entity = 'customers'

  public id!: string
  public name!: string
  public postalCode!: string
  public city!: string
  public street!: string
  public phones!: string[]
  public phone!: string
  public satisfaction!: ISatisfaction

  static fields() {
    return {
      id: this.number(0)
    }
  }

  static apiConfig = {
    dataTransformer: (res: any) => {
      const data = res.data
      return {
        id: data.id
      }
    }
  }
}
