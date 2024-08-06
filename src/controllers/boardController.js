//
//
//
//
//
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  try {
    // console.log('req.body: ', req.body)

    //
    //
    //
    //
    //
    //
    throw new ApiError(StatusCodes.BAD_GATEWAY, 'binhtd test error')

    // res.status(StatusCodes.CREATED).json({ message: 'POST: API get create new board. Run from Controller' })
  } catch (error) {
    next(error)
    // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    //   errors: error.message
    // })
  }
}

export const boardController = {
  createNew
}