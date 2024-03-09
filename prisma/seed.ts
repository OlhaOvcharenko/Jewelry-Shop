import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

function getProducts() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
      name: 'Diamond Ring',
      price: 2000,
      description: 'Elegant diamond ring, perfect for special occasions',
      collection: 'Jewelry',
      category: 'rings',
      photo: 'images/diamond-ring.jpg',
      quantity: 0
    },
    {
      id: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e56',
      name: 'Pearl Necklace',
      price: 5000,
      description: 'Exquisite pearl necklace, timeless beauty',
      collection: 'Jewelry',
      category: 'necklaces',
      photo: 'images/pearl-necklace.jpg',
      quantity: 0
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17258',
      name: 'Sapphire Earrings',
      price: 3000,
      description: 'Stunning sapphire earrings, adds a pop of color to any outfit',
      collection: 'Jewelry',
      category: 'earrings',
      photo: 'images/sapphire-earrings.jpg',
      quantity: 0
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17259',
      name: 'Gold Bracelet',
      price: 2000,
      description: 'Luxurious gold bracelet, a timeless classic',
      collection: 'Jewelry',
      category: 'bracelets',
      photo: 'images/gold-bracelet.jpg',
      quantity: 0
    },
    {
      id: '01c7599d-318b-4b9f-baf7-51f3a936a2d4',
      name: 'Ruby Pendant',
      price: 5000,
      description: 'Exquisite ruby pendant, adds elegance and charm',
      collection: 'Jewelry',
      category: 'pendants',
      photo: 'images/ruby-pendant.jpg',
      quantity: 0
    },
  ];
}

async function seed() {
  await Promise.all(
    getProducts().map((product) => {
    return db.product.create({ data: product });
    }),
  );
}
seed();
