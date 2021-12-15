module.exports = class EnderecoDTO {
    constructor(obj){
        obj = obj || {};
        this.id = obj.id;
        this.idCliente = obj.idCliente;
        this.cep = obj.cep;
        this.rua = obj.rua;
        this.complemento = obj.complemento;
        this.numero = obj.numero;
        this.bairro = obj.bairro;
        this.cidade = obj.cidade;
        this.uf = obj.uf;
        this.criadoEm = obj.criadoEm;
        this.atualizadoEm = obj.atualizadoEm;
    }
}