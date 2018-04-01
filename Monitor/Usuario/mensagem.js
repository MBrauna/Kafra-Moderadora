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
        /*********************************************************************
         * Autor: Michel Brauna                             Data: 16/03/2018 *
         *                                                                   *
         *        Método construtor para classe mensagem, para todo, os dados*
         * do cliente Discord e do objeto de mensagem recebido serão armaze- *
         * nados para tratativa.                                             *
         *********************************************************************/
        this.obj_cliente    =   p_cliente;
        this.obj_mensagem   =   p_mensagem;
    } // constructor(p_cliente, p_mensagem) { ... }

    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

    /***********************************
     * Métodos internos para mensagens *
     ***********************************/
    mensagem_para_array()
    {
        /***************************************************
         * Autor: Michel Brauna           Data: 16/03/2018 *
         *   Método irá obter a frase gerada e tratá-la de *
         * forma à transformá-la numa array.               *
         ***************************************************/
        return this.obj_mensagem.content.trim().split(/ +/g);
    } // mensagem_para_array() { ... }

    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

    mensagem_para_array_sprefixo(p_prefixo)
    {
        /***************************************************
         * Autor: Michel Brauna           Data: 16/03/2018 *
         *   Método irá obter a frase gerada e tratá-la de *
         * forma à transformá-la numa array sem o prefixo  *
         ***************************************************/
        var v_tamanho_mencao            =   p_prefixo.length;
        return this.obj_mensagem.content.slice(v_tamanho_mencao).trim().split(/ +/g);
    } //  mensagem_para_array_sprefixo(p_prefixo) { ... }

    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

    mencao_bot()
    {
        /***************************************************
         * Autor: Michel Brauna           Data: 16/03/2018 *
         *Retorno: menção direta ao bot.                   *
         ***************************************************/
        return '<@' + this.obj_cliente.user.id + '>';
    } // mencao_bot() { ... }

    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

    mencao_autor()
    {
        /***************************************************
         * Autor: Michel Brauna           Data: 16/03/2018 *
         *Retorno: menção direta ao autor da mensagem.     *
         ***************************************************/
        return '<@' + this.obj_mensagem.author.id + '>';
    } // mencao_autor() { ... }

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

    verifica_mencao()
    {
        return  this.obj_mensagem.content.startsWith(this.mencao_bot());
    } // verifica_mencao() { ... }

    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

    trata_consulta(p_comando)
    {
        // Declaração de variáveis
        var v_string_requisicao = '';

        try
        {
            // Pacote de correção -- Michel Brauna -- 17/03/2018
            // Caso a quantidade de elementos presentes na array de mensagem não satisfaça a operação, finaliza.
            if(p_comando.length <= 1)
            {
                return null;
            } // if(this.array_mensagem.length < 1)
            // Pacote de correção -- Michel Brauna -- 17/03/2018

            for(var iteracao=1;iteracao<p_comando.length; iteracao++)
            {
                v_string_requisicao =   v_string_requisicao + ' ' + p_comando[iteracao];
            } // for(var iteracao=1;iteracao<this.array_mensagem.length; iteracao++)

            return v_string_requisicao.trim().toLowerCase();
        } // try { ... }
        catch(p_erro)
        {
            return null;
        } // catch { ... }
    } // trata_consulta() { ... }

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
    trata_mensagem()
    {
        let v_corpo_requisicao      =   {}
           ,v_url_requisicao        =   {}
           ;

        try
        {
            v_corpo_requisicao      =   {
                                            'mensagem'      :   this.obj_mensagem.content
                                           ,'author'        :   this.obj_mensagem.author.id
                                           ,'bot'           :   this.verifica_bot()
                                           ,'json'          :   this.obj_mensagem
                                        };

            v_url_requisicao        =   {
                                            'url'           :   bib_url + 'mensagem'
                                           ,'json'          :   true
                                           ,'body'          :   v_corpo_requisicao
                                        };

            console.log('>>INICIEI<<');
            // Comunica com o servidor
            this.comunica_portal(v_url_requisicao, (p_erro, p_resposta, p_corpo) =>
            {
                console.log(p_corpo);
            }); // this.comunica_portal(v_url_requisicao, (p_erro, p_resposta, p_corpo) =>
            console.log('>>FINALIZEI<<');
        } // try { ... }
        catch(p_erro)
        {
            console.log(p_erro);
            console.trace();
        } // catch(p_erro) { ... }
    } // trata_mensagem() { ... }


} // class mensagem


// Torna o método público - Acesso externo é permitido.
module.exports = mensagem;
