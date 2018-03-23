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

class envia_mensagem
{
    constructor(p_cliente, p_mensagem)
    {
        this.obj_cliente        =   p_cliente;
        this.obj_mensagem       =   p_mensagem;
    } // constructor(p_cliente, p_mensagem)


    resposta_positiva(p_mencao)
    {
        return '[Kafra moderadora] - Teste (+)';
    } // resposta_positiva()


    resposta_negativa(p_mencao)
    {
        return '[Kafra moderadora] - Teste (-)';
    } // resposta_negativa()

    resposta(p_tipo_resposta, p_mencao)
    {
        if(p_tipo_resposta)
        {
            return this.resposta_positiva();
        } // if(p_tipo_resposta)
        else
        {
            return this.resposta_negativa();
        } // else { ... }
    } // resposta(p_tipo_resposta)

    /**************************************************
     *                  ENVIO DE URL                  *
     **************************************************/
    envia_URL_simples(p_url, p_mencao, p_tipo_resposta)
    {
        this.obj_mensagem.channel.send(resposta(p_tipo_resposta, p_mencao) + '\n' + p_url);
    } // url_canal(p_url)


    envia_URL_completa(p_url, p_mencao, p_objeto)
    {
        this.obj_mensagem.channel.send(resposta(p_tipo_resposta, p_mencao) + '\n EMBED:' + p_url);
    } // url_direto(p_url, p_mencao)


    /**************************************************
     *                ENVIO DE ALERTA                 *
     **************************************************/
    alerta_canal(p_url, p_mencao)
    {
        this.obj_mensagem.channel.send(resposta(p_tipo_resposta, p_mencao) + '\n ALERTA:' + p_url);
    } // url_canal(p_url)


    url_direto(p_url, p_mencao)
    {
        this.obj_mensagem.channel.send(resposta(p_tipo_resposta, p_mencao) + '\n ALERTA:' + p_url);
    } // url_direto(p_url, p_mencao)
} // class envia_mensagem