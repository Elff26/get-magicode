import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Easing, useSharedValue, withDelay, withRepeat, withTiming, useAnimatedStyle, interpolate } from 'react-native-reanimated';

import Colors from '../../utils/ColorPallete/Colors';


export default function AnimatedButtonComponent({ isBoss, delay, style, from, to, duration, easingType, reverse, repeat }) {
    const buttonValue = useSharedValue(from);
    const AnimatedView = Animated.createAnimatedComponent(View);

    useEffect(() => {
        buttonValue.value = withDelay(
            delay,
            withRepeat(
              withTiming(to, {
                duration: duration,
                easing: easingType
              }),
              repeat,
              reverse
            )
        )
    }, []);

    const buttonAnimation = useAnimatedStyle(() => {
        return {
            opacity: 0.9 - buttonValue.value,
            transform: [
                {
                    scale: interpolate(buttonValue.value, [0, 1], [1, 2])
                }
            ]
        }
    })

    return (
        <>
            <AnimatedView 
                style={[style, buttonAnimation, isBoss ? { backgroundColor: Colors.BUTTON_VERSUS_BACKGROUND } : {}]}
            />
        </>
    )   
}

const styles = StyleSheet.create({
    
})