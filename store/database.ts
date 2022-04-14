import { Database } from '@vuex-orm/core'
import Test from '~/models/Test'
import Schedule from '~/models/Schedule'
import Event from '~/models/Event'
import Appointment from '~/models/Appointment'
import Service from '~/models/Service'
import Technician from '~/models/Technician'
import User from '~/models/User'
import Customer from '~/models/Customer'
import Device from '~/models/Device'
import Ware from '~/models/Ware'
import CostItem from '~/models/CostItem'
import CostItemOrder from '~/models/CostItemOrder'
import Photo from '~/models/Photo'
import PhotoType from '~/models/PhotoType'

const database = new Database()

database.register(Test)
database.register(Schedule)
database.register(Event)
database.register(Appointment)
database.register(Service)
database.register(Customer)
database.register(Technician)
database.register(Device)
database.register(User)
database.register(Ware)
database.register(CostItem)
database.register(CostItemOrder)
database.register(Photo)
database.register(PhotoType)

export default database
