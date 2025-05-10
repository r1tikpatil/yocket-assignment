export const cities = [
  { id: 1, name: "Yapkashnagar", distance: 60 },
  { id: 2, name: "Lihaspur", distance: 50 },
  { id: 3, name: "Narmis City", distance: 40 },
  { id: 4, name: "Shekharvati", distance: 30 },
  { id: 5, name: "Nuravgram", distance: 20 },
];

export const vehicles = [
  { id: 1, name: "EV Bike", range: 60, available: 2 },
  { id: 2, name: "EV Car", range: 100, available: 1 },
  { id: 3, name: "EV SUV", range: 120, available: 1 },
];

// Game state
export const gameState = {
  fugitiveLocation: null,
  copSelections: [],
  availableVehicles: [
    { id: 1, name: "EV Bike", range: 60, available: 2 },
    { id: 2, name: "EV Car", range: 100, available: 1 },
    { id: 3, name: "EV SUV", range: 120, available: 1 },
  ],
  gameResult: null,
};
