# infoAdotar

**Felipe Lacerda Tertuliano, felipeltertuliano@gmail.com**

**João Marcos de Oliveira Magalhães, jmarcosomjm@gmail.com**

**Leonardo Miguel Valle Mourão, leo.mvm@hotmail.com**

**Vitor Cabral Rodrigues Pires, vitorcrp@hotmal.com.br**

---

_Curso de Ciência da Computação, Unidade Coração Eucarístico_

_Instituto de Informática e Ciências Exatas – Pontifícia Universidade de Minas Gerais (PUC MINAS), Belo Horizonte – MG – Brasil_

---

Com o avançar dos anos, a adoção ganhou destaque no cenário nacional. Em 1990, a prática da adoção foi regulamentada com o Estatuto da Criança e do Adolescente (ECA) e, desde então, o número de pessoas na fila para adotar cresce gradativamente. Entretanto, muitas pessoas identificam dificuldades para iniciar esse processo, no que diz respeito,  à falta de conhecimento e informação acerca do procedimento adotivo. Portanto, o presente trabalho visa auxiliar futuros pais e mães que pretendem adotar à sanar dúvidas sobre o processo de perfilhamento, permitindo que estejam em um meio ambiente com informações relevantes para assisti-los. 

---



**1. Introdução**

    1.1 Contextualização
    1.2 Problema
O processo de regularizar os documentos, entrar no CNA (Cadastro Nacional de Adoção) e formalizar a adoção é árduo e demanda um tempo excessivo. Ou seja, com a burocracia e a ineficácia da implementação do sistema brasileiro de adoção, o processo adotivo faz com que os futuros pais e mães adotivos sejam forçados a esperar mais tempo do que deveria para conseguir adotar uma criança, além de sofrerem com a falta de informação e orientação fornecidas a esses pretendentes.

Assim, devido à má implementação desse sistema, ao seu excessivo tempo de espera, à legislação precária envolvida e a muitos outros fatores, os cônjuges que têm a intenção de adotar sofrem com a morosidade do sistema proposto pelo governo do Brasil.

    1.3 Objetivo geral

Auxiliar os futuros pais e mães adotivos a gerenciarem o seu processo de adoção, permitindo que esse procedimento possa se dar de maneira mais simplificada.
		
    1.3.1 Objetivos específicos

* Criar uma plataforma online que estabeleça uma conexão entre os pretendentes, disponibilizando para eles informações acerca do processo adotivo, bem como uma área de comunicação dedicada às perguntas.

* Possibilitar uma maior interação entre os pretendentes por meio de uma comunidade organizada e colaborativa, proporcionando uma relação amigável e recíproca entre os pretendentes.
<br>

	1.4 Justificativas

A motivação da nossa solução é ajudar todos aqueles que desejam adotar uma criança, mas, por conta da burocracia, da rudimentaridade e da ineficácia do processo adotivo no Brasil, motivos que fazem com tais indivíduos tenham de lidar com a falta de informação, deixando-os sem orientação em um procedimento tão importante para suas vidas. 



**2. Projeto da Solução**

    2.1. Requisitos funcionais

| Id            | Descrição                                                                                                    | Prioridade |
| ------------- |:------------------------------------------------------------------------------------------------------------:| ----------:|
| 01            | O usuário deve conseguir criar uma conta e logar no sistema                                                  |   Alta     |
| 02            | O usuário deve ter uma checklist para gerenciar seu passos na adoção                                         |   Alta     |
| 03            | O usuário deve ter acesso às perguntas frequentes (FAQ)                                                      |   Alta     |
| 04            | O usuário deve conseguir visualizar posts de usuários                                                        |   Alta     |
| 05            | O usuário deve conseguir escrever posts                                                                      |   Média    |
| 06            | Deve haver um chatbot à disposição do usuário                                                                |   Média    |

    2.2. Tecnologias

<!-- ![Arquitetura do sistema](imagens/arquitetura.png "Arquitetura do sistema") -->
<p align="center"><img src="imagens/arquitetura.png" /></p>

* Linguagens de desenvolvimento front-end:
    * HTML5
    * CSS em conjunto com a framework Bootstrap
    * JavaScript
* Linguagem de desenvolvimento back-end:
    * Java (com a framework Spark Java)
* Base de dados:
    * PostgreSQL
* IDEs:
    * Microsoft Visual Studio Code
    * Eclipse IDE
* Provedor de Chatbot:
    * BLiP
<br>

	2.3. Serviços inteligentes
Grande parte dos pretendentes à adoção apresentam dúvidas acerca do processo adotivo, e não há muitos locais para sanar essas dificuldades. Tendo em vista isso, a fim de trazer informação à população sobre o sistema adotivo e facilitar o entendimento dos futuros pais e mães, houve a necessidade da criação de um agente inteligente que correspondesse com a situação antes informada.

Portanto, o sistema do infoadotar conta com serviços inteligentes de chatbot de informações, no qual responde à perguntas definidas em um conjunto de conhecimentos utilizando os Serviços Cognitivos da plataforma Blip, a fim de enriquecer a experiência do pretendente, melhorar a performance do projeto e possibilitar com que os usuarios sanem suas dúvidas de forma rápida e prática acerca do processo adotivo.

##### Estrutura do Chatbot: 

<p align="center"><img src="imagens/Fluxo_de_Diálogo .png" /></p>

<p align="center"><img src="imagens/DiagramaDoFluxo.png" /></p>

##### Informações sobre o fluxo:

<p align="center"><img src="imagens/FluxoEstruturaSI.png" /></p>

	
**3. Modelagem de dados**

O infoAdotar possui, em seu banco de dados, 4 relações:
* Usuário
* Postagem
* Avaliação da postagem
* Pergunta do FAQ

##### O usuário contém os dados necessários para sua autenticação no sistema, que são:
* Nome completo
* Email
* Hash composto pela senha e email criptografados em MD5
##### A postagem contém:
* Id para sua identificação
* Email do usuário que a criou
* Id da postagem a qual ela responde, se for o caso
* Conteúdo da postagem
##### A avaliação da postagem contém:
* O email do usuário que a criou
* O id identificador da postagem
* A nota da avaliação
##### A pergunta do FAQ contém:
* Id para sua identificação
* O título da pergunta
* A resposta da pergunta
<br>

    3.1. Diagrama de Entidade-Relacionamento

![Diagrama de Entidade Relacionamento de Exemplo](imagens/er_diagram.png "Diagrama de Entidade Relacionamento de Exemplo")

**4. Sistema desenvolvido**

O sistema do infoAdotar conta com 3 páginas web, sendo elas:
* Página de landing, pela qual o usuário chega no sistema
* Página de login e cadastro, que permite ao usuário utilizar suas credenciais no sistema
* Página principal, a qual contém os recursos da plataforma disponíveis

## Página de Landing

Página inicial do site do infoAdotar.

<p align="center"><img src="imagens/landing.png" /></p>

## Página de login e de cadastro

Permite ao usuário criar uma conta no infoAdotar ou entrar com sua conta existente no sistema.

<p align="center"><img src="imagens/login.png" /></p>
<br>
<p align="center"><img src="imagens/cadastro.png" /></p>

## Tela home

Painel principal do infoAdotar, onde o usuário controla os recursos do sistema. Estes são:
1. Card que contém um resumo das atividades do usuário no sistema
2. Card contendo as postagens da comunidade
3. Card que dá acesso ao FAQ
4. Botão de acesso ao chatbot

<p align="center"><img src="imagens/home.png" /></p>

## FAQ

Este componente dará acesso a um conjunto de perguntas frequentemente realizadas ao usuário.
O usuário terá a possibilidade de pesquisar por uma dúvida em específico.

<p align="center"><img src="imagens/faq.png" /></p>


**5. Avaliação**

Faça aqui sobre a avaliação do software. Indique se ele atendeu as expectativas e ele é viável. 
Para não ficar subjetivo, o ideal é fazer um questionário e pedir ao usuário do processo que faça a avaliação.

Para concluirmos a avaliação do produto desenvolvido, disponibilizamos um questionário para algumas pessoas, a fim de constatar o funcionamento do software e sua utilidade. De acordo com as respostas recebidas no formulário, pode certificar-se que dentre as pessoas que preencheram o questionário, grande parte afirmou que o sistema é funcional, não apresenta complexidade para utilizá-lo e faz juz ao seu objetivo, que é de contribuir com os pretendentes à adoção com informações úteis para o processo e possibilitar a interação dos usuários. Sendo assim, o sistema do InfoAdotar entrega ao usuário aquilo que foi objetivado, e por conseguinte atende às expectativas da equipe de desenvolvimento.

**6. Conclusão**

Ao final do desenvolvimento avaliamos que conseguimos desenvolver uma solução que entrega valor ao nosso cliente, por meio de uma plataforma informativa que promove a formação de comunidades (como especificado no objetivo). Visualizamos margem para crescimento onde podemos aprimorar a capacidade de informar os nossos usuários a respeito do processo adotivo (aumentando a base de dados e lapidando funcionalidades) e expandir com novas ferramentas de auxílio acopladas ao sistema.

Percebemos que a metodologia Scrum com o sistema Kanbam foi de grande ajuda na sinergia do grupo de modo geral. A técnica mencionada aumentou de forma considerável a produtividade e o trabalho em equipe ao longo do projeto, segmentando responsabilidades e delimitando entregas.

Com relação a parte técnica do projeto, atingimos um ótimo resultado no código, tendo contato com tecnologias web como o protocolo HTTP com a framework Spark e a tecnologia AJAX, além da possibilidades de aplicar os conhecimentos adquiridos nas aulas de Banco de dados, ISI e AED2. Entre os conteúdos não estudados que foram aplicados entram POO (Programação Orientada a Objeto) e arquitetura MVC (Model, View, Controller) ambos utilizados em todo o desenvolvimento da API em Java, gerando aprendizado para todo o grupo durante o trabalho.



**REFERÊNCIAS**


**[1.1]** - _ELMASRI, Ramez; NAVATHE, Sham. **Sistemas de banco de dados**. 7. ed. São Paulo: Pearson, c2019. E-book. ISBN 9788543025001._

**[1.2]** - _COPPIN, Ben. **Inteligência artificial**. Rio de Janeiro, RJ: LTC, c2010. E-book. ISBN 978-85-216-2936-8._

**[1.3]** - _CORMEN, Thomas H. et al. **Algoritmos: teoria e prática**. Rio de Janeiro, RJ: Elsevier, Campus, c2012. xvi, 926 p. ISBN 9788535236996._

**[1.4]** - _SUTHERLAND, Jeffrey Victor. **Scrum: a arte de fazer o dobro do trabalho na metade do tempo**. 2. ed. rev. São Paulo, SP: Leya, 2016. 236, [4] p. ISBN 9788544104514._

**[1.5]** - _RUSSELL, Stuart J.; NORVIG, Peter. **Inteligência artificial**. Rio de Janeiro: Elsevier, c2013. xxi, 988 p. ISBN 9788535237016._
