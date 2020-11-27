import { Router } from "express"
import AuthMiddleware from '../config/middlewares/auth/auth.middleware'
import UsuarioController from '../controllers/usuario.controller'
import SessionController from '../controllers/session.controller'

const router = new Router()

router.get('/', (req, res) => {
    return res.status(200).json({ message: 'MOD-API'})
})


// logar
router.post('/sessions', SessionController.store)

// usuario
router.post('/usuarios', UsuarioController.store)
router.put('/usuarios', AuthMiddleware, UsuarioController.update)

export default router