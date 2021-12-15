const { Model, DataTypes } = require('sequelize');

class Perfil extends Model {
    static init(connection){

        super.init({
            descricao: DataTypes.STRING
        },{
            sequelize: connection,
            schema: 'public',
            tableName: 'perfis',
            createdAt: 'criadoEm',
            updatedAt: 'atualizadoEm',
            timestamps: true,
            underscored: false
        });
    }
}

module.exports = Perfil;