import { useState, useEffect } from "react";
import { 
    FlatList, 
    StyleSheet, 
    Text, 
    TouchableOpacity,
    View
} from "react-native";

import ButtonComponent from '../../components/Buttons/ButtonComponent';
import Colors from "../../utils/ColorPallete/Colors";
import Header from '../../components/Header/HeaderComponent';
import { RadioButton } from 'react-native-paper';
import Axios from "../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ToastComponent from "../../components/Toast/ToastComponent";
import LoadingComponent from "../../components/Loading/LoadingComponent";

export default function SetAGoal({navigation}) {
    const [checked, setChecked] = useState(0);
    const [goal, setGoal] = useState([]);
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function getData() {
            setIsLoading(true);
            const response = await Axios.get('/ListAllGoals');
            if(response.data.goals) {
                setGoal(response.data.goals);
                setUser(JSON.parse(await AsyncStorage.getItem('@User')));
                setIsLoading(false);
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
            {
                isLoading && (
                    <LoadingComponent />
                )
            }

            <Header backArrow={true} navigation={navigation} />

            <View style={styles.screenContainerSetGoal}>
                <View>
                    <Text style={styles.homeTitleSetGoal}>Estabeleça uma meta</Text>
                </View>
                
                <View style={styles.viewRadio}>
                    <FlatList 
                        contentContainerStyle={styles.goalItens}
                        data={goal}
                        renderItem={({ item }) =>(
                                <TouchableOpacity activeOpacity={0.5} style={styles.goalItem} onPress={() => setChecked(item.goalID)}>
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
                                </TouchableOpacity>
                            )
                        }
                    />
                </View>

                <View style={styles.formSetGoal}>
                    <ButtonComponent newStyle={styles.buttonSetGoal} 
                        onPress={associateUserToGoal}>
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
        width: "100%",
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

    goalItens: {
        flexGrow: 1,
        justifyContent: "center"
    }, 

    goalItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgoundColor: Colors.BLACK,
        marginVertical: 10
    },

    goalText: {
        fontSize: 22,
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
        width: "90%",
        justifyContent: 'center',
        alignContent: "center"
    }, 

    goalRadio: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});