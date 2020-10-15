CREATE TABLE IF NOT EXISTS public."USUARIO"
(
	"cpf" CHAR(11) NOT NULL,
	"email" VARCHAR(50) UNIQUE NOT NULL,
	"nome" VARCHAR(100) NOT NULL,
	"estado_civil" CHAR(8) NOT NULL,
	"sexo" CHAR(1) NOT NULL,
	 PRIMARY KEY ("cpf")
);


CREATE TABLE IF NOT EXISTS public."POSTS" 
(
  "sigla" CHAR(10) UNIQUE NOT NULL,
  "user_cpf" CHAR(11) NOT NULL,
  "answer_to" CHAR(10) NULL,
  "texto" VARCHAR(500) NOT NULL,
  PRIMARY KEY ("sigla", "user_cpf"),
  CONSTRAINT "owner"
    FOREIGN KEY ("user_cpf")
    REFERENCES public."USUARIO" ("cpf")
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT "answer"
    FOREIGN KEY ("answer_to")
    REFERENCES public."POSTS" ("sigla")
    ON DELETE SET NULL
    ON UPDATE NO ACTION
);


CREATE TABLE IF NOT EXISTS public."FAQ" 
(
  "sigla" CHAR(10) UNIQUE NOT NULL,
  "pergunta" VARCHAR(200) NOT NULL,
  "resposta" VARCHAR(400) NOT NULL,
  PRIMARY KEY ("sigla")
);


CREATE TABLE IF NOT EXISTS public."PERGUNTA_AVALIACAO" 
(
  "user_cpf" CHAR(11) NOT NULL,
  "faq_sigla" CHAR(10) NOT NULL,
  "nota" INT NOT NULL,
  PRIMARY KEY ("user_cpf", "faq_sigla"),
  CONSTRAINT "user_av"
    FOREIGN KEY ("user_cpf")
    REFERENCES public."USUARIO" ("cpf")
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT "faq_av"
    FOREIGN KEY ("faq_sigla")
    REFERENCES public."FAQ" ("sigla")
    ON DELETE CASCADE
    ON UPDATE NO ACTION
);



