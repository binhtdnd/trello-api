/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
// QiCzETwIlYjsQCa3


import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'


let trelloDatabaseInstance = null

const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export const CONNECT_DB = async () => {
  // gọi kết nối tới MongoDB Atlas với URI đã khai báo trong thân của mongoClientInstance
  await mongoClientInstance.connect()

  // sau await , sau khi ket noi thanh cong, gan bien trelloDatabaseInstance
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

//
//
//
//

export const COLOSE_DB = async () => {
  console.log('on clodseDB from mongodb.js')
  await mongoClientInstance.close()
}
//tận dụng lại biến trelloDatabaseInstance, gọi lại ở nơi khác để sử dụng nếu cần
//neu chua ket noi thi hay ket noi
export const GET_DB = () => {
  // throw giong return , tra ra thong bao ket noi
  if (!trelloDatabaseInstance) throw new Error('Must connect to Database first!')
  // neu ket noi dc tra ra Instance
  return trelloDatabaseInstance
}