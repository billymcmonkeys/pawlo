// Mock pet registry data
// Photos use Unsplash (real pet photos)

export type PetStatus = "Active" | "Lost" | "Reunited";
export type PetSpecies = "Dog" | "Cat";
export type PetSize = "Small" | "Medium" | "Large";

export interface Pet {
  id: string;
  name: string;
  species: PetSpecies;
  breed: string;
  age: number; // years
  size: PetSize;
  primaryColor: string;
  secondaryColor?: string;
  neighborhood: string;
  status: PetStatus;
  photos: string[]; // 3-5 URLs
  description: string;
  owner: {
    name: string;
    phone: string;
    email: string;
  };
  registeredAt: string; // ISO date
  lostAt?: string;      // ISO date, only when status === "Lost"
}

export const pets: Pet[] = [
  {
    id: "pet-001",
    name: "Mango",
    species: "Dog",
    breed: "Golden Retriever",
    age: 3,
    size: "Large",
    primaryColor: "Golden",
    neighborhood: "Palermo",
    status: "Lost",
    photos: [
      "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800&q=80",
      "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=800&q=80",
      "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=800&q=80",
    ],
    description:
      "Very friendly, loves strangers. Wearing a red collar with a bell. Last seen near Parque Las Heras.",
    owner: {
      name: "Laura Méndez",
      phone: "+54 11 4567-8901",
      email: "laura.mendez@email.com",
    },
    registeredAt: "2025-11-10",
    lostAt: "2026-04-12",
  },
  {
    id: "pet-002",
    name: "Luna",
    species: "Cat",
    breed: "Siamese",
    age: 5,
    size: "Small",
    primaryColor: "Cream",
    secondaryColor: "Chocolate",
    neighborhood: "Belgrano",
    status: "Active",
    photos: [
      "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=800&q=80",
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80",
      "https://images.unsplash.com/photo-1573865526739-10c1de0d3a29?w=800&q=80",
      "https://images.unsplash.com/photo-1506755594592-349d12a7c52a?w=800&q=80",
    ],
    description:
      "Elegant and vocal. Blue eyes. Always wears a turquoise collar with her name tag.",
    owner: {
      name: "Sebastián Rojas",
      phone: "+54 11 2345-6789",
      email: "seba.rojas@email.com",
    },
    registeredAt: "2025-08-22",
  },
  {
    id: "pet-003",
    name: "Rocky",
    species: "Dog",
    breed: "French Bulldog",
    age: 2,
    size: "Small",
    primaryColor: "Brindle",
    neighborhood: "Recoleta",
    status: "Active",
    photos: [
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80",
      "https://images.unsplash.com/photo-1583511666407-5f06533f2113?w=800&q=80",
      "https://images.unsplash.com/photo-1611003228941-98852ba62227?w=800&q=80",
    ],
    description:
      "Energetic and playful. Bat ears, short snout. Wears a blue harness.",
    owner: {
      name: "Valentina Torres",
      phone: "+54 11 9876-5432",
      email: "vale.torres@email.com",
    },
    registeredAt: "2025-12-01",
  },
  {
    id: "pet-004",
    name: "Cleo",
    species: "Cat",
    breed: "Tabby Mix",
    age: 4,
    size: "Medium",
    primaryColor: "Orange",
    secondaryColor: "White",
    neighborhood: "Villa Crespo",
    status: "Lost",
    photos: [
      "https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?w=800&q=80",
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80",
      "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=800&q=80",
      "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=800&q=80",
    ],
    description:
      "Striped orange and white, green eyes. Has a small scar on right ear. Very shy around strangers.",
    owner: {
      name: "Martín Herrera",
      phone: "+54 11 3456-7890",
      email: "martin.herrera@email.com",
    },
    registeredAt: "2025-07-15",
    lostAt: "2026-04-10",
  },
  {
    id: "pet-005",
    name: "Buddy",
    species: "Dog",
    breed: "Labrador Retriever",
    age: 6,
    size: "Large",
    primaryColor: "Black",
    neighborhood: "Caballito",
    status: "Reunited",
    photos: [
      "https://images.unsplash.com/photo-1534361960057-19889db9621e?w=800&q=80",
      "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=800&q=80",
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800&q=80",
    ],
    description:
      "Very calm and obedient. Responds to his name immediately. Yellow tag on collar.",
    owner: {
      name: "Carolina Díaz",
      phone: "+54 11 6543-2109",
      email: "carol.diaz@email.com",
    },
    registeredAt: "2025-05-03",
  },
  {
    id: "pet-006",
    name: "Nala",
    species: "Cat",
    breed: "Persian",
    age: 7,
    size: "Medium",
    primaryColor: "White",
    neighborhood: "Núñez",
    status: "Active",
    photos: [
      "https://images.unsplash.com/photo-1573865526739-10c1de0d3a29?w=800&q=80",
      "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=800&q=80",
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=800&q=80",
      "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=800&q=80",
      "https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=800&q=80",
    ],
    description:
      "Fluffy white with blue and gold heterochromia. Very calm, indoor cat. Pink rhinestone collar.",
    owner: {
      name: "Agustín Fernández",
      phone: "+54 11 7654-3210",
      email: "agus.fernan@email.com",
    },
    registeredAt: "2025-09-18",
  },
  {
    id: "pet-007",
    name: "Zeus",
    species: "Dog",
    breed: "German Shepherd",
    age: 4,
    size: "Large",
    primaryColor: "Black",
    secondaryColor: "Tan",
    neighborhood: "Flores",
    status: "Lost",
    photos: [
      "https://images.unsplash.com/photo-1568572933382-74d440642117?w=800&q=80",
      "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=800&q=80",
      "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=800&q=80",
    ],
    description:
      "Trained guard dog, responds to basic commands. Black and tan saddle markings. Microchipped.",
    owner: {
      name: "Paula Gómez",
      phone: "+54 11 8765-4321",
      email: "paula.gomez@email.com",
    },
    registeredAt: "2025-03-07",
    lostAt: "2026-04-14",
  },
  {
    id: "pet-008",
    name: "Pipa",
    species: "Dog",
    breed: "Beagle",
    age: 1,
    size: "Small",
    primaryColor: "Tricolor",
    neighborhood: "San Telmo",
    status: "Active",
    photos: [
      "https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=800&q=80",
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&q=80",
      "https://images.unsplash.com/photo-1512070679279-8988d32161be?w=800&q=80",
    ],
    description:
      "Puppy, very excitable. Brown, black and white markings. Loves chasing scents.",
    owner: {
      name: "Nicolás Vargas",
      phone: "+54 11 5432-1098",
      email: "nico.vargas@email.com",
    },
    registeredAt: "2026-01-20",
  },
  {
    id: "pet-009",
    name: "Milo",
    species: "Cat",
    breed: "Maine Coon",
    age: 3,
    size: "Large",
    primaryColor: "Brown Tabby",
    neighborhood: "Colegiales",
    status: "Reunited",
    photos: [
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800&q=80",
      "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=800&q=80",
      "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=800&q=80",
      "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=800&q=80",
    ],
    description:
      "Large fluffy cat with tufted ears. Very talkative. Lion-cut trim on body.",
    owner: {
      name: "Sofía Castillo",
      phone: "+54 11 4321-0987",
      email: "sofi.castillo@email.com",
    },
    registeredAt: "2025-06-11",
  },
  {
    id: "pet-010",
    name: "Canela",
    species: "Dog",
    breed: "Dachshund",
    age: 5,
    size: "Small",
    primaryColor: "Tan",
    secondaryColor: "Brown",
    neighborhood: "Almagro",
    status: "Active",
    photos: [
      "https://images.unsplash.com/photo-1612536899081-8801b5373c12?w=800&q=80",
      "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=800&q=80",
      "https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=800&q=80",
    ],
    description:
      "Classic sausage dog. Long body, short legs, floppy ears. Floral bandana around neck.",
    owner: {
      name: "Diego Morales",
      phone: "+54 11 3210-9876",
      email: "diego.morales@email.com",
    },
    registeredAt: "2025-10-05",
  },
  {
    id: "pet-011",
    name: "Oreo",
    species: "Cat",
    breed: "Domestic Shorthair",
    age: 2,
    size: "Small",
    primaryColor: "Black",
    secondaryColor: "White",
    neighborhood: "Palermo",
    status: "Lost",
    photos: [
      "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=800&q=80",
      "https://images.unsplash.com/photo-1529257414772-1960b7bea4eb?w=800&q=80",
      "https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?w=800&q=80",
      "https://images.unsplash.com/photo-1577023311546-cdc07a8454d9?w=800&q=80",
    ],
    description:
      "Black tuxedo cat. White chest and paws. Very curious, often follows people.",
    owner: {
      name: "Jimena Ruiz",
      phone: "+54 11 2109-8765",
      email: "jimena.ruiz@email.com",
    },
    registeredAt: "2025-11-30",
    lostAt: "2026-04-15",
  },
  {
    id: "pet-012",
    name: "Thor",
    species: "Dog",
    breed: "Siberian Husky",
    age: 2,
    size: "Large",
    primaryColor: "Grey",
    secondaryColor: "White",
    neighborhood: "Belgrano",
    status: "Active",
    photos: [
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
      "https://images.unsplash.com/photo-1594922009216-b5c067bf4d96?w=800&q=80",
      "https://images.unsplash.com/photo-1600114198163-04cd7a2109eb?w=800&q=80",
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80",
      "https://images.unsplash.com/photo-1597633425046-08f5110420b5?w=800&q=80",
    ],
    description:
      "Blue eyes, grey and white bi-color coat. High energy — needs plenty of exercise. Uses a GPS collar.",
    owner: {
      name: "Rodrigo Peña",
      phone: "+54 11 1098-7654",
      email: "rodri.pena@email.com",
    },
    registeredAt: "2026-02-14",
  },
];

export function getPetsByStatus(status: PetStatus): Pet[] {
  return pets.filter((p) => p.status === status);
}

export function getPetById(id: string): Pet | undefined {
  return pets.find((p) => p.id === id);
}
