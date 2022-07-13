import { useState } from "react";
import { StyleSheet,Text, TextInput, View} from "react-native";

import ButtonComponent from '../../components/Buttons/ButtonComponent';
import Colors from "../../components/ColorPallete/Colors";
import Header from '../../components/Header/HeaderComponent';
import { RadioButton } from 'react-native-paper';

export default function SetAGoal({navigation}) {
    const [checked, setChecked] = useState("first");

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
                                value="first"
                                label="Casual"
                                status={checked === 'first' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked("first")}
                            />
                            <Text style={styles.goalText}>Casual</Text>
                        </View>
                        <Text style={styles.goalXP}>10XP por dia</Text>
                    </View>

                    <View style={styles.goalItem}>
                        <View style={styles.goalRadio}>
                            <RadioButton
                                value="second"
                                status={checked === 'second' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked("second")}
                            />
                            <Text style={styles.goalText}>Regular</Text>
                        </View>
                        <Text style={styles.goalXP}>20XP por dia</Text>
                    </View>

                    <View style={styles.goalItem}>
                        <View style={styles.goalRadio}>
                            <RadioButton
                                value="third"
                                status={checked === 'third' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked("third")}
                            />
                            <Text style={styles.goalText}>Forte</Text>
                        </View>
                        <Text style={styles.goalXP}>30XP por dia</Text>                 
                    </View>

                    <View style={styles.goalItem}>
                        <View style={styles.goalRadio}>
                            <RadioButton
                                value="fourth"
                                status={checked === 'fourth' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked("fourth")}
                            />
                            <Text style={styles.goalText}>Insano</Text>
                        </View>
                        <Text style={styles.goalXP}>50XP por dia</Text>
                    </View>
                </View>


                <View style={styles.formSetGoal}>
                    <ButtonComponent newStyle={styles.buttonSetGoal}>
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
        alignItems: 'center',
   },
   textSetGoalButton:{
        color:'#FFFFFF'
   },
   buttonSetGoal: {
        width: 198,
        height: 49,
        borderRadius: 20,
   },
   allPagesSetGoal:{
        flex: 1,
        backgroundColor: '#fff'
   },
   goalItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        justifyContent: 'space-evenly',
   },
   goalText: {
        fontSize: 18,
        color:Colors.TEXT_COLOR
   },
   goalXP: {
        color:Colors.RADIO_TEXT,
        fontSize: 18,
        width: '100%',
        textAlign: 'right'
   },
   viewRadio: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
   },
   goalRadio: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 'fit-content',
   }
});