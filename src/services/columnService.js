/* eslint-disable no-useless-catch */

import { columnModel } from '~/models/columnModel'

const createNew = async (reqBody) => {
  try {
    const newColumn = {
      ...reqBody
    }

    const createdColumn = await columnModel.createNew(newColumn)
    // const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)

    //

    return createdColumn
  } catch (error) { throw error }
}

export const columnService = {
  createNew
}