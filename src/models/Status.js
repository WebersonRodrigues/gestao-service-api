const { Model, DataTypes } = require('sequelize');

class Status extends Model {
    static init(connection){

        super.init({
            descricao: DataTypes.STRING
        },{
            sequelize: connection,
            schema: 'public',
            tableName: 'status',
            createdAt: 'criadoEm',
            updatedAt: 'atualizadoEm',
            timestamps: true,
            underscored: false
        });
    }
}

module.exports = Status;