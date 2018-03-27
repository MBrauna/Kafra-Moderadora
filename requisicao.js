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
        this.obj_cliente    =   p_cliente;
    } // constructor(p_cliente)

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