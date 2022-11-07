import { useState, useEffect } from "react";
import { FlatList, StyleSheet,Text, View} from "react-native";

import ButtonComponent from '../../components/Buttons/ButtonComponent';
import Colors from "../../utils/ColorPallete/Colors";
import Header from '../../components/Header/HeaderComponent';
import { RadioButton } from 'react-native-paper';
import Axios from "../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ToastComponent from "../../components/Toast/ToastComponent";

export default function SetAGoal({navigation}) {
    const [checked, setChecked] = useState(0);
    const [goal, setGoal] = useState([]);
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function getData() {
            const response = await Axios.get('/ListAllGoals');
            if(response.data.goals) {
                setGoal(response.data.goals);
                setUser(JSON.parse(await AsyncStorage.getItem('@User')));
            }
        }
        getData();
    }, []);

    async function associateUserToGoal(){
        if(checked > 0){
            try {
                if(user != null) {
                    setIsLoading(true);

                    const response = await Axios.post('/AssociateToGoal/' + user.userID, {
                        goal: checked
                    });
                    
                    if(response.data.user) {
                        await AsyncStorage.mergeItem('@User', JSON.stringify(response.data.user));
                        setUser(response.data.user);
                        ToastComponent('Meta autalizada com sucesso!');
                        setIsLoading(false);
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

                <FlatList 
                    contentContainerStyle={styles.viewRadio}
                    data={goal}
                    renderItem={({ item }) =>(
                        <View style={styles.goalItem}>
                            <View style={styles.goalRadio}>
                                <RadioButton
                                    key={item.goalID}
                                    value={item.goalID}
                                    status={checked === item.goalID ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked(item.goalID)}
                                />
                                <Text style={styles.goalText}>{item.name}</Text>
                            </View>
                            
                            <Text style={styles.goalXP}>{item.value}XP por dia</Text>
                        </View>
                        )
                    }
                />

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
        backgroundColor: Colors.WHITE_SAFE_COLOR,
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
        color: Colors.WHITE_SAFE_COLOR
   },
   buttonSetGoal: {
        width: 198,
        height: 49,
        borderRadius: 20
   },
   allPagesSetGoal:{
        flex: 1,
        backgroundColor: Colors.WHITE_SAFE_COLOR
   },
   goalItem: {
        with: '100%', 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgoundColor:"#444"
   },
   goalText: {
        fontSize: 18,
        color:Colors.TEXT_COLOR,
        textAlign: 'auto',
        flexWrap: 'wrap',
        maxWidth: '90%'
   },
   goalXP: {
        color: Colors.RADIO_TEXT,
        fontSize: 19,
        textAlignVertical: 'center',    
   },
   viewRadio: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignContent: "center"
   },
   goalRadio: {
        flexDirection: 'row',
        alignItems: 'center'
   }
});