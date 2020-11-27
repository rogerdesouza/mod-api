import { Router } from "express"
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

export default router