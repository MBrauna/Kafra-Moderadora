/****************************************************************************************************
 * Autor: Michel Brauna                                                            Data: 21/02/2018 *
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
let  bib_bropedia       =   require('./Pesquisa/bropedia/bropedia.js');
// Inicialização de bibliotecas                                 (∩｀-´)⊃━☆ﾟ.*･｡ﾟ


// Método construtor - Inicialização do processo                (╬ ಠ益ಠ)
// Método construtor - Inicialização do processo                (╬ ಠ益ಠ)

class comando
{
    // Método construtor para COMANDO
    construct()
    {
        // Indica que o procedimento foi inicializado
        console.log('[CLASSE] Comando - Inicializada ');
    } // Método construtor - construct()

    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ

    // Procedimento responsável peló retorno da mensagem em seu formato esperado
    monta_resposta(p_cliente, p_mensagem, p_frase, p_configuracao)
    {
        // Monitora qualquer evento de erro para se executar o cliente
        try
        {
            p_mensagem.channel.send(
                                        p_frase
                                       ,p_configuracao
                                    );
        }
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
        }

    } // monta_resposta(p_cliente, p_mensagem, p_frase, p_configuracao)

    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ

    trata_mensagem(p_cliente, p_mensagem)
    {
        // Declaração de variáveis 
        let  v_str_mencao_kafra         =   '<@' + p_cliente.user.id + '>'
            ,v_str_mencao_usuario       =   '<@' + p_mensagem.author.id + '>'
            ,v_bol_chamada              =   p_mensagem.content.startsWith(v_str_mencao_kafra)
            ,v_obj_mensagem_s_prefixo   =   [] // p_mensagem.content.slice(v_str_mencao_kafra.length).trim().split(/ +/g)
            ,v_string_requisicao
            ;

        // Monitora todo tipo de erro que porventura venha surgir no  tratamento das chamadas
        try
        {
            // Verifica se a mensagem enviada foi de um bot ou usuário
            if(p_mensagem.author.bot) return; // Caso seja de um bot finaliza a verificação

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ

            // Verifica se a mensagem foi iniciada com uma menção à Kafra Moderadora
            if(v_bol_chamada)
            {
                // Iniciliaza os dados padrões para referenciamento
                this.carrega_padrao();

                // Clona o objeto de mensagem padrão para modificações conforme necessário
                var obj_msg_tmp     =   Object.assign({}, this.init_msg_padrao);

                // Coleta os parâmetros dos dados caso exista a string esperada
                v_obj_mensagem_s_prefixo    =   p_mensagem.content.slice(v_str_mencao_kafra.length).trim().split(/ +/g); // Remove o prefixo da string e quebra em array

                if(v_obj_mensagem_s_prefixo.length <= 0)
                {
                    // Prepara a nova mensagem
                    obj_msg_tmp.embed.description   =   'Fui chamada!? Não sou uma ursinha carinhosa (Olha o tamanho do meu banhammer), mas estou aqui para te ajudar.';
                    obj_msg_tmp.embed.fields        =   this.init_msg_funcionalidade;
                } // if(v_obj_mensagem_s_prefixo.length <= 0)
                else
                {
                    switch(v_obj_mensagem_s_prefixo[0].toLowerCase())
                    {
                        case 'item':
                            obj_msg_tmp.embed.description   =   'Desculpe pessoinha, mas esta funcionalidade não está disponível no momento.';
                            obj_msg_tmp.embed.fields        =   this.init_msg_dev;
                            break;
                        case 'monstro':
                            obj_msg_tmp.embed.description   =   'Desculpe pessoinha, mas esta funcionalidade não está disponível no momento.';
                            obj_msg_tmp.embed.fields        =   this.init_msg_dev;
                            break;
                        case 'mapa':
                            obj_msg_tmp.embed.description   =   'Desculpe pessoinha, mas esta funcionalidade não está disponível no momento.';
                            obj_msg_tmp.embed.fields        =   this.init_msg_dev;
                            break;
                        case 'wiki':
                            // Trata a mensagem transformando a array numa string
                            v_string_requisicao = '';
                            for(var i=1;i<v_obj_mensagem_s_prefixo.length;i++)
                            {
                                // Forma a string
                                v_string_requisicao = v_string_requisicao + v_obj_mensagem_s_prefixo[i] + ' ';
                            } // for(var i=1;i<=v_obj_mensagem_s_prefixo.length;i++)
                            obj_msg_tmp                     =   new bib_bropedia().consultar(v_string_requisicao, this.init_msg_padrao, this.init_config);
                            console.log(obj_msg_tmp);
                            break;
                        case 'recrutar':
                            obj_msg_tmp.embed.description   =   'Desculpe pessoinha, mas esta funcionalidade não está disponível no momento.';
                            obj_msg_tmp.embed.fields        =   this.init_msg_dev;
                            break;
                        case 'procurar':
                            obj_msg_tmp.embed.description   =   'Desculpe pessoinha, mas esta funcionalidade não está disponível no momento.';
                            obj_msg_tmp.embed.fields        =   this.init_msg_dev;
                            break;
                        case 'grupos':
                            obj_msg_tmp.embed.description   =   'Desculpe pessoinha, mas esta funcionalidade não está disponível no momento.';
                            obj_msg_tmp.embed.fields        =   this.init_msg_dev;
                            break;
                        case 'regras':
                            obj_msg_tmp.embed.description   =   'Desculpe pessoinha, mas esta funcionalidade não está disponível no momento.';
                            obj_msg_tmp.embed.fields        =   this.init_msg_dev;
                            break;
                        case 'ajuda':
                            obj_msg_tmp.embed.description   =   'Desculpe pessoinha, mas esta funcionalidade não está disponível no momento.';
                            obj_msg_tmp.embed.fields        =   this.init_msg_dev;
                            break;
                        case 'bug':
                            obj_msg_tmp.embed.description   =   'Desculpe pessoinha, mas esta funcionalidade não está disponível no momento.';
                            obj_msg_tmp.embed.fields        =   this.init_msg_dev;
                            break;
                        default:
                            obj_msg_tmp.embed.description   =   'Desculpe pessoinha, mas esta funcionalidade não está disponível no momento.';
                            obj_msg_tmp.embed.fields        =   this.init_msg_funcionalidade;
                            break;
                    } // switch(v_obj_mensagem_s_prefixo[0].toLowerCase())
                } // else { .. }

                // Gera a mensagem
                this.monta_resposta(p_cliente
                                   ,p_mensagem
                                   ,'Olá <@' + p_mensagem.author.id + '> estou aqui!'
                                   ,obj_msg_tmp
                                   );
            } // if(v_bol_chamada)

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ
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

            // Alerta o usuário sobre o erro encontrado
            p_mensagem.channel.send('Cuidadooooooooo deu erro!!!',
                                    {
                                        'embed':
                                        {
                                            color: 0x882d93
                                           ,author:
                                           {
                                                name:       'Kafra Moderadora'
                                               ,icon_url:   'https://i.imgur.com/cfYwkLQ.png'
                                            }
                                           ,title: 'Kafra Moderadora'
                                           ,url: 'http://bropedia.net'
                                           ,description: 'OU MAI GOSH O QUE SERÁ QUE FOI DESSA VEZ?'
                                           ,"image": {"url" : "https://i.imgur.com/LOGICNS.jpg"}
                                           ,fields: [
                                                        {
                                                            name:   "Ocorreu um erro na sua requisição!"
                                                           ,value:  "Infelizmente não pude atender o seu pedido! Mas juro que tentarei na próxima."
                                                        }
                                                    ]
                                           ,timestamp: new Date()
                                           ,footer: {
                                                icon_url:   'https://i.imgur.com/cfYwkLQ.png'
                                               ,text:       '© bROPédia - Por MBrauna e Lazarento'
                                            }
                                        }
                                    }
                                );
        } // catch(p_erro) { ... }
    } // trata_mensagem(p_cliente, p_mensagem)


    carrega_padrao()
    {
        // Define as variáveis de inicialização para os comandos
        this.init_config                    =   {
                                                    cor_roxa        :   {color: 0x882d93 }
                                                   ,cor_vermelha    :   {color: 0xff0000 }
                                                   ,cor_amarela     :   {color: 0xffff00 }
                                                   ,cor_azul        :   {color: 0x0000ff }
                                                   ,cor_verde       :   {color: 0x00ff00 }
                                                };

        // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ

        this.init_msg_padrao                =   {
                                                    'embed' :   {
                                                                    color               :   0x882d93
                                                                   ,author              :   {
                                                                                                name        :   'Kafra Moderadora'
                                                                                               ,icone       :   'https://i.imgur.com/cfYwkLQ.png'
                                                                                               ,url         :   'https://github.com/bropedia/Kafra-Moderadora'
                                                                                            }
                                                                   ,title               :   'Olá pessoal, Kafra Moderadora na área.'
                                                                   ,url                 :   'https://github.com/bropedia/Kafra-Moderadora'
                                                                   ,description         :   '(ﾉ ＾∇＾)ﾉ    TO DE OLHO    (ノ ^o^)ノ'
                                                                   ,'image'             :   {
                                                                                                "url"       :   null // 'https://i.imgur.com/LOGICNS.jpg'
                                                                                               ,"height"    :   null // 123
                                                                                               ,"width"     :   null // 123
                                                                                            }
                                                                   ,thumbnail           :   {
                                                                                                "url"       :   null // 'https://i.imgur.com/LOGICNS.jpg'
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
                                                                                                    name    :   'Sabe de uma coisa?'
                                                                                                   ,value   :   'Quer saber mesmo? Adoro vocês, seus lindos.'
                                                                                                }
                                                                                            ]
                                                                  ,timestamp            :   new Date()
                                                                  ,footer               :   {
                                                                                                icon_url:   'https://i.imgur.com/cfYwkLQ.png'
                                                                                               ,text:       '© bROPédia - Por MBrauna e Lazarento'
                                                                                            }
                                                                }
                                                };

        // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ

        this.init_msg_funcionalidade        =   [
                                                    {
                                                        name:   "@Kafra Moderadora <item/monstro/mapa> <nome_desejado/ID>"
                                                       ,value:  "Este é o maravilhoso comando para realizar consultas de diversos itens, monstros ou até mesmo mapas no melhor database do universo!"
                                                    }
                                                   ,{
                                                        name:   "@Kafra Moderadora wiki <termo_desejado>"
                                                       ,value:  "Está em dúvida numa missão? Está perdido? Quer conhecer um pouco da história do jogo? Não tem problema, com a Kafra Moderadora não há problema, eu te ajudo."
                                                    }
                                                   ,{
                                                        name:   "[ALPHA]@kafra Moderadora recrutar <nivel_inicial> <nivel_final> <mapa_desejado>"
                                                       ,value:  "Por 20 minutos irei organizar seu grupo para que tenha um maravilhoso rendimento dentro do jogo! Basta me chamar."
                                                    }
                                                   ,{
                                                        name:   "[ALPHA] @Kafra Moderadora procurar <nivel_atual>"
                                                       ,value:  "Mãos à obra pessoal! Quer moleza? Senta num poring. Me informe seu nível que irei listar para você todos os grupos ativos para sua faixa de nível."
                                                    }
                                                   ,{
                                                        name:   "[ALPHA] @Kafra Moderadora grupos"
                                                       ,value:  "Veja todos os grupos existentes na face da Terr ... erhh... Rune Midgard que são organizados por moi (Ou seja, euzinha mesmo, com todo meu banhammer e ternura)."
                                                    }
                                                   ,{
                                                        name:   "@Kafra Moderadora regras"
                                                       ,value:  "Tá achando que aqui é bagunça? Está é por fora! Vacila ... que te mostro com quantos banhammer se faz uma canoa."
                                                    }

                                                   ,{
                                                        name:   "@Kafra Moderadora ajuda"
                                                       ,value:  "CALMA CALMA .... NÃO DESESPERA ... RESPIRAAAAA!!!"
                                                    }
                                                   ,{
                                                        name:   "(ﾉ ＾∇＾)ﾉ"
                                                       ,value:  "Em caso de bugs, não apague o tópico da manutenção, basta chamar: @Kafra Moderadora bug"
                                                    }
                                                ];

        // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ

        this.init_msg_dev                   =   [
                                                    {
                                                        name    :   "Calma ai!"
                                                       ,value   :   "Ainda não estou pronta!"
                                                    }
                                                ];

        // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ

        this.init_msg_erro                  =   [
                                                    {
                                                        name    :   "Gente essa foi pior que apagar tópico de manutenção! ):"
                                                       ,value   :   "Que vexame causei! Desculpe não consegui entender sua requisição."
                                                    }
                                                ];
    }  // carrega_padrao()
} // class comando ༼ つ ◕_◕ ༽つ


// Torna o método público
module.exports = comando;
