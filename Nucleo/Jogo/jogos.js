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

    gera_aleatorio(p_minimo, p_maximo)
    {
        try
        {
            var v_minimo    =   Math.ceil(p_minimo);
            var v_maximo    =   Math.floor(p_maximo);
            return Math.floor(Math.random() * (v_maximo - v_minimo + 1)) + v_minimo;
        }
        catch(p_erro)
        {
            return p_minimo;
        }
    }

    sorte()
    {
        try
        {
            // Monta o resultado do jogo de sorte -> min(1) max(6)
            var v_resultado =   this.gera_aleatorio(1,6);

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
            var v_resultado     =   '';

            switch(this.gera_aleatorio(1,3))
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
                    v_resultado     =   ':exclamation:';
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
