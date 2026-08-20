CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  done BOOLEAN DEFAULT false
);

INSERT INTO tasks (title, done) VALUES
  ('Rédiger le rapport d''ingénierie', false),
  ('Configurer le pipeline Jenkins', true),
  ('Tester le déploiement Docker Compose', false);
