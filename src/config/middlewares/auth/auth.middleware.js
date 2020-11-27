import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import authConfig from './auth.config'

export default async (req, res, next) => {
  const {
    authorization
  } = req.headers

  // Ausência do token
  if (!authorization) {
    return res.status(401).json({
      error: 'Token not provider'
    })
  }

  // Desestruturação de vetor (Bearer, ...token)
  const [, token] = authorization.split(' ')

  try {
    /**
     * É usado o promisify podemos usar o async/await
     * ao invés do velho callback do verify()
     */
    const {
      id
    } = await promisify(jwt.verify)(token, authConfig.secret)
    // Incluir o usuarioId dentro de todos os requires
    req.usuarioId = id
  } catch (error) {
    return res.status(401).json({
      error: 'Token invalid'
    })
  }
  return next()
}