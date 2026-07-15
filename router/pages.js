import express from 'express'
import userController from '../controller/userController.js'

const router = express.Router()

router.get("/", userController.getUserList)
router.get("/create", userController.getCreateUserGet)
router.post("/create", userController.getCreateUserPost)
router.get("/:id/update", userController.getUpdateUserGet)
router.post("/:id/update", userController.getUpdateUserPost)
router.post("/:id/delete", userController.usersDelete)
export default router