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

import Colors from "../../utils/ColorPallete/Colors";
import Header from '../../components/Header/HeaderComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DialogCardComponent from '../../components/DialogCard/DialogCardComponent';

export default function Achievement({ navigation }) {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentRankType, setCurrentRankType] = useState("geral");
    const [dialogOpened, setDialogOpened] = useState(false);
    const [selectedAchievement, setSelectedAchievement] = useState({});

    const achievements = [
        {
            name: "conquista 1",
            image: 'https://cdn-icons-png.flaticon.com/512/1378/1378582.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vulputate aliquet lacus sed congue. Curabitur sed nisi neque. Sed non tortor leo. Cras fermentum risus enim, at dapibus erat iaculis eget. Cras nec nulla odio. Suspendisse imperdiet ullamcorper augue, vitae viverra diam ornare sed.',
            unlocked: true
        },
        {
            name: "conquista 2",
            image: 'https://cdn-icons-png.flaticon.com/512/1378/1378582.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vulputate aliquet lacus sed congue. Curabitur sed nisi neque. Sed non tortor leo. Cras fermentum risus enim, at dapibus erat iaculis eget. Cras nec nulla odio. Suspendisse imperdiet ullamcorper augue, vitae viverra diam ornare sed.',
            unlocked: true
        },
        {
            name: "conquista 3",
            image: 'https://cdn-icons-png.flaticon.com/512/1378/1378582.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vulputate aliquet lacus sed congue. Curabitur sed nisi neque. Sed non tortor leo. Cras fermentum risus enim, at dapibus erat iaculis eget. Cras nec nulla odio. Suspendisse imperdiet ullamcorper augue, vitae viverra diam ornare sed.',
            unlocked: true
        },
        {
            name: "conquista 4",
            image: 'https://cdn-icons-png.flaticon.com/512/1378/1378582.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vulputate aliquet lacus sed congue. Curabitur sed nisi neque. Sed non tortor leo. Cras fermentum risus enim, at dapibus erat iaculis eget. Cras nec nulla odio. Suspendisse imperdiet ullamcorper augue, vitae viverra diam ornare sed.',
            unlocked: true
        },
        {
            name: "conquista 5",
            image: 'https://cdn-icons-png.flaticon.com/512/1378/1378582.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vulputate aliquet lacus sed congue. Curabitur sed nisi neque. Sed non tortor leo. Cras fermentum risus enim, at dapibus erat iaculis eget. Cras nec nulla odio. Suspendisse imperdiet ullamcorper augue, vitae viverra diam ornare sed.',
            unlocked: true
        },
        {
            name: "conquista 6",
            image: 'https://cdn-icons-png.flaticon.com/512/1378/1378582.png',
            unlocked: false
        },
        {
            name: "conquista 7",
            image: 'https://cdn-icons-png.flaticon.com/512/1378/1378582.png',
            unlocked: false
        },
        {
            name: "conquista 8",
            image: 'https://cdn-icons-png.flaticon.com/512/1378/1378582.png',
            unlocked: false
        },
        {
            name: "conquista 9",
            image: 'https://cdn-icons-png.flaticon.com/512/1378/1378582.png',
            unlocked: false
        },
    ]

    useEffect(() => {
        async function getData() {
            setUser(JSON.parse(await AsyncStorage.getItem('@User')));
        }

        getData();
    }, []);

    function selectAchievement(achievement) {
        setSelectedAchievement(achievement);
        setDialogOpened(true);
    }

    function closeAchievementDialog() {
        setDialogOpened(false);
    }

    return (
        <View style={styles.screenContainer}>
            <Header backArrow={true} navigation={navigation} />
                
            <Text style={styles.title}>
                Conquistas
            </Text>

            <View style={styles.achievementContent}>
                <FlatList 
                    data={achievements}
                    contentContainerStyle={styles.achievementList}
                    numColumns={3}
                    renderItem={(achievement => (
                        <View style={styles.achievementItem} key={achievement.index}>
                            {
                                achievement.item.unlocked && (
                                    <TouchableOpacity style={styles.unlockedAchievement} onPress={() => selectAchievement(achievement.item)}>
                                        <Image
                                            style={styles.unlockedAchievementImage}
                                            source={{ uri: achievement.item.image }}
                                        />
                                    </TouchableOpacity>
                                )
                            }

                            {
                                !achievement.item.unlocked && (
                                    <View style={styles.lockedAchievement}>
                                        <Feather name='lock' color={Colors.RED_COLOR_DEFAULT} size={42} />
                                    </View>
                                )
                            }
                        </View>
                    ))}
                />
            </View> 

            <DialogCardComponent 
                title={selectedAchievement.name}
                description={selectedAchievement.description}
                onPressToClose={closeAchievementDialog}
                visible={dialogOpened}
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
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },

    achievementItem: {
        width: '33.33%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
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