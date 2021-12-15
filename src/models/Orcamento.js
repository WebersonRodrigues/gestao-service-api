const { Model, DataTypes } = require('sequelize');

class Orcamento extends Model {
    static init(connection){

        super.init({
            descricao: DataTypes.STRING,
            idCliente: DataTypes.BIGINT,
            desconto: DataTypes.DOUBLE,
            acrescimo: DataTypes.DOUBLE,
            valorTotal: DataTypes.DOUBLE,
            observacao: DataTypes.TEXT
        },{
            sequelize: connection,
            schema: 'public',
            tableName: 'orcamentos',
            createdAt: 'criadoEm',
            updatedAt: 'atualizadoEm',
            timestamps: true,
            underscored: false
        });
    }
}

module.exports = Orcamento;