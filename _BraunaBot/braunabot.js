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
        this.obj_cliente    =   p_cliente;
        // Salva a URL padrão para consulta
        this.url_padrao     =   "https://cleverbot.io/1.0/";
    } // constructor(p_cliente, p_usuario_braunabot, p_token_braunabot)


    inicializa()
    {
        request.post(
        {
            headers                     :   {
                                                'Accept'                :   '*/*'
                                               ,'Content-Type'          :   'application/json'
                                               ,'Accept-Encoding'       :   'gzip, deflate, br'
                                               ,'Accept-Language'       :   'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7'
                                            }
           ,url                         :   this.url_padrao + 'create'
           ,body                        :   {
                                                'user'                  :   '8pqLB0PAGEpnuTDt'
                                               ,'key'                   :   'IEGVAI9b1F6OUn9pDCzPaCSFxaztgpWs'
                                               ,'nick'                  :   'Kafra Moderadora'
                                            }
        }
        ,function(p_erro, p_resposta, p_corpo)
        {
          console.log(p_corpo);
        });
    } // inicializa()



    pergunta(p_mensagem, p_obj_pergunta)
    {
        let  v_chamada_bot      =   '<@' + this.obj_cliente.user.id + '>'
            ,v_obj_resposta     =   {}
            ,v_resposta_bot
            ,v_string_msg
            ;


        v_obj_resposta          =   {
                                        'embed' :   {
                                                        color               :   this.obj_config.cor_vermelha.color
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
                                    };

        try
        {
            // Percorre o objeto da pergunta para montar a frase
            for(var iteracao =0; iteracao<p_obj_pergunta.length;iteracao++)
            {
                // monta a array de frase - Para consulta futura
                v_string_msg = v_string_msg + ' ' + p_obj_pergunta[iteracao];
            } // for(var iteracao =0; iteracao<p_obj_pergunta.length;iteracao++)

            // remove os espaços adicionais - caso exista
            v_string_msg    =   v_string_msg.trim();

            request.post(
            {
                headers                     :   {
                                                    'Accept'                :   '*/*'
                                                   ,'Content-Type'          :   'application/json'
                                                   ,'Accept-Encoding'       :   'gzip, deflate, br'
                                                   ,'Accept-Language'       :   'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7'
                                                }
               ,url                         :   this.url_padrao + 'ask'
               ,body                        :   {
                                                    'user'                  :   '8pqLB0PAGEpnuTDt'
                                                   ,'key'                   :   'IEGVAI9b1F6OUn9pDCzPaCSFxaztgpWs'
                                                   ,'nick'                  :   'Kafra Moderadora'
                                                   ,'text'                  :   v_string_msg
                                                }
            }
            ,function(p_erro, p_resposta, p_corpo)
            {
                v_resposta_bot  =   JSON.parse(p_corpo);

                if(v_resposta_bot.status === 'success')
                {
                    p_mensagem.channel.send(v_resposta_bot.response);
                    return;
                } // if(v_resposta_bot.status === 'success')
                else
                {
                    p_mensagem.channel.send(
                                                'Pessoa, tenho uma notícia ruim!'
                                               ,v_obj_resposta
                                            );
                    return;
                } // else{ ...}
            }); // request.post(
        } // try { ... }
        catch(p_erro)
        {
            p_mensagem.channel.send(
                                        'Desculpinha pessoa!'
                                       ,v_obj_resposta
                                    );
            return;
        } // catch(p_erro) { ... }
    } // pergunta(p_mensagem, p_obj_pergunta)
} // class braunabot



module.exports = braunabot;
