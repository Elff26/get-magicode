import { 
    Image, 
    StyleSheet, 
    Text, 
    View
} from "react-native";

import Colors from "../../utils/ColorPallete/Colors";

export default function UserRank({ userRank, position }) {
    return (
        <>
            {
                userRank.user && (
                    <View style={styles.userRank}>
                        <View style={styles.userView}>
                            <Image 
                                style={styles.userImage}
                                source={{ uri: !userRank.user.image ? 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png' : `data:image;base64,${userRank.user.image}` }}
                            />
                            <Text numberOfLines={1} style={styles.rankText}>#{position} - {userRank.user.name}</Text>
                        </View>

                        <View style={styles.userScoreView}>
                            <Text style={styles.rankXp}>{userRank.xp}</Text>
                            <Text style={styles.rankXp}>XP</Text>
                        </View>
                    </View> 
                )
            }
        </>
    )
}

const styles = StyleSheet.create({
    userRank: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignSelf: 'center',
        backgroundColor: Colors.FOOTER_BACKGROUND_COLOR,
        padding: 10,
        borderBottomColor: Colors.LIGHT_GRAY,
        borderBottomWidth: 1
    },

    userView: {
        alignItems: 'center',
        flexDirection: 'row'
    },
 
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderColor: Colors.TEXT_COLOR,
        borderWidth: 1
    },
    
    rankText: {
        fontSize: 22,
        color: Colors.TEXT_COLOR,
        marginLeft: 10,
        width: '70%'
    },  

    rankXp: {
        fontSize: 16,
        color: Colors.TEXT_COLOR,
        textAlign: 'center',
        textAlignVertical: 'bottom'
    },

    userScoreView: {
        justifyContent: 'center',
        flexDirection: 'row',
        height: '100%'
    }
})
