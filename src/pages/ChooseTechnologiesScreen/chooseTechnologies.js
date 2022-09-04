import { useState, useEffect } from 'react';

import { 
    FlatList, 
    Image, 
    SafeAreaView, 
    StyleSheet, 
    Text, 
    TouchableOpacity,
    View
} from "react-native";
import ButtonComponent from '../../components/Buttons/ButtonComponent';

import Axios from '../../api/api';
import Colors from "../../utils/ColorPallete/Colors";
import Header from '../../components/Header/HeaderComponent';
import ToastComponent from '../../components/Toast/ToastComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ChooseTechnologies({ navigation }) {
    const [selectedItems, setSelectedItems] = useState([]);
    const [technologies, setTechnologies] = useState([]);
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function getData() {
            const response = await Axios.get("/ListAllTechnologies");
            if(response.data.technologies) {
                setTechnologies(response.data.technologies);
                setUser(JSON.parse(await AsyncStorage.getItem('@User')));
            }
        }
        getData();
    }, []);

    async function associateUserToTechnology () {
        if(selectedItems.length > 0) {
            try {
                if (user != null) {
                    setIsLoading(true);
                    
                    console.log(selectedItems);
                    const response = await Axios.post('/AssociateToTechnology/' + user.userID, {
                        technologies: selectedItems
                    });
                    
                    if(response.data.user) {
                        await AsyncStorage.mergeItem('@User', JSON.stringify(response.data.user));
                        setUser(response.data.user);
                        setIsLoading(false);
                        navigation.navigate('LearningTrail');
                    }
                }
            } catch(e) {
                setError(e.response.data.message);
            }
        }
    }
    
    function selectItem(technology) {
        if(selectedItems.length < 2) {
            setSelectedItems([...selectedItems, technology]);
        } else {
            ToastComponent('Selecione no máximo 2 tecnologias!');
        }
    }

    function unselectItem(technology) {
        setSelectedItems(selectedItems.filter(item => item != technology));
    }

    function goToKnowledgeTest() {
        navigation.navigate('KnowledgeTestIntro');
    }

    return (
        <View style={styles.screenContainer}>
                <Header backArrow={true} navigation={navigation} />

                <Text style={styles.chooseTechnologieText}>
                    Selecione até 2 tecnologias para aprender.
                </Text>

                <FlatList  
                    contentContainerStyle={styles.techListItems}
                    style={styles.techList}
                    numColumns={2}
                    data={technologies}
                    renderItem={({ item }) => (
                            <TouchableOpacity 
                                key={item.technologyID} 
                                style={[styles.languageItem, 
                                    selectedItems.indexOf(item) != -1 ? 
                                    { backgroundColor: 'rgb(57, 254, 113);' } : 
                                    {}]} 
                                onPress={() => selectedItems.indexOf(item.technologyID) == -1 ? selectItem(item) : unselectItem(item)}>
                                <Image source={{ uri: item.imageUrl }} style={styles.languageLogo} />
                                <Text style={styles.languageName}>{item.name}</Text>
                            </TouchableOpacity>
                        )
                    }
                />

                <View style={styles.buttonGroup}>
                    <ButtonComponent newStyle={styles.newStyleButton} 
                        onPress={associateUserToTechnology}
                        isLoading={isLoading}>
                        <Text style={styles.textButton}>Aprender</Text>
                    </ButtonComponent>
                    <ButtonComponent newStyle={styles.newStyleButton}>
                        <Text style={styles.textButton} onPress={goToKnowledgeTest}>Fazer teste</Text>
                    </ButtonComponent>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },

    languageItem: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 20,
        borderRadius: 20,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { 
            width: 0, 
            height: 2
        },
        shadowRadius: 10,
        elevation: 2,
        backgroundColor: '#fff'
    },

    techList: {
        width: '100%'
    },

    techListItems: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    languageLogo: {
        width: 150,
        height: 150
    },

    languageName: {
        fontSize: 18,
        color: Colors.TEXT_COLOR
    },

    chooseTechnologieText: {
        color: Colors.PRIMARY_COLOR,
        fontSize: 22,
        textAlign: 'center'
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
        color: '#fff'
    },

    newStyleButton: {
        width: '49%',
        marginHorizontal: 10
    }
})