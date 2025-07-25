export type Character = {
  id: string;
  name: string;
  avatar: string; // path to avatar image
};

export const CHARACTERS: Character[] = [
  { id: "aiku", name: "Oliver Aiku", avatar: "/img/characters/aiku.png" },
  { id: "gaga", name: "Gin Gagamaru", avatar: "/img/characters/gagamaru.png" },
  { id: "isagi", name: "Isagi Yoichi", avatar: "/img/characters/isagi.png" },
  { id: "rin", name: "Itoshi Rin", avatar: "/img/characters/rin.png" },
  { id: "bachira", name: "Meguru Bachira", avatar: "/img/characters/bachira.png" },
  { id: "nagi", name: "Seishiro Nagi", avatar: "/img/characters/nagi.png" },
];
