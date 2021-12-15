const ModeloInvalidoErro = class ModeloInvalidoErro {

    /**
     * Classe utilizada para exceções de modelos e dtos.
     * @param {Number} status 
     * @param {String} mensagem 
     */
    constructor(status, mensagem){
        this.status = status || 400;
        this.message = mensagem || 'O modelo informado é inválido';
        this.name = 'ModeloInvalido';
        this.stack = (new Error()).stack;
    }
}

const NaoAutorizadoErro = class NaoAutorizadoErro {

    /**
     * Classe utilizada para exceções de acessos ou recursos não autorizados.
     * @param {Number} status 
     * @param {String} mensagem 
     */
    constructor(status, mensagem){
        this.status = status || 403;
        this.message = mensagem || 'Recurso não autorizado';
        this.name = 'NaoAutorizado';
        this.stack = (new Error()).stack;
    }
}

const NaoEncontratoErro = class NaoEncontratoErro {

    /**
     * Classe utilizada para exceções de objetos ou recurso não encontrados.
     * @param {Number} status 
     * @param {String} mensagem 
     */
    constructor(status, mensagem){
        this.status = status || 404;
        this.message = mensagem || 'Não encontrado';
        this.name = 'NaoEncontrato';
        this.stack = (new Error()).stack;
    }
}

const AplicacaoErro = class AplicacaoErro {
    /**
     * Classe utilizada para exceções de modelos e dtos
     * @param {Number} status 
     * @param {String} mensagem 
     */
    constructor(status, mensagem){
        this.status = status || 500;
        this.message = `Erro interno na aplicação ${ mensagem && '- ' + mensagem }`;
        this.name = 'Aplicacao';
        this.stack = (new Error()).stack;
    }
}

module.exports = {
    ModeloInvalidoErro,
    NaoAutorizadoErro,
    NaoEncontratoErro,
    AplicacaoErro
}

