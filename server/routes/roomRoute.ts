import express from 'express'
import {
  createRoom,
  getUserRooms,
  getRoom,
  getUsersInRoom,
} from '../controllers/roomController'

const router = express.Router()

router.post('/', createRoom)
router.get('/users/:userId', getUserRooms)
router.get('/:roomId', getRoom)
router.get('/:roomId/users/:userId', getUsersInRoom)

export default router
