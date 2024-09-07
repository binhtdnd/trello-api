/* eslint-disable no-useless-catch */


import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'
import { cardModel } from '~/models/cardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
const createNew = async (reqBody) => {
  try {
    const newColumn = {
      ...reqBody
    }

    const createdColumn = await columnModel.createNew(newColumn)
    const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)

    if (getNewColumn) {
      //khi tao moi 1 column thi mang? cards rong, tra? ra cho front end
      getNewColumn.cards = []

      await boardModel.pushColumnOrderIds(getNewColumn)
    }

    return getNewColumn
  } catch (error) { throw error }
}

const update = async (columnId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }

    const updatedColumn = await columnModel.update(columnId, updateData)


    return updatedColumn
  } catch (error) { throw error }
}
const deleteItem = async (columnId) => {
  try {
    const targetColumn = await columnModel.findOneById(columnId)
    if (!targetColumn) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Column not foundl.')
    }
    //delete column
    await columnModel.deleteOneById(columnId)

    //delete all cards
    const cC = await cardModel.deleteManyByColumnId(columnId)

    //fix columnIds in board
    await boardModel.pullColumnOrderIds(targetColumn)

    return { deleteResult: `Delete column and  ${cC.deletedCount} cards successfully!!!` }
  } catch (error) { throw error }
}

export const columnService = {
  createNew,
  update,
  deleteItem
}