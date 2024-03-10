import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

function getProducts() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
      name: 'Diamond Ring',
      size: ["14", "15", "16", "17", "18", "19", "20"],
      price: 2000,
      description: 'Elegant diamond ring, perfect for special occasions',
      collection: 'Spring Collection',
      category: 'rings',
      photo: ["diamond-ring.jpg", "diamond-ring_2.jpg"],
      quantity: 1,
      status: 'topSeller'
    },
    {
      id: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e56',
      name: 'Pearl Necklace',
      size: ["S", "M", "L"],
      price: 5000,
      description: 'Exquisite pearl necklace, timeless beauty',
      collection: 'Spring Collection',
      category: 'necklaces',
      photo: ["pearl-necklace.jpg"],
      status: 'topSeller'
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17258',
      name: 'Sapphire Earrings',
      size: ["S", "M", "L"],
      price: 3000,
      description: 'Stunning sapphire earrings, adds a pop of color to any outfit',
      collection: 'Spring Collection',
      category: 'earrings',
      photo: ["sapphire-earrings.jpg"],
      status: 'topSeller'
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17259',
      name: 'Gold Bracelet',
      size: ["S", "M", "L"],
      price: 2000,
      description: 'Luxurious gold bracelet, a timeless classic',
      collection: 'Spring Collection',
      category: 'bracelets',
      photo: ["gold-bracelet.jpg", "gold-bracelet_2.jpg"],
      status: 'topSeller'
    },
    {
      id: '01c7599d-318b-4b9f-baf7-51f3a936a2d4',
      name: 'Ruby Pendant',
      size: ["S", "M", "L"],
      price: 5000,
      description: 'Exquisite ruby pendant, adds elegance and charm',
      collection: 'Spring Collection',
      category: 'pendants',
      photo: ["ruby-pendant.jpg", "ruby-pendant_2.jpg"],
      status: 'topSeller'
    },
    
    {
      id: "6b3df470-dc18-4bcf-9e36-5439b8ec5d42",
      name: "Emerald Ring",
      size: ["14", "15", "16", "17", "18", "19", "20"],
      price: 2800,
      description: "Elegant emerald ring, perfect for adding a touch of sophistication to any ensemble",
      collection: "Spring Collection",
      category: "rings",
      photo: ["emerald-ring.jpg","emerald-ring_2.jpg"],
      status: "topSeller"
    },
    {
      id: "8131a6d8-fa44-47e4-bca2-07d47e3c1a1d",
      name: "Sapphire Bracelet",
      size: ["S", "M", "L"],
      price: 3800,
      description: "Exquisite sapphire bracelet, radiating timeless elegance and charm",
      collection: "Spring Collection",
      category: "bracelets",
      photo: ["sapphire-bracelet.jpg", "sapphire-bracelet_2.jpg"],
      status: "topSeller"
    },
    {
      id: "4b488889-232a-4e2b-b8c1-36501d7d49f2",
      name: "Opal Pendant",
      size: ["S", "M", "L"],
      price: 3200,
      description: "Mesmerizing opal pendant, capturing the mystical beauty of the gemstone",
      collection: "Spring Collection",
      category: "pendants",
      photo: ["opal-pendant.jpg", "opal-pendant_2.jpg"],
      status: "topSeller"
    },
    {
      id: "b3bc462f-6e94-4a1b-9053-d3053b7112bc",
      name: "Diamond Earrings",
      size: ["S", "M", "L"],
      price: 4500,
      description: "Radiant diamond earrings, exuding glamour and sophistication",
      collection: "Spring Collection",
      category: "earrings",
      photo: ["diamond-earrings.jpg"],
      status: "topSeller"
    },
    {
      id: "e36b52a5-0b6d-4c5c-b8a2-c6b8ad640145",
      name: "Amethyst Necklace",
      size: ["S", "M", "L"],
      price: 3200,
      description: "Graceful amethyst necklace, symbolizing peace and tranquility",
      collection: "Spring Collection",
      category: "necklaces",
      photo: ["amethyst-necklace.jpg", "methyst-necklace_2.jpg"],
      status: "topSeller"
    }
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
