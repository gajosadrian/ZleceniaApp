import { Plugin } from '@nuxt/types'
import PhotoType, { Type } from '~/models/PhotoType'

const plugin: Plugin = async () => {
  await PhotoType.create({
    data: [
      <PhotoType>{
        id: Type.Nameplate,
        name: 'Tabliczka',
        saveTo: 'urzadzenie'
      },
      <PhotoType>{
        id: Type.Warranty,
        name: 'Gwarancja',
        saveTo: 'urzadzenie'
      },
      <PhotoType>{
        id: Type.Insurance,
        name: 'Polisa',
        saveTo: 'urzadzenie'
      },
      <PhotoType>{
        id: Type.Statement,
        name: 'Oświadczenie',
        saveTo: 'zlecenie'
      },
      <PhotoType>{
        id: Type.Receipt,
        name: 'Dowód zakupu',
        saveTo: 'urzadzenie'
      },
      <PhotoType>{
        id: Type.Device,
        name: 'Urządzenie',
        saveTo: 'urzadzenie'
      },
      <PhotoType>{
        id: Type.Other,
        name: 'Inne',
        saveTo: 'zlecenie'
      }
    ]
  })
}

export default plugin
