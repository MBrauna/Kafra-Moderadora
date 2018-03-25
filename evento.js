/****************************************************************************************************
 * Autor: Michel Brauna                                                            Data: 13/03/2018 *
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
 ****************************************************************************************************/

// Inicialização de bibliotecas                                 (∩｀-´)⊃━☆ﾟ.*･｡ﾟ
let     bib_discord                 =   require('discord.js')                               // Inicializa a biblioteca para Discord
        bib_requisicao              =   require('request')
       ;
// Inicialização de bibliotecas                                 (∩｀-´)⊃━☆ﾟ.*･｡ﾟ




class Monitor
{
    constructor(p_token_discord                // Token do bot - ver arquivo .env
               ,p_token_kafra                  // Token de acesso para Kafra Moderadora.
               )
    {
        /************************************************************************
         * Autor: Michel Brauna                                Data: 13/03/2018 *
         *                                                                      *
         *   Método construtor para a classe Monitor, através dele a biblioteca *
         * discord será inicializada e os dados padrões de configuração do servi*
         * dor carregados.                                                      *
         ************************************************************************/

        this.init_discord               =   new bib_discord.Client();   // Marca a instância do cliente Discord

        this.pgb_token_discord          =   p_token_discord;            // Token do bot - ver arquivo .env
        this.pgb_token_kafra            =   p_token_kafra;              // Token de acesso para Kafra Moderadora.

        // Carrega eventos e seus métodos
        this.evento_auto();
        this.evento_usuario();
        this.evento_servidor();

        this.init_discord.login(this.pgb_token_discord);
    } // constructor(p_bib_discord,p_token_discord,p_token_braunabot,p_usuario_braunabot)


    realiza_requisicao(p_tipo ,p_objeto_1 ,p_objeto_2 ,p_objeto_3)
    {
        let v_url_requisicao        =   process.env.url_requisicao + '/' + p_tipo
           ,v_corpo_requisicao      =   {
                                            'tipo'          :   p_tipo
                                           ,'cliente'       :   this.init_discord
                                           ,'objeto_1'      :   p_objeto_1
                                           ,'objeto_2'      :   p_objeto_2
                                           ,'objeto_3'      :   p_objeto_3
                                        }
           ,v_data_info_url         =   {
                                            'url'           :   v_url_requisicao
                                           ,'json'          :   true
                                           ,'body'          :   v_corpo_requisicao
                                        }
           ;

        try
        {
            bib_requisicao.post(v_data_info_url, (p_erro, p_resposta, p_corpo) =>
            {
                // Verifica se o objeto de retorno é indefinido.
                if(typeof p_corpo === 'undefined')
                {
                    // Finaliza o procedimento
                    console.log('Indefinido.');
                    return 9;
                } // if(typeof p_corpo === 'undefined')
                else if(p_corpo === 1)
                {
                  console.log('Deu certo');
                  return 1;
                }
                else
                {
                  console.log('Erro');
                  return 9;
                }
            });

        } // try { ... }
        catch(p_erro)
        {
            v_retorno     =     {
                                    'embed' :   {
                                                    color               :   0xff0000
                                                   ,author              :   {
                                                                                name        :   'Kafra Moderadora'
                                                                               ,icone       :   'https://i.imgur.com/cfYwkLQ.png'
                                                                               ,url         :   'http://kafra.mbrauna.org'
                                                                            }
                                                   ,title               :   '[ERRO] - Erro no procedimento'
                                                   ,url                 :   null
                                                   ,description         :   'Ocorreu um erro no procedimento de requisição aos servidores mbrauna.org'
                                                   ,'image'             :   {
                                                                                "url"       :   null
                                                                               ,"height"    :   null // 123
                                                                               ,"width"     :   null // 123
                                                                            }
                                                   ,thumbnail           :   {
                                                                                "url"       :   'https://i.imgur.com/LOGICNS.jpg'
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
                                                                                    name: 'Erro no procedimento'
                                                                                   ,value: 'Não foi possível responder a requisição corretamente! Contate o Brauna'
                                                                                }
                                                                            ]
                                                  ,timestamp            :   new Date()
                                                  ,footer               :   {
                                                                                icon_url:   'https://i.imgur.com/cfYwkLQ.png'
                                                                               ,text:       '© bROPédia - Por MBrauna'
                                                                            }
                                                }
                                };

            // Finaliza o procedimento
            console.log('Erro');
            return 9;
        } // catch(p_erro) { ... }
    } // realiza_requisicao(p_tipo ,p_objeto_1 ,p_objeto_2 ,p_objeto_3)

    evento_auto()
    {
        /************************************************************************
         * Autor: Michel Brauna                                Data: 14/03/2018 *
         *                                                                      *
         *   Método para tratativa de todos os eventos à nível do bot.          *
         ************************************************************************/
        try
        {
            this.init_discord.on('disconnect', (mensagem) =>
            {

                console.log('---- disconnect ----');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('ready', () =>
            {
                this.init_discord.user.setActivity('Ragnarök Online');
                // Quando inicializado.
                console.log(this.realiza_requisicao('inicia',null,null,null));
                
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('reconnecting', () =>
            {
                console.log('---- reconnecting ----');
            });

             // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            /*
            this.init_discord.on('resume', () =>
            {

            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('debug', (informacao) =>
            {
                console.log('---- debug ----');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('warn', () =>
            {

            });
            */

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('error', (mensagem) =>
            {
                console.log('---- error ----');
            });
        } // try { .. }
        catch(erro)
        {
            console.log(erro);
            console.trace();
        } // catch(erro) { ... }
        
    } // evento_auto()


    evento_usuario()
    {
        /************************************************************************
         * Autor: Michel Brauna                                Data: 14/03/2018 *
         *                                                                      *
         *   Método para tratativa de todos os eventos à nível de cliente.      *
         ************************************************************************/

        var v_retorno   =   null;

        try
        {
            this.init_discord.on('clientUserSettingsUpdate', (configuracao) =>
            {
                console.log('---- clientUserSettingsUpdate ----');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('message', (mensagem) =>
            {
                console.log('---- mensagem ----');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('messageDelete', (mensagem) =>
            {
                console.log('---- messageDelete ----');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('messageDeleteBulk', (mensagem) =>
            {
                console.log('---- messageDeleteBulk ----');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('messageReactionAdd', (mensagem, usuario) =>
            {
                console.log('---- messageReactionAdd ----');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('messageReactionRemove', (mensagem, usuario) =>
            {
                console.log('---- messageReactionRemove ----');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('messageReactionRemoveAll', (mensagem) =>
            {
                console.log('---- messageReactionRemoveAll ----');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('messageUpdate', (mensagem_antiga, mensagem_atual) =>
            {
                console.log('---- messageUpdate ----');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('typingStart', (canal, usuario) =>
            {
                console.log('---- typingStart ----');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('typingStop', (canal, usuario) =>
            {
                console.log('---- typingStop ----');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('userNoteUpdate', (usuario, nota_antiga, nota_atual) =>
            {
                console.log('---- userNoteUpdate ----');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('userUpdate', (usuario_antigo, usuario_novo) =>
            {
                console.log('---- userUpdate ----');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('voiceStateUpdate', (usuario_antigo, usuario_novo) =>
            {
                console.log('---- voiceStateUpdate ----');
            });
        } // try { .. }
        catch(erro)
        {
            console.log(erro);
            console.trace();
        } // catch(erro) { ... }
    } // evento_usuario()


    evento_servidor()
    {
        /************************************************************************
         * Autor: Michel Brauna                                Data: 14/03/2018 *
         *                                                                      *
         *   Método para tratativa de todos os eventos à nível de cliente.      *
         ************************************************************************/
        try
        {
            this.init_discord.on('channelCreate', (canal) =>
            {
                console.log('---- channelCreate ----');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('channelDelete', (canal) =>
            {
                console.log('---- channelDelete ----');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('channelPinsUpdate', (canal, data_pin) =>
            {
                console.log('---- channelPinsUpdate ----');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('channelUpdate', (canal_antigo, canal_novo) =>
            {
                console.log('---- channelUpdate ----');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('clientUserGuildSettingsUpdate', (configuracao) =>
            {
                console.log('---- clientUserGuildSettingsUpdate ----');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('emojiCreate', (emoticon) =>
            {
                console.log('---- emojiCreate ----');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('emojiDelete', (emoticon) =>
            {
                console.log('---- emojiDelete ----');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('emojiUpdate', (emoticon_antigo, emoticon_novo) =>
            {
                console.log('---- emojiUpdate ----');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('guildBanAdd', (canal, usuario) =>
            {
                console.log('---- guildBanAdd ----');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('guildBanRemove', (canal, usuario) =>
            {
                console.log('---- guildBanRemove ----');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('guildCreate', (canal) =>
            {
                console.log('---- guildCreate ----');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('guildDelete', (canal) =>
            {
                console.log('---- guildDelete ----');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('guildMemberAdd', (usuario_canal) =>
            {
                console.log('---- guildMemberAdd ----');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('guildMemberAvailable', (usuario_canal) =>
            {
                console.log('---- guildMemberAvailable ----');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('guildMemberRemove', (usuario_canal) =>
            {
                console.log('---- guildMemberRemove ----');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('guildMembersChunk', (membro, canal) =>
            {
                console.log('---- guildMembersChunk ----');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('guildMemberSpeaking', (membro, fala) =>
            {
                console.log('---- guildMemberSpeaking ----');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('guildMemberUpdate', (usuario_antigo, usuario_novo) =>
            {
                console.log('---- guildMemberUpdate ----');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('guildUnavailable', (canal) =>
            {
                console.log('---- guildUnavailable ----');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('guildUpdate', (canal_antigo, canal_novo) =>
            {
                console.log('---- guildUpdate ----');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('presenceUpdate', (usuario_antigo, usuario_atual) =>
            {
                console.log('---- presenceUpdate ----');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('roleCreate', (regra) =>
            {
                console.log('---- roleCreate ----');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('roleDelete', (regra) =>
            {
                console.log('---- roleDelete ----');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('roleUpdate', (regra_antiga, regra_nova) =>
            {
                console.log('---- roleUpdate ----');
            });

        } // try { .. }
        catch(erro)
        {
            console.log(erro);
            console.trace();
        } // catch(erro) { ... }
    } // evento_servidor()

} // class Monitor

// Torna o método público - Acesso externo é permitido.
module.exports = Monitor;