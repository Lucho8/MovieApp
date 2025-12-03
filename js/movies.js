/**
 * Exportamos los datos de las películas como un array de objetos.
 */
const rawData = [
  {
    id: 1,
    title: "Pulp Fiction",
    price: 8500,
    genre: "Crimen / Thriller",
    yearOfRelease: 1994,
    image: "img/PulpFiction.webp",
    review:
      "Una obra maestra de Tarantino. Su narrativa no lineal y diálogos ingeniosos hacen que cada escena sea icónica. Definitivamente imperdible para entender el cine moderno, con personajes inolvidables y una banda sonora increíble que complementa la acción.",
  },
  {
    id: 2,
    title: "Interstellar",
    price: 12000,
    genre: "Ciencia Ficción / Drama",
    yearOfRelease: 2014,
    image: "img/Interstellar.webp",
    review:
      "Un viaje épico a través del espacio y el tiempo. Nolan combina ciencia rigurosa con un drama emocional profundo, explorando los límites de la humanidad y el amor. Es visualmente impresionante y te dejará pensando en la escala del universo mucho después de verla.",
  },
  {
    id: 3,
    title: "El Padrino",
    price: 18000,
    genre: "Crimen / Drama",
    yearOfRelease: 1972,
    image: "img/TheGodfather.webp",
    review:
      "Considerada una de las mejores películas de la historia. Un estudio sombrío y poderoso sobre la familia, la corrupción y el sueño americano. Las actuaciones son legendarias, y la dirección de Coppola establece el estándar para el género de gánsters.",
  },
  {
    id: 4,
    title: "Parásitos (Parasite)",
    price: 10000,
    genre: "Comedia Negra / Thriller",
    yearOfRelease: 2019,
    image: "img/Parasite.webp",
    review:
      "Una sátira social brillante que se disfraza de thriller. La dirección de Bong Joon-ho es magistral al mostrar la lucha de clases de una manera tensa, humorística y sorprendente. Una película que impacta y provoca conversación.",
  },
  {
    id: 5,
    title: "El Caballero Oscuro",
    price: 15000,
    genre: "Acción / Superhéroes",
    yearOfRelease: 2008,
    image: "img/TheDarkKnight.png",
    review:
      "Una cinta oscura y compleja que redefinió el cine de superhéroes, con una actuación legendaria de Heath Ledger como el Joker. Un thriller policiaco en el fondo.",
  },
  {
    id: 6,
    title: "Origen (Inception)",
    price: 12500,
    genre: "Ciencia Ficción / Thriller",
    yearOfRelease: 2010,
    image: "img/Inception.png",
    review:
      "Una película alucinante sobre el robo de secretos a través de los sueños, con visuales espectaculares, una trama fascinante y un final que genera debate hasta hoy.",
  },
  {
    id: 7,
    title: "El Rey León",
    price: 9000,
    genre: "Animación / Drama",
    yearOfRelease: 1994,
    image: "img/TheLionKing.png",
    review:
      "Un clásico atemporal de Disney sobre el crecimiento, el deber y la familia. La banda sonora y la animación son icónicas, logrando un gran impacto emocional en el público.",
  },
  {
    id: 8,
    title: "Mad Max: Furia en la Carretera",
    price: 11000,
    genre: "Acción / Post-apocalíptico",
    yearOfRelease: 2015,
    image: "img/MadMax.webp",
    review:
      "Una obra maestra de acción frenética y diseño visual puro. Es prácticamente una persecución de dos horas con una narrativa simple pero potente y personajes femeninos fuertes.",
  },
];

export const getMovieData = async () => {
    // 💡 Agrego para simular una red lenta y ver que funcione el fetch
    await new Promise(resolve => setTimeout(resolve, 500)); 
    
    console.log("FETCH: Obteniendo datos de películas...");
    return rawData;
};
