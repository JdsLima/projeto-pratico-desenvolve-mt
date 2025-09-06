export interface Person {
  id: string;
  name: string;
  age: number;
  photo: string;
  status: 'missing' | 'found';
  lastSeen: {
    date: string;
    location: string;
  };
  description: string;
  characteristics: {
    height: string;
    weight: string;
    eyeColor: string;
    hairColor: string;
  };
  contactInfo: {
    phone: string;
    email: string;
  };
  createdAt: string;
}

export interface Information {
  id: string;
  personId: string;
  reporterName: string;
  reporterPhone: string;
  message: string;
  location?: string;
  photos?: string[];
  createdAt: string;
}