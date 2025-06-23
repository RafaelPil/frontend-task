export interface User {
  id: string;
  name: string;
  position: string;
  gender: "Male" | "Female" | "Other";
  age: number;
}

export interface ChuckNorrisJoke {
  id: string;
  value: string;
  url: string;
  icon_url: string;
  created_at: string;
  updated_at: string;
  categories: string[];
}

export interface JokeData {
  joke: ChuckNorrisJoke;
  lastUpdated: Date;
}

export interface UserFormData {
  name: string;
  position: string;
  gender: User["gender"];
  age: number;
}
