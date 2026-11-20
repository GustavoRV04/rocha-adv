GRANT USAGE ON SCHEMA public TO rocha_app;

GRANT SELECT, INSERT
  ON TABLE clientes, compromissos, processos
  TO rocha_app;
