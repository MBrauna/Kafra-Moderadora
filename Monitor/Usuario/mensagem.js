/****************************************************************************************************
 * Autor: Michel Brauna                                                            Data: 15/03/2018 *
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
 ****************************************************************************************************
 *                                 OBJETO DE RETORNO DA MENSAGEM                                    *
 ****************************************************************************************************
 ****************************************************************************************************/

class mensagem
{
    constructor(p_cliente, p_mensagem)
    {
        /*********************************************************************
         * Autor: Michel Brauna                             Data: 16/03/2018 *
         *                                                                   *
         *        Método construtor para classe mensagem, para todo, os dados*
         * do cliente Discord e do objeto de mensagem recebido serão armaze- *
         * nados para tratativa.                                             *
         *********************************************************************/
        this.obj_cliente    =   p_cliente;
        this.obj_mensagem   =   p_mensagem;
    } // constructor(p_cliente, p_mensagem) { ... }

    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

    /***********************************
     * Métodos internos para mensagens *
     ***********************************/
    mensagem_para_array()
    {
        /***************************************************
         * Autor: Michel Brauna           Data: 16/03/2018 *
         *   Método irá obter a frase gerada e tratá-la de *
         * forma à transformá-la numa array.               *
         ***************************************************/
        return this.obj_mensagem.content.trim().split(/ +/g);
    } // mensagem_para_array() { ... }

    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

    mensagem_para_array_sprefixo(p_prefixo)
    {
        /***************************************************
         * Autor: Michel Brauna           Data: 16/03/2018 *
         *   Método irá obter a frase gerada e tratá-la de *
         * forma à transformá-la numa array sem o prefixo  *
         ***************************************************/
        var v_tamanho_mencao            =   p_prefixo.length;
        return this.obj_mensagem.content.slice(v_tamanho_mencao).trim().split(/ +/g);
    } //  mensagem_para_array_sprefixo(p_prefixo) { ... }

    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

    mencao_bot()
    {
        /***************************************************
         * Autor: Michel Brauna           Data: 16/03/2018 *
         *Retorno: menção direta ao bot.                   *
         ***************************************************/
        return '<@' + this.obj_cliente.user.id + '>';
    } // mencao_bot() { ... }

    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

    mencao_autor()
    {
        /***************************************************
         * Autor: Michel Brauna           Data: 16/03/2018 *
         *Retorno: menção direta ao autor da mensagem.     *
         ***************************************************/
        return '<@' + this.obj_mensagem.author.id + '>';
    } // mencao_autor() { ... }

    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ

    verifica_bot()
    {
        /***************************************************
         * Autor: Michel Brauna           Data: 16/03/2018 *
         * Retornará se o usuário é bot ou não             *
         ***************************************************/
        return this.obj_mensagem.author.bot;
    } // verifica_bot() { ... }

    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ

    verifica_mencao()
    {
        return  this.obj_mensagem.content.startsWith(this.mencao_bot());
    } // verifica_mencao() { ... }

    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

    /***********************************
     * Métodos internos para mensagens *
     ***********************************/
    trata_mensagem()
    {
        // Verifica se o método foi chamado à partir de uma mensagem de bot
        if(this.verifica_bot()) return; // Caso tenha sido chamado por um bot, nada será realizado.

        // Verifica se a mensagem inicia com uma chamada para o bot (menção direta)
        if(this.verifica_mencao())
        {
            var tmp_comando     =   this.mensagem_para_array_sprefixo(this.mencao_bot);

            // Verifica se a variável realmente foi encontrada, caso não tenha informação - Encerra
            if(typeof tmp_comando[0] === 'undefined' || tmp_comando[0].trim() === 'null' || tmp_comando[0].trim() === null || tmp_comando[0].trim() === undefined || tmp_comando[0].trim() === 'undefined' || tmp_comando[0].trim() === '') return;

            // Verifica se uma das funcionalidades abaixo foi solicitada
            switch(tmp_comando[0].toLowerCase())
            {
                // Comandos de consulta de informações
                case 'item':        // item <<nome/id do item>>
                    console.log('>> item <<');
                    break;
                case 'monstro':     // monstro <<nome/id do monstro>>
                    console.log('>> monstro <<');
                    break;
                case 'mapa':        // mapa <<nome/id do mapa>>
                    console.log('>> mapa <<');
                    break;
                case 'wiki':        // wiki <<termo>>
                    console.log('>> wiki <<');
                    break;

                // Comandos de recrutamento em Ragnarök
                case 'recrutar':    // recrutar <<nivel_inicial>> <<nivel_final>> <<id_mapa>>
                    console.log('>> recrutar <<');
                    break;
                case 'procurar':    // procurar <<nivel_atual>>
                    console.log('>> procurar <<');
                    break;

                // Comando de informação de bugs
                case 'ticket':      // ticket <<codigo_ticket>>
                    console.log('>> ticket <<');
                    break;
                case 'bug':          // bug [<<mensagem>>]
                    console.log('>> bug <<');
                    break;

                // Comando para jogos
                case 'sorte':       //  sorte
                    console.log('>> sorte <<');
                    break;
                case 'jokenpo':     // jokenpo
                    console.log('>> jokenpo <<');
                    break;

                // Comando para moderação
                case 'alertar':     //  alertar <<usuario>>  [<<mensagem>>]
                    console.log('>> alertar <<');
                    break;
                case 'expulsar':    //  expulsar <<usuario>>  [<<mensagem>>]
                    console.log('>> expulsar <<');
                    break;
                case 'banir':       //  banir <<usuario>> [<<mensagem>>]
                    console.log('>> banir <<');
                    break;
                case 'silenciar':   //  silenciar <<usuario>> [<<mensagem>>]
                    console.log('>> silenciar <<');
                    break;

                // Comando para demais ações
                case 'nivel':       // nivel [<<usuario>>]
                    console.log('>> nivel <<');
                    break; 
                case 'lista':       // lista
                    console.log('>> lista <<');
                    break;
                case 'ver':         // ver <<usuario>>
                    console.log('>> ver <<');
                    break;
                case 'ajuda':       // ajuda
                    console.log('>> ajuda <<');
                    break;

                default:
                    console.log('>> PADRAO <<');
                    break;
            } // switch(tmp_comando[0]) { ... }
        } // if(this.verifica_mencao()) { ... }
    } // trata_mensagem() { ... }



} // class mensagem


// Torna o método público - Acesso externo é permitido.
module.exports = mensagem;
