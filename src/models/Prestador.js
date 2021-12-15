const { Model, DataTypes } = require('sequelize');

class Prestador extends Model {
    static init(connection){

        super.init({
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            telefone: DataTypes.STRING,
            cpfOuCnpj: DataTypes.STRING,
            observacao: DataTypes.TEXT
        },{
            sequelize: connection,
            schema: 'public',
            tableName: 'prestadores',
            createdAt: 'criadoEm',
            updatedAt: 'atualizadoEm',
            timestamps: true,
            underscored: false
        });
    }
}

module.exports = Prestador;