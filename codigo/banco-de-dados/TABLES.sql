CREATE TABLE IF NOT EXISTS public."USUARIO"
(
<<<<<<< HEAD
	"cpf" CHAR(11) UNIQUE NOT NULL,
	"email" VARCHAR(50) UNIQUE NOT NULL,
	"nome" VARCHAR(100) NOT NULL,
	"hash" VARCHAR(250) UNIQUE NOT NULL,
	"token" VARCHAR(250) UNIQUE,
	"token_validade" TIMESTAMP,
	 PRIMARY KEY ("cpf")
=======
	/*"cpf" CHAR(11) NOT NULL, */
	"email" VARCHAR(100) UNIQUE NOT NULL,
	"nome" VARCHAR(100) NOT NULL,
	"hash" VARCHAR(250) UNIQUE NOT NULL,
	"token" VARCHAR(250) UNIQUE,
	"token_validade" DATE,
	 PRIMARY KEY ("email")
>>>>>>> c2dcdd6effb254f57db3ff9b9728d016df15ea9e
);


CREATE TABLE IF NOT EXISTS public."POST" 
(
<<<<<<< HEAD
  "sigla" SERIAL UNIQUE NOT NULL,
  "usuario_cpf" CHAR(11) NOT NULL,
  "answer_to" INT NULL,
=======
  "sigla" CHAR(10) UNIQUE NOT NULL,
  "usuario_email" VARCHAR(100) NOT NULL,
  "answer_to" CHAR(10) NULL,
>>>>>>> c2dcdd6effb254f57db3ff9b9728d016df15ea9e
  "texto" VARCHAR(500) NOT NULL,
  PRIMARY KEY ("sigla", "usuario_email"),
  CONSTRAINT "FK_POST_USER"
    FOREIGN KEY ("usuario_email")
    REFERENCES public."USUARIO" ("email")
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
<<<<<<< HEAD
  "usuario_cpf" CHAR(11) NOT NULL,
  "faq_sigla" INT NOT NULL,
=======
  "usuario_email" CHAR(11) NOT NULL,
  "faq_sigla" CHAR(10) NOT NULL,
>>>>>>> c2dcdd6effb254f57db3ff9b9728d016df15ea9e
  "nota" INT NOT NULL,
  PRIMARY KEY ("usuario_email", "faq_sigla"),
  CONSTRAINT "FK_PERG_USER"
    FOREIGN KEY ("usuario_email")
    REFERENCES public."USUARIO" ("email")
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT "FK_PERG_FAQ"
    FOREIGN KEY ("faq_sigla")
    REFERENCES public."FAQ" ("sigla")
    ON DELETE CASCADE
    ON UPDATE NO ACTION
);