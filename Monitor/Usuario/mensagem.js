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

        // Verifica se ocorreu menção ao bot
        if(this.verifica_mencao())
        {
            // Caso tenha ocorrido ... retorna a array sem prefixo
            return this.obj_mensagem.content.slice(v_tamanho_mencao).trim().split(/ +/g);
        } // if(this.verifica_mencao()) { ... }
        else
        {
            // Caso contrário ... nada.
            return [];
        } // else { ... }

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
                                            autor               :   this.obj_mensagem.author
                                           ,bot                 :   this.verifica_bot()
                                           ,canal               :   this.obj_mensagem.channel
                                           ,tts                 :   this.obj_mensagem.tts
                                           ,id                  :   this.obj_mensagem.id
                                           ,conteudo            :   this.obj_mensagem.content
                                           ,conteudo_array      :   this.mensagem_para_array()
                                           ,usa_comando         :   this.verifica_mencao()
                                           ,conteudo_comando    :   this.mensagem_para_array_sprefixo(this.mencao_bot())
                                           ,bot_id              :   this.obj_cliente.user.id
                                        };

            v_obj_requisicao        =   {
                                            'url'           :   bib_url + 'mensagem'
                                           ,'json'          :   true
                                           ,'body'          :   v_obj_requisicao
                                           ,'headers'       :   {
                                                                    'Authorization'     :   process.env.TOKEN_AUTORIZACAO
                                                                }
                                        };

            console.log('>>INICIEI<<');
            // Comunica com o servidor
            this.comunica_portal(v_obj_requisicao, (p_erro, p_resposta, p_corpo) =>
            {
                let vtmp_corpo  =   p_corpo
                   ,vtmp_embed  =   {}
                   ;

                // Se o programa retornar algo indesejado ... finaliza.
                if(typeof vtmp_corpo === 'undefined') return;

                console.log(vtmp_corpo);

                try
                {
                    // Validação para o tipo de retorno mediante sucesso da aplicação
                    if(vtmp_corpo.sucesso)
                    {
                        // Monta o objeto embed para retorno
                        vtmp_embed  =   {
                                            'embed':
                                            {
                                                color           :   0x882d93
                                               ,author          :   {
                                                                        name        :   'Kafra Moderadora'
                                                                       ,icon_url    :   'https://i.imgur.com/cfYwkLQ.png'
                                                                       ,url         :   'http://kafra.mbrauna.org'
                                                                    }
                                               ,title           :   vtmp_corpo.titulo
                                               ,url             :   vtmp_corpo.url
                                               ,description     :   null
                                               ,'image'         :   {
                                                                        'url'       :   vtmp_corpo.imagem
                                                                       ,'height'    :   null
                                                                       ,'width'     :   null
                                                                    }
                                               ,thumbnail       :   {
                                                                        'url'       :   vtmp_corpo.thumbnail
                                                                       ,'height'    :   null
                                                                       ,'width'     :   null
                                                                    }
                                               ,video           :   {
                                                                        'url'       :   null
                                                                       ,'height'    :   null
                                                                       ,'width'     :   null
                                                                    }
                                               ,fields          :   vtmp_corpo.campo
                                               ,timestamp       :   new Date()
                                               ,footer          :   {
                                                                        icon_url:   'https://i.imgur.com/cfYwkLQ.png'
                                                                       ,text:       '© bROPédia - Por MBrauna'
                                                                    }
                                            }
                                        };

                        // Retorna a mensagem
                        this.obj_mensagem.channel.send(vtmp_corpo.mensagem, vtmp_embed);
                    } // if(vtmp_corpo.sucesso)
                    else
                    {
                        if(vtmp_corpo.mensagem === null)
                        {
                            // Apenas finaliza o método ... nada a realizar.
                            return;
                        } // if(vtmp_corpo.mensagem === null) { ... }
                        else
                        {
                            if(vtmp_corpo.campo === null)
                            {
                                // Retorna a mensagem
                                this.obj_mensagem.channel.send(vtmp_corpo.mensagem);
                            }
                            else
                            {
                                // Monta o objeto embed para retorno
                                vtmp_embed  =   {
                                                    'embed':
                                                    {
                                                        color           :   0xff0000
                                                       ,author          :   {
                                                                                name        :   'Kafra Moderadora'
                                                                               ,icon_url    :   'https://i.imgur.com/cfYwkLQ.png'
                                                                               ,url         :   'http://kafra.mbrauna.org'
                                                                            }
                                                       ,title           :   vtmp_corpo.titulo
                                                       ,url             :   vtmp_corpo.url
                                                       ,description     :   null
                                                       ,'image'         :   {
                                                                                'url'       :   vtmp_corpo.imagem
                                                                               ,'height'    :   null
                                                                               ,'width'     :   null
                                                                            }
                                                       ,thumbnail       :   {
                                                                                'url'       :   vtmp_corpo.thumbnail
                                                                               ,'height'    :   null
                                                                               ,'width'     :   null
                                                                            }
                                                       ,video           :   {
                                                                                'url'       :   null
                                                                               ,'height'    :   null
                                                                               ,'width'     :   null
                                                                            }
                                                       ,fields          :   vtmp_corpo.campo
                                                       ,timestamp       :   new Date()
                                                       ,footer          :   {
                                                                                icon_url:   'https://i.imgur.com/cfYwkLQ.png'
                                                                               ,text:       '© bROPédia - Por MBrauna'
                                                                            }
                                                    }
                                                };

                                // Retorna a mensagem
                                this.obj_mensagem.channel.send(vtmp_corpo.mensagem, vtmp_embed);
                            } // else { ... }
                        } // else { ... }
                    } // else { ... }
                } // try { ... }
                catch(p_erro)
                {
                    this.obj_mensagem.channel.send('Ocorreu um erro! Informe ao administrador.');
                } // catch(p_erro) { ... }
                
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
