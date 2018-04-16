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
let  bib_bropedia       =   require('./Pesquisa/bropedia/bropedia.js')
    ,bib_ragnaplace     =   require('./Pesquisa/ragnaplace/ragnaplace.js')
    ,bib_grupo          =   require('./Ragnarok/grupo_ragnarok.js')
    ,bib_requisicao     =   require('request')
    ,bib_url            =   process.env.url_requisicao
    ;
// Inicialização de bibliotecas                                 (∩｀-´)⊃━☆ﾟ.*･｡ﾟ


// Método construtor - Inicialização do processo                (╬ ಠ益ಠ)
// Método construtor - Inicialização do processo                (╬ ಠ益ಠ)

class comando
{
    // Método construtor para COMANDO
    constructor(p_banco_dados)
    {
        // Indica que o procedimento foi inicializado
        this.obj_banco_dados    = p_banco_dados;
    } // Método construtor - construct()

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

    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ

    mensagem_para_array(p_mensagem)
    {
        /***************************************************
         * Autor: Michel Brauna           Data: 16/03/2018 *
         *   Método irá obter a frase gerada e tratá-la de *
         * forma à transformá-la numa array.               *
         ***************************************************/
        return p_mensagem.content.trim().split(/ +/g);
    } // mensagem_para_array() { ... }

    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

    mensagem_para_array_sprefixo(p_prefixo, p_mensagem)
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
            return p_mensagem.content.slice(v_tamanho_mencao).trim().split(/ +/g);
        } // if(this.verifica_mencao()) { ... }
        else
        {
            // Caso contrário ... nada.
            return [];
        } // else { ... }

    } //  mensagem_para_array_sprefixo(p_prefixo) { ... }

    mencao_bot(p_cliente)
    {
        /***************************************************
         * Autor: Michel Brauna           Data: 16/03/2018 *
         *Retorno: menção direta ao bot.                   *
         ***************************************************/
        return '<@' + p_cliente.user.id + '>';
    } // mencao_bot() { ... }


    verifica_bot(p_mensagem)
    {
        /***************************************************
         * Autor: Michel Brauna           Data: 16/03/2018 *
         * Retornará se o usuário é bot ou não             *
         ***************************************************/
        return p_mensagem.author.bot;
    } // verifica_bot() { ... }

    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ

    verifica_mencao(p_mensagem)
    {
        return  p_mensagem.content.startsWith(this.mencao_bot());
    } // verifica_mencao() { ... }


    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ

    trata_mensagem(p_cliente, p_mensagem)
    {
        // Declaração de variáveis 
        let  v_str_mencao_kafra         =   '<@' + p_cliente.user.id + '>'
            ,v_str_mencao_usuario       =   '<@' + p_mensagem.author.id + '>'
            ,v_bol_chamada              =   p_mensagem.content.startsWith(v_str_mencao_kafra)
            ,v_obj_mensagem_s_prefixo   =   [] // p_mensagem.content.slice(v_str_mencao_kafra.length).trim().split(/ +/g)
            v_obj_corpo                 =   {}
           ,v_obj_requisicao            =   {}
            ,v_string_requisicao
            ;

        // Monitora todo tipo de erro que porventura venha surgir no  tratamento das chamadas
        try
        {
            // Verifica se a mensagem enviada foi de um bot ou usuário
            if(p_mensagem.author.bot) return; // Caso seja de um bot finaliza a verificação

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ
            
            try
            {
                // Inicia a criação do corpo
                v_obj_requisicao        =   {
                                                autor               :   p_mensagem.author
                                               ,bot                 :   this.verifica_bot(p_mensagem)
                                               ,canal               :   p_mensagem.channel
                                               ,tts                 :   p_mensagem.tts
                                               ,id                  :   p_mensagem.id
                                               ,conteudo            :   p_mensagem.content
                                               ,conteudo_array      :   this.mensagem_para_array(p_mensagem)
                                               ,usa_comando         :   this.verifica_mencao(p_mensagem)
                                               ,conteudo_comando    :   this.mensagem_para_array_sprefixo(this.mencao_bot(p_cliente),p_mensagem)
                                            };

                v_obj_requisicao        =   {
                                                'url'           :   bib_url + 'mensagem'
                                               ,'json'          :   true
                                               ,'body'          :   v_obj_requisicao
                                               ,'headers'       :   {
                                                                        'Authorization'     :   process.env.TOKEN_AUTORIZACAO
                                                                    }
                                            };

                // Comunica com o servidor
                this.comunica_portal(v_obj_requisicao, (p_erro, p_resposta, p_corpo) =>
                {
                    console.log(p_corpo);
                }); // this.comunica_portal(v_obj_requisicao, (p_erro, p_resposta, p_corpo) =>
            } // try { ... }
            catch($p_erro)
            {
                console.log('Não foi possível salvar! Informações');
            } // catch($p_erro) { ... }
           
            

            // Verifica se a mensagem foi iniciada com uma menção à Kafra Moderadora
            if(v_bol_chamada)
            {
                // Iniciliaza os dados padrões para referenciamento
                this.carrega_padrao(p_cliente);

                // Clona o objeto de mensagem padrão para modificações conforme necessário
                var obj_msg_tmp     =   Object.assign({}, this.init_msg_padrao);

                // Coleta os parâmetros dos dados caso exista a string esperada
                v_obj_mensagem_s_prefixo    =   p_mensagem.content.slice(v_str_mencao_kafra.length).trim().split(/ +/g); // Remove o prefixo da string e quebra em array

                if(v_obj_mensagem_s_prefixo.length <= 0)
                {
                    // Prepara a nova mensagem
                    obj_msg_tmp.embed.description   =   'Fui chamada!? Não sou uma ursinha carinhosa (Olha o tamanho do meu banhammer), mas estou aqui para te ajudar.';
                    obj_msg_tmp.embed.fields        =   this.init_msg_funcionalidade;

                    this.monta_resposta(p_cliente
                                       ,p_mensagem
                                       ,'Olá <@' + p_mensagem.author.id + '> estou aqui!'
                                       ,obj_msg_tmp
                                       );
                } // if(v_obj_mensagem_s_prefixo.length <= 0)
                else
                {
                    switch(v_obj_mensagem_s_prefixo[0].toLowerCase())
                    {
                        case 'item':
                            obj_msg_tmp                     =   new bib_ragnaplace(this.init_msg_padrao, this.init_config, p_mensagem, p_cliente).item(v_obj_mensagem_s_prefixo);
                            break;
                        case 'monstro':
                            obj_msg_tmp                     =   new bib_ragnaplace(this.init_msg_padrao, this.init_config, p_mensagem, p_cliente).mob(v_obj_mensagem_s_prefixo);
                            break;
                        case 'mapa':
                            obj_msg_tmp                     =   new bib_ragnaplace(this.init_msg_padrao, this.init_config, p_mensagem, p_cliente).mapa(v_obj_mensagem_s_prefixo);
                            break;
                        case 'wiki':
                            obj_msg_tmp                     =   new bib_bropedia(this.init_msg_padrao, this.init_config, p_mensagem, p_cliente).consultar(v_obj_mensagem_s_prefixo);
                            break;
                        case 'recrutar':
                            obj_msg_tmp                     =   new bib_grupo(this.obj_banco_dados, p_cliente, p_mensagem, this.init_config).monta_grupo(v_obj_mensagem_s_prefixo);
                            break;
                        case 'procurar':
                            obj_msg_tmp                     =   new bib_grupo(this.obj_banco_dados, p_cliente, p_mensagem, this.init_config).consulta_grupo(v_obj_mensagem_s_prefixo);
                            break;
                        case 'grupos':
                            obj_msg_tmp.embed.description   =   'Desculpe pessoinha, mas esta funcionalidade não está disponível no momento.';
                            obj_msg_tmp.embed.fields        =   this.init_msg_dev;

                            this.monta_resposta(p_cliente
                                               ,p_mensagem
                                               ,'Olá <@' + p_mensagem.author.id + '> estou aqui!'
                                               ,obj_msg_tmp
                                               );
                            break;
                        case 'regras':
                            obj_msg_tmp.embed.description   =   'Desculpe pessoinha, mas esta funcionalidade não está disponível no momento.';
                            obj_msg_tmp.embed.fields        =   this.init_msg_dev;

                            this.monta_resposta(p_cliente
                                               ,p_mensagem
                                               ,'Olá <@' + p_mensagem.author.id + '> estou aqui!'
                                               ,obj_msg_tmp
                                               );
                            break;
                        case 'ajuda':
                            obj_msg_tmp.embed.description   =   '**Kafra moderadora** na área, fique tranquilo(a) pois irei te ajudar.';
                            obj_msg_tmp.embed.fields        =   this.init_msg_funcionalidade;

                            this.monta_resposta(p_cliente
                                               ,p_mensagem
                                               ,'E lá vamos nós <@' + p_mensagem.author.id + '>'
                                               ,obj_msg_tmp
                                               );
                            break;
                        case 'bug':
                            obj_msg_tmp.embed.description   =   'Desculpe pessoinha, mas esta funcionalidade não está disponível no momento.';
                            obj_msg_tmp.embed.fields        =   this.init_msg_dev;

                            this.monta_resposta(p_cliente
                                               ,p_mensagem
                                               ,'Olá <@' + p_mensagem.author.id + '> estou aqui!'
                                               ,obj_msg_tmp
                                               );
                            break;
                        default:
                            obj_msg_tmp.embed.description   =   '**Kafra moderadora** na área, fique tranquilo(a) pois irei te ajudar.';
                            obj_msg_tmp.embed.fields        =   this.init_msg_funcionalidade;
                              
                            this.monta_resposta(p_cliente
                                               ,p_mensagem
                                               ,'E lá vamos nós <@' + p_mensagem.author.id + '>'
                                               ,obj_msg_tmp
                                               );
                            break;
                    } // switch(v_obj_mensagem_s_prefixo[0].toLowerCase())
                } // else { .. }
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
                                               ,text:       '© bROPédia - Por MBrauna'
                                            }
                                        }
                                    }
                                );
        } // catch(p_erro) { ... }
    } // trata_mensagem(p_cliente, p_mensagem)


    carrega_padrao(p_cliente)
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
                                                                    color               :   this.init_config.cor_roxa.color
                                                                   ,author              :   {
                                                                                                name        :   'Kafra Moderadora'
                                                                                               ,icon_url    :   'https://i.imgur.com/cfYwkLQ.png'
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
                                                                                                    name    :   'Sabe de uma coisa?'
                                                                                                   ,value   :   'Quer saber mesmo? Adoro vocês, seus lindos.'
                                                                                                }
                                                                                            ]
                                                                  ,timestamp            :   new Date()
                                                                  ,footer               :   {
                                                                                                icon_url:   'https://i.imgur.com/cfYwkLQ.png'
                                                                                               ,text:       '© bROPédia - Por MBrauna'
                                                                                            }
                                                                }
                                                };

        // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ

        this.init_msg_funcionalidade        =   [
                                                    {
                                                        name:   '***@' + p_cliente.user.username + ' <item/monstro/mapa> <nome_desejado/ID>***'
                                                       ,value:  "Este é o maravilhoso comando para realizar consultas de diversos itens, monstros ou até mesmo mapas no melhor database do universo!"
                                                    }
                                                   ,{
                                                        name:   '***@' + p_cliente.user.username + ' wiki <termo_desejado>***'
                                                       ,value:  "Está em dúvida numa missão? Está perdido? Quer conhecer um pouco da história do jogo? Não tem problema, com a Kafra Moderadora não há problema, eu te ajudo."
                                                    }
                                                   ,{
                                                        name:   '[ALPHA] ***@' + p_cliente.user.username + '> recrutar <NIVEL_INICIAL> <NIVEL_FINAL> <MAPA>***'
                                                       ,value:  "A tia kafroronta está louca para te ajudar a ganhar alguns níveis em Ragnarök, que tal deixar eu ajudando a montar seu grupo? Me chame, fale o nível dos personagens que deseja, me diga qual mapa e o resto é comigo."
                                                    }
                                                   ,{
                                                        name:   '[ALPHA] ***@' + p_cliente.user.username + '> procurar <NIVEL_DESEJADO>***'
                                                       ,value:  'Está cansado de procurar em N mapas por grupos?\nPois deixe com a Kafronilda aqui eu me viro para encontrar todos os grupos organizados.'
                                                    }
                                                   ,{
                                                        name:   '***@' + p_cliente.user.username + '> ajuda***'
                                                       ,value:  "CALMA CALMA .... NÃO DESESPERA ... RESPIRAAAAA!!!"
                                                    }
                                                   ,{
                                                        name:   "(ﾉ ＾∇＾)ﾉ"
                                                       ,value:  'Em caso de bugs, não apague o tópico da manutenção, basta chamar: ***@' + p_cliente.user.username + '***.'
                                                    }
                                                ];

        // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ

        this.init_msg_dev                   =   [
                                                    {
                                                        name    :   "Ainda não estou pronta!"
                                                       ,value   :   "Estou passando o blush, ajustando a peruca, logo mais estarei como uma deusa ~~DA DESTRUIÇÃO POIS BANHAMMER NÉ AMIGUINHOS~~."
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
