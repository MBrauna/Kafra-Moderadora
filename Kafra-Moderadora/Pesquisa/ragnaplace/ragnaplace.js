/****************************************************************************************************
* Autor: MBrauna & Lazarento                                                      Data: 21/02/2018 *
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
let bib_requisicao      =   require('request')
,bib_underline       =   require('underscore')
;
// Inicialização de bibliotecas                                 (∩｀-´)⊃━☆ﾟ.*･｡ﾟ

class ragnaplace
{
    constructor(p_obj_msg, p_config, p_mensagem, p_cliente)
    {
        this.obj_resposta       =   p_obj_msg;
        this.obj_config         =   p_config;
        this.obj_mensagem       =   p_mensagem;
        this.obj_cliente        =   p_cliente;

    } // constructor(p_obj_msg, p_config, p_mensagem, p_cliente)

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


    item(p_consulta)
    {
        let  v_termo_consulta   =   encodeURI(p_consulta.trim())
            ,v_url_item         =   `https://pt.ragnaplace.com/item-search?q=${v_termo_consulta}`
            ,v_bol_result       = false
            ,v_obj_resposta
            ,v_resultado
             ;

        try
        {

            request(
            {
                url: v_url_item
               ,headers:
                    {
                        'Referer'           :   'https://www.ragnaplace.com/'
                       ,'Authority'         :   'www.ragnaplace.com'
                       ,'X-Requested-With'  :   'XMLHttpRequest'
                    }
            }
            ,(p_erro, p_resposta, p_corpo)  =>
            {
                v_resultado     =   JSON.parse(p_corpo);

                if(v_resultado === null || v_resultado === 'undefined')
                {
                    v_obj_resposta          =   {
                                                    'embed' :   {
                                                                    color               :   this.obj_config.cor_vermelha.color
                                                                   ,author              :   {
                                                                                                name        :   'Kafra Moderadora'
                                                                                               ,icone       :   'https://i.imgur.com/cfYwkLQ.png'
                                                                                               ,url         :   'https://github.com/bropedia/Kafra-Moderadora'
                                                                                            }
                                                                   ,title               :   'O QUE É ISSO MEUS AMORES?'
                                                                   ,url                 :   null
                                                                   ,description         :   'Você pesquisou um item que eu não conheço.'
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
                                                                                                    name: 'PESSOA NÃO VAI ACREDITAR'
                                                                                                   ,value: 'QUE CAQUINHA, o termo "' + p_consulta + '" procurado não foi encontrado em minha base de dados! Perdoa o vacilo e não desiste de mim!'
                                                                                                }
                                                                                            ]
                                                                  ,timestamp            :   new Date()
                                                                  ,footer               :   {
                                                                                                icon_url:   'https://i.imgur.com/cfYwkLQ.png'
                                                                                               ,text:       '© bROPédia - Por MBrauna e Lazarento'
                                                                                            }
                                                                }
                                                };


                    this.monta_resposta('Caramba <@' + this.obj_mensagem.author.id + '>, não consegui encontrar o que você procura!'
                                      ,v_obj_resposta
                                      );
                }

                v_resultado.forEach((p_resp) =>
                {
                    if(p_resp.id.split('/')[0] == this.input) v_bol_result = p_resp;
                });

                if(!v_bol_result) v_bol_result = v_resultado[0];

                this.monta_resposta('Olha um(a) ' +  v_bol_result.text + ' fresquinho(a) saindo para <@' + this.obj_mensagem.author.id + '>. (∩｀-´)⊃━☆ﾟ.*･｡ﾟ   https://pt.ragnaplace.com/bRO/item/' +  v_bol_result.id
                                    ,null
                                    );
                return;
            }); // request(
        } // try { ... }
        catch(p_erro)
        {
            v_obj_resposta          =   {
                                            'embed' :   {
                                                            color               :   this.obj_config.cor_vermelha.color
                                                           ,author              :   {
                                                                                        name        :   'Kafra Moderadora'
                                                                                       ,icone       :   'https://i.imgur.com/cfYwkLQ.png'
                                                                                       ,url         :   'https://github.com/bropedia/Kafra-Moderadora'
                                                                                    }
                                                           ,title               :   'Ocorreu um erro durante a pesquisa'
                                                           ,url                 :   null
                                                           ,description         :   'Meus amores, ocorreu um grave erro durante a consulta ao item desejado!'
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
                                                                                            name: 'ERRO'
                                                                                           ,value: 'Infelizmente ao consultar sobre "' + p_consulta + '" Um erro foi levantado.'
                                                                                        }
                                                                                    ]
                                                          ,timestamp            :   new Date()
                                                          ,footer               :   {
                                                                                        icon_url:   'https://i.imgur.com/cfYwkLQ.png'
                                                                                       ,text:       '© bROPédia - Por MBrauna e Lazarento'
                                                                                    }
                                                        }
                                        };


            this.monta_resposta('Caramba <@' + this.obj_mensagem.author.id + '>, não consegui encontrar o que você procura!'
                              ,v_obj_resposta
                              );
        }

    } // item(p_consulta)



    mob(p_consulta)
    {
        let  v_termo_consulta   =   encodeURI(p_consulta.trim())
            ,v_url_mob         =   `https://pt.ragnaplace.com/mob-search?q=${v_termo_consulta}`
            ,v_bol_result       = false
            ,v_obj_resposta
            ,v_resultado
             ;

        try
        {

            request(
            {
                url: v_url_mob
               ,headers:
                    {
                        'Referer'           :   'https://www.ragnaplace.com/'
                       ,'Authority'         :   'www.ragnaplace.com'
                       ,'X-Requested-With'  :   'XMLHttpRequest'
                    }
            }
            ,(p_erro, p_resposta, p_corpo)  =>
            {
                v_resultado     =   JSON.parse(p_corpo);

                if(v_resultado === null || v_resultado === 'undefined')
                {
                    v_obj_resposta          =   {
                                                    'embed' :   {
                                                                    color               :   this.obj_config.cor_vermelha.color
                                                                   ,author              :   {
                                                                                                name        :   'Kafra Moderadora'
                                                                                               ,icone       :   'https://i.imgur.com/cfYwkLQ.png'
                                                                                               ,url         :   'https://github.com/bropedia/Kafra-Moderadora'
                                                                                            }
                                                                   ,title               :   'Não encontrei!'
                                                                   ,url                 :   null
                                                                   ,description         :   'O monstro que você pesquisou não consta na minha base de dados.'
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
                                                                                                    name: 'PESSOA NÃO VAI ACREDITAR'
                                                                                                   ,value: 'QUE CAQUINHA, o termo "' + p_consulta + '" procurado não foi encontrado em minha base de dados! Perdoa o vacilo e não desiste de mim!'
                                                                                                }
                                                                                            ]
                                                                  ,timestamp            :   new Date()
                                                                  ,footer               :   {
                                                                                                icon_url:   'https://i.imgur.com/cfYwkLQ.png'
                                                                                               ,text:       '© bROPédia - Por MBrauna e Lazarento'
                                                                                            }
                                                                }
                                                };


                    this.monta_resposta('Caramba <@' + this.obj_mensagem.author.id + '>, não consegui encontrar o que você procura!'
                                      ,v_obj_resposta
                                      );
                }

                v_resultado.forEach((p_resp) =>
                {
                    if(p_resp.id.split('/')[0] == this.input) v_bol_result = p_resp;
                });

                if(!v_bol_result) v_bol_result = v_resultado[0];

                this.monta_resposta('Quer um monstro mais feio(a) que você <@' + this.obj_mensagem.author.id + '>? Acho muito difícil. Este é o resultado mais relevante para ' +  v_bol_result.text + ' (∩｀-´)⊃━☆ﾟ.*･｡ﾟ   https://pt.ragnaplace.com/bRO/mob/' +  v_bol_result.id
                                    ,null
                                    );
                return;
            }); // request(
        } // try { ... }
        catch(p_erro)
        {
            v_obj_resposta          =   {
                                            'embed' :   {
                                                            color               :   this.obj_config.cor_vermelha.color
                                                           ,author              :   {
                                                                                        name        :   'Kafra Moderadora'
                                                                                       ,icone       :   'https://i.imgur.com/cfYwkLQ.png'
                                                                                       ,url         :   'https://github.com/bropedia/Kafra-Moderadora'
                                                                                    }
                                                           ,title               :   'Ocorreu um erro durante a pesquisa'
                                                           ,url                 :   null
                                                           ,description         :   'Meus amores, ocorreu um grave erro durante a consulta ao item desejado!'
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
                                                                                            name: 'ERRO'
                                                                                           ,value: 'Infelizmente ao consultar sobre "' + p_consulta + '" Um erro foi levantado.'
                                                                                        }
                                                                                    ]
                                                          ,timestamp            :   new Date()
                                                          ,footer               :   {
                                                                                        icon_url:   'https://i.imgur.com/cfYwkLQ.png'
                                                                                       ,text:       '© bROPédia - Por MBrauna e Lazarento'
                                                                                    }
                                                        }
                                        };


            this.monta_resposta('Caramba <@' + this.obj_mensagem.author.id + '>, não consegui encontrar o que você procura!'
                              ,v_obj_resposta
                              );
        }

    } // item(p_consulta)



    mapa(p_consulta)
    {
        let  v_termo_consulta   =   encodeURI(p_consulta.trim())
            ,v_url_mapa         =   `https://pt.ragnaplace.com/map-search?q=${v_termo_consulta}`
            ,v_bol_result       = false
            ,v_obj_resposta
            ,v_resultado
             ;

        try
        {

            request(
            {
                url: v_url_mapa
               ,headers:
                    {
                        'Referer'           :   'https://www.ragnaplace.com/'
                       ,'Authority'         :   'www.ragnaplace.com'
                       ,'X-Requested-With'  :   'XMLHttpRequest'
                    }
            }
            ,(p_erro, p_resposta, p_corpo)  =>
            {
                v_resultado     =   JSON.parse(p_corpo);

                if(v_resultado === null || v_resultado === 'undefined')
                {
                    v_obj_resposta          =   {
                                                    'embed' :   {
                                                                    color               :   this.obj_config.cor_vermelha.color
                                                                   ,author              :   {
                                                                                                name        :   'Kafra Moderadora'
                                                                                               ,icone       :   'https://i.imgur.com/cfYwkLQ.png'
                                                                                               ,url         :   'https://github.com/bropedia/Kafra-Moderadora'
                                                                                            }
                                                                   ,title               :   'ESTOU PERDIDA!'
                                                                   ,url                 :   null
                                                                   ,description         :   'Aonde estou? Que lugar é esse? Quem são vocês? Cadê meu GPS?!'
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
                                                                                                    name    : 'ESTOU PERDIDA!'
                                                                                                   ,value   : 'A consulta para "' + p_consulta + '" me deixou mais confusa que GPS em rotatória.'
                                                                                                }
                                                                                            ]
                                                                  ,timestamp            :   new Date()
                                                                  ,footer               :   {
                                                                                                icon_url:   'https://i.imgur.com/cfYwkLQ.png'
                                                                                               ,text:       '© bROPédia - Por MBrauna e Lazarento'
                                                                                            }
                                                                }
                                                };


                    this.monta_resposta('Caramba <@' + this.obj_mensagem.author.id + '>, não consegui encontrar o que você procura!'
                                      ,v_obj_resposta
                                      );
                }

                v_resultado.forEach((p_resp) =>
                {
                    if(p_resp.id.split('/')[0] == this.input) v_bol_result = p_resp;
                });

                if(!v_bol_result) v_bol_result = v_resultado[0];

                this.monta_resposta('<@' + this.obj_mensagem.author.id + '> está por ai? Você procurou por "' +  v_bol_result.text + '" e eu encontrei https://pt.ragnaplace.com/bRO/map/' +  v_bol_result.id
                                    ,null
                                    );
                return;
            }); // request(
        } // try { ... }
        catch(p_erro)
        {
            v_obj_resposta          =   {
                                            'embed' :   {
                                                            color               :   this.obj_config.cor_vermelha.color
                                                           ,author              :   {
                                                                                        name        :   'Kafra Moderadora'
                                                                                       ,icone       :   'https://i.imgur.com/cfYwkLQ.png'
                                                                                       ,url         :   'https://github.com/bropedia/Kafra-Moderadora'
                                                                                    }
                                                           ,title               :   'Ocorreu um erro durante a pesquisa'
                                                           ,url                 :   null
                                                           ,description         :   'Meus amores, ocorreu um grave erro durante a consulta ao mapa desejado!'
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
                                                                                            name: 'ERRO'
                                                                                           ,value: 'Infelizmente ao consultar sobre "' + p_consulta + '" Um erro foi levantado.'
                                                                                        }
                                                                                    ]
                                                          ,timestamp            :   new Date()
                                                          ,footer               :   {
                                                                                        icon_url:   'https://i.imgur.com/cfYwkLQ.png'
                                                                                       ,text:       '© bROPédia - Por MBrauna e Lazarento'
                                                                                    }
                                                        }
                                        };


            this.monta_resposta('Caramba <@' + this.obj_mensagem.author.id + '>, não consegui encontrar o que você procura!'
                              ,v_obj_resposta
                              );
        }

    } // item(p_consulta)

} // class ragnaplace



// Torna o método público
module.exports = ragnaplace;