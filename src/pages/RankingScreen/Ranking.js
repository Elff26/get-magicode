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
import Axios from '../../api/api';

var width = Dimensions.get('window').width; 

export default function Ranking({ navigation }) {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentRankType, setCurrentRankType] = useState("general");
    const [topUsers, setTopUsers] = useState([]);
    const [otherUsers, setOtherUsers] = useState([]);

    useEffect(() => {
        async function getData() {
            try {
                console.log("z")
                const response = await Axios.get(`/GetHigherXp/${currentRankType}`);
    
                if(response.data.higherXp) {
                    let users = response.data.higherXp;

                    let ranking = users.map((userRank) => {
                        return {
                            xp: userRank.monthXp ? userRank.monthXp : userRank.totalXp,
                            user: userRank.user
                        }
                    });

                    if(ranking.length >= 0) {
                        setTopUsers(ranking.slice(0, 3));
                        setOtherUsers(ranking.slice(3));
                    } else {
                        setTopUsers(ranking);
                    }
                }
            } catch(e) {
                setError(e.response.data.message);
            }
        }

        getData();
    }, [currentRankType]);

    useEffect(() => {
        async function getData() {
            setUser(JSON.parse(await AsyncStorage.getItem('@User')));
        }

        getData();
    }, []);

    const onChangeToMonthlyRanking = () => {
        setCurrentRankType('month');
    }

    const onChangeToGeneralRanking = () => {
        setCurrentRankType('general');
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
                        currentRankType === 'general' ? styles.activeRankType : {}
                    ]}
                    onPress={onChangeToGeneralRanking}
                >
                    <Text style={styles.rankTypeText}>Geral</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[
                        styles.rankTypeButton,
                        currentRankType === 'month' ? styles.activeRankType : {}
                    ]}
                    onPress={onChangeToMonthlyRanking}
                    >
                    <Text style={styles.rankTypeText}>Mensal</Text>
                </TouchableOpacity>
            </View>
            
            {
                otherUsers.length > 0 || topUsers.length > 0 && (
                    <FlatList
                        data={otherUsers > 0 ? otherUsers : topUsers}
                        contentContainerStyle={styles.otherUsersRanking}
                        renderItem={(user) => (
                            <>
                                {
                                    user.index === 0 && topUsers.length > 0 && (
                                        <TopThreeUsers 
                                            usersRank={topUsers}
                                        />
                                    )
                                }

                                {
                                    otherUsers > 0 && (
                                        <UserRank 
                                            userRank={user.item}
                                            position={user.index + 4}
                                        />
                                    )
                                }
                                
                            </>
                        )}
                    />
                )
            }
            
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