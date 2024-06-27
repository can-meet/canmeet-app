import express from 'express'
import { getUser, updateUser } from '../controllers/userController'

const router = express.Router()

router.get('/:userId', getUser)
router.put('/:userId', updateUser)

export default router
