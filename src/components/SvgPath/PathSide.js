import PathObjects from '../../utils/SvgObjects/PathObjects';
import SvgPathComponent from './SvgPathComponent';
import { Ionicons } from '@expo/vector-icons';
import { 
    StyleSheet, 
    View
} from 'react-native';

export default function PathSide({ index, item, classesLength, children }) {
    return (
        <>
            { index % 2 == 0 &&
                <SvgPathComponent
                    paths={PathObjects.evenPath}
                    width={150}
                    height={110}
                    from={1}
                    to={2}
                    isDone={item.isDone}
                />
            }

            {
                children
            }

            { index !== classesLength - 1 && index % 2 == 1 &&
                <SvgPathComponent
                    paths={PathObjects.oddPath}
                    width={150}
                    height={110}
                    from={1}
                    to={2}
                    isDone={item.isDone}
                />
            }

            { index === classesLength - 1 &&
                <View style={styles.initialPath}>
                    <Ionicons style={styles.initialIcon} name="md-home" size={24} color="black" />
                    <SvgPathComponent
                        paths={PathObjects.initialPath}
                        width={108}
                        height={85}
                        from={1}
                        to={0}
                        isDone={item.isDone}
                    />
                </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    initialPath: {
        justifyContent: 'center',
        alignItems: 'center'    
    },

    initialIcon: {
        position: 'absolute'
    }
})