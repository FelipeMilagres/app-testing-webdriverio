import TelaLogin from "../telas/login/login.tela"

describe('Testando configuração', () => {

    it('Primeira conexão', async () => {
        let telaLogin = new TelaLogin()

        await telaLogin.clicar()
    })
})