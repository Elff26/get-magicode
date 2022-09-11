import { useState, useEffect } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';

import { AntDesign, FontAwesome5 } from '@expo/vector-icons'; 
import Colors from '../../utils/ColorPallete/Colors';

export default function LifeCompoenent() {
    const [lifeArray, setLifeArray] = useState([]);
    const [lifeDetails, setLifeDetails] = useState(false);

    useEffect(() => {
        let i = 0;
        let numberOfLifes = 4;
        let lifes = [];

        while(i < 5) {
            if(i < numberOfLifes) {
                lifes.push(1);
            } else {
                lifes.push(0);
            }

            i++;
        }

        setLifeArray(lifes);
    }, []);

    function showLifeDetails() {
        setLifeDetails(true);
    }
    
    return (
        <View style={styles.lifeComponentBar}>
            {
                lifeArray.map((value, index) => {
                    return (
                        value === 1 ? 
                            <AntDesign onPress={showLifeDetails} key={index} style={styles.lifeComponent} name="heart" size={24} color={Colors.RED_COLOR_DEFAULT} /> : 
                            <FontAwesome5 onPress={showLifeDetails} style={styles.lifeComponent} key={index} name="heart-broken" size={24} color={Colors.RED_COLOR_DEFAULT} />
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    lifeComponentBar: {
        flexDirection: 'row'
    },

    lifeComponent: {
        marginHorizontal: 2
    }
});
