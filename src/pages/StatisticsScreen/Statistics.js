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
import { useIsFocused } from "@react-navigation/native";
import LoadingComponent from '../../components/Loading/LoadingComponent';
import * as ImagePicker from 'expo-image-picker';


export default function Statistics({ navigation }) {
    const isFocused = useIsFocused();

    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [numberOfClasses, setNumberOfClasses] = useState(0);
    const [numberOfAchievements, setNumberOfAchievements] = useState(0);
    const [image, setImage] = useState(null);

    useEffect(() => {
        async function getData() {
            console.log('A');
            const userImage = await Axios.get(`GetProfilePicture/${user.userID}`);
            
            if(userImage.data.user) {
                setImage(`data:image;base64,${userImage.data.user}`);
            }

            setIsLoading(false);
        }

        if(user.userID && !image) {
            setIsLoading(true);
            getData();
        }
    }, [user.userID]);

    useEffect(() => {
        let mounted = true;

        async function getData() {
            try {
                let user = JSON.parse(await AsyncStorage.getItem('@User'))
                const responseUser = await Axios.get(`/FindUserById/${user.userID}`);
                const responseClasses = await Axios.get(`/CountAllClassrooms`);
                const responseAchievements = await Axios.get(`/ListAchievementUserHave/${user.userID}`);

                if(responseUser.data.user && mounted) {
                    setUser(responseUser.data.user);
                } else if(mounted) {
                    setUser(user);
                }

                if(responseClasses.data.numberOfClasses && mounted) {
                    setNumberOfClasses(responseClasses.data.numberOfClasses);
                }

                if(responseAchievements.data.achievements && mounted) {
                    setNumberOfAchievements(responseAchievements.data.achievements.length);
                }

                if(mounted) {
                    setIsLoading(false);
                }
            } catch (e) {
                setError(e.response.data.message);
            }
        }

        getData();

        return () => {
            mounted = false;
        }
    }, [isFocused]);

    function goToGoalScreen() {
        navigation.navigate('SetAGoal');
    }

    function goToProfileOptions() {
        navigation.navigate('ProfileOptions');
    }

    function goToAchievementScreen() {
        navigation.navigate('Achievement');
    }

    const pickImage = async () => {
        setIsLoading(true);
        let imagePicked = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          base64: true,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.2,
        });
    
        if (!imagePicked.cancelled) {
            setImage(`data:image;base64,${imagePicked.base64}`);

            await Axios.put(`/SaveProfilePicture/${user.userID}`, {
                image: imagePicked.base64
            });
        }

        setIsLoading(false);
    };

    return (
        
        <View style={styles.screenContainer}>
            {
                isLoading && (
                    <LoadingComponent />
                )
            }
            
            <Header backArrow={true} navigation={navigation}>
                <TouchableOpacity onPress={goToProfileOptions} style={styles.settingsIcon}>
                    <Feather name='settings' color={Colors.TEXT_COLOR} size={32} />
                </TouchableOpacity>
            </Header>
                
            <View style={styles.content}>
                <Text style={styles.title}>
                    Perfil
                </Text>

                {
                    user.statistics && (
                        <ScrollView contentContainerStyle={styles.statisticsContent}>
                            <View style={styles.userInfo}>
                                <TouchableOpacity onPress={pickImage} style={styles.imageButton}>
                                    <Image 
                                        style={[styles.userImage, image ? {} : styles.userImageBorder]}
                                        source={{ uri: image ? image : 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png' }}
                                    ></Image>
                                    <Text style={styles.userName}>{user.name}</Text>
                                </TouchableOpacity>
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
                                    total={numberOfAchievements}
                                    icon="award"
                                    backgroundColor={Colors.LIGHT_YELLOW}
                                    iconColor={Colors.YELLOW_ACHIEVEMENT_ICON}
                                    onPress={goToAchievementScreen}
                                />
                            </View>

                            <ProgressBar 
                                title="Aulas completas:"
                                currentData={user.statistics.completedClasses}
                                maxData={numberOfClasses}
                                newStyle={styles.classroomsCompletesStyle}
                            />
                        </ScrollView>
                    )
                }

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

    imageButton: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    userImage: {
        width: 150,
        height: 150,
        borderRadius: 75
    },

    userImageBorder: {
        borderWidth: 1,
        borderColor: Colors.BLACK
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