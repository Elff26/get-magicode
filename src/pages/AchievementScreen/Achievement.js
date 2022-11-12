import { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';

import { 
    FlatList,
    StyleSheet, 
    Image,
    Text, 
    TouchableOpacity,
    View
} from "react-native";

import Axios from '../../api/api';
import Colors from "../../utils/ColorPallete/Colors";
import Header from '../../components/Header/HeaderComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AchievementCardComponent from '../../components/Card/AchievementCardComponent';
import LoadingComponent from '../../components/Loading/LoadingComponent';

export default function Achievement({ navigation }) {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [dialogOpened, setDialogOpened] = useState(false);
    const [selectedAchievement, setSelectedAchievement] = useState({});
    const [allAchievements, setAllAchievements] = useState([]);
    const [userAchievements, setUserAchievements] = useState([]);

    useEffect(() => {
        async function getData() {
            try {
                userData = JSON.parse(await AsyncStorage.getItem('@User'));

                let allAchievementsData = await Axios.get('/ListAllAchievement');

                if(allAchievementsData.data.achievement) {
                    let allUserAchievementsData = await Axios.get(`/ListAchievementUserHave/${userData.userID}`);

                    if(allUserAchievementsData.data.achievements) {
                        let achievements = allAchievementsData.data.achievement.map(achievement => {
                            let userHave = allUserAchievementsData.data.achievements.includes(achievement.achievementID);

                            return {
                                achievement: achievement,
                                unlocked: userHave
                            }
                        });

                        setAllAchievements(achievements);
                        setIsLoading(false);
                        setUserAchievements(allUserAchievementsData.data.achievements);
                    }
                }
            } catch (e) {
                setError(e.response.data.message);
            }
        }

        getData();
    }, []);

    useEffect(() => {
        async function getData() {
            setUser(JSON.parse(await AsyncStorage.getItem('@User')));
        }

        getData();
    }, []);

    function selectAchievement(userAchievement) {
        setSelectedAchievement(userAchievement.achievement);
        setDialogOpened(true);
    }

    return (
        <View style={styles.screenContainer}>
            {
                isLoading && (
                    <LoadingComponent />
                )
            }
            <Header backArrow={true} navigation={navigation} />
                
            <Text style={styles.title}>
                Conquistas
            </Text>

            <View style={styles.achievementContent}>
                <FlatList 
                    data={allAchievements}
                    contentContainerStyle={styles.achievementList}
                    numColumns={3}
                    renderItem={(({ item }) => (
                        <View style={styles.achievementItem} key={item.index}>
                            {
                                item.unlocked && (
                                    <TouchableOpacity style={styles.unlockedAchievement} onPress={() => selectAchievement(item)}>
                                        <Image
                                            style={styles.unlockedAchievementImage}
                                            source={{ uri: item.achievement.image !== "" ? item.achievement.image : 'https://cdn2.iconfinder.com/data/icons/seo-web-optomization-ultimate-set/512/page_quality-512.png' }}
                                        />
                                    </TouchableOpacity>
                                )
                            }

                            {
                                !item.unlocked && (
                                    <View style={styles.lockedAchievement}>
                                        <Feather name='lock' color={Colors.RED_COLOR_DEFAULT} size={42} />
                                    </View>
                                )
                            }
                        </View>
                    ))}
                />
            </View> 

            <AchievementCardComponent 
                title={selectedAchievement.name}
                description={selectedAchievement.description}
                xp={selectedAchievement.xp}
                setShowCard={setDialogOpened}
                showCard={dialogOpened}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: Colors.WHITE_SAFE_COLOR
    },

    title:{
        alignSelf: 'center',
        fontSize: 34,
        color: Colors.PRIMARY_COLOR
    },

    achievementList: {
        width: '100%',
        justifyContent: 'flex-end'
    },

    achievementItem: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        flexBasis: '33%'
    },

    achievementContent: {
        flex: 1
    },

    unlockedAchievement: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.LIGHT_BLUE,
        justifyContent: 'center',
        alignItems: 'center'
    },

    unlockedAchievementImage: {
        width: 60,
        height: 60
    },

    lockedAchievement: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.LIGHT_RED,
        justifyContent: 'center',
        alignItems: 'center'
    }
})