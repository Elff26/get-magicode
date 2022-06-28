import { useState } from 'react';

import { 
    FlatList, 
    Image, 
    SafeAreaView, 
    ScrollView, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View 
} from "react-native-web";
import Colors from "../../components/ColorPallete/Colors";
import Header from '../../components/Header/HeaderComponent';

export default function ChooseTechnologias({ navigation }) {
    const [selectedItems, setSelectedItems] = useState([]);
    const fakeData = [
        {
            name: 'Java', image_url: 'https://www.monetbil.com/support/wp-content/uploads/2021/01/java-logo-vector.png', key: 1
        },
        {
            name: 'JavaScript', image_url: 'https://camo.githubusercontent.com/5e4e512a9fba4d33300fa431e2c5fb07d476d5f15194bc75dfbf3da545f73e43/68747470733a2f2f63646e2e69636f6e73636f75742e636f6d2f69636f6e2f667265652f706e672d3235362f6a6176617363726970742d323735323134382d323238343936352e706e67', key: 2
        },
        {
            name: 'C', image_url: 'https://raw.githubusercontent.com/github/explore/f3e22f0dca2be955676bc70d6214b95b13354ee8/topics/c/c.png', key: 3
        },
        {
            name: 'C#', image_url: 'https://seeklogo.com/images/C/c-sharp-c-logo-02F17714BA-seeklogo.com.png', key: 4
        },
        {
            name: 'Clojure', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Clojure_logo.svg/1024px-Clojure_logo.svg.png', key: 5
        },
        {
            name: 'Ruby', image_url: 'https://cdn-icons-png.flaticon.com/512/919/919842.png', key: 6
        }
    ];

    function selectItem(key) {
        setSelectedItems([...selectedItems, key]);
    }

    function unselectItem(key) {
        setSelectedItems(selectedItems.filter(item => item != key));
    }

    return (
        <SafeAreaView style={styles.screenContainer}>
            <View>
                <Header backArrow={true} navigation={navigation} />

                <Text style={styles.chooseTechnologieText}>
                    Selecione até 2 tecnologias para aprender.
                </Text>

                <FlatList 
                    numColumns={2}
                    data={fakeData}
                    renderItem={({ item }) => (
                            <TouchableOpacity 
                                key={item.key} 
                                style={[styles.languageItem, 
                                    selectedItems.indexOf(item.key) != -1 ? 
                                    { backgroundColor: 'rgba(0, 193, 59, 0.5);' } : 
                                    {}]} 
                                onPress={() => selectedItems.indexOf(item.key) == -1 ? selectItem(item.key) : unselectItem(item.key)}>
                                <Image source={item.image_url} style={styles.languageLogo} />
                                <Text style={styles.languageName}>{item.name}</Text>
                            </TouchableOpacity>
                        )
                    }
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: '10%'
    },

    languageItem: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 20,
        padding: 10,
        borderRadius: 20
    },

    languageLogo: {
        width: '150px',
        height: '150px'
    },

    languageName: {
        fontSize: '18px',
        color: Colors.TEXT_COLOR
    },

    chooseTechnologieText: {
        color: Colors.PRIMARY_COLOR,
        fontSize: '22px'
    }
})