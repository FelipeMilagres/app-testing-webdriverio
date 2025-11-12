import dayjs from 'dayjs'
import { localizacoes } from '../dados/globais/geradorDeData.dados.js'
import 'dayjs/locale/pt-br'
import 'dayjs/locale/en'

class GeradorDeData {

    /**
     * Método que retorna uma instância do dayjs configurada com a localização passada por parâmetro
     * @param {String} localizacao Localização (idioma) usada na data
     * @returns {Object} Instância configurada do dayjs
     */
    #gerarData(localizacao) {
        dayjs.locale(localizacao)
        return dayjs()
    }

    /**
     * Retorna a data atual formatada conforme os parâmetros
     * @param {String} formato Formato desejado da data
     * @param {String} localizacao Localização usada na data (padrão: Brasil)
     * @returns {String} Data atual formatada
     */
    async obterDataAtual(formato, localizacao = localizacoes.br) {
        return this.#gerarData(localizacao).format(formato)
    }

    /**
     * Retorna uma data futura com base nos parâmetros passados
     * @param {String} formato Formato desejado da data
     * @param {Number} quantidade Quantidade de unidades para adicionar
     * @param {String} unidade Unidade de tempo (ex: 'day', 'month', 'year')
     * @param {String} localizacao Localização usada na data (padrão: Brasil)
     * @returns {String} Data futura formatada
     */
    async obterDataFutura(formato, quantidade, unidade, localizacao = localizacoes.br) {
        return this.#gerarData(localizacao).add(quantidade, unidade).format(formato)
    }

    /**
     * Retorna uma data passada com base nos parâmetros passados
     * @param {String} formato Formato desejado da data
     * @param {Number} quantidade Quantidade de unidades para subtrair
     * @param {String} unidade Unidade de tempo (ex: 'day', 'month', 'year')
     * @param {String} localizacao Localização usada na data (padrão: Brasil)
     * @returns {String} Data passada formatada
     */
    async obterDataPassada(formato, quantidade, unidade, localizacao = localizacoes.br) {
        return this.#gerarData(localizacao).subtract(quantidade, unidade).format(formato)
    }
}

export default new GeradorDeData()