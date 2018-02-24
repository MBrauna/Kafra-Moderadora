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
        // Tratamento de excessão
        try
        {
            // Prepara os dados iniciais para consulta na enciclopédia.
            let    v_termo_consulta     =   encodeURI(p_consulta.trim())
                  ,v_url_bropedia       =   `http://bropedia.net/api.php?action=query&list=search&srsearch=${v_termo_consulta}&utf8=&format=json`
                  ,v_obj_resposta       =   Object.assign({}, p_obj_msg)
                  ,v_resposta
                  ,v_pagina
                  ;


            // Realiza uma chamada no webservice da enciclopédia
            bib_requisicao.get(v_url_bropedia, (p_erro, p_resposta, p_corpo) =>
            {
                // Coleta as informações cedidas pelo webservice - Retorno JSON - Consulta à enciclopédia
                v_resposta  =   JSON.parse(p_corpo);

                // Verifica quantidade de resultados obtidos
                if(v_resposta.query.searchinfo.totalhits == 0)
                {
                    v_obj_resposta.embed.color              =   p_config.cor_vermelha.color;
                    v_obj_resposta.embed.title              =   'TERMO NÃO ENCONTRADO NA WIKI';
                    v_obj_resposta.embed.url                =   null;
                    v_obj_resposta.embed.description        =   'Desculpe ):';
                    v_obj_resposta.embed.fields             =   [
                                                                    {
                                                                        name: 'ZERO! NADA! VAZIO!'
                                                                       ,value: 'O termo "' + p_consulta + '" procurado não foi encontrado em minha base de dados!'
                                                                    }
                                                                ];

                    this.obj_resposta                       =   Object.assign({}, v_obj_resposta);
                } // if(v_resposta.query.searchinfo.totalhits == 0)
                else
                {
                    // Roda a consulta procurando por algo similar ao pesquisado
                    v_resposta.query.search.forEach((json_resp) =>
                    {
                        // Teste - Consulta similar
                        if(json_resp.title.toLowerCase() == p_consulta.trim().toLowerCase())
                        {
                            // Caso encontre: A página desejada se faz presente.
                            v_pagina    =   json_resp;
                        } // if(json_resp.title.toLowerCase() == p_consulta.trim().toLowerCase())
                    });

                    // Verifica se a página informada foi definida, caso não seja utiliza a primeira opção obtida na query
                    if(typeof v_pagina === 'undefined')
                    {
                        v_pagina        =   bib_underline.first(v_resposta.query.search);
                    } // if(typeof v_pagina === 'undefined')

                    this.monta_resposta(v_pagina.title, p_obj_msg, p_config);

                    console.log('->> OBJETO <<-');
                    console.log(this.obj_resposta);
                } // else { ... }
            }); // bib_requisicao.get(v_url_bropedia, (p_erro, p_resposta, p_corpo) => {

            // Retorna a requisição
            return this.obj_resposta;
        } // try { ... }
        catch(p_erro)
        {
            // Em caso de erro, tenta montar uma nova mensagem, avisando sobre o erro
            try
            {
                // Cria uma novo objeto para modificação.
                const v_obj_resposta                    =   Object.assign({}, p_obj_msg);
                // Marca as informações
                v_obj_resposta.embed.color              =   p_config.cor_vermelha.color;
                v_obj_resposta.embed.title              =   'NÃO FOI POSSÍVEL CONSULTAR';
                v_obj_resposta.embed.url                =   null;
                v_obj_resposta.embed.description        =   'Não consegui GENTE!!!';
                v_obj_resposta.embed.fields             =   [
                                                                {
                                                                    name: 'Ocorreu um erro durante a consulta'
                                                                   ,value: 'O termo "' + p_consulta + '" gerou um erro! Acha que é sentar e chorar? Nananinanão avise um administrador.'
                                                                }
                                                            ];
                // Informa sobre o erro
                return v_obj_resposta;
            } // try { ... }
            catch(p_erro_sec)
            {
                // Caso nada acima surgir efeito ...
                console.log('-- --> CONSULTAR <-- --');
                console.log(p_erro);
                console.log('-- --> CONSULTAR <-- --');
                console.log(p_erro_sec);
                console.log('-- --> CONSULTAR <-- --');
                console.trace();
                console.log('-- --> CONSULTAR <-- --');

            } // catch(p_erro_sec) { ... }

        } // catch(p_erro) { ... }
    } // consultar(p_consulta, p_obj_msg, p_config)


    monta_resposta(p_titulo, p_obj_msg, p_config)
    {
        try
        {
            // Declaração de variáveis - Criação da resposta
            let     v_url_bropedia      =   `http://bropedia.net/api.php?action=query&titles=${p_titulo}&prop=info|revisions&inprop=url&rvprop=content&format=json`
                   ,v_obj_resposta      =   Object.assign({}, p_obj_msg)
                   ,v_partes            =   []
                   ,v_redirecionamento  =   false
                   ,v_redirect
                   ,v_pagina
                   ,v_revisao
                   ,v_resposta
                   ;

            // Realiza uma chamada no webservice da enciclopédia
            bib_requisicao.get(v_url_bropedia, (p_erro, p_resposta, p_corpo) =>
            {
                // Monta os dados
                v_resposta          =   JSON.parse(p_corpo);
                v_pagina            =   v_resposta.query.pages[Object.keys(v_resposta.query.pages)[0]];
                v_revisao           =   bib_underline.first(v_pagina.revisions);

                // Veririca se a informação é um redirect
                if(!v_redirecionamento && !bib_underline.isEmpty(v_revisao) && v_revisao['*'].indexOf('#REDIRECIONAMENTO') > -1)
                {
                    // Marca a página que receberá o redirect
                    v_redirect      =   v_revisao['*'].replace('#REDIRECIONAMENTO [[','').replace(']]','');

                    // Chama o mesmo método para encontrar as informações
                    return this.consultar(v_redirect, p_obj_msg, p_config);
                }

                // Caso a página não tenha sido encontrada
                if(typeof v_pagina == 'undefined')
                {
                    v_obj_resposta.embed.color              =   p_config.cor_vermelha.color;
                    v_obj_resposta.embed.title              =   'NÃO FOI POSSÍVEL CONSULTAR';
                    v_obj_resposta.embed.url                =   null;
                    v_obj_resposta.embed.description        =   'Não consegui GENTE!!!';
                    v_obj_resposta.embed.fields             =   [
                                                                    {
                                                                        name: 'Ocorreu um erro durante a consulta'
                                                                       ,value: 'O termo "' + p_titulo + '" gerou um erro! Acha que é sentar e chorar? Nananinanão avise um administrador.'
                                                                    }
                                                                ];

                    // Informa sobre o erro
                } // if(typeof v_pagina == 'undefined')
                else
                {
                    v_obj_resposta.embed.color              =   p_config.cor_verde.color;
                    v_obj_resposta.embed.title              =   v_pagina.title;
                    v_obj_resposta.embed.url                =   v_pagina.canonicalurl;
                    v_obj_resposta.embed.description        =   'Este é o resultado mais relevante para ' + p_titulo;
                    v_obj_resposta.embed.fields             =   [
                                                                    {
                                                                        name: v_pagina.title
                                                                       ,value: v_pagina.canonicalurl
                                                                    }
                                                                ];
                } // else  { ... }

                this.obj_resposta                           =   Object.assign({}, v_obj_resposta);
            }); // bib_requisicao.get(v_url_bropedia, (p_erro, p_resposta, p_corpo) =>
        } // try { ... }
        catch(p_erro)
        {
            // Em caso de erro, tenta montar uma nova mensagem, avisando sobre o erro
            try
            {
                // Cria uma novo objeto para modificação.
                const v_obj_resposta                    =   Object.assign({}, p_obj_msg);
                // Marca as informações
                v_obj_resposta.embed.color              =   p_config.cor_vermelha.color;
                v_obj_resposta.embed.title              =   'NÃO FOI POSSÍVEL CONSULTAR';
                v_obj_resposta.embed.url                =   null;
                v_obj_resposta.embed.description        =   'Não consegui GENTE!!!';
                v_obj_resposta.embed.fields             =   [
                                                                {
                                                                    name: 'Ocorreu um erro durante a consulta'
                                                                   ,value: 'O termo "' + p_consulta + '" gerou um erro! Acha que é sentar e chorar? Nananinanão avise um administrador.'
                                                                }
                                                            ];

                // Informa sobre o erro
                this.obj_resposta                       =   Object.assign({}, v_obj_resposta);
            } // try { ... }
            catch(p_erro_sec)
            {
                // Caso nada acima surgir efeito ...
                console.log('-- --> MONTA RESPOSTA <-- --');
                console.log(p_erro);
                console.log('-- --> MONTA RESPOSTA <-- --');
                console.log(p_erro_sec);
                console.log('-- --> MONTA RESPOSTA <-- --');
                console.trace();
                console.log('-- --> MONTA RESPOSTA <-- --');

            } // catch(p_erro_sec) { ... }
        } // catch(p_erro) { ... }
    } // monta_resposta(p_titulo, p_obj_msg, p_config)

} // class bropedia



// Torna o método público
module.exports = bropedia;
