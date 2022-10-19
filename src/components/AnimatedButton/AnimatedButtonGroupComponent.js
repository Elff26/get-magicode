import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
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
                    <View style={styles.content}>
                        <AnimatedButtonComponent 
                            isBoss={item.typeChallenge === "boss"}
                            delay={3600}
                            style={styles.classImageAbsolute}
                            from={1}
                            to={-0.5}
                            duration={1500}
                            repeat={2}
                            opacity={0.6}
                            easingType={Easing.bounce}
                        />
                        <AnimatedButtonComponent 
                            isBoss={item.typeChallenge === "boss"}
                            delay={4100}
                            style={styles.classImage}
                            from={0}
                            to={-0.5}
                            duration={750}
                            repeat={2}
                            opacity={0.9}
                            easingType={Easing.circle}
                        />
                    </View>
                )
            }

            {
                !animated && (
                    <View style={[styles.classImage, item.typeChallenge === "boss" ? { backgroundColor: Colors.BUTTON_VERSUS_BACKGROUND } : {}]}>
                        {
                            item.typeChallenge === "boss" ? (
                                <AntDesign name="codesquareo" size={32} color={Colors.WHITE_SAFE_COLOR} />
                            ) : (
                                <FontAwesome5 name="book-open" color={Colors.WHITE_SAFE_COLOR} size={32} />
                            )
                        }
                    </View>
                )
            }
        </>
    )
}

const styles = StyleSheet.create({
    content: {
        width: 100, 
        height: 100
    },

    classImageAbsolute: {
        width: 100,
        height: 100,
        backgroundColor: Colors.PRIMARY_COLOR_DISABLED,
        borderRadius: 50,
        position: 'absolute',
        top: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },

    classImage: {
        width: 100,
        height: 100,
        backgroundColor: Colors.PRIMARY_COLOR,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
})