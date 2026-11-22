GRANT USAGE ON SCHEMA public TO rocha_app;

GRANT SELECT, INSERT
  ON TABLE clientes, compromissos, processos
  TO rocha_app;

GRANT INSERT
  ON TABLE solicitacoes_consulta
  TO rocha_app;
   