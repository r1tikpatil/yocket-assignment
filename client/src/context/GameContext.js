import { createContext, useState } from "react";
import { copsData } from "../utils/utils";

// Create the context
const GameContext = createContext({
  gameStarted: false,
  setGameStarted: () => {},

  currentCopIndex: 0,
  setCurrentCopIndex: () => {},

  cops: [],
  setCops: () => {},

  gameCompleted: false,
  setGameCompleted: () => {},

  gameResult: null,
  setGameResult: () => {},

  cities: [],
  setCities: () => {},

  availableVehicles: [],
  setAvailableVehicles: () => {},
});

// Create the provider
export const GameProvider = ({ children }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentCopIndex, setCurrentCopIndex] = useState(0);
  const [cops, setCops] = useState(copsData);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  const [cities, setCities] = useState([]);
  const [availableVehicles, setAvailableVehicles] = useState([]);

  return (
    <GameContext.Provider
      value={{
        gameStarted,
        setGameStarted,
        currentCopIndex,
        setCurrentCopIndex,
        cops,
        setCops,
        gameCompleted,
        setGameCompleted,
        gameResult,
        setGameResult,
        cities,
        setCities,
        availableVehicles,
        setAvailableVehicles,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
