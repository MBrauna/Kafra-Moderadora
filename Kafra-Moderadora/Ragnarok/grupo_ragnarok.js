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

let bib_requisicao      =   require('request')
   ;


class grupo_ragnarok
{
    constructor(p_database, p_cliente, p_mensagem, p_configuracao)
    {
        this.obj_cliente        =   p_cliente;
        this.obj_database       =   p_database;
        this.obj_mensagem       =   p_mensagem;
        this.obj_configuracao   =   p_configuracao;
    } // constructor(p_cliente, p_database, p_mensagem)

    monta_resposta(p_frase, p_configuracao)
    {
        // Monitora qualquer evento de erro para se executar o cliente
        try
        {
            this.obj_mensagem.channel.send(
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

    } // monta_resposta(p_frase, p_configuracao)

    monta_grupo(p_regra)
    {
        let     v_obj_resposta      =   {}
               ,v_nivel_inicial     =   0
               ,v_nivel_final       =   0
               ,v_mapa              =   ''
               ,v_resultado         =   9
               ;

        // Declara a resposta padrão.
        v_obj_resposta          =   {
                                        'embed' :   {
                                                        color               :   this.obj_configuracao.cor_vermelha.color
                                                       ,author              :   {
                                                                                    name        :   'Kafra Moderadora'
                                                                                   ,icone       :   'https://i.imgur.com/cfYwkLQ.png'
                                                                                   ,url         :   'https://github.com/bropedia/Kafra-Moderadora'
                                                                                }
                                                       ,title               :   'Parâmetros incorretos'
                                                       ,url                 :   'https://github.com/bropedia/Kafra-Moderadora'
                                                       ,description         :   'Olá ' +  this.obj_mensagem.author.username + ' os parâmetros informados não correspondem ao valor esperado'
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
                                                                                        name    :   'Entenda o **recrutamento**'
                                                                                       ,value   :   'O comando ***recrutar*** irá lhe auxiliar na montagem de grupos dentro do jogo, para tal, será necessário informar os valores conforme necessário e por 20 minutos irei divulgar'
                                                                                    }
                                                                                   ,{
                                                                                        name    :   '<NIVEL_INICIAL>'
                                                                                       ,value   :   'Informe qual nível inicial você pretente acolher em seu grupo.\nExemplo: ***110***'
                                                                                    }
                                                                                   ,{
                                                                                        name    :   '<NIVEL_FINAL>'
                                                                                       ,value   :   'Informe qual nível final você pretente acolher em seu grupo.\nExemplo: ***125***'
                                                                                    }
                                                                                   ,{
                                                                                        name    :   '<ID_MAPA>'
                                                                                       ,value   :   'Informe o mapa desejado para ganhar muiiiiiiiiiiita EXP!!\nLembrando que eu preciso do ID, por exemplo: Vila Orc do Oeste possui o id ***gef_fild14***'
                                                                                    }
                                                                                    ,{
                                                                                        name    :   'A chamada para o recrutamento é simples, veja:'
                                                                                       ,value   :   'Se quero montar um grupo para a Vila Orc do Oeste para personagens do nível 110 ao 125, basta fazer: \n @Kafra Moderadora recrutar ***110 125 gef_fild14***'
                                                                                    }
                                                                                ]
                                                      ,timestamp            :   new Date()
                                                      ,footer               :   {
                                                                                    icon_url:   'https://i.imgur.com/cfYwkLQ.png'
                                                                                   ,text:       '© bROPédia - Por MBrauna e Lazarento'
                                                                                }
                                                    }
                                    };


        try
        {
            // Para toda a regra .. faz-se valer que ...
            // [1] - Nivel inicial, [2] - Nível final, [3] - mapa
            if(p_regra.length !== 4)
            {
                this.monta_resposta('Ain gente, assim fica difícil! Não consegui entender o que você me pediu <@' + this.obj_mensagem.author.id + '>'
                                   ,v_obj_resposta
                                   );
                return;
            } // if(p_regra.length !== 4)


            if(Number(p_regra[1].trim()) >= 1 && Number(p_regra[1].trim()) <= 175)
            {
                v_nivel_inicial = Number(p_regra[1].trim());
            } // if(Number(p_regra[1]) >= 1 && Number(p_regra[1]) <= 175)
            else
            {
                this.monta_resposta('<@' + this.obj_mensagem.author.id + '> acho que você não entendeu os requisitos.'
                                   ,v_obj_resposta
                                   );
                return;
            } // else { ... }

            // Verifica se o valor está entre o range esperado
            if(Number(p_regra[2].trim()) >= 1 && Number(p_regra[2].trim()) <= 175 && v_nivel_inicial <= Number(p_regra[2].trim()))
            {
                v_nivel_final = Number(p_regra[2].trim());
            } // if(Number(p_regra[2]) >= 1 && Number(p_regra[2]) <= 175 && v_nivel_inicial <= Number(p_regra[2]))
            else
            {
                this.monta_resposta('O nível inicial que você citou <@' + this.obj_mensagem.author.id + '> é maior que o nível final! Como pode?'
                                  ,v_obj_resposta
                                  );
                return;
            } // else { ... }

            if(p_regra[3].trim() === 'null' || p_regra[3].trim() === null || p_regra[3].trim() === 'undefined')
            {
                this.monta_resposta('Me diz, <@' + this.obj_mensagem.author.id + '> como a Kafrinha aqui pode te ajudar se você não colabora? Cadê o mapinha?!'
                                    ,v_obj_resposta
                                    );
                return;
            } // if(p_regra[3].trim() === 'null' || p_regra[3].trim() === null || p_regra[3].trim() === 'undefined')
            else
            {
                v_mapa      =   p_regra[3].trim();
            } // else { ... }


            v_resultado     = this.obj_database.monta_grupo(this.obj_mensagem.author.id, this.obj_mensagem.channl_id, v_nivel_inicial, v_nivel_final, v_mapa);

            if(v_resultado === 1)
            {
                v_obj_resposta  =   {
                                        'embed' :   {
                                                        color               :   this.obj_configuracao.cor_verde.color
                                                       ,author              :   {
                                                                                    name        :   'Kafra Moderadora'
                                                                                   ,icone       :   'https://i.imgur.com/cfYwkLQ.png'
                                                                                   ,url         :   'https://github.com/bropedia/Kafra-Moderadora'
                                                                                }
                                                       ,title               :   'Cadastro realizado com sucesso!'
                                                       ,url                 :   null
                                                       ,description         :   'Olá ' +  this.obj_mensagem.author.username + ' seu grupo foi cadastrado com sucesso!'
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
                                                                                       ,value   :   'Mapa: ' + v_mapa + '\nNível Inicial: ' + v_nivel_inicial + '\nNível Final: ' + v_nivel_final
                                                                                    }
                                                                                ]
                                                      ,timestamp            :   new Date()
                                                      ,footer               :   {
                                                                                    icon_url:   'https://i.imgur.com/cfYwkLQ.png'
                                                                                   ,text:       '© bROPédia - Por MBrauna e Lazarento'
                                                                                }
                                                    }
                                    };
            }
            else
            {
                v_obj_resposta  =   {
                                        'embed' :   {
                                                        color               :   this.obj_configuracao.cor_vermelha.color
                                                       ,author              :   {
                                                                                    name        :   'Kafra Moderadora'
                                                                                   ,icone       :   'https://i.imgur.com/cfYwkLQ.png'
                                                                                   ,url         :   'https://github.com/bropedia/Kafra-Moderadora'
                                                                                }
                                                       ,title               :   'ERRO DURANTE O CADASTRO'
                                                       ,url                 :   null
                                                       ,description         :   'Olá ' +  this.obj_mensagem.author.username + ' seu grupo não pode ser criado!'
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
                                                                                       ,value   :   'Mapa: ' + v_mapa + '\nNível Inicial: ' + v_nivel_inicial + '\nNível Final: ' + v_nivel_final
                                                                                    }
                                                                                ]
                                                      ,timestamp            :   new Date()
                                                      ,footer               :   {
                                                                                    icon_url:   'https://i.imgur.com/cfYwkLQ.png'
                                                                                   ,text:       '© bROPédia - Por MBrauna e Lazarento'
                                                                                }
                                                    }
                                    };
            }

            this.monta_resposta('<@' + this.obj_mensagem.author.id + '> seu grupo foi cadastrado com sucesso.'
                                ,v_obj_resposta
                                );
            return;
        } // try { ... }
        catch(p_erro)
        {
            v_obj_resposta  =   {
                                    'embed' :   {
                                                    color               :   this.obj_configuracao.cor_vermelha.color
                                                   ,author              :   {
                                                                                name        :   'Kafra Moderadora'
                                                                               ,icone       :   'https://i.imgur.com/cfYwkLQ.png'
                                                                               ,url         :   'https://github.com/bropedia/Kafra-Moderadora'
                                                                            }
                                                   ,title               :   'PELO AMOR DO FINADO ODIN'
                                                   ,url                 :   'https://i.imgur.com/cfYwkLQ.png'
                                                   ,description         :   'Surgiu um erro que eu jamais previ! Vou reportar.'
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
                                                                                    name    :   'CACETADA! Ocorreu um pequeno erro'
                                                                                   ,value   :   'Durante a criação do grupo, infelizemnte meu sisteminha apresentou um problema, seu grupo não foi criado'
                                                                                }
                                                                            ]
                                                  ,timestamp            :   new Date()
                                                  ,footer               :   {
                                                                                icon_url:   'https://i.imgur.com/cfYwkLQ.png'
                                                                               ,text:       '© bROPédia - Por MBrauna e Lazarento'
                                                                            }
                                                }
                                };

            this.monta_resposta('<@' + this.obj_mensagem.author.id + '> erro ao cadastrar grupo'
                                ,v_obj_resposta
                                );
            return;
        } // catch(p_erro) { ... }
    } // monta_grupo(p_regra)
} // class grupo_ragnarok

// Torna o método público
module.exports = grupo_ragnarok;