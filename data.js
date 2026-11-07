// Catálogo de Restaurantes, Bares, Cafés e Pesqueiros de Araçoiaba da Serra e Região

const THEMES = [
  {
    id: "escuro",
    name: "Escuro Gourmet",
    blurb: "a vitrine escura clássica de alta gastronomia",
    color: "#0d0e0f",
    scheme: "dark"
  },
  {
    id: "serra",
    name: "Rústico da Serra",
    blurb: "verde mata, madeira e brasa ao pé do Morro de Ipanema",
    color: "#0b130e",
    scheme: "dark"
  },
  {
    id: "bistro",
    name: "Bistrô Claro",
    blurb: "café de manhã na praça, papel artesanal e toldo de bistrô",
    color: "#e4dccb",
    scheme: "light"
  },
  {
    id: "neon",
    name: "Neon Bar & Noite",
    blurb: "luzes da noite, burgers, chopp gelado e música ao vivo",
    color: "#0a0614",
    scheme: "dark"
  }
];

const CUISINES = {
  churrasco: "Churrasco e Carnes",
  pizzaria: "Pizzarias e Massas",
  burger: "Hambúrguer Artesanal",
  caipira: "Fazenda e Caseira",
  pesqueiro: "Pesqueiros e Peixes",
  japonesa: "Japonesa e Oriental",
  bar: "Bares e Botecos",
  cafe: "Cafés, Padarias e Doces"
};

const REGIONS = {
  centro: { id: "centro", title: "Centro e Praça", short: "Centro" },
  lago: { id: "lago", title: "Lago Municipal", short: "Lago Municipal" },
  rodovia: { id: "rodovia", title: "Raposo e Barreiro", short: "Raposo / Barreiro" },
  rural: { id: "rural", title: "Campo Largo e Fazendas", short: "Zona Rural" },
  santacruz: { id: "santacruz", title: "Jd. Santa Cruz e Bairros", short: "Jd. Santa Cruz" },
  montebianco: { id: "montebianco", title: "Monte Bianco e Condomínios", short: "Monte Bianco" }
};

const VIBES = {
  familia: "Em família e Espaço Kids",
  casal: "Encontro a dois",
  amigos: "Com amigos e Happy Hour",
  natureza: "Ao ar livre e Pet Friendly",
  delivery: "Forte no Delivery"
};

const PRICES = {
  $: "$ · Econômico",
  $$: "$$ · Moderado",
  $$$: "$$$ · Especial"
};

// Gera poster SVG estilizado como fallback instantâneo ou arte de vitrine
function makeSvgArt(item, mode = "cover") {
  const w = mode === "cover" ? 480 : 800;
  const h = mode === "cover" ? 600 : 500;
  const accent = item.accent || "#ff7445";
  const bg2 = "#121518";
  const categoryLabel = (CUISINES[item.cuisine] || "Gastronomia").toUpperCase();
  const regionLabel = (REGIONS[item.region]?.short || "Araçoiaba da Serra").toUpperCase();
  const titleLines = item.title.split(" ");
  const line1 = titleLines.slice(0, 2).join(" ").toUpperCase();
  const line2 = titleLines.slice(2).join(" ").toUpperCase();

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${accent}" stop-opacity="0.88"/>
        <stop offset="55%" stop-color="${accent}" stop-opacity="0.28"/>
        <stop offset="100%" stop-color="${bg2}" stop-opacity="0.98"/>
      </linearGradient>
      <radialGradient id="r" cx="75%" cy="20%" r="65%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="#101214"/>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <rect width="100%" height="100%" fill="url(#r)"/>
    <circle cx="${w * 0.82}" cy="${h * 0.22}" r="${Math.min(w, h) * 0.28}" fill="${accent}" opacity="0.22"/>
    <circle cx="${w * 0.15}" cy="${h * 0.85}" r="${Math.min(w, h) * 0.35}" fill="#000000" opacity="0.35"/>
    <rect x="28" y="28" width="${w - 56}" height="${h - 56}" rx="14" fill="none" stroke="#ffffff" stroke-opacity="0.16" stroke-width="1.5"/>
    <text x="48" y="68" fill="#ffffff" fill-opacity="0.78" font-family="DM Sans, sans-serif" font-size="13" font-weight="700" letter-spacing="2.5">${regionLabel}</text>
    <text x="48" y="${h - 140}" fill="#ffd89b" font-family="DM Sans, sans-serif" font-size="13" font-weight="700" letter-spacing="2">${categoryLabel}</text>
    <text x="48" y="${h - 92}" fill="#ffffff" font-family="Barlow Condensed, Arial Narrow, sans-serif" font-size="${mode === "cover" ? 44 : 52}" font-weight="800">${line1.replace(/&/g, "&amp;")}</text>
    ${line2 ? `<text x="48" y="${h - 46}" fill="#ffffff" fill-opacity="0.92" font-family="Barlow Condensed, Arial Narrow, sans-serif" font-size="${mode === "cover" ? 36 : 44}" font-weight="700">${line2.replace(/&/g, "&amp;")}</text>` : ""}
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const RESTAURANTS = [
  {
    id: "lets-grill-farm",
    title: "Let's Grill Farm",
    subtitle: "Parrilla, Cortes Nobres e Clima de Fazenda",
    cuisine: "churrasco",
    region: "rodovia",
    price: "$$$",
    vibes: ["familia", "amigos", "natureza"],
    score: 4.8,
    scoreCount: 940,
    scoreSource: "Google Maps",
    accent: "#d9532f",
    dish: "Bife Ancho & Costela no Fogo de Chão",
    distance: "6 min do Centro (Km 114,5)",
    hours: "Sex a Dom · 11h30 às 17h",
    address: "Rod. Raposo Tavares (SP-270), Km 114,5 - Barreiro, Araçoiaba da Serra - SP",
    phone: "5515997001145",
    instagram: "https://www.instagram.com/explore/tags/letsgrillfarm/",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Lets+Grill+Farm+Aracoiaba+da+Serra",
    description:
      "Referência em Araçoiaba da Serra quando o assunto é carne nobre e lazer ao ar livre. O espaço amplo em estilo fazenda conta com gramado arborizado, área kids monitorada, ambiente pet-friendly, música ao vivo e cortes como chorizo, ancho, fraldinha na brasa e parmegianas artesanais.",
    amenities: "Estacionamento próprio · Espaço Kids · Pet Friendly · Música ao vivo · Drinks & Chopp",
    coverPhoto: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80",
    shotPhoto: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80",
    curated: true,
    onboardingPick: true
  },
  {
    id: "old-truck-bbq",
    title: "Old Truck BBQ",
    subtitle: "American BBQ, Defumados e Pit Smoker na Fazenda",
    cuisine: "churrasco",
    region: "rural",
    price: "$$$",
    vibes: ["familia", "amigos", "natureza", "casal"],
    score: 4.9,
    scoreCount: 620,
    scoreSource: "Google Maps",
    accent: "#c84b31",
    dish: "Brisket Defumado 12h & Pork Ribs",
    distance: "10 min do Centro (Fazenda Imperial)",
    hours: "Sáb, Dom e Feriados · 12h às 17h",
    address: "Fazenda Imperial - Zona Rural, Araçoiaba da Serra - SP",
    phone: "5515998112233",
    instagram: "https://www.instagram.com/explore/tags/oldtruckbbq/",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Old+Truck+BBQ+Aracoiaba+da+Serra",
    description:
      "Autêntico churrasco texano em meio à natureza de Araçoiaba da Serra. Carnes defumadas lentamente em lenha frutífera (brisket, costelinha suína com barbecue artesanal, pulled pork e hambúrguer defumado) servidas em um cenário rústico perfeito para passar a tarde.",
    amenities: "Pit Smoker · Cervejas Artesanais · Área Verde · Pet Friendly · Estacionamento",
    coverPhoto: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=700&q=80",
    shotPhoto: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=80",
    curated: true,
    onboardingPick: true
  },
  {
    id: "restaurante-lago-aracoiaba",
    title: "Restaurante Lago Araçoiaba",
    subtitle: "Vista para o Lago, Pratos Fartos e Porções",
    cuisine: "caipira",
    region: "lago",
    price: "$$",
    vibes: ["familia", "casal", "natureza"],
    score: 4.7,
    scoreCount: 780,
    scoreSource: "Google Maps",
    accent: "#2d8a6e",
    dish: "Filé de Tilápia & Picanha na Chapa",
    distance: "3 min do Centro (Lago Municipal)",
    hours: "Ter a Dom · 11h às 22h",
    address: "Região do Lago Municipal, Araçoiaba da Serra - SP",
    phone: "5515997223344",
    instagram: "https://www.google.com/maps/search/?api=1&query=Restaurante+Lago+Aracoiaba+da+Serra",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Restaurante+Lago+Aracoiaba+da+Serra",
    description:
      "Um dos cartões-postais gastronômicos da cidade. Com vista privilegiada e brisa agradável, serve pratos fartos para compartilhar em família, peixes crocantes, carnes na chapa, parmegianas e chopp trincando no fim de tarde.",
    amenities: "Vista para o Lago · Mesas ao ar livre · Ideal para famílias · Estacionamento fácil",
    coverPhoto: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=700&q=80",
    shotPhoto: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    curated: true,
    onboardingPick: true
  },
  {
    id: "esquina-da-pizza",
    title: "Esquina da Pizza",
    subtitle: "A Pizzaria Tradicional do Coração de Araçoiaba",
    cuisine: "pizzaria",
    region: "centro",
    price: "$$",
    vibes: ["familia", "amigos", "casal", "delivery"],
    score: 4.7,
    scoreCount: 530,
    scoreSource: "Google Maps",
    accent: "#e04f33",
    dish: "Pizza Moda da Casa & Catupiry Original",
    distance: "No Centro",
    hours: "Ter a Dom · 18h30 às 23h30",
    address: "Região Central, Araçoiaba da Serra - SP",
    phone: "551532811000",
    instagram: "https://www.google.com/maps/search/?api=1&query=Esquina+da+Pizza+Aracoiaba+da+Serra",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Esquina+da+Pizza+Aracoiaba+da+Serra",
    description:
      "Ponto de encontro clássico das famílias e amigos no centro de Araçoiaba da Serra. Famosa pela massa no ponto certo, bordas recheadas generosas e ingredientes selecionados, tanto para jantar no salão quanto para pedir em casa.",
    amenities: "Salão climatizado · Forno tradicional · Delivery rápido · Opções vegetarianas",
    coverPhoto: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80",
    shotPhoto: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1200&q=80",
    curated: true,
    onboardingPick: true
  },
  {
    id: "don-francesco",
    title: "Don Francesco Pizzaria",
    subtitle: "Pizzas Artesanais no Forno a Lenha & Esfihas",
    cuisine: "pizzaria",
    region: "centro",
    price: "$$",
    vibes: ["familia", "casal", "delivery"],
    score: 4.8,
    scoreCount: 490,
    scoreSource: "Google & iFood",
    accent: "#d43d27",
    dish: "Pizza Margherita Especial & Esfihas Abertas",
    distance: "No Centro",
    hours: "Ter a Dom · 18h às 23h30",
    address: "Centro, Araçoiaba da Serra - SP",
    phone: "5515997445566",
    instagram: "https://www.google.com/maps/search/?api=1&query=Don+Francesco+Pizzaria+Aracoiaba+da+Serra",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Don+Francesco+Pizzaria+Aracoiaba+da+Serra",
    description:
      "Massa de longa fermentação assada em forno a lenha e esfihas artesanais muito elogiadas em toda a cidade. Excelente opção tanto para uma noite tranquila no salão quanto para entrega nos condomínios da região.",
    amenities: "Forno a lenha · Esfiharia · Delivery para condomínios · Ingredientes premium",
    coverPhoto: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80",
    shotPhoto: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=1200&q=80",
    curated: true,
    onboardingPick: true
  },
  {
    id: "roads-burger",
    title: "Road's Burger",
    subtitle: "Hambúrguer Artesanal na Brasa, Batatas e Milkshakes",
    cuisine: "burger",
    region: "santacruz",
    price: "$$",
    vibes: ["amigos", "casal", "familia", "delivery"],
    score: 4.8,
    scoreCount: 410,
    scoreSource: "Google Maps",
    accent: "#f28526",
    dish: "Road's Bacon Duplo & Batata Rústica com Cheddar",
    distance: "4 min do Centro (Bosque / Jd. Horizonte)",
    hours: "Qua a Dom · 18h30 às 23h",
    address: "Bosque dos Eucaliptos / Jardim Horizonte, Araçoiaba da Serra - SP",
    phone: "5515997556677",
    instagram: "https://www.google.com/maps/search/?api=1&query=Roads+Burger+Aracoiaba+da+Serra",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Roads+Burger+Aracoiaba+da+Serra",
    description:
      "Blends suculentos preparados diariamente, pão brioche selado na manteiga, bacon crocante caramelizado e maionese verde artesanal da casa. Uma das hamburguerias mais bem avaliadas de Araçoiaba da Serra.",
    amenities: "Blend artesanal · Maionese da casa · Opção vegetariana · Retirada e Delivery",
    coverPhoto: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80",
    shotPhoto: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80",
    curated: true,
    onboardingPick: true
  },
  {
    id: "nenio-rock-bar",
    title: "Nenio Rock Bar",
    subtitle: "Mais de 50 Anos de História, Rock, Petiscos e Bife a Cavalo",
    cuisine: "bar",
    region: "centro",
    price: "$$",
    vibes: ["amigos", "casal"],
    score: 4.8,
    scoreCount: 510,
    scoreSource: "Google Maps",
    accent: "#9b38f5",
    dish: "Bife a Cavalo Clássico & Porções de Boteco",
    distance: "No Centro",
    hours: "Qua a Dom · 18h às 01h",
    address: "Centro, Araçoiaba da Serra - SP",
    phone: "5515997667788",
    instagram: "https://www.google.com/maps/search/?api=1&query=Nenio+Rock+Bar+Aracoiaba+da+Serra",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Nenio+Rock+Bar+Aracoiaba+da+Serra",
    description:
      "Patrimônio boêmio e cultural de Araçoiaba da Serra com mais de meio século de tradição. Famoso pela cerveja sempre estupidamente gelada, pratos clássicos como o lendário bife a cavalo, porções caprichadas e bandas de rock ao vivo nos fins de semana.",
    amenities: "Música ao vivo · Cervejas & Drinks · Sinuca · Mais de 50 anos de história",
    coverPhoto: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=700&q=80",
    shotPhoto: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=1200&q=80",
    curated: true,
    onboardingPick: true
  },
  {
    id: "fazenda-campo-largo",
    title: "Restaurante Fazenda Campo Largo",
    subtitle: "Fogão a Lenha, Comida Caipira Raiz e Natureza",
    cuisine: "caipira",
    region: "rural",
    price: "$$",
    vibes: ["familia", "natureza", "casal"],
    score: 4.8,
    scoreCount: 460,
    scoreSource: "Google Maps",
    accent: "#528a35",
    dish: "Frango Caipira, Torresmo de Rolo & Doces Caseiros",
    distance: "12 min do Centro (Estr. Campo Largo)",
    hours: "Sáb, Dom e Feriados · 11h30 às 16h",
    address: "Estrada de Campo Largo, Araçoiaba da Serra - SP",
    phone: "5515997778899",
    instagram: "https://www.google.com/maps/search/?api=1&query=Restaurante+Fazenda+Campo+Largo+Aracoiaba+da+Serra",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Restaurante+Fazenda+Campo+Largo+Aracoiaba+da+Serra",
    description:
      "O verdadeiro almoço de domingo no interior paulista. Fogão a lenha fumegando com costelinha de porco, torresmo crocante, feijão gordo, polenta cremosa, saladas da horta e mesa de doces caseiros no tacho.",
    amenities: "Fogão a lenha · Sobremesas caseiras · Área verde ampla · Estacionamento gratuito",
    coverPhoto: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80",
    shotPhoto: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    curated: true,
    onboardingPick: true
  },
  {
    id: "costela-da-serra",
    title: "Costela da Serra",
    subtitle: "Costela no Bafo que Desmancha e Acompanhamentos",
    cuisine: "churrasco",
    region: "rodovia",
    price: "$$",
    vibes: ["familia", "amigos"],
    score: 4.6,
    scoreCount: 680,
    scoreSource: "TripAdvisor & Google",
    accent: "#b84523",
    dish: "Costela Bovina Assada Lentamente c/ Mandioca",
    distance: "5 min do Centro",
    hours: "Ter a Dom · 11h às 15h30",
    address: "Acesso Rodovia / Centro, Araçoiaba da Serra - SP",
    phone: "551532812200",
    instagram: "https://www.google.com/maps/search/?api=1&query=Costela+da+Serra+Aracoiaba+da+Serra",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Costela+da+Serra+Aracoiaba+da+Serra",
    description:
      "Parada obrigatória para quem ama uma costela bovina suculenta que solta do osso. Acompanha mandioca cozida na manteiga de garrafa, arroz soltinho, feijão tropeiro, farofa crocante e vinagrete fresco.",
    amenities: "Porções fartas · Atendimento rápido · Estacionamento · Ideal para família",
    coverPhoto: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80",
    shotPhoto: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=80",
    curated: true,
    onboardingPick: true
  },
  {
    id: "pesqueiro-baruc",
    title: "Pesqueiro Baruc",
    subtitle: "Lagos de Pesca Esportiva e Porções de Tilápia Fresca",
    cuisine: "pesqueiro",
    region: "rural",
    price: "$$",
    vibes: ["familia", "natureza", "amigos"],
    score: 4.7,
    scoreCount: 390,
    scoreSource: "Google Maps",
    accent: "#2176ae",
    dish: "Filé de Tilápia Crocante com Creme de Alho",
    distance: "8 min do Centro (Chácara da Amizade)",
    hours: "Qua a Dom · 08h às 18h",
    address: "Rua Zelinschi Ana Arruda, 142 - Chácara da Amizade, Araçoiaba da Serra - SP",
    phone: "5515997889900",
    instagram: "https://www.google.com/maps/search/?api=1&query=Pesqueiro+Baruc+Aracoiaba+da+Serra",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Pesqueiro+Baruc+Aracoiaba+da+Serra",
    description:
      "Combinação perfeita de pescaria esportiva, sossego à beira do lago e restaurante caprichado. O carro-chefe é a famosa porção de filé de tilápia empanada sequinha servida com o creme de alho exclusivo da casa.",
    amenities: "Lagos de pesca · Porções de peixe · Cerveja gelada · Ambiente familiar ao ar livre",
    coverPhoto: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=700&q=80",
    shotPhoto: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80",
    curated: false,
    onboardingPick: true
  },
  {
    id: "saty-japones",
    title: "Saty Restaurante Japonês",
    subtitle: "Combinados de Sushi, Sashimi Fresco, Temakis e Yakissoba",
    cuisine: "japonesa",
    region: "centro",
    price: "$$",
    vibes: ["casal", "amigos", "delivery"],
    score: 4.7,
    scoreCount: 350,
    scoreSource: "Google Maps",
    accent: "#e63946",
    dish: "Barca Saty 48 Peças & Hot Roll Especial",
    distance: "No Centro (Rua José Paulino)",
    hours: "Ter a Dom · 18h30 às 23h",
    address: "Rua José Paulino - Centro, Araçoiaba da Serra - SP",
    phone: "5515998001122",
    instagram: "https://www.google.com/maps/search/?api=1&query=Saty+Restaurante+Japones+Aracoiaba+da+Serra",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Saty+Restaurante+Japones+Aracoiaba+da+Serra",
    description:
      "Salmão sempre fresco, cortes generosos e cardápio completo da culinária japonesa no centro de Araçoiaba da Serra. Conta com salão aconchegante para jantar a dois e um dos deliveries mais pedidos da cidade.",
    amenities: "Peixe fresco diário · Barcas & Combinados · Pratos quentes · Delivery próprio",
    coverPhoto: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=700&q=80",
    shotPhoto: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1200&q=80",
    curated: true,
    onboardingPick: true
  },
  {
    id: "padoca-sabadin",
    title: "Padoca Sabadin Empório & Café",
    subtitle: "Café da Manhã, Pães Artesanais, Frios e Empório",
    cuisine: "cafe",
    region: "santacruz",
    price: "$$",
    vibes: ["familia", "casal"],
    score: 4.8,
    scoreCount: 420,
    scoreSource: "Google Maps",
    accent: "#d48c46",
    dish: "Pão na Chapa com Requeijão na Crosta & Cappuccino",
    distance: "3 min do Centro (Jd. Santa Cruz)",
    hours: "Todos os dias · 06h30 às 20h30",
    address: "Jardim Santa Cruz, Araçoiaba da Serra - SP",
    phone: "551532813344",
    instagram: "https://www.google.com/maps/search/?api=1&query=Padoca+Sabadin+Aracoiaba+da+Serra",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Padoca+Sabadin+Aracoiaba+da+Serra",
    description:
      "Mais que uma padaria, um empório gastronômico em Araçoiaba. Pães quentinhos a toda hora, confeitaria fina, lanches de metro, queijos, vinhos e um café da manhã caprichado antes de pegar a estrada ou curtir o fim de semana.",
    amenities: "Café expresso · Confeitaria própria · Empório de queijos e vinhos · Estacionamento",
    coverPhoto: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80",
    shotPhoto: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80",
    curated: true,
    onboardingPick: true
  },
  {
    id: "divino-pao",
    title: "Padaria & Confeitaria Divino Pão",
    subtitle: "Tradição na Praça Coronel Almeida, Salgados e Doces",
    cuisine: "cafe",
    region: "centro",
    price: "$",
    vibes: ["familia"],
    score: 4.7,
    scoreCount: 580,
    scoreSource: "Google Maps",
    accent: "#c97a2b",
    dish: "Coxinha Cremosa, Sonho de Creme & Pingado",
    distance: "Na Praça da Matriz (Centro)",
    hours: "Todos os dias · 06h às 21h",
    address: "Praça Coronel Almeida - Centro, Araçoiaba da Serra - SP",
    phone: "551532811515",
    instagram: "https://www.google.com/maps/search/?api=1&query=Padaria+Divino+Pao+Aracoiaba+da+Serra",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Padaria+Divino+Pao+Aracoiaba+da+Serra",
    description:
      "Localizada no coração histórico de Araçoiaba da Serra, na Praça Coronel Almeida. Ponto clássico para tomar café da manhã, comer um lanche rápido no balcão ou encomendar bolos e doces para a família.",
    amenities: "Bem no Centro · Pães frescos o dia todo · Bolos de festa · Lanchonete",
    coverPhoto: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=700&q=80",
    shotPhoto: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
    curated: false,
    onboardingPick: true
  },
  {
    id: "pizzaria-tubabs",
    title: "Pizzaria Tubabs",
    subtitle: "Pizzas Generosas, Calzones e Ambiente Familiar",
    cuisine: "pizzaria",
    region: "centro",
    price: "$$",
    vibes: ["familia", "amigos", "delivery"],
    score: 4.6,
    scoreCount: 380,
    scoreSource: "Google Maps",
    accent: "#d94e34",
    dish: "Pizza Tubabs Especial & Portuguesa Completa",
    distance: "No Centro",
    hours: "Ter a Dom · 18h30 às 23h",
    address: "Centro, Araçoiaba da Serra - SP",
    phone: "551532814455",
    instagram: "https://www.google.com/maps/search/?api=1&query=Pizzaria+Tubabs+Aracoiaba+da+Serra",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Pizzaria+Tubabs+Aracoiaba+da+Serra",
    description:
      "Muito querida pelos moradores de Araçoiaba da Serra pelo recheio farto e atendimento acolhedor. Ótima pedida para reunir a turma depois do trabalho ou pedir uma pizza bem recheada no fim de semana.",
    amenities: "Salão familiar · Recheio farto · Delivery em toda a cidade · Pizzas doces",
    coverPhoto: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=700&q=80",
    shotPhoto: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
    curated: false,
    onboardingPick: false
  },
  {
    id: "oishi-gastronomia",
    title: "Oishi Gastronomia Oriental",
    subtitle: "Sushis Autorais, Ceviche, Poke e Delivery Premium",
    cuisine: "japonesa",
    region: "centro",
    price: "$$$",
    vibes: ["casal", "delivery", "amigos"],
    score: 4.8,
    scoreCount: 290,
    scoreSource: "Google Maps",
    accent: "#d9385a",
    dish: "Combo Oishi Chef & Carpaccio de Salmão Trufado",
    distance: "No Centro",
    hours: "Ter a Dom · 18h30 às 23h",
    address: "Centro, Araçoiaba da Serra - SP",
    phone: "5515998223344",
    instagram: "https://www.google.com/maps/search/?api=1&query=Oishi+Gastronomia+Aracoiaba+da+Serra",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Oishi+Gastronomia+Aracoiaba+da+Serra",
    description:
      "Culinária japonesa com apresentação impecável e toque contemporâneo. Destaque para os niguiris maçaricados, uramakis especiais, pokes frescos e embalagens térmicas perfeitas para entrega nos condomínios.",
    amenities: "Cortes especiais · Embalagem premium · Opções sem glúten · Atendimento via app",
    coverPhoto: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=700&q=80",
    shotPhoto: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=1200&q=80",
    curated: false,
    onboardingPick: true
  },
  {
    id: "meats-top",
    title: "Meats Top Boutique & Grill",
    subtitle: "Boutique de Carnes Nobres, Espetinhos Gourmet e Chopp",
    cuisine: "churrasco",
    region: "centro",
    price: "$$",
    vibes: ["amigos", "casal"],
    score: 4.7,
    scoreCount: 310,
    scoreSource: "Google Maps",
    accent: "#b5382a",
    dish: "Prime Rib na Parrilla & Pão de Alho Recheado",
    distance: "No Centro",
    hours: "Qua a Dom · 11h às 22h",
    address: "Centro, Araçoiaba da Serra - SP",
    phone: "5515998334455",
    instagram: "https://www.google.com/maps/search/?api=1&query=Meats+Top+Aracoiaba+da+Serra",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Meats+Top+Aracoiaba+da+Serra",
    description:
      "Une boutique de carnes selecionadas para o seu churrasco na chácara com um espaço descontraído para degustar cortes assados na hora, acompanhados de cerveja gelada e acompanhamentos de parrilla.",
    amenities: "Boutique de carnes · Assados na hora · Chopp artesanal · Kit churrasco para chácaras",
    coverPhoto: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=700&q=80",
    shotPhoto: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    curated: false,
    onboardingPick: false
  },
  {
    id: "restaurante-gavazzi",
    title: "Restaurante Gavazzi",
    subtitle: "Almoço Caseiro Caprichado, Buffet e Pratos Executivos",
    cuisine: "caipira",
    region: "santacruz",
    price: "$",
    vibes: ["familia", "delivery"],
    score: 4.6,
    scoreCount: 340,
    scoreSource: "Google Maps",
    accent: "#e07a2b",
    dish: "Parmegiana Caseira & Feijoada de Quarta e Sábado",
    distance: "3 min do Centro (Av. Luane Milanda)",
    hours: "Seg a Sáb · 11h às 14h30",
    address: "Av. Luane Milanda Oliveira - Jardim Santa Cruz, Araçoiaba da Serra - SP",
    phone: "551532815566",
    instagram: "https://www.google.com/maps/search/?api=1&query=Restaurante+Gavazzi+Aracoiaba+da+Serra",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Restaurante+Gavazzi+Aracoiaba+da+Serra",
    description:
      "Tradição no almoço do dia a dia em Araçoiaba da Serra. Comida temperada como em casa, variedade de saladas, carnes grelhadas na hora e marmitex sempre quentinho para quem trabalha ou mora na região.",
    amenities: "Almoço executivo · Buffet por quilo · Marmitex e Delivery · Preço justo",
    coverPhoto: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=700&q=80",
    shotPhoto: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    curated: false,
    onboardingPick: false
  },
  {
    id: "hamburgui",
    title: "Hamburgui Smash & Grill",
    subtitle: "Smash Burgers Crocantes, Onion Rings e Combos",
    cuisine: "burger",
    region: "montebianco",
    price: "$",
    vibes: ["amigos", "familia", "delivery"],
    score: 4.7,
    scoreCount: 270,
    scoreSource: "Google Maps",
    accent: "#f59e0b",
    dish: "Smash Triplo American Cheese & Onion Rings",
    distance: "5 min do Centro (Estr. Celso Charuri)",
    hours: "Ter a Dom · 18h30 às 23h",
    address: "Estrada Dr. Celso Charuri, Araçoiaba da Serra - SP",
    phone: "5515998445566",
    instagram: "https://www.google.com/maps/search/?api=1&query=Hamburgui+Aracoiaba+da+Serra",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Hamburgui+Aracoiaba+da+Serra",
    description:
      "Localizado em rota estratégica próxima aos condomínios e chácaras da Estrada Celso Charuri e Monte Bianco. Especialista em smash burgers com crostinha perfeita na chapa, queijo derretido e entrega ágil.",
    amenities: "Fácil acesso aos condomínios · Smash burger · Combos econômicos · Delivery rápido",
    coverPhoto: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=700&q=80",
    shotPhoto: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80",
    curated: false,
    onboardingPick: false
  },
  {
    id: "barao-burguer",
    title: "Barão Burguer",
    subtitle: "Lanches Prensados, Hambúrgueres Tradicionais e Porções",
    cuisine: "burger",
    region: "centro",
    price: "$",
    vibes: ["amigos", "familia", "delivery"],
    score: 4.6,
    scoreCount: 310,
    scoreSource: "Google Maps",
    accent: "#e66c2c",
    dish: "X-Barão Tudo & Batata Frita com Bacon",
    distance: "No Centro (Rua 21 de Abril)",
    hours: "Ter a Dom · 18h às 23h30",
    address: "Rua 21 de Abril - Centro, Araçoiaba da Serra - SP",
    phone: "551532816677",
    instagram: "https://www.google.com/maps/search/?api=1&query=Barao+Burguer+Aracoiaba+da+Serra",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Barao+Burguer+Aracoiaba+da+Serra",
    description:
      "Aquele lanche de respeito bem no centro da cidade. Dos hambúrgueres artesanais aos lanches tradicionais de chapa bem recheados, com maionese temperada que todo morador de Araçoiaba conhece.",
    amenities: "Centro da cidade · Lanches fartos · Atendimento noturno · Delivery",
    coverPhoto: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=80",
    shotPhoto: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80",
    curated: false,
    onboardingPick: false
  },
  {
    id: "pesqueiro-gattaz",
    title: "Pesqueiro Gattaz",
    subtitle: "Tradição Rural, Lagos Amplos e Almoço Caipira",
    cuisine: "pesqueiro",
    region: "rural",
    price: "$$",
    vibes: ["familia", "natureza"],
    score: 4.6,
    scoreCount: 320,
    scoreSource: "Google Maps",
    accent: "#2a7f62",
    dish: "Pacu Frito Inteiro & Porção de Traíra sem Espinha",
    distance: "14 min do Centro (Estrada Vicinal)",
    hours: "Qui a Dom · 07h30 às 18h",
    address: "Estrada Vicinal Araçoiaba / Sarapuí, Araçoiaba da Serra - SP",
    phone: "5515998556677",
    instagram: "https://www.google.com/maps/search/?api=1&query=Pesqueiro+Gattaz+Aracoiaba+da+Serra",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Pesqueiro+Gattaz+Aracoiaba+da+Serra",
    description:
      "Um refúgio verde no interior de Araçoiaba da Serra. Ideal para passar o dia inteiro com as crianças, pescar grandes exemplares e almoçar peixes frescos preparados na hora com tempero da roça.",
    amenities: "Pesca esportiva · Almoço completo · Redário e sombra · Estacionamento amplo",
    coverPhoto: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=700&q=80",
    shotPhoto: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=80",
    curated: false,
    onboardingPick: false
  },
  {
    id: "sorvetes-urla",
    title: "Sorvetes Urla & Gelateria",
    subtitle: "Sorvetes de Massa, Picolés Artesanais e Taças",
    cuisine: "cafe",
    region: "centro",
    price: "$",
    vibes: ["familia", "casal"],
    score: 4.7,
    scoreCount: 440,
    scoreSource: "Google Maps",
    accent: "#ec4899",
    dish: "Taça Colegial, Sorvete de Ninho Trufado & Picolés",
    distance: "No Centro (Av. Ângelo Pupin)",
    hours: "Todos os dias · 10h às 21h",
    address: "Av. Ângelo Pupin - Centro, Araçoiaba da Serra - SP",
    phone: "551532817788",
    instagram: "https://www.google.com/maps/search/?api=1&query=Sorvetes+Urla+Aracoiaba+da+Serra",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Sorvetes+Urla+Aracoiaba+da+Serra",
    description:
      "Parada obrigatória nas tardes ensolaradas de Araçoiaba da Serra. Dezenas de sabores de sorvetes cremosos, picolés de frutas e ao leite, açaí e potes para levar para a chácara no fim de semana.",
    amenities: "Dezenas de sabores · Atacado e varejo · Ótimo para levar para a chácara · Preço acessível",
    coverPhoto: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=700&q=80",
    shotPhoto: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1200&q=80",
    curated: false,
    onboardingPick: true
  },
  {
    id: "master-acai",
    title: "Master Açaí & Sorveteria",
    subtitle: "Açaí Cremoso na Tigela, Copos Turbinados e Cremes",
    cuisine: "cafe",
    region: "montebianco",
    price: "$",
    vibes: ["amigos", "familia", "delivery"],
    score: 4.6,
    scoreCount: 260,
    scoreSource: "Google Maps",
    accent: "#8b5cf6",
    dish: "Roleta de Açaí com Morango, Nutella e Leite Ninho",
    distance: "4 min do Centro",
    hours: "Ter a Dom · 13h às 22h",
    address: "Acesso Monte Bianco / Centro, Araçoiaba da Serra - SP",
    phone: "5515998667788",
    instagram: "https://www.google.com/maps/search/?api=1&query=Master+Acai+Aracoiaba+da+Serra",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Master+Acai+Aracoiaba+da+Serra",
    description:
      "O açaí mais completo da cidade, com dezenas de adicionais, frutas frescas, cremes de cupuaçu e ninho, além de barcas e roletas de açaí perfeitas para dividir com a galera no calor.",
    amenities: "Monte do seu jeito · Barcas de açaí · Delivery rápido · Opções zero açúcar",
    coverPhoto: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=700&q=80",
    shotPhoto: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80",
    curated: false,
    onboardingPick: false
  },
  {
    id: "tomate-seco",
    title: "Tomate Seco Bistrô & Restaurante",
    subtitle: "Massas Artesanais, Parmegianas, Grelhados e Vinhos",
    cuisine: "pizzaria",
    region: "centro",
    price: "$$",
    vibes: ["casal", "familia", "delivery"],
    score: 4.6,
    scoreCount: 295,
    scoreSource: "Google Maps",
    accent: "#c0392b",
    dish: "Filé à Parmegiana Gratinado & Rondelli Quatro Queijos",
    distance: "No Centro",
    hours: "Ter a Dom · 11h às 15h e 18h30 às 22h30",
    address: "Centro, Araçoiaba da Serra - SP",
    phone: "551532818899",
    instagram: "https://www.google.com/maps/search/?api=1&query=Tomate+Seco+Restaurante+Aracoiaba+da+Serra",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Tomate+Seco+Restaurante+Aracoiaba+da+Serra",
    description:
      "Cozinha afetiva com toque italiano no centro de Araçoiaba. Famoso pelo molho de tomate rústico feito na casa, parmegianas muito bem servidas, lasanhas e nhoques artesanais.",
    amenities: "Molho artesanal · Carta de vinhos · Almoço e Jantar · Cardápio digital",
    coverPhoto: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=700&q=80",
    shotPhoto: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=80",
    curated: false,
    onboardingPick: false
  },
  {
    id: "rei-do-mocoto",
    title: "O Rei do Mocotó & Petiscaria",
    subtitle: "Caldos Quentes, Comida de Boteco Raiz e Cerveja de Garrafa",
    cuisine: "bar",
    region: "centro",
    price: "$",
    vibes: ["amigos"],
    score: 4.6,
    scoreCount: 240,
    scoreSource: "Google Maps",
    accent: "#b45309",
    dish: "Caldo de Mocotó Tradicional, Dobradinha & Torresmo",
    distance: "No Centro (Av. Antônio Vieira do Amaral)",
    hours: "Ter a Dom · 16h às 23h30",
    address: "Av. Antônio Vieira do Amaral, Araçoiaba da Serra - SP",
    phone: "5515998778899",
    instagram: "https://www.google.com/maps/search/?api=1&query=O+Rei+do+Mocoto+Aracoiaba+da+Serra",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=O+Rei+do+Mocoto+Aracoiaba+da+Serra",
    description:
      "Reduto da culinária de boteco raiz em Araçoiaba da Serra. Nas noites mais frias da serra, o caldo de mocotó fumegante, o feijão amigo e a porção de panceta pururuca são imbatíveis.",
    amenities: "Caldos tradicionais · Cerveja 600ml · Ambiente descontraído · Preço popular",
    coverPhoto: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=700&q=80",
    shotPhoto: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
    curated: false,
    onboardingPick: false
  },
  {
    id: "monthanhas-grill",
    title: "Monthanha's Grill Churrascaria",
    subtitle: "Espeto Corrido, Buffet Completo e Carnes na Brasa",
    cuisine: "churrasco",
    region: "rodovia",
    price: "$$",
    vibes: ["familia", "amigos"],
    score: 4.5,
    scoreCount: 410,
    scoreSource: "Google Maps",
    accent: "#c2410c",
    dish: "Picanha na Brasa, Cupim & Buffet de Saladas",
    distance: "5 min do Centro",
    hours: "Todos os dias · 11h às 15h30",
    address: "Acesso Rodovia, Araçoiaba da Serra - SP",
    phone: "551532819900",
    instagram: "https://www.google.com/maps/search/?api=1&query=Monthanhas+Grill+Aracoiaba+da+Serra",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Monthanhas+Grill+Aracoiaba+da+Serra",
    description:
      "Churrascaria tradicional para quem busca variedade e fartura no almoço. Buffet completo com pratos quentes, saladas frescas e cortes assados no carvão.",
    amenities: "Estacionamento amplo · Buffet completo · Ótimo para grupos e viajantes",
    coverPhoto: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=700&q=80",
    shotPhoto: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    curated: false,
    onboardingPick: false
  },
  {
    id: "nosso-quintal",
    title: "Nosso Quintal Refeições",
    subtitle: "Temperinho Caseiro no Centro e Delivery de Almoço",
    cuisine: "caipira",
    region: "centro",
    price: "$",
    vibes: ["familia", "delivery"],
    score: 4.5,
    scoreCount: 215,
    scoreSource: "Google Maps",
    accent: "#65a30d",
    dish: "Bife Acebolado, Strogonoff Caseiro & Feijoada",
    distance: "No Centro (Rua Prof. Toledo)",
    hours: "Seg a Sáb · 11h às 14h30",
    address: "Rua Professor Toledo - Centro, Araçoiaba da Serra - SP",
    phone: "5515998889900",
    instagram: "https://www.google.com/maps/search/?api=1&query=Nosso+Quintal+Refeicoes+Aracoiaba+da+Serra",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Nosso+Quintal+Refeicoes+Aracoiaba+da+Serra",
    description:
      "Comida feita com carinho, ingrediente fresco e gostinho de almoço de vó bem na Rua Professor Toledo. Muito elogiado pelas marmitas caprichadas e pelo custo-benefício.",
    amenities: "Cardápio diário · Pedidos pelo WhatsApp · Entrega rápida no Centro",
    coverPhoto: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=700&q=80",
    shotPhoto: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80",
    curated: false,
    onboardingPick: false
  }
];

const UPDATES = [
  {
    id: "roteiro-churrasco-fazenda-2026-11",
    date: "2026-11-06",
    category: "games",
    title: "Roteiro de Fogo & Fazenda: onde almoçar ao ar livre no fim de semana",
    description:
      "Reunimos os melhores lugares com gramado, área kids, música ao vivo e cortes na brasa ou pit smoker em Araçoiaba da Serra para levar a família e os pets neste fim de semana.",
    restaurantIds: ["lets-grill-farm", "old-truck-bbq", "fazenda-campo-largo", "costela-da-serra"]
  },
  {
    id: "rota-noite-centro-2026-11",
    date: "2026-11-04",
    category: "improvements",
    title: "Noite em Araçoiaba: pizzarias a lenha, smash burgers, sushi e rock bar",
    description:
      "Do clássico Nenio Rock Bar às pizzas artesanais da Don Francesco e Esquina da Pizza, passando pelos burgers da Road's e combinados do Saty e Oishi: confira onde jantar hoje ou pedir no condomínio.",
    restaurantIds: ["esquina-da-pizza", "don-francesco", "roads-burger", "nenio-rock-bar", "saty-japones", "oishi-gastronomia"]
  },
  {
    id: "cafes-pesqueiros-lago-2026-11",
    date: "2026-11-01",
    category: "games",
    title: "Manhã na Praça e Tarde no Lago: padarias, sorveterias e pesqueiros",
    description:
      "Comece o dia com o café da Padoca Sabadin ou da Divino Pão na Praça Coronel Almeida, almoce uma tilápia fresquinha no Lago Municipal ou no Pesqueiro Baruc e feche a tarde na Sorvetes Urla.",
    restaurantIds: ["padoca-sabadin", "divino-pao", "restaurante-lago-aracoiaba", "pesqueiro-baruc", "sorvetes-urla"]
  },
  {
    id: "filtros-condominios-whatsapp-2026-10",
    date: "2026-10-28",
    category: "fixes",
    title: "Atalhos diretos para Google Maps, WhatsApp e filtro por bairro",
    description:
      "Agora cada restaurante traz rota direta pelo Google Maps saindo de onde você estiver (Monte Bianco, Lago, Centro ou Raposo Tavares), botão de WhatsApp e distância estimada até o Centro.",
    restaurantIds: ["hamburgui", "master-acai", "restaurante-gavazzi"]
  }
];

const UPDATE_CATEGORIES = {
  all: "Todas",
  games: "Roteiros & Lugares",
  improvements: "Destaques",
  fixes: "Novidades da Plataforma"
};

window.SaboresData = {
  THEMES,
  CUISINES,
  REGIONS,
  VIBES,
  PRICES,
  RESTAURANTS,
  UPDATES,
  UPDATE_CATEGORIES,
  makeSvgArt
};
