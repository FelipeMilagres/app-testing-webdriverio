import tempoLimiteDados from "../dados/globais/tempoLimite.dados"

export default class TelaBase {

    constructor() {
        this.mapaDePrefixos = {
            btn: 'O botão',
            inp: 'O campo',
            lbl: 'A label',
            lnk: 'O link',
            ddl: 'A lista de seleção',
            chk: 'A caixa de seleção',
            rad: 'O botão de rádio',
            cont: 'O container',
            img: 'A imagem',
            icon: 'O ícone',
            tbl: 'A tabela',
            acc: 'O acordeão',
            vgrp: 'O grupo de visualização',
            mdl: 'A janela modal'
        }
    }

    /**
     * Gera uma mensagem padronizada de erro quando o elemento não é exibido dentro do tempo limite.
     */
    #gerarMensagemDeTempoLimite() {
        const descritoresDoPrototipo = Object.getOwnPropertyDescriptors(Object.getPrototypeOf(this))
        const nomeElemento = Object.entries(descritoresDoPrototipo)
            .filter(([nome, descricao]) => typeof descricao.get === 'function')
            .map(([nome]) => nome)[0]

        if (!nomeElemento) {
            return 'Não foi possível identificar o nome do elemento passado.';
        }

        // Quebra prefixo e formata nome
        const prefixo = nomeElemento.match(/^[a-z]+/)?.[0] || '';
        const nomeSemPrefixo = nomeElemento.replace(/^[a-z]+/, '');
        const nomeFormatado = nomeSemPrefixo.replace(/([A-Z])/g, ' $1').trim();

        // Pega o nome da tela automaticamente
        const nomeTela = this.constructor.name
            .replace(/^Tela/, '')
            .replace(/([A-Z])/g, ' $1')
            .trim();

        const descricao = this.mapaDePrefixos[prefixo] || 'O elemento';
        const verbo = /^a\s/i.test(descricao.trim()) ? 'exibida' : 'exibido'
        return `${descricao} "${nomeFormatado}" na tela de "${nomeTela}" não foi ${verbo}!`;
    }

    /**
     * Método genérico para obter o texto do elemento passado por parâmetro
     * @param {Object} elemento - Elemento do qual será obtido o texto
     * @param {Number} tempoLimite - Tempo máximo de espera pelo elemento (variável já inicia instanciada com o tempo padrão)
     */
    async obterTextoDoElemento(elemento, tempoLimite = tempoLimiteDados.padrao) {
        await elemento.waitForDisplayed({ timeoutMsg: this.#gerarMensagemDeTempoLimite(), timeout: tempoLimite })
        return await elemento.getText()
    }

    /**
     * Método genérico para obter o valor de um atributo de um elemento.
     * Tanto o elemento quanto o atributo são passados por parâmetro.
     * @param {Object} elemento - Elemento do qual será obtido o atributo
     * @param {String} atributo - Nome do atributo que deseja obter
     * @param {Number} tempoLimite - Tempo máximo de espera pelo elemento (variável já inicia instanciada com o tempo padrão)
     */
    async obterAtributoDoElemento(elemento, atributo, tempoLimite = tempoLimiteDados.padrao) {
        await elemento.waitForDisplayed({ timeoutMsg: this.#gerarMensagemDeTempoLimite(), timeout: tempoLimite })
        return await elemento.getAttribute(atributo)
    }

    /**
     * Método genérico para limpar o campo e depois inserir o valor passado por parâmetro
     * @param {Object} elemento - Elemento no qual será inserido o valor
     * @param {String} valor - Valor que será inserido no campo
     * @param {Number} tempoLimite - Tempo máximo de espera pelo elemento (variável já inicia instanciada com o tempo padrão)
     */
    async definirValorNoElemento(elemento, valor, tempoLimite = tempoLimiteDados.padrao) {
        await elemento.waitForDisplayed({ timeoutMsg: this.#gerarMensagemDeTempoLimite(), timeout: tempoLimite })
        await elemento.setValue(valor)
    }

    /**
     * Método genérico para inserir o valor no campo sem limpar o conteúdo atual
     * @param {Object} elemento - Elemento no qual será adicionado o valor
     * @param {String} valor - Valor que será adicionado no campo
     * @param {Number} tempoLimite - Tempo máximo de espera pelo elemento (variável já inicia instanciada com o tempo padrão)
     */
    async adicionarValorNoElemento(elemento, valor, tempoLimite = tempoLimiteDados.padrao) {
        await elemento.waitForDisplayed({ timeoutMsg: this.#gerarMensagemDeTempoLimite(), timeout: tempoLimite })
        await elemento.addValue(valor)
    }

    /**
     * Método genérico para clicar no elemento passado por parâmetro
     * @param {Object} elemento - Elemento que será clicado
     * @param {Number} tempoLimite - Tempo máximo de espera pelo elemento (a variável já inicia instanciada com o tempo padrão)
     */
    async clicarNoElemento(elemento, tempoLimite = tempoLimiteDados.padrao) {
        await elemento.waitForDisplayed({ timeoutMsg: this.#gerarMensagemDeTempoLimite(), timeout: tempoLimite });
        await elemento.click()
    }
}