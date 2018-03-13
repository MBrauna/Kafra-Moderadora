-- Criação de registros de tabelas
create table aplicacao
(
    id_aplicacao            integer         not null        default nextval('seq_aplicacao')
   ,descricao               text            not null
   ,data_ini                timestamp                       default null
   ,data_fim                timestamp                       default null
   ,situacao                integer                         default 9
   ,constraint pk_aplicacao                         primary key(id_aplicacao)
   ,constraint ck_aplicacao_situacao                check(situacao in (1,2,9))
);



create table servidor
(
    id_servidor             integer         not null        default nextval('seq_servidor')
   ,id_dscrd_servidor       text            not null
   ,nome_servidor           text            not null
   ,icone                   text                            default ''
   ,icone_url               text                            default ''
   ,qtde_usuarios           integer         not null        default 0
   ,id_dscrd_dono           text            not null
   ,regiao                  text            not null
   ,tipo_verificacao        integer         not null        default 1
   ,servidor_grande         boolean
   ,id_aplicacao            integer         not null
   ,data_entrada            timestamp       not null
   ,constraint pk_servidor                          primary key(id_servidor)
   ,constraint fk_servidor_id_app                   foreign key(id_aplicacao) references aplicacao(id_aplicacao)
);


create table usuario
(
    id_usuario              integer
   ,id_usuario_dscrd        text
   ,discord_tag             text
   ,possui_verificacao      boolean
   ,possui_grupo            boolean
   ,token_kafra
   ,nivel
   ,experiencia
   
);