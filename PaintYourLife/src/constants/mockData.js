const RAW_ARTWORKS = [
  {
    id: '1',
    title: 'A Noite Estrelada',
    artist: 'Vincent van Gogh',
    price: 4200,
    year: '1889',
    medium: 'Óleo sobre tela',
    dimensions: '73 x 92 cm',
    style: 'Pós-impressionismo',
    region: 'Europa',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
    description: 'Uma das obras mais famosas de Van Gogh, conhecida pelo céu noturno em movimento.',
    similarIds: ['2', '9', '10']
  },
  {
    id: '2',
    title: 'Girassóis',
    artist: 'Vincent van Gogh',
    price: 3800,
    year: '1888',
    medium: 'Óleo sobre tela',
    dimensions: '92 x 73 cm',
    style: 'Pós-impressionismo',
    region: 'Europa',
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Vincent_Willem_van_Gogh_128.jpg',
    description: 'Pintura de girassóis em uma composição de tons amarelos.',
    similarIds: ['1', '9', '10']
  },
  {
    id: '3',
    title: 'O Beijo',
    artist: 'Gustav Klimt',
    price: 5600,
    year: '1907',
    medium: 'Óleo e folha de ouro',
    dimensions: '180 x 180 cm',
    style: 'Art Nouveau',
    region: 'Europa',
    image: 'https://p2.trrsf.com/image/fget/cf/1200/1600/middle/images.terra.com/2023/04/13/65303452-o-beijo-gustav-klimt.jpg',
    description: 'Duas figuras envolvidas por padrões ornamentais e detalhes dourados.',
    similarIds: ['5', '8', '11']
  },
  {
    id: '4',
    title: 'A Dança',
    artist: 'Henri Matisse',
    price: 4300,
    year: '1910',
    medium: 'Óleo sobre tela',
    dimensions: '260 x 391 cm',
    style: 'Fauvismo',
    region: 'Europa',
    image: 'https://i0.wp.com/arthive.com/res/media/img/oy800/work/b74/449397.jpg?ssl=1',
    description: 'Cinco figuras dançam em círculo em uma composição de cores contrastantes.',
    similarIds: ['6', '7', '12']
  },
  {
    id: '5',
    title: 'Mona Lisa',
    artist: 'Leonardo da Vinci',
    price: 8900,
    year: '1503',
    medium: 'Óleo sobre madeira',
    dimensions: '77 x 53 cm',
    style: 'Renascimento',
    region: 'Europa',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Mona_Lisa.jpg',
    description: 'Retrato renascentista conhecido pela expressão enigmática.',
    similarIds: ['3', '8', '11']
  },
  {
    id: '6',
    title: 'O Grito',
    artist: 'Edvard Munch',
    price: 4900,
    year: '1893',
    medium: 'Óleo, têmpera e pastel',
    dimensions: '91 x 73 cm',
    style: 'Expressionismo',
    region: 'Europa',
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/The_Scream.jpg',
    description: 'Uma obra expressiva com uma figura diante de uma paisagem intensa.',
    similarIds: ['4', '7', '12']
  },
  {
    id: '7',
    title: 'A Grande Onda',
    artist: 'Katsushika Hokusai',
    price: 3500,
    year: '1831',
    medium: 'Gravura em madeira',
    dimensions: '25 x 37 cm',
    style: 'Ukiyo-e',
    region: 'Ásia',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/The_Great_Wave_off_Kanagawa.jpg',
    description: 'Gravura japonesa que representa uma grande onda diante do Monte Fuji.',
    similarIds: ['4', '6', '12']
  },
  {
    id: '8',
    title: 'Moça com Brinco de Pérola',
    artist: 'Johannes Vermeer',
    price: 5200,
    year: '1665',
    medium: 'Óleo sobre tela',
    dimensions: '44 x 39 cm',
    style: 'Barroco',
    region: 'Europa',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Meisje_met_de_parel.jpg',
    description: 'Retrato conhecido pelo contraste de luz e pelo brinco de pérola.',
    similarIds: ['3', '5', '11']
  },
  {
    id: '9',
    title: 'O Quarto em Arles',
    artist: 'Vincent van Gogh',
    price: 4100,
    year: '1888',
    medium: 'Óleo sobre tela',
    dimensions: '72 x 90 cm',
    style: 'Pós-impressionismo',
    region: 'Europa',
    image: 'https://www.conexaoparis.com.br/wp-content/uploads/2016/03/quarto-van-gogh-1.jpg',
    description: 'Representação do quarto do artista com cores fortes.',
    similarIds: ['1', '2', '10']
  },
  {
    id: '10',
    title: 'A Persistência da Memória',
    artist: 'Salvador Dalí',
    price: 6700,
    year: '1931',
    medium: 'Óleo sobre tela',
    dimensions: '24 x 33 cm',
    style: 'Surrealismo',
    region: 'Europa',
    image: 'https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg',
    description: 'Pintura surrealista conhecida pelos relógios derretidos.',
    similarIds: ['1', '2', '9']
  },
  {
    id: '11',
    title: 'O Nascimento de Vênus',
    artist: 'Sandro Botticelli',
    price: 7800,
    year: '1485',
    medium: 'Têmpera sobre tela',
    dimensions: '172 x 278 cm',
    style: 'Renascimento',
    region: 'Europa',
    image: 'https://static.todamateria.com.br/upload/ve/nu/venus_1.jpg',
    description: 'Obra que representa Vênus chegando à costa sobre uma concha.',
    similarIds: ['3', '5', '8']
  },
  {
    id: '12',
    title: 'Guernica',
    artist: 'Pablo Picasso',
    price: 9200,
    year: '1937',
    medium: 'Óleo sobre tela',
    dimensions: '349 x 776 cm',
    style: 'Cubismo',
    region: 'Europa',
    image: 'https://upload.wikimedia.org/wikipedia/en/7/74/PicassoGuernica.jpg',
    description: 'Pintura monumental que representa os impactos da guerra.',
    similarIds: ['4', '6', '7']
  },

  // BARROCO
  {
    id: '13',
    title: 'A Ronda Noturna',
    artist: 'Rembrandt',
    price: 6400,
    year: '1642',
    medium: 'Óleo sobre tela',
    dimensions: '363 x 437 cm',
    style: 'Barroco',
    region: 'Europa',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3a/La_ronda_de_noche%2C_por_Rembrandt_van_Rijn.jpg/1280px-La_ronda_de_noche%2C_por_Rembrandt_van_Rijn.jpg?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=thumbnail',
    description: 'Grande composição barroca marcada pelo movimento e pelo contraste de luz.',
    similarIds: ['8', '14', '15']
  },
  {
    id: '14',
    title: 'A Vocação de São Mateus',
    artist: 'Caravaggio',
    price: 6100,
    year: '1600',
    medium: 'Óleo sobre tela',
    dimensions: '322 x 340 cm',
    style: 'Barroco',
    region: 'Europa',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShTr8HXFEtnEGynkmZWlcflAn-_VC5U28y96NZvW3jRQ&s=10',
    description: 'Cena religiosa que utiliza iluminação dramática.',
    similarIds: ['8', '13', '15']
  },

  // IMPRESSIONISMO
  {
    id: '15',
    title: 'Impressão, Nascer do Sol',
    artist: 'Claude Monet',
    price: 4800,
    year: '1872',
    medium: 'Óleo sobre tela',
    dimensions: '48 x 63 cm',
    style: 'Impressionismo',
    region: 'Europa',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Claude_Monet%2C_Impression%2C_soleil_levant%2C_1872.jpg?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=original',
    description: 'Paisagem portuária com pinceladas soltas e efeitos de luz.',
    similarIds: ['16', '17', '2']
  },
  {
    id: '16',
    title: 'Dança no Moulin de la Galette',
    artist: 'Pierre-Auguste Renoir',
    price: 5300,
    year: '1876',
    medium: 'Óleo sobre tela',
    dimensions: '131 x 175 cm',
    style: 'Impressionismo',
    region: 'Europa',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Pierre-Auguste_Renoir%2C_Le_Moulin_de_la_Galette.jpg?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=original',
    description: 'Cena de pessoas reunidas em um baile ao ar livre.',
    similarIds: ['15', '17', '2']
  },
  {
    id: '17',
    title: 'A Aula de Dança',
    artist: 'Edgar Degas',
    price: 4600,
    year: '1874',
    medium: 'Óleo sobre tela',
    dimensions: '85 x 75 cm',
    style: 'Impressionismo',
    region: 'Europa',
    image: 'https://medias.artmajeur.com/ultra_quality/333457_edgar-degas-the-dance-class.jpg?v=1784742534',
    description: 'Bailarinas em uma aula de dança observadas pelo professor.',
    similarIds: ['15', '16', '4']
  },

  // ART NOUVEAU
  {
    id: '18',
    title: 'Judith I',
    artist: 'Gustav Klimt',
    price: 5900,
    year: '1901',
    medium: 'Óleo sobre tela',
    dimensions: '84 x 42 cm',
    style: 'Art Nouveau',
    region: 'Europa',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRozhm7Rgl3ggET6SHQobEr4yUIejzs31e-e8P8PywETw&s=10',
    description: 'Retrato ornamental com detalhes dourados e padrões decorativos.',
    similarIds: ['3', '19', '20']
  },
  {
    id: '19',
    title: 'Árvore da Vida',
    artist: 'Gustav Klimt',
    price: 5700,
    year: '1909',
    medium: 'Pintura decorativa',
    dimensions: '195 x 102 cm',
    style: 'Art Nouveau',
    region: 'Europa',
    image: 'https://santhatela.com.br/wp-content/uploads/2017/03/klimt-arvore-da-vida-1905-d.jpg',
    description: 'Composição decorativa com galhos sinuosos e elementos simbólicos.',
    similarIds: ['3', '18', '20']
  },

  // EXPRESSIONISMO
  {
    id: '20',
    title: 'A Dança da Vida',
    artist: 'Edvard Munch',
    price: 5100,
    year: '1899',
    medium: 'Óleo sobre tela',
    dimensions: '125 x 191 cm',
    style: 'Expressionismo',
    region: 'Europa',
    image: 'https://santhatela.com.br/wp-content/uploads/2017/02/munch-danca-vida-d.jpg',
    description: 'Obra que explora sentimentos e relações humanas por meio das cores.',
    similarIds: ['6', '21', '22']
  },
  {
    id: '21',
    title: 'Ansiedade',
    artist: 'Edvard Munch',
    price: 4700,
    year: '1894',
    medium: 'Óleo sobre tela',
    dimensions: '94 x 74 cm',
    style: 'Expressionismo',
    region: 'Europa',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ae/Edvard_Munch_-_Anxiety_-_Google_Art_Project.jpg/1920px-Edvard_Munch_-_Anxiety_-_Google_Art_Project.jpg?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=thumbnail',
    description: 'Pintura expressiva que utiliza cores e formas para transmitir emoções.',
    similarIds: ['6', '20', '22']
  },

  // FAUVISMO
  {
    id: '22',
    title: 'Mulher com Chapéu',
    artist: 'Henri Matisse',
    price: 4400,
    year: '1905',
    medium: 'Óleo sobre tela',
    dimensions: '80 x 60 cm',
    style: 'Fauvismo',
    region: 'Europa',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVQwtu2tmyW-yo_uI-fO6AMTT5vqpA6_Y8x2Uu3IY3hQ&s=10',
    description: 'Retrato conhecido pelo uso livre de cores fortes.',
    similarIds: ['4', '23', '24']
  },
  {
    id: '23',
    title: 'A Alegria de Viver',
    artist: 'Henri Matisse',
    price: 5800,
    year: '1906',
    medium: 'Óleo sobre tela',
    dimensions: '176 x 240 cm',
    style: 'Fauvismo',
    region: 'Europa',
    image: 'https://allpaintingsstore.com/media/artworks/images-full/7c/73/7c7364c3f19fddf59504fd243bde1e4e.jpg',
    description: 'Cena colorida que representa figuras em uma paisagem imaginária.',
    similarIds: ['4', '22', '24']
  },

  // CUBISMO
  {
    id: '24',
    title: 'Les Demoiselles d’Avignon',
    artist: 'Pablo Picasso',
    price: 8500,
    year: '1907',
    medium: 'Óleo sobre tela',
    dimensions: '243 x 233 cm',
    style: 'Cubismo',
    region: 'Europa',
    image: 'https://upload.wikimedia.org/wikipedia/en/4/4c/Les_Demoiselles_d%27Avignon.jpg',
    description: 'Obra revolucionária que ajudou a desenvolver a linguagem cubista.',
    similarIds: ['12', '25', '26']
  },
  {
    id: '25',
    title: 'Violino e Castiçal',
    artist: 'Georges Braque',
    price: 4900,
    year: '1910',
    medium: 'Óleo sobre tela',
    dimensions: '60 x 50 cm',
    style: 'Cubismo',
    region: 'Europa',
    image: 'https://www.researchgate.net/publication/322510509/figure/fig5/AS:583232280563712@1516064819466/Figura-9-Violino-e-castical-Violon-et-chandelier-oleo-sobre-tela-1910-Georges-Braque.png',
    description: 'Composição cubista que fragmenta objetos em formas geométricas.',
    similarIds: ['12', '24', '26']
  },

  // SURREALISMO
  {
    id: '26',
    title: 'O Filho do Homem',
    artist: 'René Magritte',
    price: 6200,
    year: '1964',
    medium: 'Óleo sobre tela',
    dimensions: '116 x 89 cm',
    style: 'Surrealismo',
    region: 'Europa',
    image: 'https://guiadoestudante.abril.com.br/wp-content/uploads/sites/4/2023/05/o-filho-do-home-rene-magritte.jpg?quality=70&w=848',
    description: 'Retrato surrealista de um homem com o rosto parcialmente escondido por uma maçã.',
    similarIds: ['10', '27', '28']
  },
  {
    id: '27',
    title: 'Cisnes Refletindo Elefantes',
    artist: 'Salvador Dalí',
    price: 6500,
    year: '1937',
    medium: 'Óleo sobre tela',
    dimensions: '51 x 77 cm',
    style: 'Surrealismo',
    region: 'Europa',
    image: 'https://pub-02f1c5d6822847b09b6b4643ca171bd3.r2.dev/migrated_1777905215647_nckrrmo1nk71l4hoebpy.jpg',
    description: 'Paisagem surrealista que transforma reflexos em figuras inesperadas.',
    similarIds: ['10', '26', '28']
  },

  // RENASCIMENTO
  {
    id: '28',
    title: 'A Última Ceia',
    artist: 'Leonardo da Vinci',
    price: 8700,
    year: '1498',
    medium: 'Têmpera e óleo sobre parede',
    dimensions: '460 x 880 cm',
    style: 'Renascimento',
    region: 'Europa',
    image: 'https://static.todamateria.com.br/upload/ul/ti/ultima_ceia_da_vinci_1_694x250_c.jpg',
    description: 'Pintura mural que representa a última refeição de Jesus com seus discípulos.',
    similarIds: ['5', '11', '29']
  },
  {
    id: '29',
    title: 'A Criação de Adão',
    artist: 'Michelangelo',
    price: 9000,
    year: '1512',
    medium: 'Afresco',
    dimensions: '280 x 570 cm',
    style: 'Renascimento',
    region: 'Europa',
    image: 'https://static.todamateria.com.br/upload/ac/ri/a-criacao-de-adao-og.jpg',
    description: 'Afresco famoso que representa o encontro das mãos de Deus e Adão.',
    similarIds: ['5', '11', '28']
  },

  // UKIYO-E
  {
    id: '30',
    title: 'Vento Sul, Céu Limpo',
    artist: 'Katsushika Hokusai',
    price: 3600,
    year: '1831',
    medium: 'Gravura em madeira',
    dimensions: '25 x 37 cm',
    style: 'Ukiyo-e',
    region: 'Ásia',
    image: 'https://art7telas.com.br/wp-content/uploads/2024/03/katsushika-hokusai-vento-sul-ceu-limpo-1830-1832.jpg',
    description: 'Gravura japonesa que apresenta o Monte Fuji em tons avermelhados.',
    similarIds: ['7', '4', '6']
  }
];

export const ARTWORKS = RAW_ARTWORKS.map((artwork) => {
  const imageUrl =
    typeof artwork.image === 'string'
      ? artwork.image.match(/\]\((https?:\/\/[^)]+)\)/)
      : null;

  return {
    ...artwork,
    image: imageUrl
      ? imageUrl[1].replace(/\\/g, '')
      : artwork.image,
  };
});