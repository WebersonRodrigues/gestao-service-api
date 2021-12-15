const { Model, DataTypes } = require('sequelize');

class Servico extends Model {
    static init(connection){

        super.init({
            descricao: DataTypes.STRING,
            valor: DataTypes.DOUBLE,
            observacao: DataTypes.TEXT
        },{
            sequelize: connection,
            schema: 'public',
            tableName: 'servicos',
            createdAt: 'criadoEm',
            updatedAt: 'atualizadoEm',
            timestamps: true,
            underscored: false
        });
    }
}

module.exports = Servico;