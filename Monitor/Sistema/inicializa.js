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

let  bib_requisicao             =   require('request')
    ,bib_url                    =   process.env.url_requisicao
    ;


class inicializa
{
    constructor(p_cliente)
    {
        // Marca o Objeto do cliente como o valor recebido
        this.obj_cliente    =   p_cliente;
    } // constructor(p_cliente)

    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

    array_para_objeto(p_array)
    {
        /**********************************************************
         * Autor: Michel Brauna                  Data: 27/03/2018 *
         *    Processo para transformar uma array em objeto.      *
         **********************************************************/
        var objeto_retorno = {};

        for(var i=0;i<p_array.length;i++)
        {
            if(p_array[i] !== undefined) objeto_retorno[i] = p_array[i];
        } // for(var i=0;i<p_array.length;i++)

        return objeto_retorno;
    } // array_para_objeto(p_array)

    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

    comunica_portal(p_dados_url, callback)
    {
        /**********************************************************
         * Autor: Michel Brauna                  Data: 27/03/2018 *
         *    Processo para comunicar com o servidor Kafra.       *
         **********************************************************/

        try
        {
            bib_requisicao.post(p_dados_url, (p_erro, p_resposta, p_corpo) =>
            {
                let v_req_erro       =   p_erro
                   ,v_req_resposta   =   p_resposta
                   ,v_req_corpo      =   p_corpo
                   ;

                // Retorna para a função callback;
                callback(v_req_erro, v_req_resposta, v_req_corpo);
            }); // bib_requisicao.post(p_dados_url, (p_erro, p_resposta, p_corpo) =>
        } // try { ... }
        catch(p_erro)
        {
            console.log('--- ERRO - COMUNICA_PORTAL ---');
            console.trace();
            console.log(p_erro);
        } // catch(p_erro) { ... }
    } // comunica_portal(p_dados_url, callback)

    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ

    func_inicializa()
    {
        /****************************************************************
         * Autor: Michel Brauna                        Data: 29/03/2018 *
         *                                                              *
         *     Procedimento de funções iniciais - Inicializa cadastro de*
         * usuários que possuem acesso ao bot, assim como suas respecti-*
         * vas salas de chat e suas permissões.                         *
         ****************************************************************/
        let obj_usuario     =   []
           ,obj_servidor    =   []
           ,v_origem        =   {}
           ,v_requisicao    =   {}
           ,v_corpo         =   {}
           ;

        // Coleta a lista de todos os usuários DISCORD e seus respectivos dados
        try
        {
            // Coleta as informações requisitadas para corpo da requisição.
            obj_usuario     =   this.func_usuario();
            obj_servidor    =   this.func_servidor();

            // Monta o objeto para cliente de origem
            v_origem        =   {
                                    id              :   this.obj_cliente.user.id
                                   ,bot             :   this.obj_cliente.user.bot
                                   ,token           :   this.obj_cliente.user.client.token
                                   ,codigo_disc     :   this.obj_cliente.user.discriminator
                                };

            // Monta o corpo da requisição, à fim de definir os dados à serem tratados
            v_corpo         =   {
                                    'Usuario'   :   obj_usuario
                                   ,'Servidor'  :   obj_servidor
                                   ,'Origem'    :   v_origem
                                };

            // Monta a requisição para o serviço desejado
            v_requisicao    =   {
                                    'url'           :   bib_url + 'inicializa'
                                   ,'json'          :   true
                                   ,'body'          :   v_corpo
                                };


            // Consome a API para processamento das informações
            this.comunica_portal(v_requisicao, (p_erro, p_resposta, p_corpo) =>
            {
                try
                {
                    // Verifica se ocorreu um retorno, caso exista verifica o tipo
                    if(typeof p_corpo === 'undefined' || typeof p_corpo === undefined)
                    {
                        // Se o tipo for indefinido, o processo irá gerar um log e finalizar
                        console.log('ERRO --->');
                        console.log('A requisição para inicialização gerou dado indefinido! Verifique.');
                        console.log('ERRO --->');

                        // Finaliza o procedimento
                        return;
                    } // if(typeof p_corpo === 'undefined' || typeof p_corpo === undefined)

                    // Define o resultado, conversão explícita - STRINGIFY -> JSON
                    var v_tmp_retorno   =   p_corpo;

                    // verifica a situação do processamento
                    /*if(v_tmp_retorno.erro_mensagem)
                    {
                        // Se existe uma mensagem de erro ... exibe no log
                        console.log('API ERRO ---->');
                        console.log(erro_mensagem);
                        console.log('API ERRO ---->');
                    } // if(v_tmp_retorno.erro_mensagem)
                    else
                    {
                        console.log('[Sucesso] - Dados salvos.');
                    } // else { ... }
                    */
                    console.log('>><<');
                    console.log(v_tmp_retorno);
                    console.log('>><<');

                } // try { ... }
                catch(p_erro_try)
                {
                    console.log('COMUNICACAO ERRO ---->');
                    console.log(p_erro_try);
                    console.trace();
                    console.log('COMUNICACAO ERRO ---->');
                } // catch(p_erro_try) { .. }
            });
        } // try { ... }
        catch(p_erro)
        {
            console.log('Não foi possível montar os dados de inicialização! Verifique.');
            console.log(p_erro);
            console.log('-------------------------------------------');
            console.trace();
        } // catch(p_erro) { ... }
    } // func_inicializa()

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


} // class inicializa

// Torna o método público - Acesso externo é permitido.
module.exports = inicializa;