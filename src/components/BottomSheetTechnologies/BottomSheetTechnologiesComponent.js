import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useState, useEffect, useRef } from 'react';
import Colors from '../../utils/ColorPallete/Colors';
import ButtonComponent from '../Buttons/ButtonComponent';
import Axios from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BottomSheetComponent = ({ navigation, setCurrentTechnology, setUser, user, open, setOpenBottomSheet }) => {
    const bottomSheetRef = useRef(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if(open) {
            bottomSheetRef.current.expand();
        } else {
            bottomSheetRef.current.close();
        }
    }, [open]);

        
    async function selectItem(userTechnology) {
        try {
            const result = await Axios.post('/ChangeLearningTrail', {
                userTecnology: {
                    ...userTechnology,
                    learning: true
                }
            })

            if(result.data.user) {
                let user = result.data.user;

                await AsyncStorage.mergeItem("@User", JSON.stringify(user));
                setUser(user)

                setCurrentTechnology(userTechnology);
            } 
        } catch(e) {
            setError(e.response.data.message);
        }
    }

    function changeTechnologies() {
        navigation.navigate('ChooseTechnologies')
    }

    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={['50%']}
            index={-1}
            backgroundStyle={{ backgroundColor: '#f5f5f5' }}
            enablePanDownToClose={true}
            onClose={() => setOpenBottomSheet(false)}
        >
            <BottomSheetView style={styles.sheetView}>
                {
                    user.technologies && (
                        <FlatList  
                            contentContainerStyle={styles.techListItems}
                            style={styles.techList}
                            numColumns={2}
                            data={user.technologies}
                            renderItem={({ item }) => (
                                    <TouchableOpacity 
                                        key={item.technologyID} 
                                        style={[styles.languageItem, item.learning ? { backgroundColor: 'rgb(57, 254, 113);' } : {}]} 
                                        onPress={() => selectItem(item)}>
                                        <Image source={{ uri: item.technology.imageUrl }} style={styles.languageLogo} />
                                        <Text style={styles.languageName}>{item.technology.name}</Text>
                                    </TouchableOpacity>
                                )
                            }
                        />
                    )
                }

                <Text style={styles.errorText}>{error}</Text>
                <ButtonComponent onPress={changeTechnologies}>
                    <Text style={styles.changeTechnologiesText}>Mudar tecnologias</Text>
                </ButtonComponent>
            </BottomSheetView>
        </BottomSheet>
    )
}

export default BottomSheetComponent

const styles = StyleSheet.create({
    sheetView: {
        padding: 15
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

    changeTechnologiesText: {
        color: "#FFF"
    },

    errorText: {
        color: Colors.ERROR_COLOR,
        textAlign: 'center'
    }
})
