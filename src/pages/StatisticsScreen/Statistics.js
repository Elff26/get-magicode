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

import Colors from "../../utils/ColorPallete/Colors";
import Header from '../../components/Header/HeaderComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProgressBar from '../../components/Statistics/ProgressBar';
import InfoComponent from '../../components/Statistics/InfoComponent';
import Axios from '../../api/api';

export default function Statistics({ navigation }) {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function getData() {
            try {
                let user = JSON.parse(await AsyncStorage.getItem('@User'))
                const response = await Axios.get(`/FindUserById/${user.userID}`)

                if(response.data.user) {
                    setUser(response.data.user);
                } else {
                    setUser(user);
                }
            } catch (error) {
                setError(e.response.data.message);
            }
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
                    <View style={styles.userInfo}>
                        <Image 
                            style={styles.userImage}
                            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png' }}
                        ></Image>
                        <Text style={styles.userName}>{user.name}</Text>
                    </View>

                    <ProgressBar 
                        currentData={user.statistics.currentXp}
                        maxData={user.statistics.level.valueXp}
                        showIcon={true}
                    />

                    <View style={styles.infoContent}>
                        <InfoComponent 
                            title="Acertos"
                            total={user.statistics.numberOfHits}
                            icon="check-circle"
                            backgroundColor={Colors.LIGHT_GREEN}
                            iconColor={Colors.GREEN_CHECK_ICON}
                        />

                        <InfoComponent 
                            title="Erros"
                            total={user.statistics.numberOfMistakes}
                            icon="x-circle"
                            backgroundColor={Colors.LIGHT_RED}
                            iconColor={Colors.RED_ERROR_ICON}
                        />

                        <InfoComponent 
                            title="Conquistas"
                            total={3}
                            icon="award"
                            backgroundColor={Colors.LIGHT_YELLOW}
                            iconColor={Colors.YELLOW_ACHIEVEMENT_ICON}
                            onPress={goToAchievementScreen}
                        />
                    </View>

                    <ProgressBar 
                        title="Aulas completas:"
                        currentData={user.statistics.completedClasses}
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
        alignItems: 'center',
        width: '100%'
    },

    userInfo: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
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