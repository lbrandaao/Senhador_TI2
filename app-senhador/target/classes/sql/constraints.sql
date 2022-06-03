ALTER TABLE "senha" ADD CONSTRAINT "fk_senha_usuario" 
 FOREIGN KEY ("id_usuario")
 REFERENCES "usuario" ("id_usuario")
 ON DELETE RESTRICT
 ON UPDATE CASCADE


ALTER TABLE "cartao" ADD CONSTRAINT "fk_cartao_usuario" 
 FOREIGN KEY ("id_usuario")
 REFERENCES "usuario" ("id_usuario")
 ON DELETE RESTRICT
 ON UPDATE CASCADE
