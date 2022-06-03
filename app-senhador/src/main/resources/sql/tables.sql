CREATE TABLE IF NOT EXISTS "usuario" (
  "id_usuario" SERIAL NOT NULL,
  "email" VARCHAR(65) NOT NULL,
  "senhamestra" VARCHAR(45) NOT NULL,
  "plano" CHAR(1) NOT NULL,
  PRIMARY KEY ("id_usuario")
)

CREATE TABLE IF NOT EXISTS "senha" (
  "id_senha" SERIAL NOT NULL,
  "aplicacao" CHAR(30) NOT NULL,
  "valor" VARCHAR(45) NOT NULL,
  "id_usuario" INT NOT NULL,
  PRIMARY KEY ("id_senha", "id_usuario")
)

CREATE TABLE IF NOT EXISTS "cartao" (
  "id_cartao" SERIAL NOT NULL,
  "numero" CHAR(20) NOT NULL,
  "nome_impresso" VARCHAR(40) NOT NULL,
  "data_validade" DATE NOT NULL,
  "numero_seguranca" INT NOT NULL,
  "id_usuario" INT NOT NULL,
  PRIMARY KEY ("id_cartao", "id_usuario")
)