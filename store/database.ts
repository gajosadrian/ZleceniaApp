import { Database } from '@vuex-orm/core'
import Test from '~/models/Test'
import Schedule from '~/models/Schedule'
import Event from '~/models/Event'
import Appointment from '~/models/Appointment'
import Service from '~/models/Service'
import Technician from '~/models/Technician'
import User from '~/models/User'

const database = new Database()

database.register(Test)
database.register(Schedule)
database.register(Event)
database.register(Appointment)
database.register(Service)
database.register(Technician)
database.register(User)

export default database
