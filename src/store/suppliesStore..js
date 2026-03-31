const SUPPLIES_KEY = "petstore_supplies";

const defaultSupplies = [
  {
    id: 1,
    title: "Premium Dog Kibble",
    category: "Dog",
    Type: "Food",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=800&q=80",
    content: "Balanced nutrition with chicken and rice for adult dogs.",
  },
  {
    id: 2,
    title: "Rubber Chew Bone",
    category: "Dog",
    Type: "Toys",
    price: 12.5,
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80",
    content: "Durable chew toy designed for active dogs.",
  },
  {
    id: 3,
    title: "Cat Salmon Meal",
    category: "Cat",
    Type: "Food",
    price: 18.75,
    image:
      "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=800&q=80",
    content: "Protein-rich salmon recipe for healthy indoor cats.",
  },
  {
    id: 4,
    title: "Bird Seed Mix",
    category: "Bird",
    Type: "Food",
    price: 9.99,
    image:
      "https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=800&q=80",
    content: "Vitamin-enriched seed blend for small and medium birds.",
  },
  {
    id: 5,
    title: "Aquarium Starter Kit",
    category: "Fish",
    Type: "Aquariums",
    price: 79.0,
    image:
      "https://images.unsplash.com/photo-1520302630591-fd1c66ed9de8?auto=format&fit=crop&w=800&q=80",
    content: "Beginner-friendly tank with filtration and LED lighting.",
  },
  {
    id: 6,
    title: "Hamster Play Tunnel",
    category: "Small Pet",
    Type: "Toys",
    price: 14.3,
    image:
      "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&w=800&q=80",
    content: "Expandable tunnel set for enrichment and exercise.",
  },
];

function safeParse(value, fallback) {
  try {
    return JSON.parse(value ?? "");
  } catch {
    return fallback;
  }
}

function readSupplies() {
  const stored = safeParse(localStorage.getItem(SUPPLIES_KEY), null);

  if (Array.isArray(stored) && stored.length > 0) {
    return stored;
  }

  localStorage.setItem(SUPPLIES_KEY, JSON.stringify(defaultSupplies));
  return [...defaultSupplies];
}

function writeSupplies(supplies) {
  localStorage.setItem(SUPPLIES_KEY, JSON.stringify(supplies));
}

function nextId(supplies) {
  if (supplies.length === 0) return 1;
  return Math.max(...supplies.map((item) => Number(item.id) || 0)) + 1;
}

export async function getPetSupplies() {
  return readSupplies();
}

export async function insertPetSupply({
  title,
  category,
  price,
  image,
  content,
  Type,
}) {
  const supplies = readSupplies();

  const newItem = {
    id: nextId(supplies),
    title,
    category,
    Type,
    price: Number(price),
    image,
    content,
  };

  const updated = [...supplies, newItem];
  writeSupplies(updated);
  return [newItem];
}

export async function deletePetSupply(id) {
  const supplies = readSupplies();
  const updated = supplies.filter((item) => Number(item.id) !== Number(id));

  if (updated.length === supplies.length) {
    return false;
  }

  writeSupplies(updated);
  return true;
}

export async function updatePetSupply(
  id,
  { title, category, price, image, content, Type },
) {
  const supplies = readSupplies();
  const index = supplies.findIndex((item) => Number(item.id) === Number(id));

  if (index === -1) {
    return null;
  }

  const updatedItem = {
    ...supplies[index],
    title,
    category,
    Type,
    price: Number(price),
    image,
    content,
  };

  supplies[index] = updatedItem;
  writeSupplies(supplies);
  return [updatedItem];
}
