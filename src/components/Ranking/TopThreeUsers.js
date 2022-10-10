import { 
    Dimensions,
    StyleSheet, 
    View
} from "react-native";

import UserTopRank from './UserTopRank';

export default function({ usersRank }) {
    return (
        <View style={styles.topUsersList}>
            <UserTopRank
                userRank={usersRank[1]}
                position={2}
            />

            <UserTopRank
                userRank={usersRank[0]}
                position={1}
            />

            <UserTopRank
                userRank={usersRank[2]}
                position={3}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    topUsersList: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: 250
    }
})
