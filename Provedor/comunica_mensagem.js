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

// Inicialização de bibliotecas                                 (∩｀-´)⊃━☆ﾟ.*･｡ﾟ
let   bib_requisicao        =   require('request')
     ;
// Inicialização de bibliotecas                                 (∩｀-´)⊃━☆ﾟ.*･｡ﾟ


class comunica_msg
{
    constructor(p_cliente)
    {
        this.obj_cliente    =   p_cliente;
    } // constructor(p_cliente)

    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

    quantidade_palavra(p_conteudo)
    {
        // Quebra a frase/conteúdo em uma array - separado por espaço
        var v_conteudo  =   p_conteudo.trim().split(/ +/g);

        // Finaliza a função retornando a quantia de palavras
        return v_conteudo.length; // Adiciona 1 ao valor final para eliminar a casa 0
    } // quantidade_palavra(p_conteudo)

    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

    quantidade_letra(p_conteudo)
    {
        // Mede o tamanho de caracteres em p_conteudo
        return p_conteudo.length; // Adiciona 1 ao valor final para eliminar a casa 0
    } // quantidade_letra(p_conteudo)


    estatistica_mensagem(p_mensagem, callback)
    {
        let v_url_log           =   'http://kafra.mbrauna.org/api/estatistica/mensagem'
           ,v_informacao        =   {
                                        'token'             :   process.env.TOKEN_KAFRA_ADMIN
                                       ,'qtde_palavra'      :   this.quantidade_palavra(p_mensagem.content)
                                       ,'qtde_letra'        :   this.quantidade_letra(p_mensagem.content)
                                       ,'obj_mensagem'      :   p_mensagem.content
                                    }
           ,v_arquivo_data      =   {
                                        url     :   v_url_log
                                       ,json    :   true
                                       ,body    :   v_informacao
                                    }
           ;
        // Trata as informações
        bib_requisicao.post(v_arquivo_data, (p_erro, p_resposta, p_corpo) =>
        {
            if(typeof p_corpo === 'undefined')
            {
                return callback(8);
            }

            if(p_corpo.codigo === '1')
            {
                return callback(1);
            } // if(p_corpo.codigo === '1')
            else
            {
                return callback(9);
            } // else { ... }
        }); // bib_requisicao.post(v_arquivo_data, (p_erro, p_resposta, p_corpo) =>
    } // estatistica_mensagem(p_mensagem, callback)


    estatistica_bot(p_consulta, p_tipo, p_mensagem, callback)
    {
        /********************************************************************
         * Autor: Michel Brauna                            Data: 22/12/2018 *
         ********************************************************************/
        let v_url_log           =   'http://kafra.mbrauna.org/api/estatistica/bot'
           ,v_informacao        =   {
                                        'token'             :   process.env.TOKEN_KAFRA_ADMIN
                                       ,'tipo_consulta'     :   p_tipo
                                       ,'consulta'          :   p_consulta
                                       ,'obj_mensagem'      :   p_mensagem
                                    }
           ,v_arquivo_data      =   {
                                        url     :   v_url_log
                                       ,json    :   true
                                       ,body    :   v_informacao
                                    }
           ;

        // Trata as informações
        bib_requisicao.post(v_arquivo_data, (p_erro, p_resposta, p_corpo) =>
        {
            if(typeof p_corpo === 'undefined')
            {
                return callback(8);
            } // if(typeof p_corpo === 'undefined')

            if(p_corpo.codigo === '1')
            {
                return callback(1);
            } // if(p_corpo.codigo === '1')
            else
            {
                return callback(9);
            } // else { ... }
        });
    } // estatistica_bot(p_consulta, p_tipo, p_mensagem, callback)
} // class comunica_msg

// Torna o método público - Acesso externo é permitido.
module.exports = comunica_msg;
