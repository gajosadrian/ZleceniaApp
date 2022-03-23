import { Database } from '@vuex-orm/core'
import Test from '@/models/Test'
import Schedule from '~/models/Schedule'
import Event from '~/models/Event'

const database = new Database()

database.register(Test)
database.register(Schedule)
database.register(Event)

export default database
