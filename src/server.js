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
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'
import cors from 'cors'
import { corsOptions } from './config/cors'

const START_SERVER = () => {
  const app = express()


  app.use(cors(corsOptions))
  // enable req.body json data
  app.use(express.json())

  // use APIs_V1
  app.use('/v1', APIs_V1)


  // middleware xu ly loi tap trung
  app.use(errorHandlingMiddleware)


  if (env.BUILD_MODE === 'production') {
    //moi truong production onrender
    app.listen(process.env.PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`3. PRODUCT Hello ${env.AUTHOR}, BE running at PORT: ${process.env.PORT}`)
    })
  } else {
    // moi truong dev
    app.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {
      // eslint-disable-next-line no-console
      console.log(`3. Local Dev Hello ${env.AUTHOR}, I am running at http://${env.LOCAL_DEV_APP_HOST}:${env.LOCAL_DEV_APP_PORT}/`)
    })
  }


  exitHook(() => {
    console.log('4. Disconnecting')
    COLOSE_DB()
    console.log('5. Closed DB')
  })
}

// chi khi ket noi den database thanh cong moi start server backend
console.log('1. Connecting...')
CONNECT_DB()
  .then(() => console.log('2. Connected!'))
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