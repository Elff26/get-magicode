import { FontAwesome5 } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { 
    Dimensions,
    Image, 
    StyleSheet, 
    Text, 
    View
} from "react-native";

import Colors from "../../utils/ColorPallete/Colors";

var width = Dimensions.get('window').width; 

export default function UserTopRank({ userRank, position }) {
    const [iconColor, setIconColor] = useState();

    useEffect(() => {
        if(position === 1) {
            setIconColor(Colors.GOLDEN_CROWN);
        } else if(position === 2) {
            setIconColor(Colors.SILVER_CROWN);
        } else {
            setIconColor(Colors.BRONZE_CROWN);
        }
    }, []); 

    return (
        <>
            {
                userRank.user && (
                    <View style={[styles.topUsersRank, position === 1 ? styles.topUserRank : {}]}>
                        <View style={styles.topUsersView}>
                            <FontAwesome5 name="crown" color={iconColor} size={28} />
                            <Image 
                                style={styles.userImage}
                                source={{ uri: !userRank.user.image ? 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png' : `data:image;base64,${userRank.user.image}` }}
                            />
                            <Text style={styles.rankTextPosition}>#{position}</Text>
                            <Text numberOfLines={2} style={styles.rankTextName}>{userRank.user.name}</Text>
                            <Text style={styles.rankTextName}>{userRank.xp} XP</Text>
                        </View>
                    </View> 
                )
            }
        </>
    )
}

const styles = StyleSheet.create({
    topUsersRank: {
        width: width / 3.7,
        justifyContent: 'center',
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: Colors.FOOTER_BACKGROUND_COLOR,
        padding: 6,
        margin: 5,
        height: "80%",
        borderRadius: 5
    },

    topUserRank: {
        width: width / 3,
        height: "95%"
    },

    topUsersView: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderColor: Colors.TEXT_COLOR,
        borderWidth: 1
    },

    rankTextPosition: {
        fontSize: 20,
        color: Colors.TEXT_COLOR,
        marginLeft: 10,
        textAlign: 'center',
        overflow: 'hidden'
    },  

    rankTextName: {
        fontSize: 16,
        color: Colors.TEXT_COLOR,
        marginLeft: 10,
        textAlign: 'center',
        overflow: 'hidden'
    }, 

    rankXp: {
        fontSize: 18,
        color: Colors.TEXT_COLOR,
        marginLeft: 10,
        textAlign: 'center'
    },

})
