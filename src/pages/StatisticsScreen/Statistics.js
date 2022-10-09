import { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';

import { 
    Image, 
    ScrollView,
    StyleSheet, 
    Text, 
    TouchableOpacity,
    View
} from "react-native";
import ButtonComponent from '../../components/Buttons/ButtonComponent';

import Colors, { LIGHT_RED, LIGHT_YELLOW } from "../../utils/ColorPallete/Colors";
import Header from '../../components/Header/HeaderComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProgressBar from '../../components/Statistics/ProgressBar';
import InfoComponent from '../../components/Statistics/InfoComponent';

export default function Statistics({ navigation }) {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function getData() {
            setUser(JSON.parse(await AsyncStorage.getItem('@User')));
        }

        getData();
    }, []);

    function goToGoalScreen() {
        navigation.navigate('SetAGoal');
    }

    function goToProfileOptions() {
        navigation.navigate('ProfileOptions');
    }

    function goToAchievementScreen() {
        navigation.navigate('Achievement');
    }

    return (
        
        <View style={styles.screenContainer}>
            <Header backArrow={true} navigation={navigation}>
                <TouchableOpacity onPress={goToProfileOptions} style={styles.settingsIcon}>
                    <Feather name='settings' color={Colors.TEXT_COLOR} size={32} />
                </TouchableOpacity>
            </Header>
                
            <View style={styles.content}>
                <Text style={styles.title}>
                    Perfil
                </Text>

                <ScrollView contentContainerStyle={styles.statisticsContent}>
                    <View>
                        <View>
                            <Image 
                                style={styles.userImage}
                                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png' }}
                            ></Image>
                            <Text style={styles.userName}>{user.name}</Text>
                        </View>
                    </View>

                    <ProgressBar 
                        title="Nível"
                        currentData={10}
                        maxData={100}
                    />

                    <View style={styles.infoContent}>
                        <InfoComponent 
                            title="Acertos"
                            total={10}
                            icon="check-circle"
                            backgroundColor={Colors.LIGHT_GREEN}
                            iconColor={Colors.GREEN_CHECK_ICON}
                        />

                        <InfoComponent 
                            title="Erros"
                            total={10}
                            icon="x-circle"
                            backgroundColor={Colors.LIGHT_RED}
                            iconColor={Colors.RED_ERROR_ICON}
                        />

                        <InfoComponent 
                            title="Conquistas"
                            total={2}
                            icon="award"
                            backgroundColor={Colors.LIGHT_YELLOW}
                            iconColor={Colors.YELLOW_ACHIEVEMENT_ICON}
                            onPress={goToAchievementScreen}
                        />
                    </View>

                    <ProgressBar 
                        title="Aulas completas:"
                        currentData={50}
                        maxData={100}
                        newStyle={styles.classroomsCompletesStyle}
                    />
                </ScrollView>

                <View style={styles.buttonGroup}>
                    <ButtonComponent newStyle={styles.newStyleButton} 
                        onPress={goToGoalScreen}>
                        <Text style={styles.textButton}>Ajustar meta</Text>
                    </ButtonComponent>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: Colors.WHITE_SAFE_COLOR
    },

    content: {
        flex: 1,
        justifyContent: 'space-between'
    },

    title:{
        alignSelf: 'center',
        fontSize: 34,
        color: Colors.PRIMARY_COLOR
    },

    buttonGroup: {
        width: '100%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: Colors.FOOTER_BACKGROUND_COLOR
    },

    textButton: {
        color: Colors.WHITE_SAFE_COLOR
    },

    newStyleButton: {
        width: '70%',
        marginHorizontal: 10
    },

    statisticsContent: {
        alignItems: 'center'
    },

    userImage: {
        width: 150,
        height: 150,
        borderWidth: 1,
        borderColor: Colors.BLACK,
        borderRadius: 75
    },

    userName: {
        alignSelf: 'center',
        fontSize: 24,
        color: Colors.PRIMARY_COLOR
    },

    classroomsCompletesStyle: {
        flexDirection: 'column'
    },

    infoContent: {
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})