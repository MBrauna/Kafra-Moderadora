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
 ****************************************************************************************************
 *                                                                                                  *
 *                ACESSA O DB COROIOOOOOOO - Método para consulta ao banco de dados                 *
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
 ****************************************************************************************************/

let   bib_postgres      =   require('pg').Client;

class banco_dados
{
    constructor(p_uri_db)
    {
        //Realiza a inicialização do banco
        this.obj_db         =   new bib_postgres({
                                                    connectionString    :   p_uri_db
                                                });
        this.obj_db.connect();
    } // constructor(p_cliente,p_uri_db)


    monta_resposta(p_mensagem, p_frase, p_configuracao)
    {
        // Monitora qualquer evento de erro para se executar o cliente
        try
        {
            p_mensagem.channel.send(
                                        p_frase
                                       ,p_configuracao
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

    } // monta_resposta(p_mensagem, p_frase, p_configuracao)


    monta_grupo(p_id_usuario, p_id_canal, p_nivel_inicial, p_nivel_final, p_mapa, p_mensagem, p_configuracao)
    {
        let  v_string_query     =   {}
            ,v_obj_resposta     =   {}
            ;


        v_string_query      =   {
                                    text    :   'insert into grupo_ragnarok(id_usuario, id_canal, mapa, nivel_inicial, nivel_final) values($1, $2, $3, $4, $5)'
                                   ,values  :   [p_id_usuario, p_id_canal, p_mapa, p_nivel_inicial, p_nivel_final]
                                };



        // Antes de qualquer coisa irá remover os grupos antigos
        this.obj_db.query('delete from grupo_ragnarok where data_fim < now()', (p_erro, p_resposta) =>
        {
            if(p_erro)
            {
                console.log(p_erro);
                console.trace();
            } // if(p_erro)
        }); // this.obj_db.query('delete from grupo_ragnarok where data_fim < now()', (p_erro, p_resposta) =>


        this.obj_db.query(v_string_query, (p_erro, p_resposta) =>
        {
            if(p_erro)
            {
                v_obj_resposta  =   {
                                        'embed' :   {
                                                        color               :   p_configuracao.cor_vermelha.color
                                                       ,author              :   {
                                                                                    name        :   'Kafra Moderadora'
                                                                                   ,icon_url    :   'https://i.imgur.com/cfYwkLQ.png'
                                                                                   ,url         :   'https://github.com/bropedia/Kafra-Moderadora'
                                                                                }
                                                       ,title               :   'ERRO DURANTE O CADASTRO'
                                                       ,url                 :   null
                                                       ,description         :   'Olá ' +  p_mensagem.author.username + ' seu grupo não pode ser criado!'
                                                       ,'image'             :   {
                                                                                    "url"       :   null // 'https://i.imgur.com/LOGICNS.jpg'
                                                                                   ,"height"    :   null // 123
                                                                                   ,"width"     :   null // 123
                                                                                }
                                                       ,thumbnail           :   {
                                                                                    "url"       :   'https://i.imgur.com/5SiWZwF.png' // 'https://i.imgur.com/LOGICNS.jpg'
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
                                                                                        name    :   'Erro ao cadastrar:'
                                                                                       ,value   :   'Mapa: ' + p_mapa + '\nNível Inicial: ' + p_nivel_inicial + '\nNível Final: ' + p_nivel_final
                                                                                    }
                                                                                ]
                                                      ,timestamp            :   new Date()
                                                      ,footer               :   {
                                                                                    icon_url:   'https://i.imgur.com/cfYwkLQ.png'
                                                                                   ,text:       '© bROPédia - Por MBrauna'
                                                                                }
                                                    }
                                    };

                this.monta_resposta(p_mensagem
                                   ,'EEEEPAAAAA algo ocorreu e não pude montar seu grupo <@' + p_mensagem.author.id + '>'
                                   ,v_obj_resposta
                                   );
                return 9;
            }
            else
            {
                v_obj_resposta  =   {
                                        'embed' :   {
                                                        color               :   p_configuracao.cor_verde.color
                                                       ,author              :   {
                                                                                    name        :   'Kafra Moderadora'
                                                                                   ,icon_url    :   'https://i.imgur.com/cfYwkLQ.png'
                                                                                   ,url         :   'https://github.com/bropedia/Kafra-Moderadora'
                                                                                }
                                                       ,title               :   'Cadastro realizado com sucesso!'
                                                       ,url                 :   null
                                                       ,description         :   'Olá ' +  p_mensagem.author.username + ' seu grupo foi cadastrado com sucesso!'
                                                       ,'image'             :   {
                                                                                    "url"       :   null // 'https://i.imgur.com/LOGICNS.jpg'
                                                                                   ,"height"    :   null // 123
                                                                                   ,"width"     :   null // 123
                                                                                }
                                                       ,thumbnail           :   {
                                                                                    "url"       :   'https://i.imgur.com/5SiWZwF.png' // 'https://i.imgur.com/LOGICNS.jpg'
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
                                                                                        name    :   'Grupo cadastrado:'
                                                                                       ,value   :   'Mapa: ' + p_mapa + '\nNível Inicial: ' + p_nivel_inicial + '\nNível Final: ' + p_nivel_final
                                                                                    }
                                                                                ]
                                                      ,timestamp            :   new Date()
                                                      ,footer               :   {
                                                                                    icon_url:   'https://i.imgur.com/cfYwkLQ.png'
                                                                                   ,text:       '© bROPédia - Por MBrauna'
                                                                                }
                                                    }
                                    };

                this.monta_resposta(p_mensagem
                                   ,'<@' + p_mensagem.author.id + '>, muitíssissississimo obrigada por participar, seu grupo foi montado.'
                                   ,v_obj_resposta
                                   );
                return 1;
            }
        });
    } // monta_grupo(p_id_usuario, p_id_canal, p_nivel_inicial, p_nivel_final, p_mapa)


    consulta_grupo(p_nivel, p_mensagem, p_configuracao)
    {
        let  v_string_query     =   {}
            ,v_obj_resposta     =   {}
            ,v_campo_resposta   =   []
            ;

        v_string_query          =   {
                                        text    :   'select id_usuario, id_canal, mapa, nivel_inicial, nivel_final from grupo_ragnarok where $1 between nivel_inicial and nivel_final'
                                       ,values  :   [p_nivel]
                                    };


        // Antes de qualquer coisa irá remover os grupos antigos
        this.obj_db.query('delete from grupo_ragnarok where data_fim < now()', (p_erro, p_resposta) =>
        {
            if(p_erro)
            {
                console.log(p_erro);
                console.trace();
            } // if(p_erro)
        }); // this.obj_db.query('delete from grupo_ragnarok where data_fim < now()', (p_erro, p_resposta) =>

        // Agora realiza a consulta
        this.obj_db.query(v_string_query, (p_erro, p_resposta) =>
        {
            if(p_erro)
            {
                v_obj_resposta  =   {
                                        'embed' :   {
                                                        color               :   p_configuracao.cor_vermelha.color
                                                       ,author              :   {
                                                                                    name        :   'Kafra Moderadora'
                                                                                   ,icon_url    :   'https://i.imgur.com/cfYwkLQ.png'
                                                                                   ,url         :   'https://github.com/bropedia/Kafra-Moderadora'
                                                                                }
                                                       ,title               :   'Não há vagas!'
                                                       ,url                 :   null
                                                       ,description         :   'Olá ' +  p_mensagem.author.username + ' não encontrei nenhum resultado para sua consulta!'
                                                       ,'image'             :   {
                                                                                    "url"       :   null // 'https://i.imgur.com/LOGICNS.jpg'
                                                                                   ,"height"    :   null // 123
                                                                                   ,"width"     :   null // 123
                                                                                }
                                                       ,thumbnail           :   {
                                                                                    "url"       :   'https://i.imgur.com/5SiWZwF.png' // 'https://i.imgur.com/LOGICNS.jpg'
                                                                                   ,"height"    :   null // 123
                                                                                   ,"width"     :   null // 123 
                                                                                }
                                                       ,video               :   {
                                                                                    "url"       :   'https://www.youtube.com/watch?v=YBgQhv45uhE' // 'https://i.imgur.com/LOGICNS.jpg'
                                                                                   ,"height"    :   null // 123
                                                                                   ,"width"     :   null // 123
                                                                                }
                                                       ,fields              :   [
                                                                                    {
                                                                                        name    :   'Não há vagas'
                                                                                       ,value   :   'Desculpe, não há atualmente nenhum grupo registrado para o nível ' + p_nivel
                                                                                    }
                                                                                ]
                                                      ,timestamp            :   new Date()
                                                      ,footer               :   {
                                                                                    icon_url:   'https://i.imgur.com/cfYwkLQ.png'
                                                                                   ,text:       '© bROPédia - Por MBrauna'
                                                                                }
                                                    }
                                    };

                this.monta_resposta(p_mensagem
                                   ,'EEEEPAAAAA ocorreu um erro na consulta <@' + p_mensagem.author.id + '>'
                                   ,v_obj_resposta
                                   );
                return;
            } // if(p_erro)
            else
            {
                if(p_resposta.rowCount <= 0)
                {
                    v_obj_resposta  =   {
                                            'embed' :   {
                                                            color               :   p_configuracao.cor_vermelha.color
                                                           ,author              :   {
                                                                                        name        :   'Kafra Moderadora'
                                                                                       ,icon_url    :   'https://i.imgur.com/cfYwkLQ.png'
                                                                                       ,url         :   'https://github.com/bropedia/Kafra-Moderadora'
                                                                                    }
                                                           ,title               :   'Não há vagas!'
                                                           ,url                 :   null
                                                           ,description         :   'Olá ' +  p_mensagem.author.username + ' não encontrei nenhum resultado para sua consulta!'
                                                           ,'image'             :   {
                                                                                        "url"       :   null // 'https://i.imgur.com/LOGICNS.jpg'
                                                                                       ,"height"    :   null // 123
                                                                                       ,"width"     :   null // 123
                                                                                    }
                                                           ,thumbnail           :   {
                                                                                        "url"       :   'https://i.imgur.com/5SiWZwF.png' // 'https://i.imgur.com/LOGICNS.jpg'
                                                                                       ,"height"    :   null // 123
                                                                                       ,"width"     :   null // 123 
                                                                                    }
                                                           ,video               :   {
                                                                                        "url"       :   'https://www.youtube.com/watch?v=YBgQhv45uhE' // 'https://i.imgur.com/LOGICNS.jpg'
                                                                                       ,"height"    :   null // 123
                                                                                       ,"width"     :   null // 123
                                                                                    }
                                                           ,fields              :   [
                                                                                        {
                                                                                            name    :   'Não há vagas'
                                                                                           ,value   :   'Desculpe, não há atualmente nenhum grupo registrado para o nível ' + p_nivel
                                                                                        }
                                                                                    ]
                                                          ,timestamp            :   new Date()
                                                          ,footer               :   {
                                                                                        icon_url:   'https://i.imgur.com/cfYwkLQ.png'
                                                                                       ,text:       '© bROPédia - Por MBrauna'
                                                                                    }
                                                        }
                                        };

                    this.monta_resposta(p_mensagem
                                       ,'Vish <@' + p_mensagem.author.id + '> infelizmente não há nenhum grupo ativo atualmente.'
                                       ,v_obj_resposta
                                       );
                    return;
                } // if(p_resposta.rowCount <= 0)
                else
                {
                    // Marca como novo array - impede lixo de mémória
                    v_campo_resposta    =   [];

                    // Marca um novo loop para as respostas
                    p_resposta.rows.forEach((p_resp) =>
                    {
                        var tmp_coisas  =   {
                                                name    :   'Mapa [' + p_resp.mapa + '] - Nível[' + p_resp.nivel_inicial + '/' + p_resp.nivel_final + ']'
                                               ,value   :   'Chame por <@' + p_resp.id_usuario + '> ou dirija-se ao mapa ' + p_resp.mapa
                                            };

                        v_campo_resposta.push(tmp_coisas);
                    });

                    v_obj_resposta  =   {
                                            'embed' :   {
                                                            color               :   p_configuracao.cor_roxa.color
                                                           ,author              :   {
                                                                                        name        :   'Kafra Moderadora'
                                                                                       ,icon_url    :   'https://i.imgur.com/cfYwkLQ.png'
                                                                                       ,url         :   'https://github.com/bropedia/Kafra-Moderadora'
                                                                                    }
                                                           ,title               :   'Grupos ativos para Ragnarök Online'
                                                           ,url                 :   null
                                                           ,description         :   'Olá ' +  p_mensagem.author.username + '!!! A Kafruda vai te ajudar com os grupos, vamos analisar:'
                                                           ,'image'             :   {
                                                                                        "url"       :   null // 'https://i.imgur.com/LOGICNS.jpg'
                                                                                       ,"height"    :   null // 123
                                                                                       ,"width"     :   null // 123
                                                                                    }
                                                           ,thumbnail           :   {
                                                                                        "url"       :   'https://i.imgur.com/5SiWZwF.png' // 'https://i.imgur.com/LOGICNS.jpg'
                                                                                       ,"height"    :   null // 123
                                                                                       ,"width"     :   null // 123 
                                                                                    }
                                                           ,video               :   {
                                                                                        "url"       :   null // 'https://i.imgur.com/LOGICNS.jpg'
                                                                                       ,"height"    :   null // 123
                                                                                       ,"width"     :   null // 123
                                                                                    }
                                                           ,fields              :   v_campo_resposta
                                                          ,timestamp            :   new Date()
                                                          ,footer               :   {
                                                                                        icon_url:   'https://i.imgur.com/cfYwkLQ.png'
                                                                                       ,text:       '© bROPédia - Por MBrauna'
                                                                                    }
                                                        }
                                        };

                    this.monta_resposta(p_mensagem
                                       ,'VRUMMMM VRUMMMM <@' + p_mensagem.author.id + '> olha a lista de grupos ativos abaixo:'
                                       ,v_obj_resposta
                                       );

                    return;
                }


            } // else { ... }
        }); // this.obj_db.query(v_string_query, (p_erro, p_resposta) =>

    } // consulta_grupo(p_nivel)

} // class kafra_inicia

// Torna o método público
module.exports = banco_dados;