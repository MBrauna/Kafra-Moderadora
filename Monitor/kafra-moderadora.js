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

class Monitor
{
    constructor(p_bib_discord                   // Biblioteca para Discord - Instanciada fora do processo
               ,p_token_discord                 // Token do bot - ver arquivo .env
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

        this.init_discord               =   new p_discord.Client(); // Marca a instância do cliente Discord
        this.pgb_token_discord          =   p_token_discord;
        this.pgb_token_braunabot        =   p_token_braunabot;
        this.pgb_usuario_braunabot      =   p_usuario_braunabot;

    } // constructor(p_bib_discord,p_token_discord,p_token_braunabot,p_usuario_braunabot)
} // class Monitor

// Torna o método público - Acesso externo é permitido.
module.exports = Monitor;