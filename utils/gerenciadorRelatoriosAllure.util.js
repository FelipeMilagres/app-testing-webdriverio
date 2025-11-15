import allureReporter from "@wdio/allure-reporter"
import { execSync } from 'child_process'
import path from 'path'
import fs from 'fs'
import dayjs from 'dayjs'

export default class GerenciadorRelatoriosAllure {

    /**
     * @param {Object} parametros
     * @param {String} parametros.diretorioResultados - Caminho da pasta de resultados do Allure.
     * @param {String} parametros.diretorioRelatorios - Caminho da pasta onde os relatórios HTML serão armazenados.
     * @param {String} parametros.plataforma - Nome da plataforma (ex: "android", "ios").
     * @param {String} parametros.unidadeDeNegocio - Nome da unidade de negócio (ex: "Atacadão", "Carrefour", "Sams").
     */
    constructor({ diretorioResultados, diretorioRelatorios, plataforma, unidadeDeNegocio }) {
        this.diretorioResultados = diretorioResultados
        this.diretorioRelatorios = diretorioRelatorios
        this.plataforma = plataforma
        this.unidadeDeNegocio = unidadeDeNegocio
    }

    /** 
     * Adiciona informações complementares ao relatório Allure.
     * @param {String} funcionalidade - Nome da funcionalidade do teste.
     * @param {String} severidade - Nível de severidade (blocker, critical, normal, minor, trivial).
     * @param {String} responsavel - Nome da pessoa responsável pelo cenário.
     */
    adicionarInformacoes(funcionalidade, severidade, responsavel) {
        allureReporter.addFeature(funcionalidade)
        allureReporter.addSeverity(severidade)
        allureReporter.addArgument('Responsável pelo cenário', responsavel)
    }

    /**
     * Limpa apenas os arquivos de resultado (.json e .png) antes da execução dos testes.
     */
    limparResultados() {
        if (!fs.existsSync(this.diretorioResultados)) return

        const arquivos = fs.readdirSync(this.diretorioResultados)
        for (const arquivo of arquivos) {
            if (arquivo.endsWith(".json") || arquivo.endsWith(".png")) {
                fs.unlinkSync(path.join(this.diretorioResultados, arquivo))
            }
        }
        console.log(`🧹 Resultados antigos removidos de: ${this.diretorioResultados}`)
    }

    /**
     * Gera o relatório HTML Allure consolidado e renomeia o arquivo com base na data e status final.
     * @param {Number} codigoSaida - Código de saída do teste (0 = sucesso, 1 = falha).
     */
    gerarRelatorio(codigoSaida) {
        const dataHora = dayjs().format("DD-MM-YYYY_HH-mm-ss")
        const status = codigoSaida === 0 ? "sucesso" : "falha"
        const nomeArquivo = `${status}-relatorio-${this.unidadeDeNegocio}-${this.plataforma}-${dataHora}.html`

        console.log(`📊 Gerando relatório Allure (${this.unidadeDeNegocio}-${this.plataforma})...`)

        const diretorioTemporario = path.join(this.diretorioRelatorios, "temp")

        execSync(
            `allure generate ${this.diretorioResultados} --clean -o ${diretorioTemporario} --single-file`,
            { stdio: "inherit" }
        )

        const caminhoAntigo = path.join(diretorioTemporario, "index.html")
        const caminhoNovo = path.join(this.diretorioRelatorios, nomeArquivo)

        if (fs.existsSync(caminhoAntigo)) {
            fs.renameSync(caminhoAntigo, caminhoNovo)
            fs.rmSync(diretorioTemporario, { recursive: true, force: true })
            console.log(`✅ Relatório gerado: ${caminhoNovo}`)
        } else {
            console.error("⚠️ Arquivo index.html não encontrado após geração.")
        }
    }
}