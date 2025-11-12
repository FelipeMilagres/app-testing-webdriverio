import geradorDeData from "./geradorDeData.util"
import gerenciadorRelatoriosAllure from "./gerenciadorRelatoriosAllure.util"

class GerenciadorInstancias {

    constructor() {
        if (GerenciadorInstancias._instancia) return GerenciadorInstancias._instancia

        this.gerenciadorRelatoriosAllure = gerenciadorRelatoriosAllure
        this.deradorDeData = geradorDeData

        GerenciadorInstancias._instancia = this
    }
}

export default new GerenciadorInstancias()