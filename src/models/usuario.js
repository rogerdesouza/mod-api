import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcrypt'

class Usuario extends Model {

  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        email: Sequelize.STRING,
        // O campo 'virtual' nao existe no db, apenas na execução
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN
      },
      {
        sequelize,
        tableName: 'usuario',
        modelName: 'usuario'
      }
    )

    // Hooks
    this.addHook('beforeSave', async usuario => {
      if (usuario.password) {
        usuario.password_hash = await bcrypt.hash(usuario.password, 8)
      }
    })

    return this;
  }
}
export default Usuario;