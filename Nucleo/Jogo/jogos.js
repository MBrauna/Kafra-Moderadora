/****************************************************************************************************
 * Autor: Michel Brauna                                                            Data: 15/03/2018 *
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
 ****************************************************************************************************/

class jogo
{
    constructor(p_cliente, p_mensagem)
    {
        this.obj_cliente    =   p_cliente;
        this.obj_mensagem   =   p_mensagem;
    } // constructor(p_cliente, p_mensagem)

    sorte()
    {
        try
        {
            // Monta o resultado do jogo de sorte -> min(1) max(6)
            var v_resultado = Math.random() * (6 - 1) + 1;

            console.log(v_resultado);
            return;
        } // try { ... }
        catch(p_erro)
        {
            console.log(p_erro);
            console.trace();
        } // catch(p_erro) { ... }
    } // sorte() { ... }



    jokenpo()
    {
        try
        {
            // Monta o resultado do jogo de sorte -> min(1) max(3)
            var v_jokenpo       =   Math.random() * (3 - 1) + 1;
            var v_resultado     =   '';

            switch(v_jokenpo)
            {
                case 1:
                    // Se este for o escolhido ... anotará Pedra
                    v_resultado     =   ':fist:';
                    break;
                case 2:
                    // Se este for o escolhido ... anotará tesoura
                    v_resultado     =   ':v:';
                    break;
                case 3:
                    // Se este for o escolhido ... anotará papel
                    v_resultado     =   ':hand_splayed:';
                    break;
                default:
                    v_resultado     =   ':fist:';
                    break;
            }

            console.log(v_resultado);
            return;
        } // try { ... }
        catch(p_erro)
        {
            console.log(p_erro);
            console.trace();
        } // catch(p_erro) { ... }
    } // jokenpo() { .. }
} // class jogo

// Torna o método público - Acesso externo é permitido.
module.exports = jogo;
