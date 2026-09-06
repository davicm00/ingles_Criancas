/* ============================================================
   TRILHA DE INGLÊS — dados do currículo
   Cada "dia" tem um tema, um conjunto de palavras (com emoji,
   inglês e português) e, opcionalmente, uma frase funcional
   para o modo "1º Ano". Dias do tipo "review" são revisões
   espaçadas: o app sorteia palavras de dias anteriores,
   priorizando as que a criança mais errou.
   ============================================================ */

const CURRICULUM = [
  {
    day: 1,
    theme: "Olá!",
    type: "lesson",
    words: [
      { id: "d1w1", emoji: "👋", en: "Hello", pt: "Olá" },
      { id: "d1w2", emoji: "🙋", en: "Hi", pt: "Oi" },
      { id: "d1w3", emoji: "🚶", en: "Bye", pt: "Tchau" },
      { id: "d1w4", emoji: "🙆", en: "Yes", pt: "Sim" },
      { id: "d1w5", emoji: "🙅", en: "No", pt: "Não" },
      { id: "d1w6", emoji: "🙏", en: "Please", pt: "Por favor" },
    ],
    phrase: { en: "Hello! How are you?", pt: "Olá! Como você está?" },
  },
  {
    day: 2,
    theme: "Cores",
    type: "lesson",
    words: [
      { id: "d2w1", emoji: "🔴", en: "Red", pt: "Vermelho" },
      { id: "d2w2", emoji: "🔵", en: "Blue", pt: "Azul" },
      { id: "d2w3", emoji: "🟡", en: "Yellow", pt: "Amarelo" },
      { id: "d2w4", emoji: "🟢", en: "Green", pt: "Verde" },
      { id: "d2w5", emoji: "⚪", en: "White", pt: "Branco" },
      { id: "d2w6", emoji: "⚫", en: "Black", pt: "Preto" },
    ],
    phrase: { en: "I like blue.", pt: "Eu gosto de azul." },
  },
  {
    day: 3,
    theme: "Números 1 a 5",
    type: "lesson",
    words: [
      { id: "d3w1", emoji: "1️⃣", en: "One", pt: "Um" },
      { id: "d3w2", emoji: "2️⃣", en: "Two", pt: "Dois" },
      { id: "d3w3", emoji: "3️⃣", en: "Three", pt: "Três" },
      { id: "d3w4", emoji: "4️⃣", en: "Four", pt: "Quatro" },
      { id: "d3w5", emoji: "5️⃣", en: "Five", pt: "Cinco" },
    ],
    phrase: { en: "I am five years old.", pt: "Eu tenho cinco anos." },
  },
  {
    day: 4,
    theme: "Números 6 a 10",
    type: "lesson",
    words: [
      { id: "d4w1", emoji: "6️⃣", en: "Six", pt: "Seis" },
      { id: "d4w2", emoji: "7️⃣", en: "Seven", pt: "Sete" },
      { id: "d4w3", emoji: "8️⃣", en: "Eight", pt: "Oito" },
      { id: "d4w4", emoji: "9️⃣", en: "Nine", pt: "Nove" },
      { id: "d4w5", emoji: "🔟", en: "Ten", pt: "Dez" },
    ],
    phrase: { en: "Count to ten!", pt: "Conte até dez!" },
  },
  { day: 5, theme: "Revisão", type: "review" },
  {
    day: 6,
    theme: "Família",
    type: "lesson",
    words: [
      { id: "d6w1", emoji: "👩", en: "Mom", pt: "Mãe" },
      { id: "d6w2", emoji: "👨", en: "Dad", pt: "Pai" },
      { id: "d6w3", emoji: "👧", en: "Sister", pt: "Irmã" },
      { id: "d6w4", emoji: "👦", en: "Brother", pt: "Irmão" },
      { id: "d6w5", emoji: "👵", en: "Grandma", pt: "Vovó" },
      { id: "d6w6", emoji: "👴", en: "Grandpa", pt: "Vovô" },
    ],
    phrase: { en: "This is my mom.", pt: "Esta é a minha mãe." },
  },
  {
    day: 7,
    theme: "Bichos de estimação",
    type: "lesson",
    words: [
      { id: "d7w1", emoji: "🐶", en: "Dog", pt: "Cachorro" },
      { id: "d7w2", emoji: "🐱", en: "Cat", pt: "Gato" },
      { id: "d7w3", emoji: "🐰", en: "Rabbit", pt: "Coelho" },
      { id: "d7w4", emoji: "🐟", en: "Fish", pt: "Peixe" },
      { id: "d7w5", emoji: "🐦", en: "Bird", pt: "Pássaro" },
    ],
    phrase: { en: "I have a dog.", pt: "Eu tenho um cachorro." },
  },
  {
    day: 8,
    theme: "Animais da fazenda e selvagens",
    type: "lesson",
    words: [
      { id: "d8w1", emoji: "🐄", en: "Cow", pt: "Vaca" },
      { id: "d8w2", emoji: "🐷", en: "Pig", pt: "Porco" },
      { id: "d8w3", emoji: "🐔", en: "Chicken", pt: "Galinha" },
      { id: "d8w4", emoji: "🦁", en: "Lion", pt: "Leão" },
      { id: "d8w5", emoji: "🐘", en: "Elephant", pt: "Elefante" },
      { id: "d8w6", emoji: "🐵", en: "Monkey", pt: "Macaco" },
    ],
    phrase: { en: "The lion is big.", pt: "O leão é grande." },
  },
  {
    day: 9,
    theme: "Partes do corpo",
    type: "lesson",
    words: [
      { id: "d9w1", emoji: "👀", en: "Eyes", pt: "Olhos" },
      { id: "d9w2", emoji: "👃", en: "Nose", pt: "Nariz" },
      { id: "d9w3", emoji: "👄", en: "Mouth", pt: "Boca" },
      { id: "d9w4", emoji: "👂", en: "Ear", pt: "Orelha" },
      { id: "d9w5", emoji: "🖐️", en: "Hand", pt: "Mão" },
      { id: "d9w6", emoji: "🦶", en: "Foot", pt: "Pé" },
    ],
    phrase: { en: "Touch your nose!", pt: "Toque no seu nariz!" },
  },
  { day: 10, theme: "Revisão", type: "review" },
  {
    day: 11,
    theme: "Frutas",
    type: "lesson",
    words: [
      { id: "d11w1", emoji: "🍎", en: "Apple", pt: "Maçã" },
      { id: "d11w2", emoji: "🍌", en: "Banana", pt: "Banana" },
      { id: "d11w3", emoji: "🍇", en: "Grapes", pt: "Uvas" },
      { id: "d11w4", emoji: "🍓", en: "Strawberry", pt: "Morango" },
      { id: "d11w5", emoji: "🍊", en: "Orange", pt: "Laranja" },
    ],
    phrase: { en: "I like apples.", pt: "Eu gosto de maçãs." },
  },
  {
    day: 12,
    theme: "Comidas e bebidas",
    type: "lesson",
    words: [
      { id: "d12w1", emoji: "🍞", en: "Bread", pt: "Pão" },
      { id: "d12w2", emoji: "🥛", en: "Milk", pt: "Leite" },
      { id: "d12w3", emoji: "🧀", en: "Cheese", pt: "Queijo" },
      { id: "d12w4", emoji: "🍚", en: "Rice", pt: "Arroz" },
      { id: "d12w5", emoji: "💧", en: "Water", pt: "Água" },
    ],
    phrase: { en: "I am hungry.", pt: "Eu estou com fome." },
  },
  {
    day: 13,
    theme: "Roupas",
    type: "lesson",
    words: [
      { id: "d13w1", emoji: "👕", en: "Shirt", pt: "Camisa" },
      { id: "d13w2", emoji: "👖", en: "Pants", pt: "Calça" },
      { id: "d13w3", emoji: "👟", en: "Shoes", pt: "Sapatos" },
      { id: "d13w4", emoji: "🧦", en: "Socks", pt: "Meias" },
      { id: "d13w5", emoji: "🧢", en: "Hat", pt: "Boné" },
    ],
    phrase: { en: "Put on your shoes.", pt: "Coloque seus sapatos." },
  },
  {
    day: 14,
    theme: "Tempo (clima)",
    type: "lesson",
    words: [
      { id: "d14w1", emoji: "☀️", en: "Sunny", pt: "Ensolarado" },
      { id: "d14w2", emoji: "🌧️", en: "Rainy", pt: "Chuvoso" },
      { id: "d14w3", emoji: "☁️", en: "Cloudy", pt: "Nublado" },
      { id: "d14w4", emoji: "💨", en: "Windy", pt: "Ventando" },
      { id: "d14w5", emoji: "❄️", en: "Cold", pt: "Frio" },
      { id: "d14w6", emoji: "🔥", en: "Hot", pt: "Quente" },
    ],
    phrase: { en: "Today is sunny.", pt: "Hoje está ensolarado." },
  },
  { day: 15, theme: "Revisão", type: "review" },
  {
    day: 16,
    theme: "Brinquedos",
    type: "lesson",
    words: [
      { id: "d16w1", emoji: "🧸", en: "Teddy bear", pt: "Ursinho" },
      { id: "d16w2", emoji: "⚽", en: "Ball", pt: "Bola" },
      { id: "d16w3", emoji: "🪁", en: "Kite", pt: "Pipa" },
      { id: "d16w4", emoji: "🚗", en: "Car", pt: "Carrinho" },
      { id: "d16w5", emoji: "🪀", en: "Yo-yo", pt: "Ioiô" },
    ],
    phrase: { en: "Let's play!", pt: "Vamos brincar!" },
  },
  {
    day: 17,
    theme: "Cômodos da casa",
    type: "lesson",
    words: [
      { id: "d17w1", emoji: "🛏️", en: "Bedroom", pt: "Quarto" },
      { id: "d17w2", emoji: "🛁", en: "Bathroom", pt: "Banheiro" },
      { id: "d17w3", emoji: "🍽️", en: "Kitchen", pt: "Cozinha" },
      { id: "d17w4", emoji: "🛋️", en: "Living room", pt: "Sala" },
      { id: "d17w5", emoji: "🚪", en: "Door", pt: "Porta" },
    ],
    phrase: { en: "I am in my bedroom.", pt: "Eu estou no meu quarto." },
  },
  {
    day: 18,
    theme: "Objetos da escola",
    type: "lesson",
    words: [
      { id: "d18w1", emoji: "📕", en: "Book", pt: "Livro" },
      { id: "d18w2", emoji: "✏️", en: "Pencil", pt: "Lápis" },
      { id: "d18w3", emoji: "🎒", en: "Backpack", pt: "Mochila" },
      { id: "d18w4", emoji: "✂️", en: "Scissors", pt: "Tesoura" },
      { id: "d18w5", emoji: "🖍️", en: "Crayon", pt: "Giz de cera" },
    ],
    phrase: { en: "Open your book.", pt: "Abra seu livro." },
  },
  {
    day: 19,
    theme: "Ações (Vamos nos mexer!)",
    type: "lesson",
    words: [
      { id: "d19w1", emoji: "🏃", en: "Run", pt: "Correr" },
      { id: "d19w2", emoji: "🤸", en: "Jump", pt: "Pular" },
      { id: "d19w3", emoji: "😴", en: "Sleep", pt: "Dormir" },
      { id: "d19w4", emoji: "🍽️", en: "Eat", pt: "Comer" },
      { id: "d19w5", emoji: "🎤", en: "Sing", pt: "Cantar" },
      { id: "d19w6", emoji: "💃", en: "Dance", pt: "Dançar" },
    ],
    phrase: { en: "Let's jump and dance!", pt: "Vamos pular e dançar!" },
  },
  { day: 20, theme: "Revisão", type: "review" },
  {
    day: 21,
    theme: "Dias da semana",
    type: "lesson",
    words: [
      { id: "d21w1", emoji: "☀️", en: "Sunday", pt: "Domingo" },
      { id: "d21w2", emoji: "📅", en: "Monday", pt: "Segunda-feira" },
      { id: "d21w3", emoji: "📚", en: "School day", pt: "Dia de escola" },
      { id: "d21w4", emoji: "🎉", en: "Saturday", pt: "Sábado" },
      { id: "d21w5", emoji: "🌙", en: "Today", pt: "Hoje" },
    ],
    phrase: { en: "Today is Monday.", pt: "Hoje é segunda-feira." },
  },
  {
    day: 22,
    theme: "Formas",
    type: "lesson",
    words: [
      { id: "d22w1", emoji: "⭕", en: "Circle", pt: "Círculo" },
      { id: "d22w2", emoji: "🔲", en: "Square", pt: "Quadrado" },
      { id: "d22w3", emoji: "🔺", en: "Triangle", pt: "Triângulo" },
      { id: "d22w4", emoji: "⭐", en: "Star", pt: "Estrela" },
      { id: "d22w5", emoji: "❤️", en: "Heart", pt: "Coração" },
    ],
    phrase: { en: "It is a star.", pt: "É uma estrela." },
  },
  {
    day: 23,
    theme: "Opostos",
    type: "lesson",
    words: [
      { id: "d23w1", emoji: "🐘", en: "Big", pt: "Grande" },
      { id: "d23w2", emoji: "🐜", en: "Small", pt: "Pequeno" },
      { id: "d23w3", emoji: "😊", en: "Happy", pt: "Feliz" },
      { id: "d23w4", emoji: "😢", en: "Sad", pt: "Triste" },
      { id: "d23w5", emoji: "🔥", en: "Hot", pt: "Quente" },
      { id: "d23w6", emoji: "❄️", en: "Cold", pt: "Frio" },
    ],
    phrase: { en: "I am happy!", pt: "Eu estou feliz!" },
  },
  { day: 24, theme: "Revisão final", type: "review" },
];

/* Índice rápido de todas as palavras já ensinadas até um certo dia,
   usado para montar as revisões (dias do tipo "review"). */
function wordsUpToDay(dayNumber) {
  const pool = [];
  for (const d of CURRICULUM) {
    if (d.day < dayNumber && d.type === "lesson") {
      pool.push(...d.words);
    }
  }
  return pool;
}
