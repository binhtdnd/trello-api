/* eslint-disable no-console */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import { CONNECT_DB, GET_DB, COLOSE_DB } from '~/config/mongodb'
import exitHook from 'async-exit-hook'
import { env } from '~/config/environment'

const START_SERVER = () => {
  const app = express()

  app.get('/', async (req, res) => {
    console.log(await GET_DB().listCollections().toArray())

    res.end('<h1>Hello world111</h1>')
  })

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello ${env.AUTHOR}, I am running at http://${env.APP_HOST}:${env.APP_PORT}/`)
  })

  exitHook(() => {
    console.log('4. Disconnecting')
    COLOSE_DB()
    console.log('5. Closed DB')
  })
}

// chi khi ket noi den database thanh cong moi start server backend
console.log('connecting...')
CONNECT_DB()
  .then(() => console.log('connected to Mdb cluod success'))
  .then(() => START_SERVER())
  .catch(error => {
    console.error(error)
    process.exit(0)
  })

// (async () => {
//   try {
//     console.log('connecting...')
//     await CONNECT_DB()
//     console.log('connected to Mdb cluod success')
//     START_SERVER()
//   } catch (error) {
//     console.error(error)
//     process.exit(0)
//   }
// })()