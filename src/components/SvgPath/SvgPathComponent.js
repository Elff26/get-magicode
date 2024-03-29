import { useEffect, useRef, useState } from 'react';
import Svg, { Path } from 'react-native-svg';
import Animated, { Easing, useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import { View } from 'react-native';
import Colors from '../../utils/ColorPallete/Colors';

export default function SvgPathComponent({ paths, width, height, from, to, completed, animatedPath, todo }) {
    const [length, setLength] = useState(0);
    const progress = useSharedValue(from);

    useEffect(() => {
        if(animatedPath) {
            progress.value = withTiming(to, {
                duration: 4000,
                easing: Easing.linear
            });
        }
    }, [progress, todo]);

    const AnimatedPath = Animated.createAnimatedComponent(Path);
    const ref = useRef(null);
    const pathAnimation = useAnimatedProps(() => ({
        strokeDashoffset: length - length * progress.value
    }));

    return (
        <Svg height={height} width={width}>
            {
                paths.map((d, key) => (
                    <View key={key}>
                        <Path 
                            d={d} 
                            stroke={!completed && !animatedPath ? Colors.BOTTOM_SHEET_SCREEN_BACKGROUND : "black"} 
                            strokeWidth={2} 
                            key={key} 
                            strokeDasharray={10}
                        />
                        
                        {
                            (animatedPath && progress.value != to) && (
                                <AnimatedPath  
                                    animatedProps={pathAnimation}
                                    onLayout={() => setLength(ref.current.getTotalLength())}
                                    ref={ref}
                                    d={d} 
                                    stroke={Colors.WHITE_SAFE_COLOR}
                                    strokeWidth={3}
                                    strokeDasharray={length}
                                />
                            )
                        }
                    </View>
                ))
            }
        </Svg>
    )
}