export type Team = {
  id: string;
  name: string;
  flag: string; // path to flag image in public
};

export const TEAMS: Team[] = [
  { id: "bastard", name: "Bastard München", flag: "/img/flags/b_munchen_logo.png" },
  { id: "ubers", name: "Ubers", flag: "/img/flags/ubers_logo.png" },
  { id: "manshine", name: "Manshine City", flag: "/img/flags/m_city_logo.png" },
  { id: "pxg", name: "PxG", flag: "/img/flags/pxg_logo.png" },
  { id: "real", name: "Re Al", flag: "/img/flags/re_al_logo.png" },
  { id: "barcha", name: "FC Barcha", flag: "/img/flags/fc_barcha_logo.png" }
];
