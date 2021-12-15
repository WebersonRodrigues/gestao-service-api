const { Model, DataTypes } = require('sequelize');

class Cliente extends Model {
    static init(connection){

        super.init({
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            telefone: DataTypes.STRING,
            cpfOuCnpj: DataTypes.STRING
        },{
            sequelize: connection,
            schema: 'public',
            tableName: 'clientes',
            createdAt: 'criadoEm',
            updatedAt: 'atualizadoEm',
            timestamps: true,
            underscored: false
        });
    }
}

module.exports = Cliente;