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
let bib_discord                     =   require('discord.js')
   ,bib_comando                     =   require('./Comando.js')
   ,bib_braunabot                   =   require('./../_BraunaBot/braunabot.js')
   ;

// Fim - Inicialização de bibliotecas                           (∩｀-´)⊃━☆ﾟ.*･｡ﾟ


class Kafra_moderadora
{
    // Método construtor      ¯\_(⊙︿⊙)_/¯
    constructor(p_token_discord, p_banco_dados, p_usuario_braunabot, p_token_braunabot)
    {
        /************************************************************************
         * Autor: Michel Brauna                                Data: 17/02/2018 *
         *                                                                      *
         * Método responsável por inicializar o CórteX e armazenar virtualmente *
         * todos os tokens de acesso.                                           *
         *                                                                      *
         ************************************************************************/

        // Salva virtualmente - protected - os dados do token
        this.v_token_discord            =   p_token_discord;
        this.v_banco_dados              =   p_banco_dados;
        this.v_usuario_braunabot        =   p_usuario_braunabot;
        this.v_token_braunabot          =   p_token_braunabot;
        // FIM - Salva virtualmente - protected - os dados do token

        // Instancia uma nova sessão para o acesso ao bot
        this.init_kafra_moderadora      =   new bib_discord.Client();
        this.init_comando               =   new bib_comando(this.v_banco_dados);
        this.init_braunabot             =   new bib_braunabot(this.init_kafra_moderadora, this.v_usuario_braunabot, this.v_token_braunabot);
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
        this.init_kafra_moderadora.on(
                                        "ready"
                                       ,() =>
                                        {
                                            console.log('[Kafra moderadora] - Estou ativa!');
                                            this.init_kafra_moderadora.user.setActivity('Ragnarök Online');


                                            try
                                            {
                                                var v_grupo     =   this.init_kafra_moderadora.guilds;
                                                
                                                v_grupo.foreach(p_dados =>{
                                                    var v_canal = this.fn_coleta_canal(p_dados);

                                                    console.log(v_canal);
                                                    console.log(p_dados);
                                                });
                                            }
                                            catch(p_erro)
                                            {
                                                console.log(p_erro);
                                                console.trace();
                                            }
                                        }
                                    );
        // PARA EVENTO DO TIPO - BOT PREPARADO

        // PARA EVENTO DO TIPO - BOT ENTROU NO CANAL
        this.init_kafra_moderadora.on(
                                        "guildCreate"
                                       ,grupo =>
                                        {
                                            new bib_kafra_inicializa(this.init_kafra_moderadora, grupo).trata_informacao();
                                        }
                                    );
        // PARA EVENTO DO TIPO - BOT ENTROU NO CANAL

        // PARA EVENTO DO TIPO - BOT SAIU DO CANAL
        this.init_kafra_moderadora.on(
                                        "guildDelete"
                                       ,grupo =>
                                        {
                                            console.log('-- -- -- GUILD DELETE -- -- --');
                                            console.log('---------------------------');
                                            console.log(grupo);
                                            console.log('---------------------------');
                                        }
                                    );
        // PARA EVENTO DO TIPO - BOT SAIU DO CANAL

        // PARA EVENTO DO TIPO TEXTO
        this.init_kafra_moderadora.on(
                                        "message"
                                        ,async mensagem =>
                                        {
                                            if(mensagem.channel.type === 'dm')
                                            {
                                                if(!mensagem.author.bot)
                                                {
                                                   this.init_braunabot.pergunta(mensagem);
                                                } // if(!mensagem.author.bot)
                                            } // if(mensagem.channel.type === 'dm')
                                            else
                                            {
                                                this.init_comando.trata_mensagem(this.init_kafra_moderadora,mensagem);
                                            } // else { ... }
                                        } // ,async mensagem =>
                                    );
        // PARA EVENTO DO TIPO TEXTO



        // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ

    }   // fn_carrega_evento()


    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ


    fn_coleta_canal(p_grupo)
    {
        /********************************************************
         * Autor: Michel Brauna                Data: 10/03/2018 *
         *                                                      *
         * Procedimento para coleta do canal padrão do grupo, o *
         * Discord agora removeu a opção default_channel e com  *
         * isto tal método se fez necessário.                   *
         ********************************************************/

        // Obter o canal original.
        if(p_grupo.channel.has(p_grupo.id)) return p_grupo.channels.get(p_grupo.id);

        // Procura pelo grupo com nome 'general' criado por padrão
        if p_grupo.channels.exists('name','general') return p_grupo.channels.find('name','general');

        // Se nenhum dos dados acima satisfazer a operação - Obtém o primeiro chat da lista
        return p_grupo.channels.filter(c => c.type === "text" && c.permissionsFor(p_grupo.client.user).has("SEND_MESSAGES")).sort((a, b) => a.position - b.position || Long.fromString(a.id).sub(Long.fromString(b.id)).toNumber()).first();
    } // fn_coleta_canal(p_grupo)
}   // CLASS KAFRA_MODERADORA

// Torna o método público
module.exports = Kafra_moderadora;
