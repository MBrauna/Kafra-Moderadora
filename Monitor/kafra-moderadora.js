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
       ;
// Inicialização de bibliotecas                                 (∩｀-´)⊃━☆ﾟ.*･｡ﾟ




class Monitor
{
    constructor(p_token_discord                 // Token do bot - ver arquivo .env
               ,p_token_braunabot               // Token do chatbot BraunaBot - ver arquivo .env
               ,p_usuario_braunabot             // Usuário do chatbot BraunaBot - ver arquivo .env
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
        this.pgb_token_braunabot        =   p_token_braunabot;          // Token do chatbot BraunaBot - ver arquivo .env
        this.pgb_usuario_braunabot      =   p_usuario_braunabot;        // Usuário do chatbot BraunaBot - ver arquivo .env

        // Carrega eventos e seus métodos
        this.evento_auto();
    } // constructor(p_bib_discord,p_token_discord,p_token_braunabot,p_usuario_braunabot)



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
                console.log('---- ready ----');
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
            */

            // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

            /*
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

} // class Monitor

// Torna o método público - Acesso externo é permitido.
module.exports = Monitor;
