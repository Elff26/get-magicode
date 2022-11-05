import { useState, useEffect } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';

import { AntDesign, FontAwesome5 } from '@expo/vector-icons'; 
import Colors from '../../utils/ColorPallete/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CardLifeComponent from '../Card/CardLifeComponent';
import Axios from '../../api/api';
import { useIsFocused } from '@react-navigation/native';

export default function LifeCompoenent({ userID, numberOfLifes }) {
    const isFocused = useIsFocused();
    const [lifeArray, setLifeArray] = useState([]);
    const [showCard, setShowCard] = useState(false);

    useEffect(() => {
        async function getData() {
            try {
                await Axios.put(`/AddUserLife/${userID}`);
                let result = await Axios.get(`/GetNumberOfLife/${userID}`);

                if(result.data.numberOfLifes != undefined) {
                    let i = 0;
                    let lifes = [];

                    while(i < 5) {
                        if(i < result.data.numberOfLifes) {
                            lifes.push(1);
                        } else {
                            lifes.push(0);
                        }
            
                        i++;
                    }
            
                    setLifeArray(lifes);
                }
            } catch(e) {
                console.log(e);
            }
        }

        getData();
    }, [userID, isFocused, numberOfLifes]);

    return (
        <TouchableOpacity style={styles.lifeComponentBar} onPress={() => setShowCard(true)}>
            {
                lifeArray.map((value, index) => {
                    return (
                        value === 1 ? 
                            <AntDesign key={index} style={styles.lifeComponent} name="heart" size={24} color={Colors.RED_COLOR_DEFAULT} /> : 
                            <FontAwesome5 style={styles.lifeComponent} key={index} name="heart-broken" size={24} color={Colors.RED_COLOR_DEFAULT} />
                    )
                })
            }

            <CardLifeComponent showCard={showCard} setShowCard={setShowCard} numberOfLifes={lifeArray.length} />
        </TouchableOpacity>
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
