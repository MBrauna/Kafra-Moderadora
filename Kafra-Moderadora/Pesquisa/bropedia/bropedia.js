/****************************************************************************************************
 * Autor: MBrauna & Lazarento                                                      Data: 21/02/2018 *
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
let bib_requisicao      =   require('request')
   ,bib_underline       =   require('underscore')
   ,bib_wtf_wiki        =   require('wtf_wikipedia')
   ;
// Inicialização de bibliotecas                                 (∩｀-´)⊃━☆ﾟ.*･｡ﾟ

class bropedia
{
    construct()
    {
        console.log('[BROPEDIA] - BIBLIOTECA CARREGADA');
    } // construct()

    consultar(p_consulta, p_obj_msg, p_config)
    {
        // Guarda a string de consulta à enciclopédia
        let     v_termo_consulta    =   encodeURI(p_consulta.trim())
               ,v_url_bropedia      =   `http://bropedia.net/api.php?action=query&list=search&srsearch=${v_termo_consulta}&utf8=&format=json`
               ;


        // Inicia o procedimento de consulta ao termo desejado
        bib_requisicao.get(
            v_url_bropedia, (p_erro, p_resposta, p_corpo) =>
            {
                // Cria as variáveis para tratamento da resposta obtida da Wiki
                let v_resposta  =   JSON.parse(p_corpo)
                   ,v_pagina;

                // Verifica se o resultado da consulta trouxe algum argumento
                if(v_resposta.query.searchinfo.totalhits == 0)
                {
                    // Não há informações para o tipo de consulta escolhida
                    p_obj_msg.embed.color           =   p_config.cor_vermelha.color;
                    p_obj_msg.embed.title           =   'TERMO NÃO ENCONTRADO NA WIKI';
                    p_obj_msg.embed.description     =   'Desculpe ): O termo procurado não foi encontrado';
                    p_obj_msg.embed.fields          =   {
                                                            name: 'Desculpe! Não encontrei nada!'
                                                           ,value: 'O termo ' + p_consulta + 'procurado não foi encontrado em minha base de dados!'
                                                        };

                    console.log(p_obj_msg);
                    return p_obj_msg;
                } // if(v_resposta.query.searchinfo.totalhits == 0)
                else
                {
                    // Verifica se o termo consultado foi encontrado
                    v_resposta.query.search.forEach((p_retorno) => {
                        if(p_retorno.title.toLowerCase() == p_consulta.trim().toLowerCase())
                        {
                            // Degine para a Página o retorno da consulta
                            v_pagina    =   p_retorno;
                        } // if(p_retorno.title.toLowerCase() == p_consulta.trim().toLowerCase())
                    });

                    // Verifica se o dado obtido na consulta existe
                    if(typeof v_pagina === 'undefined')
                    {
                        // Define um novo valor para a página, no caso um que possa ser consultado
                        v_pagina    =   bib_underline.first(resp.query.search);
                    } // if(typeof v_pagina === 'undefined')

                    // Retorna a página desejada nos formatos esperados
                    return this.geraConsulta(p_obj_msg, p_config, v_pagina);
                } // else { ... }

            } // v_url_bropedia, (p_erro, p_resposta, p_corpo) =>
        );

    } // consultar(p_consulta, p_obj_msg, p_config)


    geraConsulta(p_obj_msg, p_config, p_pagina)
    {
        // Monta a string de consulta à Wiki
        const v_url_bropedia    =   `http://bropedia.net/api.php?action=query&titles=${p_pagina.title}&prop=info|revisions&inprop=url&rvprop=content&format=json`;

        // Realiza uma consulta nos dados da página
        bib_requisicao.get(
            v_url_bropedia, (p_erro, p_resposta, p_corpo) =>
            {
                // Declaração das variáveis necessárias para composição do objeto
                let  v_resposta     = JSON.parse(p_corpo)
                    ,v_pagina       = p_resposta.query.pages[Object.keys(p_resposta.query.pages)[0]]
                    ,v_msg_section  = []
                    ,v_obj_pagina
                    ;

                // Verifica se foi possível encontrar a página desejada
                if(typeof v_pagina == 'undefined')
                {
                    p_obj_msg.embed.color           =   p_config.cor_vermelha.color;
                    p_obj_msg.embed.title           =   'TERMO NÃO ENCONTRADO NA WIKI';
                    p_obj_msg.embed.description     =   'Desculpe ): O termo procurado não foi encontrado';
                    p_obj_msg.embed.fields          =   {
                                                            name: 'Desculpe! Não encontrei nada!'
                                                           ,value: 'O termo ' + p_consulta + 'procurado não foi encontrado em minha base de dados!'
                                                        };
                } // if(typeof v_pagina == 'undefined')
                else
                {
                    // Monta um objeto contendo as revisões utilizadas
                    v_obj_pagina    =   bib_wtf_wiki.parse(_.first(v_pagina.revisions)['*']);

                    if(typeof v_obj_pagina.sections !== 'undefined')
                    {
                        v_obj_pagina.sections.filter(
                                                        (section) =>
                                                        {
                                                            return section.sentences.length > 0 && !bib_underline.isEmpty(section.title)
                                                        }
                                                    ).forEach(
                                                                (section) =>
                                                                {
                                                                    v_msg_section.push(
                                                                    {
                                                                        name    :   section.title,
                                                                        value   :   bib_underline.first(section.sentences).text
                                                                    })
                                                                }
                                                            );

                        // Monta o objeto para retorno
                        p_obj_msg.embed.color           =   p_config.cor_verde.color;
                        p_obj_msg.embed.title           =   v_pagina.canonicalurl;
                        p_obj_msg.embed.description     =   'yay Consegui encontrar algo para: ' + p_pagina.title;
                        p_obj_msg.embed.fields          =   v_msg_section;

                    } // if(typeof v_obj_pagina.sections !== 'undefined')
                    else
                    {

                        p_obj_msg.embed.color           =   p_config.cor_vermelha.color;
                        p_obj_msg.embed.title           =   'TERMO NÃO ENCONTRADO NA WIKI';
                        p_obj_msg.embed.description     =   'Desculpe ): O termo procurado não foi encontrado';
                        p_obj_msg.embed.fields          =   {
                                                                name: 'Desculpe! Não encontrei nada!'
                                                               ,value: 'O termo ' + p_consulta + 'procurado não foi encontrado em minha base de dados!'
                                                            };
                    } // else { ... }
                } // else { ... }
            } // v_url_bropedia, (p_erro, p_resposta, p_corpo) =>
        ); // bib_requisicao.get(

        return p_obj_msg;
    } // geraConsulta(p_obj_msg, p_config, v_pagina)
} // class bropedia



// Torna o método público
module.exports = bropedia;
