import { Model } from '@vuex-orm/core'

export enum Type {
  Nameplate = 'tabliczka',
  Warranty = 'gwarancja',
  Policy = 'polisa',
  Statement = 'oswiadczenie',
  Receipt = 'dowod_zakupu',
  Device = 'urzadzenie',
  Other = 'inne'
}

type SaveTo = 'zlecenie' | 'urzadzenie'

export default class PhotoType extends Model {
  static entity = 'photo_types'

  public id!: Type
  public name!: string
  public saveTo!: SaveTo

  static fields() {
    return {
      id: this.string(''),
      name: this.string(''),
      saveTo: this.string('')
    }
  }
}
