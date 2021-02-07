---
title: Por quê criamos o Nullstack?
description: O único propósito de Nullstack é simplificar o desenvolvimento, eliminando o *Glue Code* e permitindo-lhe se concentrar na lógica de sua aplicação.
---

Ele foi criado tendo em mente os programadores acostumados a desenvolver sistemas inteiros sozinhos, mas é facilmente escalável para equipes pequenas ou mesmo grandes, desde que cada programador conheça o fluxo do recurso que deve desenvolver.

## A Stack

Com a maioria das tecnologias usadas na web hoje em dia, o fluxo mais comum é algo assim:

- Front-end usa um redutor sobre um contexto que chama um *fetcher*;
- Este *fetcher* traz informações genéricas sobre uma API RESTful;
- A API RESTful chama uma rota do servidor, que em seguida chama um controlador, que leva a informação de um modelo e o transforma em um *serializer*;
- Se você precisar de mais de um recurso, este processo deve ser repetido até que todos os recursos sejam buscados;
- Depois que todos os dados forem buscados, só então o front-end poderá usá-los;
- Raciocinar sobre como lidar como o servidor processará e realizará as etapas acima;

Note que tudo que você queria era mostrar algo a partir do banco de dados em uma visualização. Com o Nullstack, você só precisa se preocupar com a lógica. Todo o resto é *Glue Code* e o framework deve cuidar disso para você.

## Feature-driven

Se você está acostumado a trabalhar em mais de um projeto ao mesmo tempo ou mesmo se por acaso tiver que dar manutenção esporádica em muitos de seus projetos antigos, você pode ter tropeçado neste cenário: você não se lembra exatamente onde em seu código está a lógica que você está tentando consertar ou melhorar.

Você pode ter um gancho cujas dependências são variáveis locais inicializadas com um estado redux, que foi armazenado em algum ponto por uma ação declarada em algum lugar em seu código fonte e chamada sabe-se lá onde.

Se tudo o que pertence a um único recurso estivesse no mesmo arquivo, talvez você não precisasse fazer engenharia reversa em seu próprio código toda vez que precisar atualizar ou corrigir algo.

Colocar tudo em um único arquivo pode parecer confuso à primeira vista, mas lembre-se de que você é quem decide a granularidade dessa divisão.

Um "recurso" pode ser um formulário de registro inteiro ou algo tão pequeno quanto um botão que faz algumas verificações antes de permitir que você envie esse formulário. Depende inteiramente de você e, como cada componente é tão completo quanto um recurso inteiro, você pode chamar esse botão ou até mesmo o formulário inteiro em outras páginas de seu aplicativo. Isso nos leva à **Verdadeira componentização e reutilização de código**.

## Componentização e reutilização de código

Os componentes do Nullstack são autossuficientes.

A maioria dos frameworks são especializados em apenas uma camada do desenvolvimento. Ao exportar um componente Nullstack, todo o código necessário para rodar o recurso vai ficar junto, sem a necessidade de alocar as outras camadas separadamente.

Como efeito colateral, aplicativos inteiros podem ser usados como componentes e montados em outros aplicativos como *engines*.

## Por quê usar *Orientação à objetos* e não componentes funcionais 

À primeira vista, as classes podem parecer mais detalhadas do que os componentes funcionais.
Esta seção explicará os motivos que nos levam a favorecer as classes no desenvolvimento do Nullstack.

As razões estão, na verdade, conectadas a alguns princípios básicos do Nullstack, sendo:

### Tudo é possivel

Nós não queremos introduzir um “modo Nullstack” de fazer as coisas, queremos que se torne algo acessível a qualquer pessoa com algum conhecimento Javascript.

Dito isso, o primeiro grande problema foi abordar o gerenciamento de estado de uma forma Javascript padrão. O suporte de componentes funcionais exigiria uma solução semelhante aos ganchos de React.js, que seriam considerados um maneirismo do framework.

Uma vez que optamos pela imutabilidade como uma restrição do framework, podemos usar a forma nativa de definir variáveis simples. Isto remove a complexidade do gerenciamento de estados, o que foi responsável anteriormente pela necessidade de usar uma biblioteca de terceiros para o gerenciamento dos mesmos

### Nenhum *Glue Code* ou “baterias incluídas”

O Nullstack pega emprestado o conceito de “bateria incluída” do Ember.js, mas permite que você troque as baterias. Tudo que você precisa para fazer um aplicativo deve fazer parte do framework e ainda ser flexível.

A framework should do the heavy lifting and a programmer should focus on his own application.
For this reason, all you have to do is to declare your classes and let Nullstack instantiate them for you. That way, we removed the most painful aspect of dealing with classes while maintaining all of the advantages of them.

### Rota de fuga segura

Orientado a objetos vs. funcional não é um tópico novo e, ultimamente, o primeiro parece ter sido excluído da maioria dos frameworks, não deixando lugar para desenvolvedores que gostam desse padrão.

É certo que as classes demoravam muito para serem padronizadas em Javascript e o atraso pode ter causado algumas *implementações traumáticas* ao longo do caminho.

Embora a programação orientada a objetos possa não ser a melhor solução para todos os problemas, o Nullstack permite que você importe funções livremente e as use nos momentos em que você achar melhor.

## Por que injeção de dependência em vez de modularidade

O contexto do Nullstack usa o padrão de injeção de dependência, o que significa que tudo o que você precisa pode ser solicitado do framework a partir da camada em que está a função.

O contexto é um objeto com escopo horizontal que é injetado em todas as suas chamadas de função. A natureza não hierárquica desse padrão permite que você mova facilmente a lógica de seu componente conforme seu aplicativo cresce, enquanto ainda evita problemas com *threading* ou encher seu código-fonte com inúmeras declarações para a mesma coisa.

Isso tem duas vantagens principais:

- Você vê as dependências de seu código em uma função, em vez de tê-los todos importados na parte superior do arquivo.

- O framework é capaz de lhe dar informações mais precisas sobre o ambiente específico para essa chamada de função.

## Felicidade do desenvolvedor

A aplicação gerada é suficiente para ser um PWA (Progressive Web App) sem pensar em *boilerplates*, e ainda mais, você é livre para substituir o comportamento padrão das funções.

Um conceito emprestado do Ruby é a felicidade do desenvolvedor. O objetivo do Nullstack é facilitar a vida do desenvolvedor, simplificando tudo o que for possível sem esconder nada de você.

Os primeiros desenvolvedores que queríamos deixar felizes somos nós mesmos. Fizemos o Nullstack porque nos divertimos no processo. Tudo começou como um protótipo simples em cima do React.js e nos empolgamos, tornando-o cada vez mais agradável para nós até que se tornou algo próprio.

Esperamos que você goste de usar o Nullstack tanto quanto nós, porque é isso que mantém este projeto em andamento.