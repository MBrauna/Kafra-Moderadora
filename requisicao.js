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
    constructor(p_cliente, p_mensagem)
    {
        this.obj_cliente    =   p_cliente;
        this.obj_mensagem   =   p_mensagem;
    } // constructor(p_cliente)

    trata_inicializacao(callback)
    {
        this.v_corpo_requisicao     =   {
                                            'Cliente'       :   JSON.stringify(this.obj_cliente)
                                           ,'Mensagem'      :   JSON.stringify(this.obj_mensagem)
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