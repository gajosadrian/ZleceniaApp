import { Model } from '@vuex-orm/core'

export default class Ware extends Model {
  static entity = 'wares'

  id!: number
  name!: string
  description!: string
  symbol!: string
  foreignSymbol!: string
  foreignSymbol2!: string
  shelf!: string
  unit!: string
  isService!: boolean
  isVoidWare!: boolean
  isPhoto!: boolean
  photoUrl!: string
  compressedPhotoUrl!: string

  static fields() {
    return {
      id: this.number(0),
      name: this.string(''),
      description: this.string(''),
      symbol: this.string(''),
      foreignSymbol: this.string(''),
      foreignSymbol2: this.string(''),
      shelf: this.string(''),
      unit: this.string(''),
      isService: this.boolean(false),
      isVoidWare: this.boolean(false),
      isPhoto: this.boolean(false),
      photoUrl: this.string(''),
      compressedPhotoUrl: this.string('')
    }
  }

  static apiConfig = {
    dataTransformer: (res: any) => {
      const data = res.data
      return {
        id: data.id,
        name: data.nazwa,
        description: data.opis,
        symbol: data.symbol,
        foreignSymbol: data.symbol_dostawcy,
        foreignSymbol2: data.symbol_dostawcy2,
        shelf: data.polka,
        unit: data.jednostka,
        isService: data.is_usluga,
        isVoidWare: data.is_czesc_symbol,
        isPhoto: data.is_zdjecie,
        photoUrl: data.zdjecie_url,
        compressedPhotoUrl: data.zdjecie_compressed_url
      }
    }
  }

  get isWare(): boolean {
    return !this.isService
  }
}
