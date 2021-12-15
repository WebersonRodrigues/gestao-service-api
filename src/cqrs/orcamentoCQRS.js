const sequelize = require('../database/index');

const OrcamentoDTO = require('../dtos/OrcamentoDTO');
const ClienteDTO = require('../dtos/ClienteDTO');
const OrcamentoItemDTO = require('../dtos/OrcamentoItemDTO');
const PrestadorDTO = require('../dtos/PrestadorDTO');
const ServicoDTO = require('../dtos/ServicoDTO');
// const Status = require('../dtos/Status');
const UsuarioDTO = require('../dtos/UsuarioDTO');

const sqlCapa = `
SELECT
	O."id",
	O."descricao",
	Cl.id as "idCliente",
	Cl."nome" as "nomeCliente",
	Cl."telefone" as "telefoneCliente",
	Cl."cpfOuCnpj" as "cpfOuCnpjCliente",
	O."desconto",
	O."acrescimo",
	O."valorTotal"
FROM public.orcamentos O
LEFT JOIN public.clientes CL ON (O."idCliente" = CL."id");
`;

const sqlOrcamento = `
SELECT
	O.id,
	O."descricao",
	Cl.id as "idCliente",
	Cl."nome" as "nomeCliente",
	Cl."telefone" as "telefoneCliente",
	Cl."cpfOuCnpj" as "cpfOuCnpjCliente",
	O."desconto",
	O."acrescimo",
	O."valorTotal",
	O."criadoEm",
	O."atualizadoEm",
	OI.id as "idItem",
	OI."idServico",
	S."descricao" as "descricaoServico",
	S."valor" as "valorServico",
	S."observacao" as "observacaoServico",
	OI."idPrestador",
	PR."nome" as "nomePrestador",
	PR."email" as "emailPrestador",
	PR."telefone" as "telefonePrestador",
	PR."cpfOuCnpj" as "cpfOuCnpjPrestador",
	PR."observacao" as "observacaoPrestador",
	PR."criadoEm" as "dataCriacaoPrestador",
	OI."desconto" as "descontoItem",
	OI."acrescimo" as "acrescimoItem",
	OI."valor" as "valorItem",
	OI."valorTotal" as "valorTotalItem",
	OI."observacao" as "observacaoItem",
	OI."criadoEm" as "dataCriacaoItem"
FROM public.orcamentos O
LEFT JOIN public."orcamento-item" OI ON (O.id = OI."idOrcamento")
LEFT JOIN public.clientes CL ON (O."idCliente" = CL."id")
LEFT JOIN public.servicos S ON (OI."idServico" = S.id )
LEFT JOIN public.prestadores PR ON (OI."idPrestador" = PR.id)
`;

/**
 * Método que retorna uma lista com a capa dos orcamentos.
 * Aqui não retorna os itens.
 * @returns OrcamentoDTO, somente a capa.
*/
async function obterOrcamentos(){
    let orcamentos = await sequelize.query(sqlCapa);
    orcamentos = orcamentos[0];

    return orcamentos.map(o => {
        let orcamento = new OrcamentoDTO(o);
        orcamento.cliente = new ClienteDTO({
            id: o.idCliente,
	        nome: o.nomeCliente,
	        telefone: o.telefoneCliente,
            cpfOuCnpj: o.cpfOuCnpjCliente
        });

        return orcamento;
    });
}

/**
 * Metodo que retorna o Orcamento com todos os seus itens.
 * @param {Number} idOrcamento 
 * @returns OrcamentoDTO
 */
async function obterOrcamento(idOrcamento){
    let where = `WHERE O."id" = ${idOrcamento}`;
    let resultado = await sequelize.query(`${sqlOrcamento} ${where}`);
    orcamentos = resultado[0];

	let orcamentoBanco = orcamentos[0];

    let orcamento = new OrcamentoDTO(orcamentoBanco);

	orcamento.cliente = new ClienteDTO({
		id: orcamentoBanco.idCliente,
		nome: orcamentoBanco.nomeCliente,
		telefone: orcamentoBanco.telefoneCliente,
		cpfOuCnpj: orcamentoBanco.cpfOuCnpjCliente
	});

    orcamento.itens = orcamentos.map(item => {

        let servico = new ServicoDTO({
            id: item.idServico,
	        descricao: item.descricaoServico,
	        valor: item.valorServico,
	        observacao: item.observacaoServico
        });

        let prestador = new PrestadorDTO({
            id: item.idPrestador,
            nome: item.nomePrestador,
            email: item.emailPrestador,
            telefone: item.telefonePrestador,
            cpfOuCnpj: item.cpfOuCnpjPrestador,
            observacao: item.observacaoPrestador,
            criadoEm: item.dataCriacaoPrestador,
        });

        return new OrcamentoItemDTO({
            id: item.idItem,
            servico,
            prestador,
            desconto: item.descontoItem,
	        acrescimo: item.acrescimoItem,
	        valor: item.valorItem,
            valorTotal: item.valorTotalItem,
	        observacao: item.observacaoItem,
	        criadoEm: item.dataCriacaoItem
        });        
    });

    return orcamento;
}

module.exports = {
    obterOrcamentos,
    obterOrcamento
}