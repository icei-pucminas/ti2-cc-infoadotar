CREATE TABLE IF NOT EXISTS public."USUARIO"
(
	"cpf" CHAR(11) UNIQUE NOT NULL,
	"email" VARCHAR(50) UNIQUE NOT NULL,
	"nome" VARCHAR(100) NOT NULL,
	"hash" VARCHAR(250) UNIQUE NOT NULL,
	"token" VARCHAR(250) UNIQUE,
	"token_validade" TIMESTAMP,
	 PRIMARY KEY ("cpf")
);


CREATE TABLE IF NOT EXISTS public."POST" 
(
  "sigla" SERIAL UNIQUE NOT NULL,
  "usuario_cpf" CHAR(11) NOT NULL,
  "answer_to" INT NULL,
  "texto" VARCHAR(500) NOT NULL,
  PRIMARY KEY ("sigla", "usuario_cpf"),
  CONSTRAINT "FK_POST_USER"
    FOREIGN KEY ("usuario_cpf")
    REFERENCES public."USUARIO" ("cpf")
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT "FK_POST_POST"
    FOREIGN KEY ("answer_to")
    REFERENCES public."POST" ("sigla")
    ON DELETE SET NULL
    ON UPDATE NO ACTION
);


CREATE TABLE IF NOT EXISTS public."FAQ" 
(
  "sigla" SERIAL UNIQUE NOT NULL,
  "pergunta" VARCHAR(200) NOT NULL,
  "resposta" VARCHAR(400) NOT NULL,
  PRIMARY KEY ("sigla")
);


CREATE TABLE IF NOT EXISTS public."PERGUNTA_AVALIACAO" 
(
  "usuario_cpf" CHAR(11) NOT NULL,
  "faq_sigla" INT NOT NULL,
  "nota" INT NOT NULL,
  PRIMARY KEY ("usuario_cpf", "faq_sigla"),
  CONSTRAINT "FK_PERG_USER"
    FOREIGN KEY ("usuario_cpf")
    REFERENCES public."USUARIO" ("cpf")
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT "FK_PERG_FAQ"
    FOREIGN KEY ("faq_sigla")
    REFERENCES public."FAQ" ("sigla")
    ON DELETE CASCADE
    ON UPDATE NO ACTION
);