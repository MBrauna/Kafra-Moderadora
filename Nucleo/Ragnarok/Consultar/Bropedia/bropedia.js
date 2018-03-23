/****************************************************************************************************
 * Autor: MBrauna                                                                  Data: 21/02/2018 *
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
let bib_requisicao          =   require('request')
   ,bib_underline           =   require('underscore')
   ,bib_wtf_wiki            =   require('wtf_wikipedia')
   ,bib_replicador          =   require('./../../../Replicador/envia_mensagem.js')
   ;
// Inicialização de bibliotecas                                 (∩｀-´)⊃━☆ﾟ.*･｡ﾟ

class bropedia
{
    constructor(p_cliente, p_mensagem)
    {
        this.obj_cliente        =   p_cliente;
        this.obj_mensagem       =   p_mensagem;
    } // constructor(p_obj_msg, p_config, p_mensagem, p_cliente)


    trata_consulta(p_array_frase)
    {
        var v_string_requisicao = '';

        for(var i=1;i<p_array_frase.length;i++)
        {
            // Forma a string
            v_string_requisicao = v_string_requisicao + p_array_frase[i] + ' ';
        } // for(var i=1;i<=p_array_frase.length;i++)

        return v_string_requisicao.trim();
    } // trata_consulta(p_array_frase)



    consultar(p_consulta)
    {
        // Prepara os dados iniciais para consulta na enciclopédia.
        let    v_consulta           =   this.trata_consulta(p_consulta)
              ,v_termo_consulta     =   encodeURI(v_consulta.trim())
              ,v_url_bropedia       =   `http://bropedia.net/api.php?action=query&list=search&srsearch=${v_termo_consulta}&utf8=&format=json`
              ,v_obj_resposta       =   {}
              ,v_partes             =   []
              ,v_array_resp         =   []
              ,v_redirecionamento   =   false
              ,v_contador           =   0
              ,v_redirect
              ,v_resposta
              ,v_revisao
              ,v_pagina
              ,v_pagina_final
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
                    v_consulta              =   p_consulta[1].trim().substring(0, (v_consulta.trim().length/2)) + '*';
                    v_termo_consulta        =   encodeURI(v_consulta.trim());
                    v_url_bropedia          =   `http://bropedia.net/api.php?action=query&list=search&srsearch=${v_termo_consulta}&utf8=&format=json`;


                    bib_requisicao.get(v_url_bropedia, (p_erro_tmp, p_resposta_tmp, p_corpo_tmp) =>
                    {
                        // Atribui o novo valor de carpo
                        v_resposta  =   JSON.parse(p_corpo_tmp);

                        // Verifica os resultados finais
                        if(v_resposta.query.searchinfo.totalhits == 0)
                        {
                            new bib_replicador.envia_URL_simples('Nenhuma informação foi encontrada!', true, false);
                            return;
                        } // if(v_resposta.query.searchinfo.totalhits == 0)
                        else
                        {
                            v_resposta.query.search.forEach(p_tmp_dado => {
                                var tmp_info = {
                                                    name: 'Termo: ' +  p_tmp_dado.title
                                                   ,value: 'wiki ' + p_tmp_dado.title
                                                };

                                v_array_resp.push(tmp_info);
                            });

                            // Informa o usuário
                            new bib_replicador.envia_URL_simples('Outra consulta feita', true, false);
                            return;
                        } // else { ... }
                    }); // bib_requisicao.get(v_url_bropedia, (p_erro_tmp, p_resposta_tmp, p_corpo_tmp) =>
                    
                } // if(v_resposta.query.searchinfo.totalhits == 0)
                else
                {
                    // Roda a consulta procurando por algo similar ao pesquisado
                    v_resposta.query.search.forEach((json_resp) =>
                    {
                        // Teste - Consulta similar
                        if(json_resp.title.toLowerCase() == v_consulta.trim().toLowerCase())
                        {
                            // Caso encontre: A página desejada se faz presente.
                            v_pagina    =   json_resp;
                        } // if(json_resp.title.toLowerCase() == v_consulta.trim().toLowerCase())
                    });

                    // Verifica se a página informada foi definida, caso não seja utiliza a primeira opção obtida na query
                    if(typeof v_pagina === 'undefined')
                    {
                        v_pagina        =   bib_underline.first(v_resposta.query.search);
                    } // if(typeof v_pagina === 'undefined')

                    // Se mesmo assim a página permanecer não definida
                    if(typeof v_pagina === 'undefined')
                    {
                        // Define o objeto a ser utilizado
                        // Informa o usuário
                        new bib_replicador.envia_URL_simples('Termo não encontrado!', true, false);
                        return;
                    }

                    // Define nova consulta para obtenção dos dados
                    v_url_bropedia  =   `http://bropedia.net/api.php?action=query&titles=${v_pagina.title}&prop=info|revisions&inprop=url&rvprop=content&format=json`;

                    // Reaiza a requisição das informações da página
                    bib_requisicao.get(v_url_bropedia, (p_erro_pg, p_resposta_pg, p_corpo_pg) =>
                    {
                        // Monta os dados
                        v_resposta          =   JSON.parse(p_corpo_pg);
                        v_pagina_final      =   v_resposta.query.pages[Object.keys(v_resposta.query.pages)[0]];
                        v_revisao           =   bib_underline.first(v_pagina_final.revisions);

                        // Veririca se a informação é um redirect
                        if(!v_redirecionamento && !bib_underline.isEmpty(v_revisao) && v_revisao['*'].indexOf('#REDIRECIONAMENTO') > -1)
                        {
                            // Marca a página que receberá o redirect
                            v_redirect      =   v_revisao['*'].replace('#REDIRECIONAMENTO [[','').replace(']]','');

                            // Chama o mesmo método para encontrar as informações
                            this.consultar(v_redirect);
                            return;
                        } // if(!v_redirecionamento && !bib_underline.isEmpty(v_revisao) && v_revisao['*'].indexOf('#REDIRECIONAMENTO') > -1)

                        // Caso a página não tenha sido encontrada
                        if(typeof v_pagina_final == 'undefined')
                        {

                            // Informa o usuário
                            new bib_replicador.envia_URL_simples('Nada encontrado!', true, false);
                            return;

                        } // if(typeof v_pagina == 'undefined')
                        else
                        {
                            // Define o objeto a ser utilizado
                            // Informa o usuário
                            new bib_replicador.envia_URL_simples('Encontrou na wiki!', true, false);
                            return;
                        } // else  { ... }
                    }); // bib_requisicao.get(v_url_bropedia, (p_erro, p_resposta, p_corpo) =>
                } // else { ... }
            }); // bib_requisicao.get(v_url_bropedia, (p_erro, p_resposta, p_corpo) => {
            

            // Retorna a função
            return;
        } // try { ... }
        catch(p_erro)
        {
            // Em caso de erro, tenta montar uma nova mensagem, avisando sobre o erro
            try
            {
                // Cria uma novo objeto para modificação.
                // Informa o usuário
                new bib_replicador.envia_URL_simples('Erro!', true, false);
                return;
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
                console.log('-- >> bropedia erro << --');
                return;
                console.log('-- >> bropedia erro << --');
            } // catch(p_erro_sec) { ... }

        } // catch(p_erro) { ... }
    } // consultar(p_consulta)

} // class bropedia



// Torna o método público
module.exports = bropedia;