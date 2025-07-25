export type Character = {
  id: string;
  name: string;
  avatar: string; // path to avatar image
};

export const CHARACTERS: Character[] = [
  { id: "aiku", name: "Oliver Aiku", avatar: "/img/characters/Oliver_Aiku.png" },
  { id: "gaga", name: "Gin Gagamaru", avatar: "/img/characters/Gin_Gagamaru.png" },
  { id: "isagi", name: "Isagi Yoichi", avatar: "/img/characters/Isagi_Yoichi.jpeg" },
  { id: "rin", name: "Itoshi Rin", avatar: "/img/characters/Itoshi_Rin.png" },
  { id: "bachira", name: "Meguru Bachira", avatar: "/img/characters/Meguru_Bachira.png" },
  { id: "nagi", name: "Seishiro Nagi", avatar: "/img/characters/Seishiro_Nagi.png" },
];
