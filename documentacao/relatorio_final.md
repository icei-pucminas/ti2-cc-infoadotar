# infoAdotar

**Felipe Lacerda Tertuliano, felipeltertuliano@gmail.com**

**João Marcos de Oliveira Magalhães, jmarcosomjm@gmail.com**

**Leonardo Miguel Valle Mourão, leo.mvm@hotmail.com**

**Vitor Cabral Rodrigues Pires, vitorcrp@hotmal.com.br**

---

_Curso de Ciência da Computação, Unidade Coração Eucarístico_

_Instituto de Informática e Ciências Exatas – Pontifícia Universidade de Minas Gerais (PUC MINAS), Belo Horizonte – MG – Brasil_

---

_**Resumo**. Escrever aqui o resumo. O resumo deve contextualizar rapidamente o trabalho, descrever seu objetivo e, ao final, 
mostrar algum resultado relevante do trabalho (até 10 linhas)._

---



**1. Introdução**

A introdução deve apresentar de dois ou quatro parágrafos de contextualização do trabalho. 

Na **contextualização**, o aluno deve dizer do que se trata o trabalho, em que área ou contexto se insere. 
A **contextualização** deve ser desenvolvida de algo mais genérico para algo mais específico. 
A citação de pesquisas quantitativas é bem aceita aqui (corretamente referenciadas).

Em seguida o aluno deve caminhar a contextualização para descrever o **problema** que o artigo trata. 
O **problema** pode ser algo vivido em uma empresa específica.


    1.1 Contextualização
    1.2 Problema
O processo de regularizar os documentos, entrar no CNA (Cadastro Nacional de Adoção) e formalizar a adoção é árduo e demanda um tempo excessivo. Ou seja, com a burocracia e a ineficácia da implementação do sistema brasileiro de adoção, o processo adotivo faz com que os futuros pais e mães adotivos sejam forçados a esperar mais tempo do que deveria para conseguir adotar uma criança, além de sofrerem com a falta de informação e orientação fornecidas a esses pretendentes.

Assim, devido à má implementação desse sistema, ao seu excessivo tempo de espera, à legislação precária envolvida e a muitos outros fatores, os cônjuges que têm a intenção de adotar sofrem com a morosidade do sistema proposto pelo governo do Brasil.

    1.3 Objetivo geral
<!--
O aluno deve escrever um pequeno parágrafo ou frase com o **objetivo geral** do trabalho. 
O objetivo deve ser bem direto, específico e definido com verbos de ação (elaborar, propor, ava-liar, comparar etc.). -->
Auxiliar os futuros pais e mães adotivos a gerenciarem o seu processo de adoção, permitindo que esse procedimento possa se dar de maneira mais simplificada.
		

        1.3.1 Objetivos específicos

Apresente também alguns (pelo menos 2) **objetivos específicos** dependendo de onde você vai querer concentrar a sua prática investigativa, ou como você vai aprofundar no seu trabalho.

    1.4 Justificativas

<!-- Mostre também as **justificativas** para o 
desenvolvimento do seu trabalho e caso deseje, desta-que alguma contribuição do trabalho. -->

A motivação da nossa solução é ajudar todos aqueles que desejam adotar uma criança, mas, por conta da burocracia, da rudimentaridade e da ineficácia do processo adotivo no Brasil, motivos que fazem com tais indivíduos tenham de lidar com a falta de informação, deixando-os sem orientação em um procedimento tão importante para suas vidas. 



**2. Projeto da Solução**

    2.1. Requisitos funcionais
	
Enumere os requisitos funcionais previstos para a sua aplicação. 
Use a tabela abaixo para enumerá-lo.  Esses requisitos devem estar 
de acordo com as definições do modelo de negócio.

| Id            | Descrição                                                                                                    | Prioridade |
| ------------- |:------------------------------------------------------------------------------------------------------------:| ----------:|
| 01            | O usuário deve conseguir criar uma conta e logar no sistema                                                  |   Alta     |
| 02            | O usuário deve ter uma checklist para gerenciar seu passos na adoção                                         |   Alta     |
| 03            | O usuário deve ter acesso às perguntas frequentes (FAQ)                                                      |   Alta     |
| 04            | O usuário deve ter acesso a uma interface gráfica contendo os dados para representar seu progresso na adoção |   Alta     |
| 05            | O usuário deve conseguir visualizar posts de usuários                                                        |   Média    |
| 06            | O usuário deve conseguir escrever posts                                                                      |   Média    |

    2.2. Tecnologias
<!--
Descreva qual(is) tecnologias você vai usar para resolver o seu problema, ou seja implementar a sua solução. 
Liste todas as tecnologias envolvidas, linguagens a serem utilizadas, serviços web, frameworks, bibliotecas, 
IDEs de desenvolvimento, e ferramentas.  Apresente também uma figura explicando como as tecnologias estão 
relacionadas ou como uma interação do usuário com o sistema vai ser conduzida, por onde ela passa até 
retornar uma resposta ao usuário. -->

<!-- ![Arquitetura do sistema](imagens/arquitetura.png "Arquitetura do sistema") -->
<p align="center"><img src="imagens/arquitetura.png" /></p>

* Linguagens de desenvolvimento front-end:
    * HTML5
    * CSS em conjunto com a framework Bootstrap
    * JavaScript
* Base de dados:
    * Local Storage dos navegadores
* Hospedagem:
    * Heroku
* IDE:
    * Microsoft Visual Studio Code

    2.3. Serviços inteligentes

Descreva o mecanismo de inteligência que será utilizado no seu sistema. Utilize a modelagem baseada em agente
para definir as entradas e saídas do seu módulo de serviço inteligente. Apresente quem irá fornecer o serviço
e em que módulo será utilizado.

	
**3. Modelagem de dados**

Apresente o modelo de dados. Defina o dicionário de dados com os respectivos formatos e significados.

    3.1. Diagrama de Entidade-Relacionamento

Apresente a estrutura das tabelas de banco de dados no modelo Diagrama de Entidade-Relacionamento. 
A Seguir, segue um exemplo de imagem adicionada ao documento.

![Diagrama de Entidade Relacionamento de Exemplo](imagens/er_diagram.png "Diagrama de Entidade Relacionamento de Exemplo")

**4. Sistema desenvolvido**

Faça aqui uma breve descrição do software e coloque as principais telas com uma explicação de como usar cada uma.

## Tela home

Tela que contém um resumo das ferramentas do app. Nesta tela ficará disponível:
1. Um resumo dos dados do CNA e um texto explicando a situação da adoção no Brasil.
2. As três perguntas de usuários mais recorrentes, dessa forma, agilizando a busca por informações.
3. Post mais relevante feito por um usuário sobre a experiência dele com nosso aplicativo.

<p align="center"><img src="https://lh3.googleusercontent.com/uzmieR5j00rz9om4Q8-hpu21JbqfHycM42nN-Lk9P0TzmASuE4mLuXEyKlNsudio8dcqJm60GE-E_I7myMbrf16xgcp1Z1GyyP_LpY7PECGNhi3LzZsLzWOn522gzAh6nAC81uknJ3-GHNkM7Q" /></p>

## FAQ

Este componente apresentará as 3 perguntas de usuários mais recorrentes.
As perguntas são acessadas via JSON no local storage.
Posteriormente, as perguntas serão ordenadas de acordo com a frequência requisitada pelos usuários, até o momento as perguntas mostradas são as 3 primeiras posições do vetor no local storage.

<p align="center"><img src="https://lh5.googleusercontent.com/KSjGLibDR-94fo190h3M4Vylvey0KhBCPcMJuDx4VU_9CcUCmqQwC7Lf99bLambCyAw1UPENvSY2E48hA8k_zhhegJdou7fEZivWGD9EDtvgKXd-oEz-0DoAcv2ObV89g7AiQwRUdKzYAdAZPg" /></p>

## infoAjudar

Tela onde o usuário tem acesso à ferramentas para ajudá-lo na adoção.

<p align="center"><img src="https://lh4.googleusercontent.com/wbKzLqTywH8Gm4uc42Ff3Pn6FTc4DFtkM1gCyX9-josI2am-Erjlbd8LTJqWfohANu1ef5pBoJeA-Do5PDvm4oCx4JBm6njjymK68xlVtFpcMwFVee-Gca5VTvdbBUiW_N4fEMVolH59QP3V_Q" /></p>

## Passos

Conjunto de cartões que ajudam a guiar o usuário nos passos necessários para concluir uma adoção e uma barra de progresso que proporciona auxílio visual do avanço que esse está tendo.

<p align="center"><img src="https://lh4.googleusercontent.com/wbKzLqTywH8Gm4uc42Ff3Pn6FTc4DFtkM1gCyX9-josI2am-Erjlbd8LTJqWfohANu1ef5pBoJeA-Do5PDvm4oCx4JBm6njjymK68xlVtFpcMwFVee-Gca5VTvdbBUiW_N4fEMVolH59QP3V_Q" /></p>

**5. Avaliação**

Faça aqui sobre a avaliação do software. Indique se ele atendeu as expectativas e ele é viável. 
Para não ficar subjetivo, o ideal é fazer um questionário e pedir ao usuário do processo que faça a avaliação.

**6. Conclusão**

Apresente aqui a conclusão do seu trabalho. Discussão dos resultados obtidos no trabalho, onde se verifica as 
observações pessoais de cada aluno. Poderá também apresentar sugestões de novas linhas de estudo.  


**REFERÊNCIAS**


**[1.1]** - _ELMASRI, Ramez; NAVATHE, Sham. **Sistemas de banco de dados**. 7. ed. São Paulo: Pearson, c2019. E-book. ISBN 9788543025001._

**[1.2]** - _COPPIN, Ben. **Inteligência artificial**. Rio de Janeiro, RJ: LTC, c2010. E-book. ISBN 978-85-216-2936-8._

**[1.3]** - _CORMEN, Thomas H. et al. **Algoritmos: teoria e prática**. Rio de Janeiro, RJ: Elsevier, Campus, c2012. xvi, 926 p. ISBN 9788535236996._

**[1.4]** - _SUTHERLAND, Jeffrey Victor. **Scrum: a arte de fazer o dobro do trabalho na metade do tempo**. 2. ed. rev. São Paulo, SP: Leya, 2016. 236, [4] p. ISBN 9788544104514._

**[1.5]** - _RUSSELL, Stuart J.; NORVIG, Peter. **Inteligência artificial**. Rio de Janeiro: Elsevier, c2013. xxi, 988 p. ISBN 9788535237016._
