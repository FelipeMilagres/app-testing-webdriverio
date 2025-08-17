import fs from 'fs'
import path from 'path'

export function cleanReportDirectory(directory) {
    if (!directory) {
        throw new Error('É obrigatório informar o diretório a ser limpo.')
    }

    const reportsDirectory = path.resolve(directory)

    if (!fs.existsSync(reportsDirectory)) {
        throw new Error(`Diretório não encontrado: ${reportsDirectory}`)
    }

    fs.readdirSync(reportsDirectory).forEach(file => {
        if (file !== '.gitkeep') {
            fs.rmSync(path.join(reportsDirectory, file), { recursive: true, force: true })
        }
    })
}