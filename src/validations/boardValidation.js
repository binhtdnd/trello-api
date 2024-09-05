import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { BOARD_TYPES } from '~/utils/constants'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'


const createNew = async (req, res, next) => {

  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required',
      'string.empty': 'Title is not allwed to be empty',
      'string.min': 'Title min 3 chars',
      'string.max': 'Title max 50 chars',
      'string.trim': 'Title must not have leading or trailing whitespace'
    }),
    description: Joi.string().required().min(3).max(256).trim().strict().messages({
      'any.required': 'description is required',
      'string.empty': 'description is not allwed to be empty',
      'string.min': 'description min 3 chars',
      'string.max': 'description max 50 chars',
      'string.trim': 'description must not have leading or trailing whitespace'
    }),
    type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required()

  })
  try {
    // console.log('req.body: ', req.body)
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
    title: Joi.string().min(3).max(50).trim().strict(),
    description: Joi.string().min(3).max(256).trim().strict(),
    type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE),
    columnOrderIds: Joi.array().items(
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
const moveCardToTheDifferentColumn = async (req, res, next) => {

  const correctCondition = Joi.object({

    currentCardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),

    prevColumnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    prevCardOrderIds: Joi.array().required().items(
      Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
    ),

    nextColumnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    nextCardOrderIds: Joi.array().required().items(
      Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
    )

  })
  try {
    //abortEarly: false de? truong hop co nhieu loi validation thi tra ve tat ca cac loi, ko thi chi tra 1 loi dau tien
    //doi voi turong hop update cho phep allowUnknown: true de cho phep day len 1 truong` chua dinhj nghia (unknown)
    await correctCondition.validateAsync(req.body, {
      // abortEarly: false,
    })
    next()

  } catch (error) {
    const errorMessege = new Error(error).message
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessege)
    next(customError)
  }
}

export const boardValidation = {
  createNew, update, moveCardToTheDifferentColumn
}