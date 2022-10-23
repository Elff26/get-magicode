import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from "react-native-reanimated";
import Colors from "../../utils/ColorPallete/Colors";

export default function AchievementUnlockedComponent({ achievement, number }) {
    const achievementState = useSharedValue(0);
    const AnimatedView = Animated.createAnimatedComponent(View);

    useEffect(() => {
        achievementState.value = withTiming(1, {
            duration: 1000,
            easing: Easing.bezier(0.34, 1.56, 0.64, 1)
        }, () => {
            achievementState.value = withDelay(
            4000,
                withTiming(0, {
                    duration: 1000,
                    easing: Easing.bezier(0.34, 1.56, 0.64, 1)
                })
            )}
        )
    }, [achievementState]);

    const achievementAnimation = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: withSpring(achievementState.value * 200 + (number * 50))
                }
            ]
        }
    })

    return (
        <AnimatedView style={[styles.achievementContent, { top: -130 * number }, achievementAnimation]}>
            <View>
            <Image 
                style={styles.achievementImage} 
                source={{ uri: 'https://cdn2.iconfinder.com/data/icons/seo-web-optomization-ultimate-set/512/page_quality-512.png' }} 
            />
            </View>
            <View style={styles.textContent}>
                <Text style={styles.achievementTitle} numberOfLines={1}>Nova conquista desbloqueada!</Text>
                <Text 
                    style={styles.achievementText} 
                    numberOfLines={1}
                >{achievement.name}</Text>
            </View>
        </AnimatedView>
    )
}

const styles = new StyleSheet.create({
    achievementContent: { 
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

    achievementImage: {
        width: 40,
        height: 40
    },

    textContent: {
        width: '80%'
    },

    achievementTitle: {
        fontSize: 16,
        color: Colors.PRIMARY_COLOR
    },

    achievementText: {
        fontSize: 14,
        color: Colors.TEXT_COLOR
    }
})