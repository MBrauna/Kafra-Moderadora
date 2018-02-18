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
         * Autor: Michel Brauna                                Data: 17/02/2018 *
         *                                                                      *
         * Método responsável por inicializar o CórteX e armazenar virtualmente *
         * todos os tokens de acesso.                                           *
         *                                                                      *
         ************************************************************************/

        // Salva virtualmente - protected - os dados do token
        this.v_token_discord        =   p_token_discord;
        this.v_token_telegram       =   p_token_telegram;
        // FIM - Salva virtualmente - protected - os dados do token

        // Instancia uma nova sessão para o acesso ao bot
        this.bib_cortex_discord     =   new bib_discord.Client();
        //this.bib_cortex_telegram    =   new bib_cortex_telegram(this.v_token_telegram);
        //FIM - Instancia uma nova sessão para o acesso ao bot


        // Carrega evento
        this.fn_carrega_evento();
        // Fim - Carrega evento


        // Inicializa o construtor
        this.bib_cortex_discord.login(this.v_token_discord);
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
        this.bib_cortex_discord.on("ready",         () =>
                                                    {
                                                        console.log('teste');
                                                    }
                                );
        // PARA EVENTO DO TIPO - BOT PREPARADO

        /* / PARA EVENTO DO TIPO - BOT ENTROU NO CANAL
        this.bib_cortex_discord.on("guildCreate",   grupo =>
                                                    {
                                                        console.log(grupo);
                                                    }
                                );
        // PARA EVENTO DO TIPO - BOT ENTROU NO CANAL

        // PARA EVENTO DO TIPO - BOT SAIU DO CANAL
        this.bib_cortex_discord.on("guildDelete",   grupo =>
                                                    {
                                                        console.log(grupo);
                                                    }
                                );
        // PARA EVENTO DO TIPO - BOT SAIU DO CANAL */

        // PARA EVENTO DO TIPO TEXTO
        this.bib_cortex_discord.on("message",       async mensagem =>
                                                    {
                                                        console.log(mensagem);
                                                    }
                                );
        // PARA EVENTO DO TIPO TEXTO




        // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ



        /***********************************
         *  >> >>  T E L E G R A M   << << *
         ***********************************/

        // PARA EVENTO DO TIPO TEXTO
        this.bib_cortex_telegram.on('text',   (ctx) => 
                                            {
                                                ctx.reply('Não estou preparado ainda! Aguarde.');
                                                console.log(ctx.message.text);
                                            }
                                );
        // PARA EVENTO DO TIPO TEXTO

        // PARA EVENTO DO TIPO AUDIO
        this.bib_cortex_telegram.on('audio', (ctx) =>  ctx.reply('Não estou preparado ainda!- AUDIO INDISPONÍVEL! Aguarde.'));
        // PARA EVENTO DO TIPO AUDIO

        // PARA EVENTO DO TIPO DOCUMENTO
        this.bib_cortex_telegram.on('document', (ctx) => ctx.reply('Não estou preparado ainda!- DOCUMENTO INDISPONÍVEL! Aguarde.'));
        // PARA EVENTO DO TIPO DOCUMENTO

        // PARA EVENTO DO TIPO FOTO
        this.bib_cortex_telegram.on('photo', (ctx) => ctx.reply('Não estou preparado ainda!- FOTO INDISPONÍVEL! Aguarde.'));
        // PARA EVENTO DO TIPO FOTO

        // PARA EVENTO DO TIPO VÍDEO
        this.bib_cortex_telegram.on('video', (ctx) => ctx.reply('Não estou preparado ainda!- VÍDEO INDISPONÍVEL! Aguarde.'));
        // PARA EVENTO DO TIPO VÍDEO

        // PARA EVENTO DO TIPO VOZ
        this.bib_cortex_telegram.on('voice', (ctx) => ctx.reply('Não estou preparado ainda!- VOZ INDISPONÍVEL! Aguarde.'));
        // PARA EVENTO DO TIPO VOZ

        // PARA EVENTO DO TIPO CONTATO
        this.bib_cortex_telegram.on('contact', (ctx) => ctx.reply('Não estou preparado ainda!- CONTATO INDISPONÍVEL! Aguarde.'));
        // PARA EVENTO DO TIPO CONTATO

        // PARA EVENTO DO TIPO lOCALIZAÇÃO
        this.bib_cortex_telegram.on('location', (ctx) => ctx.reply('Não estou preparado ainda!- LOCALIZAÇÃO INDISPONÍVEL! Aguarde.'));
        // PARA EVENTO DO TIPO lOCALIZAÇÃO

        // PARA EVENTO DO TIPO LOCAL
        this.bib_cortex_telegram.on('venue', (ctx) => ctx.reply('Não estou preparado ainda!- LOCAL INDISPONÍVEL! Aguarde.'));
        // PARA EVENTO DO TIPO LOCAL

        // PARA EVENTO DO TIPO STICKER
        this.bib_cortex_telegram.on('sticker', (ctx) => ctx.reply('Não estou preparado ainda!- STICKER INDISPONÍVEL! Aguarde.'));
        // PARA EVENTO DO TIPO STICKER

        // PARA EVENTO DO TIPO NOVOS MEMBROS
        this.bib_cortex_telegram.on('new_chat_members', (ctx) => ctx.reply('Um novo membro apareceu no grupo!'));
        // PARA EVENTO DO TIPO NOVOS MEMBROS

        // PARA EVENTO DO TIPO MEMBRO SAIU DO CHAT
        this.bib_cortex_telegram.on('left_chat_member', (ctx) => ctx.reply('Um membro saiu do chat'));
        // PARA EVENTO DO TIPO MEMBRO SAIU DO CHAT

        // PARA EVENTO DO TIPO NOVO TIPO DE CHAT
        this.bib_cortex_telegram.on('new_chat_title', (ctx) => ctx.reply('Agora temos um novo título! Uhhhhh'));
        // PARA EVENTO DO TIPO NOVO TIPO DE CHAT

        // PARA EVENTO DO TIPO NOVA FOTO DE CHAT
        this.bib_cortex_telegram.on('new_chat_photo', (ctx) => ctx.reply('Fotinha nova no grupo galereeeee'));
        // PARA EVENTO DO TIPO NOVA FOTO DE CHAT

        // PARA EVENTO DO TIPO REMOÇÃO DE FOTO DO CHAT
        this.bib_cortex_telegram.on('delete_chat_photo', (ctx) => ctx.reply('Ué, removeu pq a foto?'));
        // PARA EVENTO DO TIPO REMOÇÃO DE FOTO DO CHAT

        // PARA EVENTO DO TIPO GRUPO CRIADO
        this.bib_cortex_telegram.on('group_chat_created', (ctx) => ctx.reply('CórteX - GRUPO CRIADO INDISPONÍVEL! Aguarde.'));
        // PARA EVENTO DO TIPO GRUPO CRIADO

        // PARA EVENTO DO TIPO MIGRAÇÃO DE CHAT
        this.bib_cortex_telegram.on('migrate_to_chat_id', (ctx) => ctx.reply('CórteX - MUDANÇA DE ID DO CHAT INDISPONÍVEL! Aguarde.'));
        // PARA EVENTO DO TIPO MIGRAÇÃO DE CHAT

        // PARA EVENTO DO TIPO SUPER GRUPO CRIADO
        this.bib_cortex_telegram.on('supergroup_chat_created', (ctx) => ctx.reply('CórteX - SUPER GRUPO INDISPONÍVEL! Aguarde.'));
        // PARA EVENTO DO TIPO SUPER GRUPO CRIADO

        // PARA EVENTO DO TIPO CANAL CRIADO
        this.bib_cortex_telegram.on('channel_chat_created', (ctx) => ctx.reply('CórteX - CANAL CRIADO INDISPONÍVEL! Aguarde.'));
        // PARA EVENTO DO TIPO CANAL CRIADO

        // PARA EVENTO DO TIPO MIGRADO PARA NOVO CHAT
        this.bib_cortex_telegram.on('migrate_from_chat_id', (ctx) => ctx.reply('CórteX - MUDANÇA DE CHAT INDISPONÍVEL! Aguarde.'));
        // PARA EVENTO DO TIPO MIGRADO PARA NOVO CHAT

        // PARA EVENTO DO TIPO MENSAGEM SALVA
        this.bib_cortex_telegram.on('pinned_message', (ctx) => ctx.reply('CórteX - MENSAGEM SALVA INDISPONÍVEL! Aguarde.'));
        // PARA EVENTO DO TIPO MENSAGEM SALVA

        // PARA EVENTO DO TIPO JOGO
        this.bib_cortex_telegram.on('game', (ctx) => ctx.reply('CórteX - JOGO INDISPONÍVEL! Aguarde.'));
        // PARA EVENTO DO TIPO JOGO

        // PARA EVENTO DO TIPO NOTA DE VÍDEO
        this.bib_cortex_telegram.on('video_note', (ctx) => ctx.reply('CórteX - NOTA DE VÍDEO INDISPONÍVEL! Aguarde.'));
        // PARA EVENTO DO TIPO NOTA DE VÍDEO

        // PARA EVENTO DO TIPO CHAMADA DE VOZ
        this.bib_cortex_telegram.on('invoice', (ctx) => ctx.reply('CórteX - INVOICE INDISPONÍVEL! Aguarde.'));
        // PARA EVENTO DO TIPO CHAMADA DE VOZ
    }   // fn_carrega_evento()



    inicializa()
    {
        this.bib_cortex_discord.login(this.v_token_discord);
    }
}   // CLASS CORTEX

// Torna o método público
module.exports = CorteX;