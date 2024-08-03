/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
// 

const MONGODB_URI = 'mongodb+srv://binhtdnd:@cluster0-trello.aikvlar.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0-Trello'
const DATABASE_NAME = 'data-trello'

import { MongoClient, ServerApiVersion } from 'mongodb'

let trelloDatabaseInstance = null

const mongoClientInstance = new MongoClient(MONGODB_URI, {
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
  trelloDatabaseInstance = mongoClientInstance.db(DATABASE_NAME)
}

//tận dụng lại biến trelloDatabaseInstance, gọi lại ở nơi khác để sử dụng nếu cần
//neu chua ket noi thi hay ket noi
export const GET_DB = () => {
  // throw giong return , tra ra thong bao ket noi
  if (!trelloDatabaseInstance) throw new Error('Must connect to Database first!')
  // neu ket noi dc tra ra Instance
  return trelloDatabaseInstance
}