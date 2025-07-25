export type Team = {
  id: string;
  name: string;
  flag: string; // path to flag image in public
};

export const TEAMS: Team[] = [
  { id: "bastard", name: "Bastard Müncheng", flag: "/img/flags/bastard.png" },
  { id: "ubers", name: "Ubers", flag: "/img/flags/ubers.png" },
  { id: "manshine", name: "Manshine City", flag: "/img/flags/manshine.png" },
  { id: "pxg", name: "PxG", flag: "/img/flags/pxg.png" },
  { id: "real", name: "Re Al", flag: "/img/flags/real.png" },
  { id: "barcha", name: "FC Barcha", flag: "/img/flags/barcha.png" }
];
