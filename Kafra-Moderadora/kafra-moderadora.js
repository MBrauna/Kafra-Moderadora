/****************************************************************************************************
 * Autor: Michel Brauna                                                            Data: 16/02/2018 *
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
 *                           Classe principal para o bot Kafra Moderadora                           *
 *                                                                                                  *
 *      Classe responsável por inicializar a inteligência de Kafra Moderadora, assim como a REST de *
 * Discord.js para integração com o sistema https://discordapp.com, tendo sua API disponibilizada   *
 * através de https://discordapp.com.                                                               *
 *      Todas as funcionalidades serão tratadas à partir desta classe, tendo suas chamadas apontadas*
 * de acordo com a necessidade sugerida pelo usuário.                                               *
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


// Inicialização de bibliotecas                                 (∩｀-´)⊃━☆ﾟ.*･｡ﾟ
const bib_discord                   =   require('discord.js');
// Fim - Inicialização de bibliotecas                           (∩｀-´)⊃━☆ﾟ.*･｡ﾟ


class Kafra_moderadora
{
    // Método construtor      ¯\_(⊙︿⊙)_/¯
    constructor(p_token_discord)
    {
        /************************************************************************
         * Autor: Michel Brauna                                Data: 17/02/2018 *
         *                                                                      *
         * Método responsável por inicializar o CórteX e armazenar virtualmente *
         * todos os tokens de acesso.                                           *
         *                                                                      *
         ************************************************************************/

        // Salva virtualmente - protected - os dados do token
        this.v_token_discord        =   p_token_discord;
        // FIM - Salva virtualmente - protected - os dados do token

        // Instancia uma nova sessão para o acesso ao bot
        this.init_kafra_moderadora   =   new bib_discord.Client();
        //FIM - Instancia uma nova sessão para o acesso ao bot


        // Carrega evento
        this.fn_carrega_evento();
        // Fim - Carrega evento


        // Inicializa o construtor
        this.init_kafra_moderadora.login(this.v_token_discord);
        // Inicializa o construtor
    }   // Método construtor      ¯\_(⊙︿⊙)_/¯



    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ




    fn_carrega_evento()
    {
        /************************************************************************
         * Autor: Michel Brauna                                Data: 17/02/2018 *
         *                                                                      *
         *         INICIALIZA OS EVENTOS DE POOLING PARA AS BIBLIOTECAS         *
         ************************************************************************/

        /*********************************
         *  >> >>  D I S C O R D   << << *
         *********************************/
        // PARA EVENTO DO TIPO - BOT PREPARADO
        this.init_kafra_moderadora.on("ready",         () =>
                                                    {
                                                        console.log('teste');
                                                    }
                                );
        // PARA EVENTO DO TIPO - BOT PREPARADO

        // PARA EVENTO DO TIPO - BOT ENTROU NO CANAL
        this.init_kafra_moderadora.on("guildCreate",   grupo =>
                                                    {
                                                        console.log('teste');
                                                    }
                                );
        // PARA EVENTO DO TIPO - BOT ENTROU NO CANAL

        // PARA EVENTO DO TIPO - BOT SAIU DO CANAL
        this.init_kafra_moderadora.on("guildDelete",   grupo =>
                                                    {
                                                        console.log('teste');
                                                    }
                                );
        // PARA EVENTO DO TIPO - BOT SAIU DO CANAL

        // PARA EVENTO DO TIPO TEXTO
        this.init_kafra_moderadora.on("message",       async mensagem =>
                                                    {
                                                        console.log('teste');
                                                    }
                                );
        // PARA EVENTO DO TIPO TEXTO




        // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ

    }   // fn_carrega_evento()

}   // CLASS KAFRA_MODERADORA

// Torna o método público
module.exports = Kafra_moderadora;