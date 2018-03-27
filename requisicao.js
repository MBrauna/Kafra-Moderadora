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
        let vobj_servidor   =   {}
           ,v_cache         =   []
           ;


        this.obj_cliente.guilds.forEach((p_servidor) =>
        {
            let v_servidor  =   []
               ,v_canal     =   []
               ,v_regra     =   []
               ;

            p_servidor.channels.forEach((p_canal) =>
            {
                var tmp_canal   =   {
                                        id          :   p_canal.id
                                       ,nome        :   p_canal.name
                                       ,tipo        :   p_canal.type
                                       ,servidor    :   p_canal.guild
                                       ,posicao     :   p_canal.position
                                       ,nsfw        :   p_canal.nsfw
                                    };
                v_canal.push(tmp_canal);
            }); // p_servidor.forEach((p_canal) =>
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