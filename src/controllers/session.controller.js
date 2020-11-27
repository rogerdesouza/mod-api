import * as Yup from 'yup'
import jwt from 'jsonwebtoken'
import Usuario from '../models/usuario'
import configAuth from '../config/auth/config'

class SessionController {

    async store(req, res) {
        // Consistencia dos inputs passados
        const schema = Yup.object().shape({
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string().required(),
        })

        if (!(await schema.isValid(req.body))) {
            return res.json({
                error: 'A validação falhou'
            })
        }

        // Consistencia se o dado (constraint) confere na base
        const {
            email,
            password
        } = req.body
        const usuario = await Usuario.findOne({
            where: {
                email
            },
        })

        if (!usuario) {
            return res.status(401).json({
                error: 'Usuario não encontrado'
            })
        }

        // Consistencia se a senha confere no Model
        if (!(await usuario.checkPassword(password))) {
            return res.status(401).json({
                error: 'O password está incorreto'
            })
        }

        const {
            id,
            nome
        } = usuario

        /**
         * Em usuario: É passado para o jwt um cabecalho {id, nome, email}, este será decodificado la na frente quando necessário
         * Em token: É passado a chave secreta (de sua preferência) e do tempo de expiração da chave
         */
        return res.json({
            usuario: {
                id,
                nome,
                email,
            },
            token: jwt.sign({
                id
            }, configAuth.secret, {
                expiresIn: configAuth.expiresIn,
            }),
        })
    }
}

export default new SessionController()