import { 
    Image, 
    StyleSheet, 
    Text, 
    View
} from "react-native";

import Colors from "../../utils/ColorPallete/Colors";

export default function UserRank({ user, position }) {
    return (
        <View style={styles.userRank}>
            <View style={styles.userView}>
                <Image 
                    style={styles.userImage}
                    source={{ uri: user.image }}
                />
                <Text style={styles.rankText}>#{position} - {user.name}</Text>
            </View>

            <View style={styles.userScoreView}>
                <Text style={styles.rankText}>{user.xp}</Text>
                <Text style={styles.rankXp}>XP</Text>
            </View>
        </View> 
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
        textAlign: 'center'
    },  

    userScoreView: {
        justifyContent: 'center'
    }
})
