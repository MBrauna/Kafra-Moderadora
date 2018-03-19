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

let   bib_requisicao        =   require('request')            // Para consulta a API de Ragnaplace
     ;

class log
{

    constructor(p_cliente)
    {
        this.obj_cliente    =   p_cliente;
    } // constructor(p_cliente, p_mensagem)



    log_mensagem(p_mensagem, p_mensagem_antiga)
    {
        let v_url_log           =   'http://kafra.mbrauna.org/api/log'
           ,v_informacao        =   {
                                        'token'     :   process.env.TOKEN_KAFRA_ADMIN
                                       ,'cliente'   :   this.obj_cliente
                                       ,'evento'    :   'mensagem'
                                       ,'nome_obj1' :   'mensagem_atual'
                                       ,'nome_obj2' :   'mensagem_anterior'
                                       ,'obj1'      :   p_mensagem
                                       ,'obj2'      :   p_mensagem_antiga
                                    }
           ,v_arquivo_data      =   {
                                        url     :   v_url_log
                                       ,json    :   true
                                       ,body    :   v_informacao
                                    }
           ,v_resposta          =   {}
           ;



        request.post(v_arquivo_data, (p_erro, p_resposta, p_corpo) =>
        {
            v_resposta    =   JSON.parse(p_corpo);


            if(typeof v_resposta === 'undefined' || v_resposta === 'null' || v_resposta === null || v_resposta === 'undefined')
            {
                return 9;
            }

            if(v_resposta.codigo === '1')
            {
                return 1;
            }
            else
            {
                return 9;
            }
        });
    } // log_mensagem(p_mensagem, p_mensagem_atual)
} // class log


module.exports = log;
