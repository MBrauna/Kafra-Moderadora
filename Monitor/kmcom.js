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
// Inicialização de bibliotecas                                 (∩｀-´)⊃━☆ﾟ.*･｡ﾟ
let bib_requisicao                      =   require('request');
// Inicialização de bibliotecas                                 (∩｀-´)⊃━☆ﾟ.*･｡ﾟ

class comunica
{
    // Método responsável pela comunicação com a API
    // Envia a requisição à API Kafra Moderadora para tratamento
    envia(p_metodo, p_corpo, callback)
    {
        try
        {
            // Monta a requisição para envio
            let v_obj_requisicao        =   {
                                                'url'           :   process.env.api_url + '/' + process.env.versao + '/' + p_metodo
                                               ,'json'          :   true
                                               ,'body'          :   p_corpo
                                               ,'headers'       :   {
                                                                        'Authorization'     :   process.env.TOKEN_AUTORIZACAO
                                                                    }
                                            };

            bib_requisicao.post(p_dados_url, (p_erro, p_resposta, p_corpo) =>
            {
                // Retorna para a função callback;
                callback(p_erro, p_resposta, p_corpo);
            }); // bib_requisicao.post(p_dados_url, (p_erro, p_resposta, p_corpo) =>
        } // try { ... }
        catch(p_erro)
        {
            console.log(' --                 -- ');
            console.log('PROCEDIMENTO: COMUNICA');
            console.log(' --                 -- ');
            console.log(p_erro);
            console.log(' --                 -- ');
        } // catch(p_erro) { ... }
    } // envia(p_metodo, p_corpo, callback)
} // class comunica

// Torna o método público - Acesso externo é permitido.
module.exports = comunica;