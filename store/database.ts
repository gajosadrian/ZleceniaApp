import { Database } from '@vuex-orm/core'
import Test from '@/models/Test'

const database = new Database()

database.register(Test)

export default database
