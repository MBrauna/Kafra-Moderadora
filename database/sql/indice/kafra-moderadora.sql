-- Geração de índices para tabelas kafra-moderadora

--- APLICAÇÃO
create unique   index uk_aplicacao_id           on aplicacao(id_aplicacao);
create          index idx_aplicacao_dtini       on aplicacao(data_ini);
create          index idx_aplicacao_dtfim       on aplicacao(data_fim);
create          index idx_aplicacao_per         on aplicacao(data_ini,data_fim);
create          index idx_aplicacao_sit         on aplicacao(situacao);


-- SERVIDOR
create unique   index uk_servidor_iddscrd       on servidor(id_dscrd_servidor);
create unique   index uk_servidor_id            on servidor(id_servidor);
create          index idx_servidor_iddscrd      on servidor(id_dscrd_servidor);
create          index idx_servidor_dono         on servidor(id_dscrd_dono);
create          index idx_servidor_grande       on servidor(servidor_grande);