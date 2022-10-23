import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useSharedValue, withDelay, withRepeat, withTiming, useAnimatedStyle, interpolate } from 'react-native-reanimated';

import Colors from '../../utils/ColorPallete/Colors';


export default function AnimatedButtonComponent({ isBoss, delay, style, from, to, duration, easingType, repeat, opacity }) {
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
              true
            )
        )
    }, []);

    const buttonAnimation = useAnimatedStyle(() => {
        return {
            opacity: opacity - buttonValue.value,
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
            >
                {
                    isBoss ? (
                        <AntDesign name="codesquareo" size={32} color={Colors.WHITE_SAFE_COLOR} />
                    ) : (
                        <FontAwesome5 name="book-open" color={Colors.WHITE_SAFE_COLOR} size={32} />
                    )
                }
            </AnimatedView>
        </>
    )   
}