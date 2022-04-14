import { Model } from '@vuex-orm/core'
import PhotoType, { Type } from '~/models/PhotoType'

export default class Photo extends Model {
  static entity = 'photos'

  public id!: number
  public serviceId!: number
  public deviceId!: number
  public typeId!: Type
  public type!: PhotoType | null
  public url!: string
  public isDeletable!: boolean

  static fields() {
    return {
      id: this.number(0),
      serviceId: this.number(0),
      deviceId: this.number(0),
      typeId: this.string(''),
      type: this.belongsTo(PhotoType, 'typeId'),
      url: this.string(''),
      isDeletable: this.boolean(false)
    }
  }

  static apiConfig = {
    dataTransformer: (res: any) => {
      const data = res.data
      return {
        id: data.id,
        serviceId: data.zlecenie_id,
        deviceId: data.urzadzenie_id,
        typeId: data.type,
        url: data.url,
        isDeletable: data.is_deletable
      }
    }
  }
}
