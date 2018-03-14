/****************************************************************************************************
 * Autor: Michel Brauna                                                            Data: 16/02/2018 *
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
       ,bib_kafra_moderadora        =   require('./Monitor/kafra-moderadora.js')            // Inicializa a biblioteca de funcionalidades Kafra Moderadora
       ;
// Inicialização de bibliotecas                                 (∩｀-´)⊃━☆ﾟ.*･｡ﾟ

// ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

// Coleta de variáveis de ambiente                              （ ^_^）o自  自o（^_^ ）
let     v_token_discord             =   process.env.BOT_TOKEN_DISCORD
       ,v_token_braunabot           =   process.env.BOT_TOKEN_BRAUNABOT
       ,v_usuario_braunabot         =   process.env.BOT_USUARIO_BRAUNABOT
       ;
// Coleta de variáveis de ambiente                              （ ^_^）o自  自o（^_^ ）

// ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

// Método construtor - Inicialização do processo                (╬ ಠ益ಠ)
const init_kafra_moderadora         =   new bib_kafra_moderadora(bib_discord                    // Biblioteca para Discord - Instanciada fora do processo
                                                                ,v_token_discord                // Token do bot - ver arquivo .env
                                                                ,v_token_braunabot              // Token do chatbot BraunaBot - ver arquivo .env
                                                                ,v_usuario_braunabot            // Usuário do chatbot BraunaBot - ver arquivo .env
                                                                ); // new bib_kafra_moderadora
// Método construtor - Inicialização do processo                (╬ ಠ益ಠ)