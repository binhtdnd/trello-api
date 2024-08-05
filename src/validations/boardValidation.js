import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {

  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required':'Title is required',
      'string.empty':'Title is not allwed to be empty',
      'string.min':'Title min 3 chars',
      'string.max':'Title max 50 chars',
      'string.trim':'Title must not have leading or trailing whitespace'
    }),
    description: Joi.string().required().min(3).max(256).trim().strict().messages({
      'any.required':'description is required',
      'string.empty':'description is not allwed to be empty',
      'string.min':'description min 3 chars',
      'string.max':'description max 50 chars',
      'string.trim':'description must not have leading or trailing whitespace'
    })

  })
  try {
    console.log('req.body: ', req.body)
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // next()
    res.status(StatusCodes.CREATED).json({ message: 'POST: API get create new board. Run from validaion' })
  } catch (error) {
    console.log(error)
    // console.log(new Error(error))
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message
    })
  }


}

export const boardValidation = {
  createNew
}