/********************************************************************************
 * Autor: Michel Brauna                                        Data: 16/02/2018 *
 *                                                                              *
 *                  ------------------------------------------                  *
 *             _________                __         ____  ___                    *
 *             \_   ___ \  ____________/  |_  ____ \   \/  /                    *
 *             /    \  \/ /  _ \_  __ \   __\/ __ \ \     /                     *
 *             \     \___(  <_> )  | \/|  | \  ___/ /     \                     *
 *              \______  /\____/|__|   |__|  \___  >___/\  \                    *
 *                     \/                        \/      \_/                    *
 *                                                                              *
 *                  ------------------------------------------                  *
 *                                                                              *
 *   Procedimento inicial responsável pela inicialização de todas as funcionali-*
 * dades para CórteX. Para toda ação do bot, um evento irá ser executado, quer  *
 * seja um dependente de informação externa ou não.                             *
 *   CorteX possuirá uma inteligência artificial para determinar as melhores op-*
 * ções nas respostas criadas ou quiçá nas buscas.                              *
 *                                                                              *
 *                  ------------------------------------------                  *
 *             _________                __         ____  ___                    *
 *             \_   ___ \  ____________/  |_  ____ \   \/  /                    *
 *             /    \  \/ /  _ \_  __ \   __\/ __ \ \     /                     *
 *             \     \___(  <_> )  | \/|  | \  ___/ /     \                     *
 *              \______  /\____/|__|   |__|  \___  >___/\  \                    *
 *                     \/                        \/      \_/                    *
 *                                                                              *
 *                  ------------------------------------------                  *
 *                                                                              *
 ********************************************************************************/


// Inicialização de bibliotecas                                 (∩｀-´)⊃━☆ﾟ.*･｡ﾟ
const bib_cortex                  =   require('./CorteX/CorteX.js');
// Fim - Inicialização de bibliotecas                           (∩｀-´)⊃━☆ﾟ.*･｡ﾟ



// ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 



// Inicialização das variáveis de ambiente                      （ ^_^）o自  自o（^_^ ）

// Tokens
let v_token_discord             =   process.env.BOT_TOKEN_DISCORD
   ,v_token_telegram            =   process.env.BOT_TOKEN_TELEGRAM
   ;

// Fim - Inicialização das variáveis de ambiente                （ ^_^）o自  自o（^_^ ）



// ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 



// Método construtor - Inicialização do processo                (╬ ಠ益ಠ)
const init_CorteX                 =   new bib_cortex(v_token_discord
                                                    ,v_token_telegram
                                                    ); 
// FIM - Método construtor - Inicialização do processo          (╬ ಠ益ಠ)