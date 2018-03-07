/****************************************************************************************************
 * Autor: Michel Brauna                                                            Data: 05/03/2018 *
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

let bib_requisicao  =   require("request")
    ;


class braunabot
{
    constructor(p_cliente, p_usuario_braunabot, p_token_braunabot)
    {
        // Armazena o código do cliente
        this.obj_cliente        =   p_cliente;
        this.token_braunabot    =   p_token_braunabot;
        this.user_braunabot     =   p_usuario_braunabot;
        // Salva a URL padrão para consulta
        this.url_padrao     =   "https://cleverbot.io/1.0/";
    } // constructor(p_cliente, p_usuario_braunabot, p_token_braunabot)


    inicializa()
    {
        bib_requisicao.post(
        {
            headers                     :   {
                                                'Accept'                :   '*/*'
                                               ,'Origin'                :   'https://docs.cleverbot.io'
                                               ,'Content-Type'          :   'application/json'
                                               ,'Referer'               :   'https://docs.cleverbot.io/docs/getting-started'
                                               //,'Accept-Encoding'       :   'gzip, deflate, br'
                                               ,'Accept-Language'       :   'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7'
                                            }
           ,url                         :   this.url_padrao + 'create'
           ,body                        :   JSON.stringify({
                                                'user'                  :   this.user_braunabot
                                               ,'key'                   :   this.token_braunabot
                                               ,'nick'                  :   'Kafra Moderadora'
                                            })
        }
        ,function(p_erro, p_resposta, p_corpo)
        {
          console.log(p_corpo);
        });
    } // inicializa()



    pergunta(p_mensagem)
    {
        var  v_obj_retorno
            ,v_obj_resposta     =   {
                                        'embed' :   {
                                                        color               :   0xff0000
                                                       ,author              :   {
                                                                                    name        :   'Kafra Moderadora'
                                                                                   ,icone       :   'https://i.imgur.com/cfYwkLQ.png'
                                                                                   ,url         :   'https://github.com/bropedia/Kafra-Moderadora'
                                                                                }
                                                       ,title               :   'Kafra Moderadora - Chat'
                                                       ,url                 :   null
                                                       ,description         :   'Funcionalidade indisponível'
                                                       ,'image'             :   {
                                                                                    "url"       :   null
                                                                                   ,"height"    :   null // 123
                                                                                   ,"width"     :   null // 123
                                                                                }
                                                       ,thumbnail           :   {
                                                                                    "url"       :   'https://i.imgur.com/t3E6tKA.gif' // 'https://i.imgur.com/LOGICNS.jpg'
                                                                                   ,"height"    :   null // 123
                                                                                   ,"width"     :   null // 123 
                                                                                }
                                                       ,video               :   {
                                                                                    "url"       :   null // 'https://i.imgur.com/LOGICNS.jpg'
                                                                                   ,"height"    :   null // 123
                                                                                   ,"width"     :   null // 123
                                                                                }
                                                       ,fields              :   [
                                                                                    {
                                                                                        name: 'Indisponível'
                                                                                       ,value: 'Desculpinhasssssss pessoa\nEsta funcionalidade encontra desativada no momento! Verifique dentro de algumas horas'
                                                                                    }
                                                                                ]
                                                      ,timestamp            :   new Date()
                                                      ,footer               :   {
                                                                                    icon_url:   'https://i.imgur.com/cfYwkLQ.png'
                                                                                   ,text:       '© bROPédia - Por MBrauna'
                                                                                }
                                                    }
                                    }
            ;

        try
        {
            bib_requisicao.post(
            {
                headers                     :   {
                                                    'Accept'                :   '*/*'
                                                   ,'Origin'                :   'https://docs.cleverbot.io'
                                                   ,'Content-Type'          :   'application/json'
                                                   ,'Referer'               :   'https://docs.cleverbot.io/docs/getting-started'
                                                   //,'Accept-Encoding'       :   'gzip, deflate, br'
                                                   ,'Accept-Language'       :   'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7'
                                                }
               ,url                         :   this.url_padrao + 'ask'
               ,body                        :   JSON.stringify({
                                                    'user'                  :   this.user_braunabot
                                                   ,'key'                   :   this.token_braunabot
                                                   ,'nick'                  :   'Kafra Moderadora'
                                                   ,'text'                  :   p_mensagem.content
                                                })
            }
            ,(p_erro, p_resposta, p_corpo) =>
            {
                v_obj_retorno   = JSON.parse(p_corpo);
                
                if(p_erro)
                {
                    p_mensagem.channel.send(
                                                'UOUUUU estou indisponível temporariamente'
                                               ,v_obj_resposta
                                            );
                }
                else
                {
                    p_mensagem.channel.send(v_obj_retorno.response);
                }

            }); // request.post(
        } // try { ... }
        catch(p_erro)
        {
            console.log(p_erro);
            console.trace();
            p_mensagem.channel.send(
                                        'Desculpinha pessoa!'
                                       ,v_obj_resposta
                                    );
            return;
        } // catch(p_erro) { ... }
    } // pergunta(p_mensagem, p_obj_pergunta)
} // class braunabot



module.exports = braunabot;
