import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useState, useEffect, useRef } from 'react';
import Colors from '../../utils/ColorPallete/Colors';
import ButtonComponent from '../Buttons/ButtonComponent';
import Axios from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BottomSheetComponent = ({ navigation, setCurrentTechnology, setUser, user, open, setOpenBottomSheet, setIsLoading }) => {
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
            setIsLoading(true);
            const result = await Axios.post('/ChangeTechnology', {
                userTechnology: {
                    ...userTechnology,
                    learning: true,
                    user: {
                        userID: user.userID
                    }
                }
            })

            if(result.data.user) {
                let user = result.data.user;

                await AsyncStorage.mergeItem("@User", JSON.stringify(user));
                setUser(user)

                setCurrentTechnology(userTechnology);
            } 

            setIsLoading(true);
        } catch(e) {
            setError(e.response.data.message);
        }
    }

    function changeTechnologies() {
        setOpenBottomSheet(false);
        navigation.navigate('ChooseTechnologies')
    }

    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={['60%']}
            index={-1}
            backgroundStyle={{ backgroundColor: Colors.TEXT_INPUT_BACKGROUND }}
            enablePanDownToClose={true}
            onClose={() => setOpenBottomSheet(false)}
        >
            <Text style={styles.bottomSheetTitle}>Selecione a trilha que deseja</Text>
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
                                        style={[styles.languageItem, item.learning ? styles.selectedItem : {}]} 
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

    bottomSheetTitle: {
        color: Colors.PRIMARY_COLOR,
        fontSize: 22,
        textAlign: 'center'
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
        backgroundColor: Colors.WHITE_SAFE_COLOR
    },
    
    selectedItem: {
        backgroundColor: Colors.SELECT_ITEM_BACKGROUND
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
        color: Colors.WHITE_SAFE_COLOR
    },

    errorText: {
        color: Colors.ERROR_COLOR,
        textAlign: 'center'
    }
})
