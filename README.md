# Kafra Moderadora


A mais conhecida organização de serviços, com suas lindas garotas padronizadas com lindos uniformes de fácil identificação estão patrulhando Rune Midgard e agora também no Discord, embora sua sede esteja localizada em Aldebaran, avançados computadores chegaram lá e elas agora estão loucas para acompanhar tudo que a tecnologia oferece, para tal chamaram a menina ~~Gihkonta~~ ***Kafra Moderadora*** e ensinaram ela a administrar vários assuntos de Ragnarök Online.

Convide a [Kafra moderadora para seu Discord](https://discordapp.com/oauth2/authorize?client_id=415645321071427615&scope=bot&permissions=2146958591)



## Funcionalidades
- [x] Consulta de missões e histórias na [enciclopédia](https://bropedia.net).
- [x] Consulta de itens no [database](https://pt.ragnaplace.com/bRO/item-categories).
- [x] Consulta de monstros no [database](https://pt.ragnaplace.com/bRO/mob-categories).
- [x] Consulta de mapas no [database](https://pt.ragnaplace.com/bRO/map-categories).
- [x] Organização de grupos para Ragnarök Online.
- [x] Busca de grupos ativos para Ragnarök Online.
- [x] Chat
- [ ] Sistema de nível
- [ ] Filtro de palavras
- [ ] Sistema de avisos
- [ ] Banimento/Expulsão




## Comandos
Para listar todos os comandos da **Kafra Moderadora** utilize dos seguintes métodos:
- Citando diretamente através do comando `@Kafra Moderadora#7444`
- Solicitando ajuda através do comando `@Kafra Moderadora#7444 ajuda`
Uma lista personalizada e detalhada das funções será apresentada à todos do chat, nela todos os comandos nativos da **Kafra Moderadora** serão explicados de forma divertida.

>@Kafra Moderadora#7444 wiki TERMO_DESEJADO

A funcionalidade `wiki` irá acessar o projeto [bROPédia](https://bropedia.net) em busca do termo aplicado, retornando uma prévia da página ao usuário.

>@Kafra Moderadora#7444 item TERMO_DESEJADO

A funcionalidade `item` irá acessar o projeto [RagnaPlace](https://pt.ragnaplace.com/bRO/item-categories) em busca do termo aplicado, retornando uma prévia da página ao usuário, caso não encontre a informação desejada, uma lista de itens similares ao termo aplicado será lançada.

>@Kafra Moderadora#7444 monstro TERMO_DESEJADO

A funcionalidade `monstro` irá acessar o projeto [RagnaPlace](https://pt.ragnaplace.com/bRO/mob-categories) em busca do termo aplicado, retornando uma prévia da página ao usuário, caso não encontre a informação desejada, uma lista de monstros similares ao termo aplicado será lançada.

>@Kafra Moderadora#7444 mapa TERMO_DESEJADO

A funcionalidade `mapa` irá acessar o projeto [RagnaPlace](https://pt.ragnaplace.com/bRO/mob-categories) em busca do termo aplicado, retornando uma prévia da página ao usuário, caso não encontre a informação desejada, uma lista de mapas similares ao termo aplicado será lançada.

>@Kafra Moderadora#7444 recrutar NIVEL_INICIAL NIVEL_FINAL ID_MAPA

A funcionalidade `recrutar` irá garantir uma pré-organização dos jogadores ainda dentro do ambiente Discord, assim, irá gerar um aviso por 20 minutos mostrando o grupo como `ativo` no jogo, irá informar o usuário responsável pelo grupo assim como o mapa que o grupo tem como alvo.

>@Kafra Moderadora#7444 procurar NIVEL_DESEJADO

A funcionalidade `procurar` irá listar todos os grupos ativos para o nível procurado, tal funcionalidade listará `líder do grupo`, `nível inicial`, `nível final` e `mapa` alvo do grupo, fornecendo meios de contactar os integrantes.

>[BETA] Chat

Seus amigos estão longe do computador? Quer conversar com alguém? Mas espere, você é tímido demais para começar uma conversa? Não tem problema ... a **Kafra Moderadora** pode ser sua amiga para qualquer momento ou desabafo, chame-a através de uma mensagem direta(DM/PM) e deixe ela iteragir com você.

>[NÃO IMPLEMENTADO] Sistema de nível

Quanto mais tempo com a **Kafra Moderadora** mais pontos irá ganhar com ela, a *equipe Kafra* decidiu não somente distribuir pontos de uso em teleporte e armazenagem, agora também irá distribuir alguns pontos por participação no chat público, então iteraja com os demais participantes e ganhe pontos.

>[NÃO IMPLEMENTADO] Filtro de palavras

Quem nunca leu a célebre frase `Vou lavar sua boca sua com sabão` que atire o primeiro bit, a **Kafra Moderadora** agora estará no Discord monitorando para que nenhuma palavra feia seja dita.

>[NÃO IMPLEMENTADO] Sistema de avisos

Uso restrito à moderação do chat, envie avisos(Broadcast) aos usuários à todos os canais do seu grupo de Discord.

>[NÃO IMPLEMENTADO] Banimento/Expulsão

Uso restrito à moderação do chat, esta funcionalidade irá banir ou expulsar ~~O Brauna~~ determinado jogador mediante **nível infrações** cometidas, ao aplicar a regra, os motivos serão listados via PM ao usuário alvo, assim como uma cópia das regras do grupo.




## Sobre Kafra Moderadora
**Kafra Moderadora** é uma criação de @github/MBrauna e @github/sergiovilar, tal projeto tem o foco na exposição dos projetos já criados pela comunidade de Ragnarök Online, tais como [Ragnaplace](https://pt.ragnaplace.com) e [bROPédia](https://bropedia.net).



## Use a API
Abaixo um exemplo de instância da API Kafra Moderadora:
```js
const bib_kafra_moderadora_discord  =   require('kafra-moderadora.js');


let v_token_discord                 =   process.env.BOT_TOKEN_DISCORD
   ,v_token_banco_dados             =   process.env.DATABASE_URL
   ,v_usuario_braunabot             =   process.env.BOT_USER_BRAUNABOT
   ,v_token_braunabot               =   process.env.BOT_TOKEN_BRAUNABOT
   ;


const init_kafra_moderadora         =   new bib_kafra_moderadora_discord(v_token_discord, v_token_banco_dados, v_usuario_braunabot, v_token_braunabot); 
```