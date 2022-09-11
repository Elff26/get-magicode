import { useState, useEffect } from "react";
import { StyleSheet,Text, View} from "react-native";

import ButtonComponent from '../../components/Buttons/ButtonComponent';
import Colors from "../../utils/ColorPallete/Colors";
import Header from '../../components/Header/HeaderComponent';
import { RadioButton } from 'react-native-paper';
import Axios from "../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ToastComponent from "../../components/Toast/ToastComponent";

export default function SetAGoal({navigation}) {
    const [checked, setChecked] = useState("first");
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function getData() {
            let user = JSON.parse(await AsyncStorage.getItem('@User'))
            setUser(user);
        }
        getData();
    }, []);

    async function associateUserToGoal(){
        if(checked.length > 0){
            try {
                if(user != null) {
                    setIsLoading(true);

                    const response = await Axios.post('/AssociateToGoal/' + user.userID, {
                        goal: checked
                    });
                    
                    if(response.data) {
                        setIsLoading(false);
                        ToastComponent('Meta autalizada com sucesso!');
                        navigation.navigate('ProfileOptions');
                    }
                }
            } catch(e) {
                setError(e.response.data.message);
            }
        }
    }

    return ( 
        <View style={styles.allPagesSetGoal}>
            <Header backArrow={true} navigation={navigation} />

            <View style={styles.screenContainerSetGoal}>
                <View>
                    <Text style={styles.homeTitleSetGoal}>Estabeleça uma meta</Text>
                </View>

                <View style={styles.viewRadio}>
                    
                    <View style={styles.goalItem}>
                        <View style={styles.goalRadio}>
                            <RadioButton
                                value="1"
                                label="Casual"
                                status={checked === '1' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked("1")}
                            />
                            <Text style={styles.goalText}>Casual</Text>
                        </View>
                        <Text style={styles.goalXP}>10XP por dia</Text>
                    </View>

                    <View style={styles.goalItem}>
                        <View style={styles.goalRadio}>
                            <RadioButton
                                value="2"
                                status={checked === '2' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked("2")}
                            />
                            <Text style={styles.goalText}>Regular</Text>
                        </View>
                        <Text style={styles.goalXP}>20XP por dia</Text>
                    </View>

                    <View style={styles.goalItem}>
                        <View style={styles.goalRadio}>
                            <RadioButton
                                value="3"
                                status={checked === '3' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked("3")}
                            />
                            <Text style={styles.goalText}>Forte</Text>
                        </View>
                        <Text style={styles.goalXP}>30XP por dia</Text>                 
                    </View>

                    <View style={styles.goalItem}>
                        <View style={styles.goalRadio}>
                            <RadioButton
                                value="4"
                                status={checked === '4' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked("4")}
                            />
                            <Text style={styles.goalText}>Insano</Text>
                        </View>
                        <Text style={styles.goalXP}>50XP por dia</Text>
                    </View>
                </View>


                <View style={styles.formSetGoal}>
                    <ButtonComponent newStyle={styles.buttonSetGoal} 
                        onPress={associateUserToGoal}
                        isLoading={isLoading}>
                        <Text style={styles.textSetGoalButton}>Estabelecer meta</Text>
                    </ButtonComponent>
                </View>
            </View>   
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainerSetGoal: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: 15,
        marginBottom: 10
    },
    homeTitleSetGoal: {
        color: Colors.PRIMARY_COLOR,
        fontSize: 30,
        textAlign: 'center'
    },
   formSetGoal:{
        justifyContent: 'center',
        alignItems: 'center'
   },
   textSetGoalButton:{
        color:'#FFFFFF'
   },
   buttonSetGoal: {
        width: 198,
        height: 49,
        borderRadius: 20
   },
   allPagesSetGoal:{
        flex: 1,
        backgroundColor: '#fff'
   },
   goalItem: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignItems: 'center'
   },
   goalText: {
        fontSize: 18,
        color:Colors.TEXT_COLOR,
        textAlignVertical: 'center'
   },
   goalXP: {
        color: Colors.RADIO_TEXT,
        fontSize: 18,
        textAlignVertical: 'center'
   },
   viewRadio: {
        width: '100%',
        justifyContent: 'center'
   },
   goalRadio: {
        flexDirection: 'row',
   }
});