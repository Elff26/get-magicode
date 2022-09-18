import {
    StyleSheet, 
    View
} from 'react-native';
import { Easing } from "react-native-reanimated";
import Colors from '../../utils/ColorPallete/Colors';
import AnimatedButtonComponent from "./AnimatedButtonComponent";

export default function AnimatedButtonGroupComponent({ item, animated }) {
    return (
        <>
            {
                animated && (
                    <>
                        <AnimatedButtonComponent 
                            isBoss={item.isBoss}
                            delay={3600}
                            style={styles.classImageAbsolute}
                            from={2}
                            to={-0.5}
                            duration={1500}
                            easingType={Easing.bounce}
                        />
                        <AnimatedButtonComponent 
                            isBoss={item.isBoss}
                            delay={4100}
                            style={styles.classImage}
                            from={0}
                            to={-0.5}
                            duration={750}
                            easingType={Easing.circle}
                        />
                    </>
                )
            }

            {
                !animated && (
                    <View style={[styles.classImage, item.isBoss ? { backgroundColor: Colors.BUTTON_VERSUS_BACKGROUND } : {}]} />
                )
            }
        </>
    )
}

const styles = StyleSheet.create({
    classImageAbsolute: {
        width: 100,
        height: 100,
        backgroundColor: Colors.PRIMARY_COLOR,
        borderRadius: 50,
        position: 'absolute',
        top: 0,
        left: 0
    },

    classImage: {
        width: 100,
        height: 100,
        backgroundColor: Colors.PRIMARY_COLOR,
        borderRadius: 50
    },
})