
/****************************************************************************************************
 * Autor: Michel Brauna                                                            Data: 21/02/2018 *
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
 ****************************************************************************************************/

// Inicialização de bibliotecas                                 (∩｀-´)⊃━☆ﾟ.*･｡ﾟ
let   bib_requisicao      =   require('request')            // Para consulta a API de Ragnaplace
     ,bib_underline       =   require('underscore')         // Para tratamento do objeto recebido
     ;
// Inicialização de bibliotecas                                 (∩｀-´)⊃━☆ﾟ.*･｡ﾟ

class ragnaplace
{
    constructor(p_cliente, p_mensagem)
    {
        /*********************************************************************
         * Autor: Michel Brauna                             Data: 16/03/2018 *
         *                                                                   *
         *            Método construtor para a classe Ragnaplace             *
         *********************************************************************/
        this.obj_cliente            =   p_cliente;
        this.obj_mensaggem          =   p_mensagem;
    } // constructor(p_cliente, p_mensagem) { ... }


    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

    /************************************
     * Métodos internos para Ragnaplace *
     ************************************/
    trata_consulta()
    {
        // Declaração de variáveis
        var v_string_requisicao     =   null;

        try
        {
            for(var iteracao=1;iteracao<this.array_mensagem.length; iteracao++)
            {
                v_string_requisicao =   v_string_requisicao + this.array_mensagem[iteracao] + ' ';
            } // for(var iteracao=1;iteracao<this.array_mensagem.length; iteracao++)

            return v_string_requisicao.trim().toLowerCase();
        } // try { ... }
        catch(p_erro)
        {
            return null;
        } // catch { ... }
    } // trata_consulta() { ... }

    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

    ultimo_termo()
    {
        try
        {
            if(typeof this.array_mensagem[this.array_mensagem.length -1] != 'undefined')
            {
                return this.array_mensagem[this.array_mensagem.length -1]
            }
            else
            {
                var v_ultimo_termo = '';
                for(var iteracao=1;iteracao<this.array_mensagem.length; iteracao++)
                {
                    v_ultimo_termo =   this.array_mensagem[iteracao];
                } // for(var iteracao=1;iteracao<this.array_mensagem.length; iteracao++)

                return v_ultimo_termo.trim().toLowerCase();
            }
        } // try { ... }
        catch(p_erro)
        {
            return null;
        } // catch(p_erro) { ... }
    } // ultimo_termo()

    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

    prepara_url(p_termo_consulta, p_tipo_url, p_quantidade)
    {
        // Declara a variável de retorno
        var v_url_retorno               =   '';

        // Verifica qual tipo de URL deverá ser utilizada
        switch(p_tipo_url.toLowerCase())
        {
            case 'item':
                v_url_retorno   =   'https://pt.ragnaplace.com/api/' + process.env.BOT_TOKEN_RAGNAPLACE + '/8/bro/item/search/' + p_quantidade + '/views/' + encodeURI(p_termo_consulta.trim());
                break;
            case 'monstro':
                v_url_retorno   =   'https://pt.ragnaplace.com/api/' + process.env.BOT_TOKEN_RAGNAPLACE + '/8/bro/mob/search/' + p_quantidade + '/views/' + encodeURI(p_termo_consulta.trim());
                break;
            case 'mapa':
                v_url_retorno   =   'https://pt.ragnaplace.com/api/' + process.env.BOT_TOKEN_RAGNAPLACE + '/8/bro/map/search/' + p_quantidade + '/views/' + encodeURI(p_termo_consulta.trim());
                break;
            default
                v_url_retorno   =   'https://pt.ragnaplace.com/api/' + process.env.BOT_TOKEN_RAGNAPLACE + '/8/bro/item/search/' + p_quantidade + '/views/' + encodeURI(p_termo_consulta.trim());
                break;
        } // switch(p_tipo_url.toLowerCase() === 'item') { ... }

        return v_url_retorno;
    } // prepara_url(p_termo_consulta, p_tipo_url, p_quantidade)

    // ᕦ(ò_óˇ)ᕤ     ---     S E P A R A D O R     ---     ᕦ(ˇò_ó)ᕤ 

    consultar(p_termo_consulta,p_tipo)
    {
        // Marca a nível global a mensagem a ser tratada
        this.array_mensagem     =   p_termo_consulta;

        let v_url_consulta      =   this.prepara_url(this.trata_consulta(),p_tipo,1)
           ,v_resposta          =   {}
           ,v_array_resp        =   []
           ,v_pagina
           ;

        try
        {
            // Consome a API Ragnaplace - Método GET
            bib_requisicao.get(v_url_consulta, (p_erro, p_resposta, p_corpo) =>
            {
                // Obtem o objeto entregue em "p_corpo" para tratativa da resposta
                v_resposta      =   JSON.parse(p_corpo);

                // Verifica se o objeto encontrado é válido
                if(typeof v_resposta === 'undefined' || v_resposta.toLowerCase() === 'null' || v_resposta === null || v_resposta === 'undefined')
                {
                    // Marca uma nova consulta ao termo desejado.
                    v_url_consulta  =   this.prepara_url(this.ultimo_termo(),p_tipo,15);

                    bib_requisicao.get(v_url_consulta, (p_erro_nt, p_resposta_nt, p_corpo_nt) =>
                    {
                        // Obtém o objeto entregue em "p_corpo_nt" para tratativa da resposta
                        v_resposta  =   JSON.parse(p_corpo_nt);


                        if(typeof v_resposta === 'undefined' || v_resposta.toLowerCase() === 'null' || v_resposta === null || v_resposta === 'undefined')
                        {
                            // Comunica com o usuário
                            console.log('Nada encontrado para ultimo termo: ' + this.ultimo_termo());
                            return;
                        } // if(typeof v_resposta === 'undefined' || v_resposta.toLowerCase() === 'null' || v_resposta === null || v_resposta === 'undefined')

                        v_resposta.forEach((p_resp) =>
                        {
                            // Coleta os dados obtidos e monta a resposta
                            var tmp_coisas = {name: p_resp.name, value: p_resp.link};
                            v_array_resp.push(tmp_coisas);
                        }); // v_resposta.forEach((p_resp) =>

                        // Comunica com o usuário
                        console.log('Encontrado para ultimo termo: ' + this.ultimo_termo());
                        return;
                    }); // bib_requisicao.get(v_url_consulta, (p_erro_nt, p_resposta_nt, p_corpo_nt) =>
                } // if(typeof v_resposta === 'undefined' || v_resposta.toLowerCase() === 'null' || v_resposta === null || v_resposta === 'undefined')

                // Percorre o objeto atrás das informações
                v_resposta.forEach((json_resp) => // A idéia é que se tenha apenas um resultado, mas por precaução ... foreach
                {
                    // Obtém dados para consulta similar
                    if(json_resp.name.trim().toLowerCase() == this.trata_consulta())
                    {
                        v_pagina    =   json_resp;
                    } // if(json_resp.name.trim().toLowerCase() == this.trata_consulta())
                }); // v_resposta.forEach((json_resp) =>

                // Se a informação da página for - Não definida
                // Procura pelo primeiro registro
                if(typeof v_pagina  === 'undefined')
                {
                    v_pagina        =   bib_underline.first(v_resposta);
                } // if(typeof v_pagina === 'undefined')

                // Se a informação da página permanecer como indefinida.
                if(typeof v_pagina  === 'undefined')
                {
                    // Comunica com o usuário
                    console.log('Pagina indefinida pós consulta');
                    return;
                } // if(typeof v_pagina  === 'undefined')

                // Comunica com o usuário
                console.log('Sua pesquisa foi encontrada');
                return;

            }); // bib_requisicao.get(v_url_consulta, (p_erro, p_resposta, p_corpo) =>
        } // try { ... }
        catch(p_erro)
        {
            console.log(p_erro);
            console.trace();
        } // catch(p_erro) { ... }
    } // consultar(p_termo_consulta,p_tipo)

} // class ragnaplace { ... }


// Torna o método público - Acesso externo é permitido.
module.exports = ragnaplace;

