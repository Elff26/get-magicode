import { 
    Dimensions,
    StyleSheet, 
    View
} from "react-native";

import UserTopRank from './UserTopRank';

export default function({ users }) {
    return (
        <View style={styles.topUsersList}>
            <UserTopRank
                user={users[1]}
                position={2}
            />

            <UserTopRank
                user={users[0]}
                position={1}
            />

            <UserTopRank
                user={users[2]}
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
        height: 200
    }
})
