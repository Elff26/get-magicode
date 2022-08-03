import { useEffect, useRef, useState } from 'react';
import Svg, { Path } from 'react-native-svg';
import Animated, { Easing, useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import { View } from 'react-native';

export default function SvgPathComponent({ paths, width, height, from, to, isDone }) {
    const [length, setLength] = useState(0);
    const progress = useSharedValue(from);

    useEffect(() => {
        if(!isDone) {
            progress.value = withTiming(to, {
                duration: 4000,
                easing: Easing.linear
            })
        }
    }, [progress]);

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
                            stroke="black" 
                            strokeWidth={2} 
                            key={key} 
                            strokeDasharray={10}
                        />
                        
                        {
                            !isDone && (
                            <AnimatedPath  
                                animatedProps={pathAnimation}
                                onLayout={() => setLength(ref.current.getTotalLength())}
                                ref={ref}
                                d={d} 
                                stroke="white" 
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