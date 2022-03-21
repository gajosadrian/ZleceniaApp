import { use, install } from '@vuex-orm/core'
import VuexORMAxios from '@vuex-orm/plugin-axios'
import database from './database'

use(VuexORMAxios)

export const plugins = [install(database)]
