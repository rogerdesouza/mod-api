import * as Yup from 'yup'
import Usuario from '../models/usuario'

class UsuarioController {

    // Cadastra um único registro
    async store(req, res) {

        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string()
                .required()
                .min(6),
        })

        if (!(await schema.isValid(req.body))) {
            return res.json({
                error: 'A validação falhou'
            })
        }

        const usuarioExiste = await Usuario.findOne({
            where: {
                email: req.body.email
            }
        })

        if (usuarioExiste) {
            return res.status(400).json({
                error: 'Usuário já existe',
            })
        }

        const {
            id,
            name,
            email,
            password,
            provider
        } = await Usuario.create(req.body)

        return res.json({
            id,
            name,
            email,
            password,
            provider
        })
    }

    // Lista todos os registros
    async index() { }
    // Exibe um único registro
    async show() { }
    // Altera um único registro
    update(req, res) { return res.json({ message: 'Método Update' }) }
    // Remove um único registro
    async delete() { }

}

export default new UsuarioController()