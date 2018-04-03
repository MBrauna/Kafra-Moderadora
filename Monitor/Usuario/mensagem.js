/****************************************************************************************************
 * Autor: Michel Brauna                                                            Data: 15/03/2018 *
 *                                                                                                  *
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
 ****************************************************************************************************
 *                            Projeto Kafra Moderadora - Bot para discord                           *
 ****************************************************************************************************
 *                                 OBJETO DE RETORNO DA MENSAGEM                                    *
 ****************************************************************************************************
 ****************************************************************************************************/

// Inicialização de bibliotecas                                 (∩｀-´)⊃━☆ﾟ.*･｡ﾟ
let bib_requisicao                      =   require('request')
   ,bib_url                             =   process.env.url_requisicao
   ;
// Inicialização de bibliotecas                                 (∩｀-´)⊃━☆ﾟ.*･｡ﾟ

class mensagem
{
    constructor(p_cliente, p_mensagem)
    {
        try
        {
            this.obj_cliente    =   p_cliente;
            this.obj_mensagem   =   p_mensagem;
        } // tru { ... }
        catch(p_erro)
        {
            console.log('[MENSAGEM][CONSTRUCT] -> Um erro foi aprensetado durante a construção dos objetos.');
            console.log(p_erro);
            console.trace();
        } // catch(p_erro) { ... }
    } // constructor(p_cliente, p_mensagem)

    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ

    verifica_bot()
    {
        /***************************************************
         * Autor: Michel Brauna           Data: 16/03/2018 *
         * Retornará se o usuário é bot ou não             *
         ***************************************************/
        return this.obj_mensagem.author.bot;
    } // verifica_bot() { ... }

    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

    comunica_portal(p_dados_url, callback)
    {
        /**********************************************************
         * Autor: Michel Brauna                  Data: 27/03/2018 *
         *    Processo para comunicar com o servidor Kafra.       *
         **********************************************************/

        try
        {
            bib_requisicao.post(p_dados_url, (p_erro, p_resposta, p_corpo) =>
            {
                let v_req_erro       =   p_erro
                   ,v_req_resposta   =   p_resposta
                   ,v_req_corpo      =   p_corpo
                   ;

                // Retorna para a função callback;
                callback(v_req_erro, v_req_resposta, v_req_corpo);
            }); // bib_requisicao.post(p_dados_url, (p_erro, p_resposta, p_corpo) =>
        } // try { ... }
        catch(p_erro)
        {
            console.log('--- ERRO - COMUNICA_PORTAL ---');
            console.trace();
            console.log(p_erro);
        } // catch(p_erro) { ... }
    } // comunica_portal(p_dados_url, callback)

    /***********************************
     * Métodos internos para mensagens *
     ***********************************/

    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ

    trata_mensagem()
    {
        /************************************************************************
         *  Autor: Michel Brauna                               Data: 02/04/2018 *
         *                                                                      *
         ************************************************************************/
        let v_obj_corpo             =   {}
           ,v_obj_requisicao        =   {}
           ;

        // Início do tratamento para mensagens recebidas.
        try
        {
            // Nenhum tratamento será realizado caso seja identificado que a mensagem originou de um bot
            if(this.verifica_bot()) return;

            // Inicia a criação do corpo
            v_obj_requisicao        =   {
                                            autor       :   this.obj_mensagem.author
                                           ,tts         :   this.obj_mensagem.tts
                                           ,id          :   this.obj_mensagem.id
                                           ,conteudo    :   this.obj_mensagem.content
                                           ,mencao      :   this.obj_mensagem.mentions.users
                                        };

            v_obj_requisicao        =   {
                                            'url'           :   bib_url + 'mensagem'
                                           ,'json'          :   true
                                           ,'body'          :   v_obj_requisicao
                                        };

            console.log('>>INICIEI<<');
            // Comunica com o servidor
            this.comunica_portal(v_obj_requisicao, (p_erro, p_resposta, p_corpo) =>
            {
                console.log(p_corpo);
            }); // this.comunica_portal(v_obj_requisicao, (p_erro, p_resposta, p_corpo) =>
            console.log('>>FINALIZEI<<');
        } // try { ... }
        catch(p_erro)
        {
            console.log(p_erro);
            console.trace();
        } // catch(p_erro) { ... }
    } // trata_mensagem()
} // class mensagem


// Torna o método público - Acesso externo é permitido.
module.exports = mensagem;
