import { useState, useEffect } from 'react';

import { 
    Dimensions,
    FlatList,
    StyleSheet, 
    Text, 
    TouchableOpacity,
    View
} from "react-native";

import Colors from "../../utils/ColorPallete/Colors";
import Header from '../../components/Header/HeaderComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopThreeUsers from '../../components/Ranking/TopThreeUsers';
import UserRank from '../../components/Ranking/UserRank';

var width = Dimensions.get('window').width; 

export default function Ranking({ navigation }) {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentRankType, setCurrentRankType] = useState("geral");

    let users = [
        {
            name: 'Teste',
            xp: 500,
            image: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
        },
        {
            name: 'Teste 2',
            xp: 499,
            image: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
        },
        {
            name: 'Teste 3',
            xp: 498,
            image: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
        },
        {
            name: 'Teste 4',
            xp: 400,
            image: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
        },
        {
            name: 'Teste 5',
            xp: 390,
            image: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
        },
        {
            name: 'Teste 6',
            xp: 380,
            image: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
        },
        {
            name: 'Teste 7',
            xp: 370,
            image: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
        },
        {
            name: 'Teste 8',
            xp: 360,
            image: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
        }
    ]

    useEffect(() => {
        async function getData() {
            setUser(JSON.parse(await AsyncStorage.getItem('@User')));
        }

        getData();
    }, []);

    const onChangeToMonthlyRanking = () => {
        setCurrentRankType('mensal');
    }

    const onChangeToGeneralRanking = () => {
        setCurrentRankType('geral');
    }

    return (
        
        <View style={styles.screenContainer}>
            <Header backArrow={true} navigation={navigation} arrowColor={Colors.WHITE_SAFE_COLOR} />
                
            <Text style={styles.title}>
                Ranking
            </Text>

            <View style={styles.rankType}>
                <TouchableOpacity style={[
                        styles.rankTypeButton,
                        currentRankType === 'geral' ? styles.activeRankType : {}
                    ]}
                    onPress={onChangeToGeneralRanking}
                >
                    <Text style={styles.rankTypeText}>Geral</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[
                        styles.rankTypeButton,
                        currentRankType === 'mensal' ? styles.activeRankType : {}
                    ]}
                    onPress={onChangeToMonthlyRanking}
                    >
                    <Text style={styles.rankTypeText}>Mensal</Text>
                </TouchableOpacity>
            </View>

            <TopThreeUsers 
                users={users.slice(0, 3)}
            />

            <FlatList
                data={users.slice(3)}
                initialNumToRender={2}
                contentContainerStyle={styles.otherUsersRanking}
                renderItem={(user) => (
                    <UserRank 
                        user={user.item}
                        position={user.index + 4}
                    />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: Colors.PRIMARY_COLOR,
        justifyContent: 'center',
        alignItems: 'center'
    },

    title:{
        alignSelf: 'center',
        fontSize: 34,
        color: Colors.WHITE_SAFE_COLOR
    },

    otherUsersRanking: {
        width: width,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        overflow: 'hidden'
    },

    rankType: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },

    rankTypeButton: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.WHITE_SAFE_COLOR,
        padding: 10,
        width: '50%',
        borderRadius: 2
    },

    rankTypeText: {
        alignSelf: 'center',
        fontSize: 18,
        color: Colors.WHITE_SAFE_COLOR
    },

    activeRankType: {
        backgroundColor: Colors.PRIMARY_COLOR_DISABLED
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

})