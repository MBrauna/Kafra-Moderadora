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
 *                         CLASSE PRINCIPAL PARA CÓRTEX                         *
 *  Responsável por "ouvir" as portas necessárias para execução das bibliotecas *
 *assim como armazenar e deliberadamente através de sua A.I. decidir qual a     *
 *melhor funcionalidade para aquela ação.                                       *
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
let bib_discord                     =   require('discord.js')
   ,bib_telegram                    =   require('telegraf');
// Fim - Inicialização de bibliotecas                           (∩｀-´)⊃━☆ﾟ.*･｡ﾟ


class CorteX
{
    // Método construtor      ¯\_(⊙︿⊙)_/¯
    constructor(p_token_discord
               ,p_token_telegram
               )
    {
        /************************************************************************
         * Método responsável por inicializar o CórteX e armazenar virtualmente *
         * todos os tokens de acesso.                                           *
         ************************************************************************/

        // Salva virtualmente - protected - os dados do token
        this.v_token_discord        =   p_token_discord;
        this.v_token_telegram       =   p_token_telegram;
        // FIM - Salva virtualmente - protected - os dados do token

        // Instancia uma nova sessão para o acesso ao bot
        this.bib_cortex_discord     =   new bib_discord.Client();
        this.bib_cortex_telegram    =   new bib_cortex_telegram(this.v_token_telegram);
        //FIM - Instancia uma nova sessão para o acesso ao bot
    }   // Método construtor      ¯\_(⊙︿⊙)_/¯



    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

    inicializa()
    {
        /************************************************************************
         *   Método responsável por inicializar as bibliotecas mediante token e *
         * conforme eventos pré-definidos disparar trigger.                     *
         ************************************************************************/


    }   // inicializa()
}   // CLASS CORTEX

// Torna o método público
module.exports = bropediaBot;