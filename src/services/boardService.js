// 1
// 2
// 3
// 4
// 5

import ApiError from '~/utils/ApiError'
import { slugify } from '~/utils/formatters'

const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug:slugify(reqBody.title)
    }
    // luon phai co return neu ko req se tra ve rong hoac req chay mai ko dung
    return newBoard
  } catch (error) {
    throw error
  }
}
export const boardService = {
  createNew
}