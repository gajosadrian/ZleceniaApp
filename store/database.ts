import { Database } from '@vuex-orm/core'
import Test from '@/models/Test'
import Schedule from '~/models/Schedule'
import Event from '~/models/Event'
import Service from '~/models/Service'

const database = new Database()

database.register(Test)
database.register(Schedule)
database.register(Event)
database.register(Service)

export default database
