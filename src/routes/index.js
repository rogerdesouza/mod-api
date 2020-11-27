import { Router } from "express"
import UsuarioController from '../controllers/usuario.controller'

const router = new Router()

router.get('/', (req, res) => {
    return res.status(200).json({ message: 'MOD-API'})
})

router.post('/usuarios', UsuarioController.store)

export default router