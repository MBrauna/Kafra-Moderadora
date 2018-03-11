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
   ,bib_wtf_wiki        =   require('wtf_wikipedia')
   ;
// Inicialização de bibliotecas                                 (∩｀-´)⊃━☆ﾟ.*･｡ﾟ

class bropedia
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




    trata_consulta(p_array_frase)
    {
        var v_string_requisicao = '';

        for(var i=1;i<p_array_frase.length;i++)
        {
            // Forma a string
            v_string_requisicao = v_string_requisicao + p_array_frase[i] + ' ';
        } // for(var i=1;i<=p_array_frase.length;i++)

        return v_string_requisicao.trim();
    } // trata_consulta(p_array_frase)



    consultar(p_consulta)
    {
        // Prepara os dados iniciais para consulta na enciclopédia.
        let    v_consulta           =   this.trata_consulta(p_consulta)
              ,v_termo_consulta     =   encodeURI(v_consulta.trim())
              ,v_url_bropedia       =   `http://bropedia.net/api.php?action=query&list=search&srsearch=${v_termo_consulta}&utf8=&format=json`
              ,v_obj_resposta       =   {}
              ,v_partes             =   []
              ,v_redirecionamento   =   false
              ,v_redirect
              ,v_resposta
              ,v_revisao
              ,v_pagina
              ,v_pagina_final
              ;

        // Tratamento de excessão
        try
        {
            // Realiza uma chamada no webservice da enciclopédia
            bib_requisicao.get(v_url_bropedia, (p_erro, p_resposta, p_corpo) =>
            {
                // Coleta as informações cedidas pelo webservice - Retorno JSON - Consulta à enciclopédia
                v_resposta  =   JSON.parse(p_corpo);

                // Verifica quantidade de resultados obtidos
                if(v_resposta.query.searchinfo.totalhits == 0)
                {
                    v_consulta              =   p_consulta[1].trim().substring(0, (v_consulta.trim().length/2)) + '*';
                    v_termo_consulta        =   encodeURI(v_consulta.trim());
                    v_url_bropedia          =   `http://bropedia.net/api.php?action=query&list=search&srsearch=${v_termo_consulta}&utf8=&format=json`;


                    bib_requisicao.get(v_url_bropedia, (p_erro_tmp, p_resposta_tmp, p_corpo_tmp) =>
                    {
                        // Atribui o novo valor de carpo
                        v_resposta  =   JSON.parse(p_corpo_tmp);

                        // Verifica os resultados finais
                        if(v_resposta.query.searchinfo.totalhits == 0)
                        {
                            v_obj_resposta          =   {
                                                            'embed' :   {
                                                                            color               :   this.obj_config.cor_vermelha.color
                                                                           ,author              :   {
                                                                                                        name        :   'Kafra Moderadora'
                                                                                                       ,icone       :   'https://i.imgur.com/cfYwkLQ.png'
                                                                                                       ,url         :   'https://github.com/bropedia/Kafra-Moderadora'
                                                                                                    }
                                                                           ,title               :   'Termo não encontrado!'
                                                                           ,url                 :   null
                                                                           ,description         :   'Desculpe ): Não pude atender a sua solicitação'
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
                                                                                                            name: 'ZERO! NADA! VAZIO!'
                                                                                                           ,value: 'QUE CAQUINHA, o termo "' + v_consulta + '" procurado não foi encontrado em minha base de dados! Perdoa o vacilo e não desiste de mim!'
                                                                                                        }
                                                                                                    ]
                                                                          ,timestamp            :   new Date()
                                                                          ,footer               :   {
                                                                                                        icon_url:   'https://i.imgur.com/cfYwkLQ.png'
                                                                                                       ,text:       '© bROPédia - Por MBrauna'
                                                                                                    }
                                                                        }
                                                        };


                            this.monta_resposta('Caramba <@' + this.obj_mensagem.author.id + '>, não consegui encontrar o que você procura!'
                                              ,v_obj_resposta
                                              );
                            return;
                        } // if(v_resposta.query.searchinfo.totalhits == 0)
                        else
                        {
                            v_resposta.query.search.forEach(p_tmp_dado => {
                                var tmp_info = {name: p_tmp_dado.title, value: p_tmp_dado.snippet};
                                v_partes.push(tmp_info);
                            });

                            v_obj_resposta          =   {
                                                            'embed' :   {
                                                                            color               :   this.obj_config.cor_amarela.color
                                                                           ,author              :   {
                                                                                                        name        :   'Kafra Moderadora'
                                                                                                       ,icone       :   'https://i.imgur.com/cfYwkLQ.png'
                                                                                                       ,url         :   'https://github.com/bropedia/Kafra-Moderadora'
                                                                                                    }
                                                                           ,title               :   'O termo consultado não foi encontrado'
                                                                           ,url                 :   'https://bropedia.net'
                                                                           ,description         :   'Olá pessoa, não pude atender sua solicitação, o exato termo que você procura não foi encontrado, entretanto, abaixo os termos similares existentes:'
                                                                           ,'image'             :   {
                                                                                                        "url"       :   null
                                                                                                       ,"height"    :   null // 123
                                                                                                       ,"width"     :   null // 123
                                                                                                    }
                                                                           ,thumbnail           :   {
                                                                                                        "url"       :   'https://i.imgur.com/mE0YWWh.png' // 'https://i.imgur.com/LOGICNS.jpg'
                                                                                                       ,"height"    :   null // 123
                                                                                                       ,"width"     :   null // 123 
                                                                                                    }
                                                                           ,video               :   {
                                                                                                        "url"       :   null // 'https://i.imgur.com/LOGICNS.jpg'
                                                                                                       ,"height"    :   null // 123
                                                                                                       ,"width"     :   null // 123
                                                                                                    }
                                                                           ,fields              :   v_partes
                                                                          ,timestamp            :   new Date()
                                                                          ,footer               :   {
                                                                                                        icon_url:   'https://i.imgur.com/cfYwkLQ.png'
                                                                                                       ,text:       '© bROPédia - Por MBrauna'
                                                                                                    }
                                                                        }
                                                        };
                            this.monta_resposta('Não encontrei o que vc queria  <@' + this.obj_mensagem.author.id + '>, mas veja abaixo uma lista de similares para consulta.'
                                                ,v_obj_resposta
                                                );
                            return;
                        } // else { ... }
                    }); // bib_requisicao.get(v_url_bropedia, (p_erro_tmp, p_resposta_tmp, p_corpo_tmp) =>
                    
                } // if(v_resposta.query.searchinfo.totalhits == 0)
                else
                {
                    // Roda a consulta procurando por algo similar ao pesquisado
                    v_resposta.query.search.forEach((json_resp) =>
                    {
                        // Teste - Consulta similar
                        if(json_resp.title.toLowerCase() == v_consulta.trim().toLowerCase())
                        {
                            // Caso encontre: A página desejada se faz presente.
                            v_pagina    =   json_resp;
                        } // if(json_resp.title.toLowerCase() == v_consulta.trim().toLowerCase())
                    });

                    // Verifica se a página informada foi definida, caso não seja utiliza a primeira opção obtida na query
                    if(typeof v_pagina === 'undefined')
                    {
                        v_pagina        =   bib_underline.first(v_resposta.query.search);
                    } // if(typeof v_pagina === 'undefined')

                    // Se mesmo assim a página permanecer não definida
                    if(typeof v_pagina === 'undefined')
                    {
                        // Define o objeto a ser utilizado
                        v_obj_resposta          =   {
                                                        'embed' :   {
                                                                        color               :   this.obj_config.cor_vermelha.color
                                                                       ,author              :   {
                                                                                                    name        :   'Kafra Moderadora'
                                                                                                   ,icone       :   'https://i.imgur.com/cfYwkLQ.png'
                                                                                                   ,url         :   'https://github.com/bropedia/Kafra-Moderadora'
                                                                                                }
                                                                       ,title               :   'TERMO NÃO ENCONTRADO NA WIKI'
                                                                       ,url                 :   null
                                                                       ,description         :   'Desculpe ): Não pude atender a sua solicitação'
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
                                                                                                        name: 'ZERO! NADA! VAZIO! NOTHING!'
                                                                                                       ,value: 'QUE CAQUINHA, o termo "' + v_consulta + '" procurado não foi encontrado em minha base de dados! Perdoa o vacilo e não desiste de mim!'
                                                                                                    }
                                                                                                ]
                                                                      ,timestamp            :   new Date()
                                                                      ,footer               :   {
                                                                                                    icon_url:   'https://i.imgur.com/cfYwkLQ.png'
                                                                                                   ,text:       '© bROPédia - Por MBrauna'
                                                                                                }
                                                                    }
                                                    };
                        this.monta_resposta('Caramba <@' + this.obj_mensagem.author.id + '>, não consegui encontrar o que você procura!'
                                          ,v_obj_resposta
                                          );
                        return;
                    }

                    // Define nova consulta para obtenção dos dados
                    v_url_bropedia  =   `http://bropedia.net/api.php?action=query&titles=${v_pagina.title}&prop=info|revisions&inprop=url&rvprop=content&format=json`;

                    // Reaiza a requisição das informações da página
                    bib_requisicao.get(v_url_bropedia, (p_erro_pg, p_resposta_pg, p_corpo_pg) =>
                    {
                        // Monta os dados
                        v_resposta          =   JSON.parse(p_corpo_pg);
                        v_pagina_final      =   v_resposta.query.pages[Object.keys(v_resposta.query.pages)[0]];
                        v_revisao           =   bib_underline.first(v_pagina_final.revisions);

                        // Veririca se a informação é um redirect
                        if(!v_redirecionamento && !bib_underline.isEmpty(v_revisao) && v_revisao['*'].indexOf('#REDIRECIONAMENTO') > -1)
                        {
                            // Marca a página que receberá o redirect
                            v_redirect      =   v_revisao['*'].replace('#REDIRECIONAMENTO [[','').replace(']]','');

                            // Chama o mesmo método para encontrar as informações
                            this.consultar(v_redirect);
                            return;
                        } // if(!v_redirecionamento && !bib_underline.isEmpty(v_revisao) && v_revisao['*'].indexOf('#REDIRECIONAMENTO') > -1)

                        // Caso a página não tenha sido encontrada
                        if(typeof v_pagina_final == 'undefined')
                        {

                            // Define o objeto a ser utilizado
                            v_obj_resposta          =   {
                                                            'embed' :   {
                                                                            color               :   this.obj_config.cor_amarela.color
                                                                           ,author              :   {
                                                                                                        name        :   'Kafra Moderadora'
                                                                                                       ,icone       :   'https://i.imgur.com/cfYwkLQ.png'
                                                                                                       ,url         :   'https://github.com/bropedia/Kafra-Moderadora'
                                                                                                    }
                                                                           ,title               :   'NÃO FOI POSSÍVEL CONSULTAR'
                                                                           ,url                 :   null
                                                                           ,description         :   'Pane no sistema alguém me desconfigurou!'
                                                                           ,'image'             :   {
                                                                                                        "url"       :   null
                                                                                                       ,"height"    :   null // 123
                                                                                                       ,"width"     :   null // 123
                                                                                                    }
                                                                           ,thumbnail           :   {
                                                                                                        "url"       :   'https://i.imgur.com/6P0lZzG.gif'
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
                                                                                                            name: 'Ocorreu um erro durante a consulta'
                                                                                                           ,value: 'O termo "' + v_consulta + '" gerou um erro! Acha que é sentar e chorar? Nananinanão avise um administrador.'
                                                                                                        }
                                                                                                    ]
                                                                          ,timestamp            :   new Date()
                                                                          ,footer               :   {
                                                                                                        icon_url:   'https://i.imgur.com/cfYwkLQ.png'
                                                                                                       ,text:       '© bROPédia - Por MBrauna'
                                                                                                    }
                                                                        }
                                                        };
                            this.monta_resposta('As coisas nem sempre saem como planejado <@' + this.obj_mensagem.author.id + '>, né non?'
                                              ,v_obj_resposta
                                              );
                            return;

                        } // if(typeof v_pagina == 'undefined')
                        else
                        {
                            // Define o objeto a ser utilizado
                            v_obj_resposta          =   {
                                                            'embed' :   {
                                                                            color               :   this.obj_config.cor_verde.color
                                                                           ,author              :   {
                                                                                                        name        :   'Kafra Moderadora'
                                                                                                       ,icone       :   'https://i.imgur.com/cfYwkLQ.png'
                                                                                                       ,url         :   'https://github.com/bropedia/Kafra-Moderadora'
                                                                                                    }
                                                                           ,title               :   v_pagina_final.title
                                                                           ,url                 :   v_pagina_final.canonicalurl
                                                                           ,description         :   'Este é o resultado mais relevante para ' + v_consulta + '.'
                                                                           ,'image'             :   {
                                                                                                        "url"       :   null
                                                                                                       ,"height"    :   null // 123
                                                                                                       ,"width"     :   null // 123
                                                                                                    }
                                                                           ,thumbnail           :   {
                                                                                                        "url"       :   'https://i.imgur.com/mE0YWWh.png'
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
                                                                                                            name    :   v_pagina_final.title
                                                                                                           ,value   :   v_pagina_final.canonicalurl
                                                                                                        }
                                                                                                       ,{
                                                                                                            name    :   '**Resumão da Kafra**'
                                                                                                           ,value   :   v_revisao['*'].slice(v_revisao['*'].indexOf('descrição') + 9).substr(1,300)
                                                                                                        }
                                                                                                    ]
                                                                          ,timestamp            :   new Date()
                                                                          ,footer               :   {
                                                                                                        icon_url:   'https://i.imgur.com/cfYwkLQ.png'
                                                                                                       ,text:       '© bROPédia - Por MBrauna'
                                                                                                    }
                                                                        }
                                                        };
                            this.monta_resposta('<@' + this.obj_mensagem.author.id + '> é consulta que você quer? \n Então toma (∩｀-´)⊃━☆ﾟ.*･｡ﾟ \n ' + v_pagina_final.canonicalurl
                                               ,null
                                                );
                        } // else  { ... }
                    }); // bib_requisicao.get(v_url_bropedia, (p_erro, p_resposta, p_corpo) =>
                } // else { ... }
            }); // bib_requisicao.get(v_url_bropedia, (p_erro, p_resposta, p_corpo) => {
            

            // Retorna a função
            return;
        } // try { ... }
        catch(p_erro)
        {
            // Em caso de erro, tenta montar uma nova mensagem, avisando sobre o erro
            try
            {
                // Cria uma novo objeto para modificação.
                v_obj_resposta          =   {
                                                'embed' :   {
                                                                color               :   this.obj_config.cor_amarela.color
                                                               ,author              :   {
                                                                                            name        :   'Kafra Moderadora'
                                                                                           ,icone       :   'https://i.imgur.com/cfYwkLQ.png'
                                                                                           ,url         :   'https://github.com/bropedia/Kafra-Moderadora'
                                                                                        }
                                                               ,title               :   'NÃO FOI POSSÍVEL CONSULTAR'
                                                               ,url                 :   null
                                                               ,description         :   'Algum erro em meu sistema não permitiu realizar a consulta.'
                                                               ,'image'             :   {
                                                                                            "url"       :   'https://i.imgur.com/6P0lZzG.gif'
                                                                                           ,"height"    :   null // 123
                                                                                           ,"width"     :   null // 123
                                                                                        }
                                                               ,thumbnail           :   {
                                                                                            "url"       :   'https://i.imgur.com/y2HNRng.gif'
                                                                                           ,"height"    :   50 // 123
                                                                                           ,"width"     :   null // 123 
                                                                                        }
                                                               ,video               :   {
                                                                                            "url"       :   null // 'https://i.imgur.com/LOGICNS.jpg'
                                                                                           ,"height"    :   null // 123
                                                                                           ,"width"     :   null // 123
                                                                                        }
                                                               ,fields              :   [
                                                                                            {
                                                                                                name: 'Ocorreu um erro durante a consulta'
                                                                                               ,value: 'O termo "' + v_consulta + '" gerou um erro! Acha que é sentar e chorar? Nananinanão avise um administrador.'
                                                                                            }
                                                                                        ]
                                                              ,timestamp            :   new Date()
                                                              ,footer               :   {
                                                                                            icon_url:   'https://i.imgur.com/cfYwkLQ.png'
                                                                                           ,text:       '© bROPédia - Por MBrauna'
                                                                                        }
                                                            }
                                            };

                this.monta_resposta('<@' + this.obj_mensagem.author.id + '> AI GODI UM ERRO SELVAGEM APARECEU!'
                                   ,v_obj_resposta
                                  );
            } // try { ... }
            catch(p_erro_sec)
            {
                // Caso nada acima surgir efeito ...
                console.log('-- --> CONSULTAR <-- --');
                console.log(p_erro);
                console.log('-- --> CONSULTAR <-- --');
                console.log(p_erro_sec);
                console.log('-- --> CONSULTAR <-- --');
                console.trace();
                console.log('-- --> CONSULTAR <-- --');

                // Informa sobre o erro
                console.log('-- >> bropedia erro << --');
                return;
                console.log('-- >> bropedia erro << --');
            } // catch(p_erro_sec) { ... }

        } // catch(p_erro) { ... }
    } // consultar(p_consulta)

} // class bropedia



// Torna o método público
module.exports = bropedia;
