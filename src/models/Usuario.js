const { Model, DataTypes } = require('sequelize');

class Usuario extends Model {
    static init(connection){

        super.init({
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            senha: DataTypes.TEXT,
            idPerfil: DataTypes.BIGINT,
            dataInativacao: DataTypes.DATE
        },{
            sequelize: connection,
            schema: 'public',
            tableName: 'usuarios',
            createdAt: 'criadoEm',
            updatedAt: 'atualizadoEm',
            timestamps: true,
            underscored: false
        });
    }
}

module.exports = Usuario;