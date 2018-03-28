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
    ,v_url_requisicao           =   process.env.url_requisicao + '/'
    ,v_corpo_requisicao         =   {}
    ,v_data_info_url            =   {}
    ;

class comunica
{
    constructor(p_cliente)
    {
        // Marca o Objeto do cliente como o valor recebido
        this.obj_cliente    =   p_cliente;

        // Marca 
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
                this.obj_req_erro       =   p_erro;
                this.obj_req_resposta   =   p_resposta;
                this.obj_req_corpo      =   p_corpo;

                // Retorna para a função callback;
                callback(this.obj_req_erro, this.obj_req_resposta, this.obj_req_corpo);
            }); // bib_requisicao.post(p_dados_url, (p_erro, p_resposta, p_corpo) =>
        } // try { ... }
        catch(p_erro)
        {
            console.log('--- ERRO - COMUNICA_PORTAL ---');
            console.trace();
            console.log(p_erro);
        } // catch(p_erro) { ... }
    } // comunica_portal(p_dados_url, callback)


    func_atualiza()
    {
        // Inicializar as constantes utilizadas nos tratamentos
        let v_servidor      =   []
           ;

        // Acessa o cliente e obtém todos os servidores ativos no cliente DISCORD
        this.obj_cliente.guilds.forEach((p_servidor) =>
        {
            // Declara as arrays que irão compor os dados para o servidor
            let v_canal     =   [] // channels
               ,v_regra     =   [] // roles
               ,v_membro    =   [] // members
               ;

            // Acessa o atributo channels para obteção dos dados de canais -> Client Discord
            p_servidor.channels.forEach((p_canal) =>
            {
                // Monta um objeto com os dados necessários para o canal obtido
                var tmp_canal   =   {
                                        id          :   p_canal.id
                                       ,nome        :   p_canal.name
                                       ,tipo        :   p_canal.type
                                       ,servidor    :   p_canal.guild
                                       ,posicao     :   p_canal.position
                                       ,nsfw        :   p_canal.nsfw
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
                                       ,cor         :   p_regra.cor
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
                                           ,username    :   p_membro.nickname
                                           ,apelido     :   p_membro.displayName
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

        }); // this.obj_cliente.guilds.forEach((p_servidor) =>
    } // func_inicia_bot()

















    inicializa(callback)
    {
        let obj_usuario     =   []

           ,cache           =   []
           ;


        this.obj_cliente.guilds.forEach((p_dados) =>
        {
            obj_usuario.push({p_dados});
        });

        this.v_corpo_requisicao     =   {
                                            'Bot'           :   JSON.stringify(this.obj_cliente,(key, value) =>
                                                                                                {
                                                                                                    if (typeof value === 'object' && value !== null) {
                                                                                                        if (cache.indexOf(value) !== -1) {
                                                                                                            // Circular reference found, discard key
                                                                                                            return;
                                                                                                        }
                                                                                                        // Store value in our collection
                                                                                                        cache.push(value);
                                                                                                    }
                                                                                                    return value;
                                                                                                })
                                           ,'Servidor'      :   JSON.stringify(obj_usuario,(key, value) =>
                                                                                                {
                                                                                                    if (typeof value === 'object' && value !== null) {
                                                                                                        if (cache.indexOf(value) !== -1) {
                                                                                                            // Circular reference found, discard key
                                                                                                            return;
                                                                                                        }
                                                                                                        // Store value in our collection
                                                                                                        cache.push(value);
                                                                                                    }
                                                                                                    return value;
                                                                                                })
                                        };

        this.v_data_info_url        =   {
                                            'url'           :   'http://kafra.mbrauna.org/api/inicia'
                                           ,'json'          :   true
                                           ,'body'          :   this.v_corpo_requisicao

                                        };

        try
        {
            bib_requisicao.post(this.v_data_info_url, (p_erro, p_resposta, p_corpo) =>
            {
                // Verifica se o objeto de retorno é indefinido.
                if(typeof p_corpo === 'undefined')
                {
                    // Finaliza o procedimento
                    console.log('Indefinido.');
                    return callback(8);
                } // if(typeof p_corpo === 'undefined')
                


                if(p_corpo === 1)
                {
                    console.log('Deu certo');
                    return callback(1);
                }
                else
                {
                    console.log(p_corpo);
                    return callback(9);
                }
            });
        } // try { ... }
        catch(p_erro)
        {
            console.log('Erro 2');
            return callback(9);
        } // catch(p_erro) { ... }
    } // trata_inicializacao(p_servidores)
} // class comunica

// Torna o método público - Acesso externo é permitido.
module.exports = comunica;