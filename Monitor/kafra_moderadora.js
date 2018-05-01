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
       ,bib_inicializacao           =   require('./Sistema/Sistema.js')
       ,bib_mensagem                =   require('./Usuario/mensagem.js')
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

        this.pgb_token_discord          =   p_token_discord;            // Token do bot - ver arquivo .env
        this.pgb_token_kafra            =   p_token_kafra;              // Token de acesso para Kafra Moderadora.


        // Discord
        this.init_discord               =   new bib_discord.Client();   // Marca a instância do cliente Discord

        // Carrega eventos e seus métodos
        this.monitor_sistema();
        this.monitor_usuario();
        this.monitor_servidor();

        this.init_discord.login(this.pgb_token_discord);
    } // constructor(p_bib_discord,p_token_discord,p_token_braunabot,p_usuario_braunabot)

    monitor_sistema()
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
                // Método para marcação de dados para desconexão

                console.log('O cliente - DISCORD - foi encerrado! Verifique.');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('ready', () =>
            {
                this.init_discord.user.setActivity('Ragnarök Online');

                console.log('O cliente - DISCORD - foi iniciado! Verifique.');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('reconnecting', () =>
            {
                console.log('O cliente - DISCORD - está reconectando! Verifique.');
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

                console.log('O cliente - DISCORD - apresentou erro! Verifique.');
            });
        } // try { .. }
        catch(erro)
        {
            console.log(erro);
            console.trace();
        } // catch(erro) { ... }
        
    } // monitor_sistema()


    monitor_usuario()
    {
        /************************************************************************
         * Autor: Michel Brauna                                Data: 14/03/2018 *
         *                                                                      *
         *   Método para tratativa de todos os eventos à nível de cliente.      *
         ************************************************************************/

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
    } // monitor_usuario()


    monitor_servidor()
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

                console.log('O cliente - DISCORD - identificou que um canal foi criado! Verifique.');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('channelDelete', (canal) =>
            {

                console.log('O cliente - DISCORD - identificou que um canal foi removido! Verifique.');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('channelPinsUpdate', (canal, data_pin) =>
            {
                console.log('---- channelPinsUpdate ----');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('channelUpdate', (canal_antigo, canal_novo) =>
            {

                console.log('O cliente - DISCORD - identificou que um canal foi alterado! Verifique.');
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

                console.log('O cliente - DISCORD - identificou que um servidor foi criado! Verifique.');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('guildDelete', (canal) =>
            {

                console.log('O cliente - DISCORD - identificou que um servidor foi removido! Verifique.');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('guildMemberAdd', (usuario_canal) =>
            {

                console.log('O cliente - DISCORD - identificou que um usuário foi criado! Verifique.');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('guildMemberAvailable', (usuario_canal) =>
            {
                console.log('---- guildMemberAvailable ----');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('guildMemberRemove', (usuario_canal) =>
            {

                console.log('O cliente - DISCORD - identificou que um usuário foi removido! Verifique.');
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

                console.log('O cliente - DISCORD - identificou que um servidor foi alterado! Verifique.');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('presenceUpdate', (usuario_antigo, usuario_atual) =>
            {
                console.log('---- presenceUpdate ----');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('roleCreate', (regra) =>
            {

                console.log('O cliente - DISCORD - identificou que uma regra foi criada! Verifique.');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('roleDelete', (regra) =>
            {
                console.log('---- roleDelete ----');
            });

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            this.init_discord.on('roleUpdate', (regra_antiga, regra_nova) =>
            {

                console.log('O cliente - DISCORD - identificou que uma regra foi alterada! Verifique.');
            });

        } // try { .. }
        catch(erro)
        {
            console.log(erro);
            console.trace();
        } // catch(erro) { ... }
    } // monitor_servidor()

} // class Monitor

// Torna o método público - Acesso externo é permitido.
module.exports = Monitor;