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
 *                                                                                                  *
 *                         Procedimento inicial para Kafra Moderadora - Bot                         *
 *                                                                                                  *
 *      Procedimento que irá inicializar todas as bibliotecas pertinentes para a Kafra moderadaora  *
 * quer seja a API ou REST utilizado. Para toda nova biblioteca com comunicação externa, o processo *
 * deverá ser adaptado para escutar a respectiva porta ou comunicar com a respectiva API.           *
 *                                                                                                  *
 *      Abaixo, a biblioteca responsável por toda interação com o usuário se chama kafra-moderadora *
 * sendo ela responsável por:                                                                       *
 * [Kafra Moderadora]                                                                               *
 *      |_[Pesquisa]                                                                                *
 *      |   |_[DATABASE]                                                                            *
 *      |   |   |_ <@MENÇÃO> <item/monstro/mapa> <nome/id>                                          *
 *      |   |   |_ Consultas de itens, monstros e mapas em https://ragnaplace.com                   *
 *      |   |                                                                                       *
 *      |   |_[ENCICLOPÉDIA]                                                                        *
 *      |       |_ <@MENÇÃO> wiki <termo>                                                           *
 *      |       |_ Consulta de guias em https://bropedia.net                                        *
 *      |                                                                                           *
 *      |_[Moderação]                                                                               *
 *      |   |_[BANIR]                                                                               *
 *      |   |   |_ <@MENÇÃO> banir <@usuario_alvo>                                                  *
 *      |   |   |_ Chamada de tal ação irá banir definitivamente o usuário alvo.                    *
 *      |   |                                                                                       *
 *      |   |_[EXPULSAR]                                                                            *
 *      |   |   |_ <@MENÇÃO> expulsar <@usuario_alvo>                                               *
 *      |   |   |_ Chamada irá expulsar o usuário alvo temporáriamente.                             *
 *      |   |                                                                                       *
 *      |   |_[LIMPAR]                                                                              *
 *      |   |   |_ <@MENÇÃO> limpar <@usuario_alvo/quantidade>                                      *
 *      |   |   |_ Chamada de tal ação irá limpar todas as mensagens para o alvo.                   *
 *      |   |                                                                                       *
 *      |   |_[CRIAR REGRA]                                                                         *
 *      |   |   |_ <@MENÇÃO> criar_regra <texto>                                                    *
 *      |   |   |_ Chamada de tal ação irá criar um alerta contendo todas as regras do servidor.    *
 *      |   |                                                                                       *
 *      |   |_[ADICIONAR FILTRO DE PALAVRA]                                                         *
 *      |   |   |_ <@MENÇÃO> criar_filtro <palavra>                                                 *
 *      |   |   |_ Chamada de tal ação irá criar um filtro de palavras proibidas.                   *
 *      |   |                                                                                       *
 *      |   |_[REMOVER FILTRO DE PALAVRA]                                                           *
 *      |   |   |_ <@MENÇÃO> remover_filtro <palavra>                                               *
 *      |   |   |_ Chamada de tal ação irá remover o filtro de palavras proibidas.                  *
 *      |   |                                                                                       *
 *      |   |_[LISTAR FILTRO DE PALAVRA]                                                            *
 *      |   |   |_ <@MENÇÃO> lista_filtro                                                           *
 *      |   |   |_ Chamada de tal ação irá listar todas as palavras proibidas contidas no filtro.   *
 *      |   |                                                                                       *
 *      |   |_[ALERTAR USUÁRIO]                                                                     *
 *      |   |   |_ <@MENÇÃO> alerta <@usuario_alvo>                                                 *
 *      |   |   |_ Chamada de tal ação irá gerar uma notificação ao usuário alvo e pontos negativos.*
 *      |   |                                                                                       *
 *      |   |_[LISTAR GRUPO]                                                                        *
 *      |   |   |_ <@MENÇÃO> lista_grupo                                                            *
 *      |   |   |_ Chamada de tal ação irá listar todos os usuários de determinado grupo.           *
 *      |   |                                                                                       *
 *      |   |_[VISUALIZAR USUÁRIO]                                                                  *
 *      |       |_ <@MENÇÃO> usuario <@usuario_alvo>                                                *
 *      |       |_ Chamada de tal ação irá listar imagem, nickname, ID, punições e grupo do alvo.   *
 *      |                                                                                           *
 *      |                                                                                           *
 *      |_[Ragnarök]                                                                                *
 *      |   |_[RECRUTAR]                                                                            *
 *      |   |   |_ <@MENÇÃO> recrutar <nivel_inicial> <nivel_final> <mapa>                          *
 *      |   |   |_ Chamada de tal ação irá marcar por 20 minutos recrutamento de jogadores.         *
 *      |   |                                                                                       *
 *      |   |_[PROCURAR]                                                                            *
 *      |   |   |_ <@MENÇÃO> procurar <nivel>                                                       *
 *      |   |   |_ Chamada de tal ação irá listar os grupos ativos dentro do nível do personagem.   *
 *      |   |                                                                                       *
 *      |   |_[LISTAR TODOS GRUPOS]                                                                 *
 *      |       |_ <@MENÇÃO> grupos                                                                 *
 *      |       |_ Chamada de tal ação irá listar todos os grupos ativos.                           *
 *      |                                                                                           *
 *      |_[Moderadora]                                                                              *
 *          |_[APRESENTAÇÃO]                                                                        *
 *          |   |_ <@MENÇÃO>                                                                        *
 *          |   |_ Chamada de tal ação irá gerar um texto de aprensentação.                         *
 *          |                                                                                       *
 *          |_[REGRA]                                                                               *
 *          |   |_ <@MENÇÃO> regras                                                                 *
 *          |   |_ Chamada de tal ação irá listar as regras cadastradas.                            *
 *          |                                                                                       *
 *          |_[AJUDA]                                                                               *
 *          |   |_ <@MENÇÃO> ajuda                                                                  *
 *          |   |_ Chamada de tal ação irá listar todos os comandos disponíveis.                    *
 *          |                                                                                       *
 *          |_[BOAS-VINDAS]                                                                         *
 *          |   |_ AO ENTRAR NO SERVIDOR                                                            *
 *          |   |_ Mensagem de boas-vindas será gerada.                                             *
 *          |                                                                                       *
 *          |_[DESPEDIDA]                                                                           *
 *          |   |_ AO SAIR DO servidor                                                              *
 *          |   |_ Mensagem de despedida será gerada.                                               *
 *          |                                                                                       *
 *          |_[LOG]                                                                                 *
 *          |   |_ Mediante canal pré-definido                                                      *
 *          |   |_ Todas as ações serão monitoradas e um log gerado.                                *
 *          |                                                                                       *
 *          |_[DEFINIR LOG]                                                                         *
 *              |_ <@MENÇÃO> log <#AREA>                                                            *
 *              |_ Todos os logs serão escritos na área informada.                                  *
 *                                                                                                  *
 ****************************************************************************************************/



// Inicialização de bibliotecas                                 (∩｀-´)⊃━☆ﾟ.*･｡ﾟ
const bib_kafra_moderadora_discord  =   require('./Kafra-Moderadora/kafra-moderadora.js');
// Fim - Inicialização de bibliotecas                           (∩｀-´)⊃━☆ﾟ.*･｡ﾟ



// ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 



// Inicialização das variáveis de ambiente                      （ ^_^）o自  自o（^_^ ）

// Tokens
let v_token_discord                 =   process.env.BOT_TOKEN_DISCORD
   ,v_token_telegram                =   process.env.BOT_TOKEN_TELEGRAM
   ;

// Fim - Inicialização das variáveis de ambiente                （ ^_^）o自  自o（^_^ ）



// ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 



// Método construtor - Inicialização do processo                (╬ ಠ益ಠ)
const init_kafra_moderadora         =   new bib_kafra_moderadora(v_token_discord); 
// FIM - Método construtor - Inicialização do processo          (╬ ಠ益ಠ)