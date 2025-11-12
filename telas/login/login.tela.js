import TelaBase from "../base.tela";

export default class TelaLogin extends TelaBase {

    get btnLogin() { return $('~Login') }

    async clicar() {
        await this.clicarNoElemento(this.btnLogin)
    }
}