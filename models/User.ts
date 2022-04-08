import { Model } from '@vuex-orm/core'
import _ from 'lodash'

export default class User extends Model {
  static entity = 'users'

  public id!: string
  public name!: string
  public email!: string
  public login!: string
  public isTechnician!: boolean
  public isMobile!: boolean
  public isAdmin!: boolean

  static fields() {
    return {
      id: this.number(0),
      name: this.string(''),
      email: this.string(''),
      login: this.string(''),
      isTechnician: this.boolean(false),
      isMobile: this.boolean(false),
      isAdmin: this.boolean(false)
    }
  }

  static apiConfig = {
    dataTransformer: (res: any) => {
      const data = res.data
      return {
        id: data.id,
        name: data.name_reversed,
        email: data.email,
        login: data.login,
        isTechnician: data.is_technik,
        isMobile: data.is_mobile,
        isAdmin: data.is_admin
      }
    }
  }

  get firstName() {
    const name = _.head(this.name.split(' '))
    return name ? name.trim() : ''
  }

  get lastName() {
    const name = _.last(this.name.split(' '))
    return name ? name.trim() : ''
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
