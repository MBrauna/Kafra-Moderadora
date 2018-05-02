/****************************************************************************************************
 * Autor: Michel Brauna                                                            Data: 01/05/2018 *
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

let  bib_comunica     =   require('./../kmcom.js');

class Conectar
{
    constructor(p_cliente)
    {
        /****************************************************************************************
         * Autor: Michel Brauna                                                Data: 01/05/2018 *
         * Método construtor para Conectar, responsável por armazenar e inicializar o objeto do *
         * cliente para tratamentos.                                                            *
         ****************************************************************************************/
        this.obj_cliente    =   p_cliente; // Marca como global o objeto para cliente.
    } // constructor(p_cliente)

    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ

    func_usuario()
    {
        /****************************************************************
         * Autor: Michel Brauna                        Data: 29/03/2018 *
         *                                                              *
         *      Procedimento para coleta de todos os clientes que estão *
         * sob rastreio do bot e então cadastro ou atualização dos dados*
         * enviados pelo webservice Discord.                            *
         ****************************************************************/
        let v_usuario     =   []
           ;

        try
        {
            // Loop para consulta de todos os clientes que estão sob monitoramento do bot
            this.obj_cliente.users.forEach((p_usuarios) =>
            {
                var tmp_usuario     =   {
                                            id              :   p_usuarios.id
                                           ,avatarURL       :   p_usuarios.avatarURL
                                           ,DM              :   p_usuarios.dmChannel
                                           ,username        :   p_usuarios.username
                                           ,tag             :   p_usuarios.tag
                                           ,discriminator   :   p_usuarios.discriminator
                                           ,bot             :   p_usuarios.bot
                                        };


                // Adiciona o novo registro à array de usuários os valores coletados
                v_usuario.push(tmp_usuario);
            }); // this.obj_cliente.users.forEach((p_usuarios) =>

            // Se o procedimento chegou até aqui, temos todos os dados à serem criados e/ou atualizados.
        } // try { ... }
        catch(p_erro)
        {
            // Define uma mensagem de erro para o console.
            console.log('Não foi possível gerar os dados de usuários! Verifique.');
            console.log(p_erro);
            console.log('-------------------------------------------');
            console.trace();

            // Caso algum erro ocorra durante a criação, é enviado uma array vazia.
            v_usuario   =   [];
        } // catc(p_erro) { ... }

        // Finaliza retornando toda a array de usuários monitorados.
        return v_usuario;
    } // func_usuario()

    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ

    func_servidor()
    {
        /****************************************************************
         * Autor: Michel Brauna                        Data: 29/03/2018 *
         *                                                              *
         *      Procedimento para coleta de todos os dados pertinentes  *
         * ao client discord e os respectivos servidores ativos.        *
         ****************************************************************/
        // Inicializar as constantes utilizadas nos tratamentos
        let v_servidor      =   []
           ;

        try
        {
            // Acessa o cliente e obtém todos os servidores ativos no cliente DISCORD
            this.obj_cliente.guilds.forEach((p_servidor) =>
            {
                // Declara as arrays que irão compor os dados para o servidor
                let v_canal     =   [] // channels
                   ,v_regra     =   [] // roles
                   ,v_membro    =   [] // members
                   ,vobj_corpo  =   {} // Corpo da requisicao
                   ,vobj_req    =   {} // Requisição com URL
                   ;

                // Acessa o atributo channels para obteção dos dados de canais -> Client Discord
                p_servidor.channels.forEach((p_canal) =>
                {
                    // Monta um objeto com os dados necessários para o canal obtido
                    var tmp_canal   =   {
                                            id          :   p_canal.id
                                           ,nome        :   p_canal.name
                                           ,tipo        :   p_canal.type
                                           ,posicao     :   p_canal.position
                                        };

                    // Adiciona o canal à array
                    v_canal.push(tmp_canal);
                }); // p_servidor.forEach((p_canal) =>

                // Acessa o atributo roles para obtenção dos dados de permissões -> Client Discord
                p_servidor.roles.forEach((p_regra) =>
                {
                    var tmp_regra   =   {
                                            id          :   p_regra.id
                                           ,nome        :   p_regra.name
                                           ,corhexa     :   p_regra.hexColor
                                           ,permissao   :   p_regra.permissions
                                           ,mencao      :   p_regra.mentionable
                                           ,posicao     :   p_regra.position
                                        };

                    // Adiciona a regra à array
                    v_regra.push(tmp_regra);
                }); // p_servidor.roles.forEach((p_regra) =>

                // Acessa o atributo roles para obtenção dos dados de permissões -> Client Discord
                p_servidor.members.forEach((p_membro) =>
                {
                    var tmp_membro      =   {
                                                id          :   p_membro.id
                                               ,DspCorHexa  :   p_membro.displayHexColor
                                               ,DspCor      :   p_membro.displayColor
                                            };

                    // Adiciona o membro à array
                    v_membro.push(tmp_membro);
                }); // p_servidor.members.forEach((p_membro) =>


                // Monta os dados para o servidor
                var tmp_servidor    =   {
                                            id              :   p_servidor.id
                                           ,icone           :   p_servidor.icon
                                           ,icone_url       :   p_servidor.iconURL
                                           ,qtde_membros    :   p_servidor.memberCount
                                           ,nome            :   p_servidor.name
                                           ,id_lider        :   p_servidor.ownerID
                                           ,regiao          :   p_servidor.region
                                           ,canal           :   v_canal
                                           ,regra           :   v_regra
                                           ,membro          :   v_membro
                                        };


                // Insere um novo registro para servidor
                v_servidor.push(tmp_servidor);
            }); // this.obj_cliente.guilds.forEach((p_servidor) =>

            // Se chegou até aqui, os dados para o servidor foram criados
        } // try { ... }
        catch(p_erro)
        {
            // Em caso de erro na atualização da base de servidores irá emitir uma mensagem com log
            console.log('Não foi possível atualizar a base de servidores! Verifique.');
            console.log(p_erro);
            console.log('-------------------------------------------');
            console.trace();

            // Marca a array para nulo.
            v_servidor  =   [];
        } // catch(p_erro) { ... }

        // Retorna o resultado obtido, se sucesso ou erro serão definidos via log
        return v_servidor;
    } // func_servidor()

    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ

    trata_resposta(p_erro, p_resposta, p_corpo)
    {
        // Procedimento para tratamento do callback
        try
        {
            // Inicia o tratamento para os dados de resposta
            if(typeof p_corpo === 'undefined' || typeof p_corpo === undefined)
            {
                console.log('[INICIALIZAR] -> ERRO');
                console.log('Não foi possível atualizar os dados!');
            } // if(typeof p_corpo === 'undefined' || typeof p_corpo === undefined)
            else
            {
                // Verifica se o cadastro foi realizado
                if(typeof p_corpo.sucesso === 'undefined' || typeof p_corpo.sucesso === undefined)
                {
                    console.log('Dados não cadastrados! Verifique o log.');
                } // if(typeof p_corpo.sucesso === 'undefined' || typeof p_corpo.sucesso === undefined)
                else
                {
                    console.log(p_corpo);
                } // else { ... }
            } // else { ... }
        } // try { ... }
        catch(p_erro)
        {
            console.log('Não foi possível atualizar a base de servidores! Verifique.');
            console.log(p_erro);
            console.log('-------------------------------------------');
            console.trace();
        } // catch(p_erro) { ... }
    } // trata_resposta(p_erro, p_resposta, p_corpo)


    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ

    inicializar()
    {
        try
        {
            // Monta o corpo da requisição.
            let v_corpo_requisicao  =   {
                                            'Usuario'   :   this.func_usuario()
                                           ,'Servidor'  :   this.func_servidor()
                                           ,'Origem'    :   {
                                                                'id'            :   this.obj_cliente.user.id
                                                               ,'bot'           :   this.obj_cliente.user.bot
                                                               ,'token'         :   this.obj_cliente.user.client.token
                                                               ,'codigo_disc'   :   this.obj_cliente.user.discriminator
                                                            }
                                        };

            new bib_comunica().envia('conectar',v_corpo_requisicao, this.trata_resposta);

        } // try { ... }
        catch(p_erro)
        {
            console.log('Não foi possível atualizar a base de servidores! Verifique.');
            console.log(p_erro);
            console.log('-------------------------------------------');
            console.trace();
        } // catch(p_erro) { ... }
    } // inicializar() { ... }
} // Class conectar { ... }

// Torna o método público - Acesso externo é permitido.
module.exports = Conectar;