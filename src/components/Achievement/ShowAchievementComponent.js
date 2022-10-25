import { useContext } from "react";
import { UnlockedAchievementsContext } from "../../utils/contexts/UnlockedAchievementsContext";
import AchievementUnlockedComponent from "./AchievementUnlockedComponent";

export default function ShowAchievementComponent() {
    const { unlockedAchievements } = useContext(UnlockedAchievementsContext);

    return (
        <>
            {
                unlockedAchievements.length > 0 && (
                    unlockedAchievements.map((achievement, index) => (
                        <AchievementUnlockedComponent key={achievement.achievementID} achievement={achievement} number={index + 1} />
                    ))
                )
            }
        </>
    )
}