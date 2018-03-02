/****************************************************************************************************
 * Autor: Michel Brauna                                                            Data: 02/03/2018 *
 ****************************************************************************************************
 *                                                                                                  *
 *                             ██╗  ██╗ █████╗ ███████╗██████╗  █████╗                              *
 *                             ██║ ██╔╝██╔══██╗██╔════╝██╔══██╗██╔══██╗                             *
 *                             █████╔╝ ███████║█████╗  ██████╔╝███████║                             *
 *                             ██╔═██╗ ██╔══██║██╔══╝  ██╔══██╗██╔══██║                             *
 *                             ██║  ██╗██║  ██║██║     ██║  ██║██║  ██║                             *
 *                             ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝                             *
 *                                                                                                  *
 *       ███╗   ███╗ ██████╗ ██████╗ ███████╗██████╗  █████╗ ██████╗  ██████╗ ██████╗  █████╗       *
 *       ████╗ ████║██╔═══██╗██╔══██╗██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔═══██╗██╔══██╗██╔══██╗      *
 *       ██╔████╔██║██║   ██║██║  ██║█████╗  ██████╔╝███████║██║  ██║██║   ██║██████╔╝███████║      *
 *       ██║╚██╔╝██║██║   ██║██║  ██║██╔══╝  ██╔══██╗██╔══██║██║  ██║██║   ██║██╔══██╗██╔══██║      *
 *       ██║ ╚═╝ ██║╚██████╔╝██████╔╝███████╗██║  ██║██║  ██║██████╔╝╚██████╔╝██║  ██║██║  ██║      *
 *       ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝      *
 *                                                                                                  *
 ****************************************************************************************************/

// Inicialização de bibliotecas                                 (∩｀-´)⊃━☆ﾟ.*･｡ﾟ
let  bib_braunabot      = require("cleverbot-node")
    ;
// Inicialização de bibliotecas                                 (∩｀-´)⊃━☆ﾟ.*･｡ﾟ


// Método construtor - Inicialização do processo                (╬ ಠ益ಠ)
// Método construtor - Inicialização do processo                (╬ ಠ益ಠ)


class braunabot
{
    constructor(p_cliente, p_mensagem)
    {
        // Seta os dados para o cliente Discord
        this.obj_cliente    =   p_cliente;
        this.obj_mensagem   =   p_mensagem;

        // Configura uma instância do BraunaBot para execução
        bib_braunabot.configure({botapi: process.env.BOT_TOKEN_CLEVERBOT});
    } // constructor(p_cliente, p_mensagem)

    monta_resposta(p_frase, p_mensagem)
    {
        // Monitora qualquer evento de erro para se executar o cliente
        try
        {
            this.obj_mensagem.channel.send(
                                            p_frase
                                           ,p_mensagem
                                        );
        } // try { ... }
        catch(p_erro)
        {
            
            // Imprime o objeto de erro recebido
            console.log('------------------------');
            console.log(p_erro);
            console.log('------------------------');
            // Monitora qual procedimento gerou o erro
            console.log('------------------------');
            console.trace();
            console.log('------------------------');
        } // catch(p_erro) { ... }

    } // monta_resposta(p_cliente, p_mensagem, p_frase, p_configuracao)


    trata_consulta(p_array_frase)
    {
        var v_string_requisicao = '';

        for(var i=0;i<p_array_frase.length;i++)
        {
            // Forma a string
            v_string_requisicao = v_string_requisicao + p_array_frase[i] + ' ';
        } // for(var i=0;i<p_array_frase.length;i++)

        return v_string_requisicao.trim();
    } // trata_consulta(p_array_frase)



    conversa()
    {
        // Chama a API para saída
        bib_braunabot.write(message.content, function (p_resposta) {
           this.monta_resposta(p_resposta.output, null)
        });

        // Finaliza
        return;
    } // conversa(p_consulta)
}// class braunabot


// Torna o método público
module.exports = braunabot;
