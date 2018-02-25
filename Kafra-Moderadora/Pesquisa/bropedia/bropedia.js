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
        this.obj_resposta       =   p_obj_msg;
        this.obj_config         =   p_config;
        this.obj_mensagem       =   p_mensagem;
        this.obj_cliente        =   p_cliente;

    } // constructor(p_obj_msg, p_config, p_mensagem, p_cliente)

    consultar(p_consulta)
    {
        // Prepara os dados iniciais para consulta na enciclopédia.
        let    v_termo_consulta     =   encodeURI(p_consulta.trim())
              ,v_url_bropedia       =   `http://bropedia.net/api.php?action=query&list=search&srsearch=${v_termo_consulta}&utf8=&format=json`
              ,v_obj_resposta       =   Object.assign({}, this.obj_resposta)
              ,v_partes             =   []
              ,v_redirecionamento   =   false
              ,v_redirect
              ,v_resposta
              ,v_revisao
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
                console.log('1');
                // Verifica quantidade de resultados obtidos
                if(v_resposta.query.searchinfo.totalhits == 0)
                {
                    console.log('2');
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
                } // if(v_resposta.query.searchinfo.totalhits == 0)
                else
                {
                    console.log('3');
                    // Roda a consulta procurando por algo similar ao pesquisado
                    v_resposta.query.search.forEach((json_resp) =>
                    {
                        console.log('4');
                        // Teste - Consulta similar
                        if(json_resp.title.toLowerCase() == p_consulta.trim().toLowerCase())
                        {
                            console.log('5');
                            // Caso encontre: A página desejada se faz presente.
                            v_pagina    =   json_resp;
                        } // if(json_resp.title.toLowerCase() == p_consulta.trim().toLowerCase())
                    });

                    // Verifica se a página informada foi definida, caso não seja utiliza a primeira opção obtida na query
                    if(typeof v_pagina === 'undefined')
                    {
                        console.log('6');
                        v_pagina        =   bib_underline.first(v_resposta.query.search);
                    } // if(typeof v_pagina === 'undefined')

                    // Se mesmo assim a página permanecer não definida
                    if(typeof v_pagina === 'undefined')
                    {
                        console.log('7');
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
                    }
                    else
                    {
                        console.log('8');
                        // Define nova consulta para obtenção dos dados
                        v_url_bropedia  =   `http://bropedia.net/api.php?action=query&titles=${v_pagina.titulo}&prop=info|revisions&inprop=url&rvprop=content&format=json`;

                        // Reaiza a requisição das informações da página
                        bib_requisicao.get(v_url_bropedia, (p_erro_pg, p_resposta_pg, p_corpo_pg) =>
                        {
                            console.log('9');
                            // Monta os dados
                            v_resposta          =   JSON.parse(p_corpo_pg);
                            v_pagina            =   v_resposta.query.pages[Object.keys(v_resposta.query.pages)[0]];
                            v_revisao           =   bib_underline.first(v_pagina.revisions);

                            // Veririca se a informação é um redirect
                            if(!v_redirecionamento && !bib_underline.isEmpty(v_revisao) && v_revisao['*'].indexOf('#REDIRECIONAMENTO') > -1)
                            {
                                console.log('10');
                                // Marca a página que receberá o redirect
                                v_redirect      =   v_revisao['*'].replace('#REDIRECIONAMENTO [[','').replace(']]','');

                                // Chama o mesmo método para encontrar as informações
                                this.consultar(v_redirect);
                            } // if(!v_redirecionamento && !bib_underline.isEmpty(v_revisao) && v_revisao['*'].indexOf('#REDIRECIONAMENTO') > -1)

                            // Caso a página não tenha sido encontrada
                            if(typeof v_pagina == 'undefined')
                            {
                                console.log('11');
                                v_obj_resposta.embed.color             =    this.obj_config.cor_vermelha.color;
                                v_obj_resposta.embed.title             =    'NÃO FOI POSSÍVEL CONSULTAR';
                                v_obj_resposta.embed.url               =    null;
                                v_obj_resposta.embed.description       =    'Não consegui GENTE!!!';
                                v_obj_resposta.embed.fields            =    [
                                                                                {
                                                                                    name: 'Ocorreu um erro durante a consulta'
                                                                                   ,value: 'O termo "' + p_consulta + '" gerou um erro! Acha que é sentar e chorar? Nananinanão avise um administrador.'
                                                                                }
                                                                            ];

                                // Informa sobre o erro
                            } // if(typeof v_pagina == 'undefined')
                            else
                            {
                                console.log('12');
                                v_obj_resposta.embed.color              =   this.obj_config.cor_verde.color;
                                v_obj_resposta.embed.title              =   v_pagina.title;
                                v_obj_resposta.embed.url                =   v_pagina.canonicalurl;
                                v_obj_resposta.embed.description        =   'Este é o resultado mais relevante para ' + p_consulta;
                                v_obj_resposta.embed.fields             =   [
                                                                                {
                                                                                    name: v_pagina.title
                                                                                   ,value: v_pagina.canonicalurl
                                                                                }
                                                                            ];
                            } // else  { ... }
                        }); // bib_requisicao.get(v_url_bropedia, (p_erro, p_resposta, p_corpo) =>
                    } // else { ... }
                } // else { ... }
            }); // bib_requisicao.get(v_url_bropedia, (p_erro, p_resposta, p_corpo) => {

            console.log('13');
            // Finaliza o procedimento
            console.log('-- >> bropedia << --');
            console.log(v_obj_resposta)
            console.log('-- >> bropedia << --');
            return v_obj_resposta;
            
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

} // class bropedia



// Torna o método público
module.exports = bropedia;