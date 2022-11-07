import { useContext } from "react";
import { GoalContext } from "../../utils/contexts/GoalContext";
import CompletedGoalComponent from "./CompletedGoalComponent";

export default function ShowAchievementComponent() {
    const { goal } = useContext(GoalContext);

    return (
        <>
            {
                goal.isComplete && (
                    <CompletedGoalComponent goal={goal} />
                )
            }
        </>
    )
}