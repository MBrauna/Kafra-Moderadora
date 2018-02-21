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


class comando
{
    construct()
    {
        console.log('Construtor de comandos inicializado.');
    } // construct()


    trata_mensagem(p_cliente, p_mensagem)
    {
        try
        {
            var v_kafra_prefixo         =   '<@' + p_cliente.user.id + '>';
            var v_kafra_id              =   p_cliente.user.id;
            var v_tmp_prefixo           =   p_mensagem.content.startsWith(v_kafra_prefixo);
            var v_tmp_tamanho           =   p_mensagem.mentions.users.keyArray().length;
            var v_tmp_mencao            =   false;

            // Verifica se a mensagem enviada foi de um bot ou usuário
            if(p_mensagem.author.bot) return; // Caso seja de um bot finaliza a verificação


            // Verifica se a mensagem foi iniciada com o prefixo desejado!
            if(v_tmp_prefixo)
            {
                console.log('Provavel comando');
                console.log(p_mensagem.content.slice(v_kafra_prefixo.length).trim().split(/ +/g));
                console.log('------------------');
            } // if(v_tmp_prefixo)
            else if(v_tmp_tamanho > 0)
            {
                for(var tmp_integer = 0; tmp_integer < v_tmp_tamanho; tmp_integer++)
                {
                    /*if(p_mensagem.mentions[tmp_integer] === v_kafra_id)
                    {
                        // Marca que ocorreu uma menção do bot
                        console.log(p_mensagem.mentions[tmp_integer].id);
                        v_tmp_mencao = true;
                    } // if(p_mensagem.mentions[tmp_integer].id === this.init_kafra.id)
                    */
                    console.log(p_mensagem.mentions[tmp_integer]);
                } // for(var tmp_integer = 0; tmp_integer < v_tmp_tamanho; tmp_integer++)

                // Caso tenha encontrado uma menção gera alerta
                if(v_tmp_mencao)
                {
                    console.log('Menção');
                }
            } // else if(v_tmp_tamanho > 0)
        }
        catch(p_erro)
        {
            console.log(p_erro);
            console.trace();
        }
    } // trata_mensagem(p_cliente, p_mensagem)
} // CLASS COMANDO


// Torna o método público
module.exports = comando;
