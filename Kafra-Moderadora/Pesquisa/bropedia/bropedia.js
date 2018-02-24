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
    construct(p_obj_msg, p_config)
    {
        console.log('[BROPEDIA] - BIBLIOTECA CARREGADA');
        this.v_obj_resposta     =   Object.assign({}, p_obj_msg);
        this.p_config           =   Object.assign({}, p_config);
    } // construct()

    consultar(p_consulta)
    {
        // Tratamento de excessão
        try
        {
            // Prepara os dados iniciais para consulta na enciclopédia.
            let    v_termo_consulta     =   encodeURI(p_consulta.trim())
                  ,v_url_bropedia       =   `http://bropedia.net/api.php?action=query&list=search&srsearch=${v_termo_consulta}&utf8=&format=json`
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
                    console.log('123');
                    this.v_obj_resposta.embed.color              =  this.p_config.cor_vermelha.color;
                    this.v_obj_resposta.embed.title              =  'TERMO NÃO ENCONTRADO NA WIKI';
                    this.v_obj_resposta.embed.url                =  null;
                    this.v_obj_resposta.embed.description        =  'Desculpe ):';
                    this.v_obj_resposta.embed.fields             =  [
                                                                        {
                                                                            name: 'ZERO! NADA! VAZIO!'
                                                                           ,value: 'O termo "' + p_consulta + '" procurado não foi encontrado em minha base de dados!'
                                                                        }
                                                                    ];
                    return this.v_obj_resposta;
                } // if(v_resposta.query.searchinfo.totalhits == 0)
                else
                {
                    console.log('456');
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

                    return this.v_obj_resposta;
                } // else { ... }
            }); // bib_requisicao.get(v_url_bropedia, (p_erro, p_resposta, p_corpo) => {
        } // try { ... }
        catch(p_erro)
        {
            // Em caso de erro, tenta montar uma nova mensagem, avisando sobre o erro
            try
            {
                console.log('ERRO 123');
                // Cria uma novo objeto para modificação.
                this.v_obj_resposta                         =   Object.assign({}, p_obj_msg);

                // Marca as informações
                this.v_obj_resposta.embed.color             =       this.p_config.cor_vermelha.color;
                this.v_obj_resposta.embed.title             =       'NÃO FOI POSSÍVEL CONSULTAR';
                this.v_obj_resposta.embed.url               =       null;
                this.v_obj_resposta.embed.description       =       'Não consegui GENTE!!!';
                this.v_obj_resposta.embed.fields            =       [
                                                                        {
                                                                            name: 'Ocorreu um erro durante a consulta'
                                                                           ,value: 'O termo "' + p_consulta + '" gerou um erro! Acha que é sentar e chorar? Nananinanão avise um administrador.'
                                                                        }
                                                                    ];
                // Informa sobre o erro
                return this.v_obj_resposta;
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

} // class bropedia



// Torna o método público
module.exports = bropedia;
