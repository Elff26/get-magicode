import { createContext } from 'react';

export const UnlockedAchievementsContext = createContext({
    unlockedAchievements: [],
    setUnlockedAchievements: () => {}
});