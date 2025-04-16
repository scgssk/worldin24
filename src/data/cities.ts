
export interface City {
  id: string;
  name: string;
  country: string;
  timezone: string;
  coordinates: [number, number]; // [longitude, latitude]
  description: string;
  trivia: string[];
}

export const cities: City[] = [
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    timezone: "Asia/Tokyo",
    coordinates: [139.6917, 35.6895],
    description: "Tokyo is Japan's capital and the world's most populous metropolis.",
    trivia: [
      "Tokyo was formerly known as Edo until 1868",
      "The Skytree in Tokyo is the tallest tower in the world",
      "Tokyo has over 200 train stations and the busiest train station in the world"
    ]
  },
  {
    id: "newyork",
    name: "New York",
    country: "USA",
    timezone: "America/New_York",
    coordinates: [-74.0060, 40.7128],
    description: "New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean.",
    trivia: [
      "The New York subway system has 472 stations",
      "More than 800 languages are spoken in New York City",
      "Central Park was the first landscaped public park in the United States"
    ]
  },
  {
    id: "london",
    name: "London",
    country: "United Kingdom",
    timezone: "Europe/London",
    coordinates: [-0.1276, 51.5072],
    description: "London is the capital of England and the United Kingdom and one of the world's most diverse cities.",
    trivia: [
      "The London Underground is the oldest underground railway network in the world",
      "Big Ben is actually the name of the bell, not the clock tower",
      "Technically, London is a forest - it has over 8 million trees"
    ]
  },
  {
    id: "sydney",
    name: "Sydney",
    country: "Australia",
    timezone: "Australia/Sydney",
    coordinates: [151.2093, -33.8688],
    description: "Sydney is Australia's largest city and a globally influential center of culture and commerce.",
    trivia: [
      "The Sydney Opera House has over 1 million roof tiles",
      "The Sydney Harbour Bridge is the world's largest steel arch bridge",
      "Sydney has over 100 beaches within the metropolitan area"
    ]
  },
  {
    id: "cairo",
    name: "Cairo",
    country: "Egypt",
    timezone: "Africa/Cairo",
    coordinates: [31.2357, 30.0444],
    description: "Cairo is the capital of Egypt and one of the largest cities in Africa and the Middle East.",
    trivia: [
      "Cairo is known as 'The City of a Thousand Minarets'",
      "The Cairo Metro is the first metro network in Africa",
      "Cairo's Al-Azhar University is one of the oldest universities in the world"
    ]
  },
  {
    id: "rio",
    name: "Rio de Janeiro",
    country: "Brazil",
    timezone: "America/Sao_Paulo",
    coordinates: [-43.1729, -22.9068],
    description: "Rio de Janeiro is a huge seaside city in Brazil, famed for its Copacabana and Ipanema beaches.",
    trivia: [
      "The Christ the Redeemer statue is one of the New Seven Wonders of the World",
      "Rio's Carnival is the biggest carnival in the world",
      "Rio was once the capital of Portugal - the only European capital outside of Europe"
    ]
  }
];
