import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'


const createNew = async (req, res, next) => {

  const correctCondition = Joi.object({
    boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    title: Joi.string().required().min(3).max(50).trim().strict()
  })
  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    const errorMessege = new Error(error).message
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessege)
    next(customError)
  }

}


const update = async (req, res, next) => {

  const correctCondition = Joi.object({
    // di chuyen? card cung column thi ko update board ID
    // boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    title: Joi.string().min(3).max(50).trim().strict(),
    cardOrderIds: Joi.array().items(
      Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
    )

  })
  try {
    //abortEarly: false de? truong hop co nhieu loi validation thi tra ve tat ca cac loi, ko thi chi tra 1 loi dau tien
    //doi voi turong hop update cho phep allowUnknown: true de cho phep day len 1 truong` chua dinhj nghia (unknown)
    await correctCondition.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true,
    })
    next()

  } catch (error) {
    const errorMessege = new Error(error).message
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessege)
    next(customError)
  }


}

const deleteItem = async (req, res, next) => {
  console.log('🚀 ~ updateItem ~ req:', req)

  const correctCondition = Joi.object({
    id: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  })
  try {
    await correctCondition.validateAsync(req.params)
    next()
  } catch (error) {
    const errorMessege = new Error(error).message
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessege)
    next(customError)
  }


}

export const columnValidation = {
  createNew,
  update,
  deleteItem
}