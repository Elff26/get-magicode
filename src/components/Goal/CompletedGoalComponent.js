import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from "react-native-reanimated";
import Colors from "../../utils/ColorPallete/Colors";
import { GoalContext } from "../../utils/contexts/GoalContext";

export default function CompletedGoalComponent() {
    const { goal, setGoal } = useContext(GoalContext);
    const goalState = useSharedValue(1);
    const AnimatedView = Animated.createAnimatedComponent(View);

    useEffect(() => {
        goalState.value = withTiming(0, {
            duration: 1000,
            easing: Easing.bezier(0.34, 1.56, 0.64, 1)
        }, () => {
            goalState.value = withDelay(
            4000,
                withTiming(1, {
                    duration: 1000,
                    easing: Easing.bezier(0.34, 1.56, 0.64, 1)
                }, () => {
                    runOnJS(clearGoal)()
                })
            )}
        )
    }, [goalState]);

    const clearGoal = () => {
        setGoal({})
    }

    const goalAnimation = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: withSpring(goalState.value * 200)
                }
            ]
        }
    })

    return (
        <AnimatedView style={[styles.goalContent, { bottom: 30 }, goalAnimation]}>
            <View style={styles.textContent}>
                <View>
                    <MaterialCommunityIcons name="fire" size={32} color={Colors.RED_COLOR_DEFAULT} />
                </View>
                <View>
                    <Text style={styles.goalTitle} numberOfLines={1}>Meta completa!</Text>
                    <Text 
                        style={styles.goalText} 
                        numberOfLines={1}
                    >+ {goal.xp} XP</Text>
                </View>
            </View>
        </AnimatedView>
    )
}

const styles = new StyleSheet.create({
    goalContent: { 
        position: 'absolute',
        margin: 'auto',
        backgroundColor: Colors.WHITE_SAFE_COLOR,
        borderRadius: 10,
        borderColor: Colors.TEXT_COLOR,
        borderWidth: 1,
        padding: 10,
        width: '80%',
        zIndex: 2,
        flexDirection: 'row',
        alignSelf: 'center'
    },

    textContent: {
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center'
    },

    goalTitle: {
        fontSize: 20,
        color: Colors.PRIMARY_COLOR
    },

    goalText: {
        fontSize: 16,
        color: Colors.GREEN_TEXT
    }
})