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
    constructor(p_obj_msg, p_config, p_mensagem, p_cliente)
    {
        console.log('[BROPEDIA] - BIBLIOTECA CARREGADA');
        this.obj_resposta       =   Object.assign({}, p_obj_msg);
        this.obj_config         =   Object.assign({}, p_config);
        this.obj_mensagem       =   p_mensagem;
        this.obj_cliente        =   p_cliente;

    } // constructor(p_obj_msg, p_config, p_mensagem, p_cliente)

    consultar(p_consulta)
    {
        // Prepara os dados iniciais para consulta na enciclopédia.
        let    v_termo_consulta     =   encodeURI(p_consulta.trim())
              ,v_url_bropedia       =   `http://bropedia.net/api.php?action=query&list=search&srsearch=${v_termo_consulta}&utf8=&format=json`
              ,v_obj_resposta       =   this.obj_resposta
              ,v_resposta
              ,v_pagina
              ;

        // Tratamento de excessão
        try
        {
            // Realiza uma chamada no webservice da enciclopédia
            bib_requisicao.get(v_url_bropedia, (p_erro, p_resposta, p_corpo) =>
            {
                // Coleta as informações cedidas pelo webservice - Retorno JSON - Consulta à enciclopédia
                v_resposta  =   JSON.parse(p_corpo);

                // Verifica quantidade de resultados obtidos
                if(v_resposta.query.searchinfo.totalhits == 0)
                {
                    v_obj_resposta.embed.color              =   this.obj_config.cor_vermelha.color;
                    v_obj_resposta.embed.title              =   'TERMO NÃO ENCONTRADO NA WIKI';
                    v_obj_resposta.embed.url                =   null;
                    v_obj_resposta.embed.description        =   'Desculpe ):';
                    v_obj_resposta.embed.fields             =   [
                                                                    {
                                                                        name: 'ZERO! NADA! VAZIO!'
                                                                       ,value: 'O termo "' + p_consulta + '" procurado não foi encontrado em minha base de dados!'
                                                                    }
                                                                ];

                    // Adiciona o objeto de volta a variável
                    this.obj_mensagem   =   {};
                    this.obj_mensagem   =   Object.assign({}, v_obj_resposta);
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

                    // Monta resposta
                    this.monta_resposta(v_pagina.title);
                    v_obj_resposta      =   {};
                    v_obj_resposta      =   Object.assign({}, this.obj_mensagem);
                } // else { ... }
            }); // bib_requisicao.get(v_url_bropedia, (p_erro, p_resposta, p_corpo) => {

            // Finaliza o procedimento
            console.log('-- >> bropedia << --');
            return v_obj_resposta;
            console.log('-- >> bropedia << --');
        } // try { ... }
        catch(p_erro)
        {
            // Em caso de erro, tenta montar uma nova mensagem, avisando sobre o erro
            try
            {
                // Cria uma novo objeto para modificação.
                v_obj_resposta.embed.color              =       this.obj_config.cor_vermelha.color;
                v_obj_resposta.embed.title              =       'NÃO FOI POSSÍVEL CONSULTAR';
                v_obj_resposta.embed.url                =       null;
                v_obj_resposta.embed.description        =       'Não consegui GENTE!!!';
                v_obj_resposta.embed.fields             =       [
                                                                    {
                                                                        name: 'Ocorreu um erro durante a consulta'
                                                                       ,value: 'O termo "' + p_consulta + '" gerou um erro! Acha que é sentar e chorar? Nananinanão avise um administrador.'
                                                                    }
                                                                ];

                // Informa sobre o erro
                console.log('-- >> bropedia erro 1<< --');
                return v_obj_resposta;
                console.log('-- >> bropedia erro 1<< --');
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

                // Informa sobre o erro
                console.log('-- >> bropedia erro 2< --');
                return this.obj_resposta;
                console.log('-- >> bropedia erro 2<< --');
            } // catch(p_erro_sec) { ... }

        } // catch(p_erro) { ... }
    } // consultar(p_consulta)



    monta_resposta(p_titulo)
    {
        // Declaração de variáveis - Criação da resposta
        let     v_url_bropedia      =   `http://bropedia.net/api.php?action=query&titles=${p_titulo}&prop=info|revisions&inprop=url&rvprop=content&format=json`
               ,v_partes            =   []
               ,v_redirecionamento  =   false
               ,v_obj_resposta      =   this.obj_resposta
               ,v_redirect
               ,v_pagina
               ,v_revisao
               ,v_resposta
               ;

        try
        {
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
                    this.consultar(v_redirect);
                } // if(!v_redirecionamento && !bib_underline.isEmpty(v_revisao) && v_revisao['*'].indexOf('#REDIRECIONAMENTO') > -1)

                // Caso a página não tenha sido encontrada
                if(typeof v_pagina == 'undefined')
                {
                    v_obj_resposta.embed.color             =    this.obj_config.cor_vermelha.color;
                    v_obj_resposta.embed.title             =    'NÃO FOI POSSÍVEL CONSULTAR';
                    v_obj_resposta.embed.url               =    null;
                    v_obj_resposta.embed.description       =    'Não consegui GENTE!!!';
                    v_obj_resposta.embed.fields            =    [
                                                                    {
                                                                        name: 'Ocorreu um erro durante a consulta'
                                                                       ,value: 'O termo "' + p_titulo + '" gerou um erro! Acha que é sentar e chorar? Nananinanão avise um administrador.'
                                                                    }
                                                                ];

                    // Informa sobre o erro
                } // if(typeof v_pagina == 'undefined')
                else
                {
                    v_obj_resposta.embed.color              =   this.obj_config.cor_verde.color;
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

                this.obj_mensagem           =   {};
                this.obj_mensagem           =   Object.assign({}, v_obj_resposta);
            }); // bib_requisicao.get(v_url_bropedia, (p_erro, p_resposta, p_corpo) =>
        } // try { ... }
        catch(p_erro)
        {
            // Em caso de erro, tenta montar uma nova mensagem, avisando sobre o erro
            try
            {
                // Marca as informações
                v_obj_resposta.embed.color              =       this.obj_config.cor_vermelha.color;
                v_obj_resposta.embed.title              =       'NÃO FOI POSSÍVEL CONSULTAR';
                v_obj_resposta.embed.url                =       null;
                v_obj_resposta.embed.description        =       'Não consegui GENTE!!!';
                v_obj_resposta.embed.fields             =       [
                                                                    {
                                                                        name: 'Ocorreu um erro durante a consulta'
                                                                       ,value: 'O termo "' + p_consulta + '" gerou um erro! Acha que é sentar e chorar? Nananinanão avise um administrador.'
                                                                    }
                                                                ];

                this.obj_mensagem   =   {};
                this.obj_mensagem   =   Object.assign({}, v_obj_resposta);
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