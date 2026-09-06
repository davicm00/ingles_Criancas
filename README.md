# Trilha de Inglês 🗺️

Site simples e gratuito para manter seus filhos em contato diário com o
inglês, com atividades curtas no estilo "uma lição por dia" — pensado
para funcionar sem professor, direto no navegador (celular, tablet ou
computador).

## Metodologia

O currículo combina algumas práticas bem estabelecidas no ensino de
inglês para crianças pequenas:

- **TPR (Total Physical Response)**: o dia de "Ações" usa verbos que
  podem ser encenados (correr, pular, dançar), associando movimento a
  significado — melhora retenção nessa idade mais do que só decorar.
- **Input auditivo antes da escrita**: o modo "Alfabetização" nunca
  exige leitura em inglês; a criança ouve (Web Speech API, voz nativa
  do navegador) e associa som a imagem, que é como se adquire uma
  primeira língua.
- **Leitura gradual no modo "1º Ano"**: acrescenta a palavra escrita e
  frases funcionais curtas, alinhado ao que a criança já está
  aprendendo a fazer em português na escola.
- **Repetição espaçada (spaced repetition)**: a cada 5 dias há uma
  revisão que sorteia palavras de dias anteriores, priorizando as que
  a criança mais errou — como um Anki simplificado.
- **Gamificação leve**: estrelas, sequência de dias (streak) e
  conquistas mantêm a motivação sem virar competição ou pressão.

24 dias de conteúdo (~1 mês de uso diário), cobrindo cumprimentos,
cores, números, família, animais, corpo, comida, roupas, clima,
brinquedos, casa, escola, ações, dias da semana, formas e opostos.
Fácil de estender — veja "Como adicionar mais dias" abaixo.

## Como funciona no dia a dia

1. Cada criança tem seu próprio perfil (nome, avatar e fase:
   Alfabetização ou 1º Ano).
2. A tela inicial mostra a trilha: dias já feitos, o dia de hoje
   (liberado) e os próximos (bloqueados até completar o anterior).
3. Cada dia leva de 3 a 6 minutos: flashcards com áudio, um jogo de
   "ouça e escolha", (no 1º Ano) leitura e frase do dia, e uma
   atividade de repetir em voz alta.
4. O progresso fica salvo no próprio navegador (`localStorage`) —
   não precisa de login nem internet depois de carregado a primeira
   vez, exceto para o áudio das fontes.

## Como publicar no GitHub Pages

1. Crie um repositório novo no GitHub (pode ser público ou privado —
   se privado, o GitHub Pages exige plano pago; público funciona no
   plano gratuito).
2. Suba todos os arquivos desta pasta (`index.html`, `css/`, `js/`,
   este `README.md`) para a raiz do repositório.
   - Pelo site do GitHub: "Add file" → "Upload files" → arraste a
     pasta inteira.
   - Ou pelo terminal:
     ```bash
     git init
     git add .
     git commit -m "Trilha de Inglês - versão inicial"
     git branch -M main
     git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
     git push -u origin main
     ```
3. No repositório, vá em **Settings → Pages**.
4. Em "Build and deployment", selecione **Deploy from a branch**,
   branch **main**, pasta **/(root)**, e clique em **Save**.
5. Em alguns minutos o GitHub mostra o endereço do site, algo como
   `https://seu-usuario.github.io/seu-repositorio/`. É esse link que
   vocês vão usar todo dia (dá para salvar como atalho na tela inicial
   do celular).

## Como adicionar mais dias

Todo o conteúdo fica em `js/data.js`, no array `CURRICULUM`. Para
criar um novo dia, copie um bloco existente e ajuste:

```js
{
  day: 25,
  theme: "Transporte",
  type: "lesson",
  words: [
    { id: "d25w1", emoji: "🚗", en: "Car", pt: "Carro" },
    { id: "d25w2", emoji: "🚌", en: "Bus", pt: "Ônibus" },
  ],
  phrase: { en: "I go by car.", pt: "Eu vou de carro." },
},
```

Para criar um dia de revisão, basta:
`{ day: 26, theme: "Revisão", type: "review" }`

O `id` de cada palavra precisa ser único no arquivo inteiro (é usado
para guardar o histórico de acertos/erros de cada criança).

## Tecnologia

Site 100% estático (HTML, CSS e JavaScript puro, sem frameworks nem
build). O áudio usa a Web Speech API, já embutida nos navegadores
modernos — não precisa gravar nem hospedar arquivos de som. Funciona
em Chrome, Edge e Safari; no Firefox a qualidade das vozes em inglês
pode variar.

## Privacidade

Nenhum dado sai do navegador: nomes, avatares e progresso ficam
salvos localmente no dispositivo (`localStorage`). Se limpar os dados
do navegador ou trocar de dispositivo, o progresso é perdido — não há
backup automático na nuvem.
