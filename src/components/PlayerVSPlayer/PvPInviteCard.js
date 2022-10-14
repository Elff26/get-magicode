import { useContext, useEffect, useState } from "react";
import { Dimensions, Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Colors from "../../utils/ColorPallete/Colors";
import ButtonComponent from '../Buttons/ButtonComponent';
import * as Clipboard from 'expo-clipboard';
import ToastComponent from "../Toast/ToastComponent";
import { SocketContext } from '../../utils/Socket/socket';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

export default function PvPInviteCard({ showCard, setShowCard, navigation, user }) {
    const socket = useContext(SocketContext);
    const [roomNumber, setRoomNumber] = useState("");
    const [createdRoomNumber, setCreatedRoomNumber] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        socket.on('roomNumber', (roomNumber) => {
            setCreatedRoomNumber(roomNumber);
        });

        socket.on('initChallenge', (roomNumber) => {
            navigation.navigate('PvPExercise', {
                roomNumber
            });
        });

        socket.on('roomNotExists', () => {
            setError("Sala não existe");
        });

        return () => {
            socket.off('roomNumber');
            socket.off('initChallenge');
        }
    }, [user, roomNumber]);

    async function copyCodeToClipboard() {
        await Clipboard.setStringAsync(createdRoomNumber);
        ToastComponent('Copiado com sucesso');
    }

    async function createRoom() {
        socket.emit('play', user.userID);
    }

    async function acceptChallenge() {
        setError("Sala não existe");
        socket.emit('acceptChallenge', roomNumber, user.userID);
    }

    async function returnToCode() {
        setCreatedRoomNumber("");
    }

    return (
        <>
            {
                showCard && (
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={showCard}
                        onRequestClose={() => setShowCard(!showCard)}

                    >
                        <TouchableOpacity style={styles.pvpCardBackground} onPressOut={() => setShowCard(!showCard)} activeOpacity={1}>
                            <TouchableWithoutFeedback>
                                <View style={styles.pvpCard}>
                                    <Text style={styles.pvpCardTitle}>Desafiar Jogadores</Text>

                                    {
                                        !createdRoomNumber && (
                                            <View style={styles.pvpCardContent}>
                                                <Text style={styles.normalText}>Digite o código da sala</Text>
                                                <TextInput
                                                    style={styles.codeInput}
                                                    value={roomNumber}
                                                    onChangeText={setRoomNumber}
                                                    placeholder="Código"
                                                />

                                                <Text style={styles.errorText}>{error}</Text>
                                                <View style={styles.buttonsGroup}>
                                                    <ButtonComponent onPress={acceptChallenge}>
                                                        <Text style={styles.textButton}>Entrar</Text>
                                                    </ButtonComponent>
                                                </View>

                                                <View style={styles.separator}></View>
                                                <Text style={styles.normalText}>OU</Text>
                                
                                                <View style={styles.buttonsGroup}>
                                                    <ButtonComponent onPress={createRoom}>
                                                        <Text style={styles.textButton}>Criar uma sala</Text>
                                                    </ButtonComponent>
                                                    <ButtonComponent onPress={() => navigation.navigate('PvPExercise')}>
                                                        <Text style={styles.textButton}>Encontrar uma partida</Text>
                                                    </ButtonComponent>
                                                </View>
                                            </View>
                                        )
                                    }

                                    {
                                        (createdRoomNumber && createdRoomNumber !== "") ? (
                                            <>
                                                <Text style={styles.normalText}>Código da sala</Text>
                                                <Text style={styles.textCode}>{createdRoomNumber}</Text>

                                                <View style={styles.buttonsGroup}>
                                                    <ButtonComponent onPress={copyCodeToClipboard}>
                                                        <Text style={styles.textButton}>Copiar código</Text>
                                                    </ButtonComponent>
                                                    <ButtonComponent onPress={returnToCode}>
                                                        <Text style={styles.textButton}>Voltar</Text>
                                                    </ButtonComponent>
                                                </View>
                                            </>
                                        ) : null
                                    }
                                    
                                </View>
                            </TouchableWithoutFeedback>
                        </TouchableOpacity>
                   </Modal>
                ) 
            }
        </>
    )
}

const styles = StyleSheet.create({
    pvpCardBackground: {
        width: widthScreen,
        height: heightScreen,
        backgroundColor: 'rgba(0, 0, 0, .5)',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    },

    pvpCard: {
        backgroundColor: Colors.WHITE_SAFE_COLOR,
        padding: 20,
        borderRadius: 5,
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    pvpCardTitle: {
        fontSize: 28,
        color: Colors.PRIMARY_COLOR
    },

    pvpCardContent: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },

    codeInput: {
        width: '100%',
        height: 35,
        borderWidth: 1,
        borderColor: Colors.PRIMARY_COLOR,
        borderRadius: 50,
        textAlign: 'center',
        marginTop: 25,
        backgroundColor: Colors.TEXT_INPUT_BACKGROUND,
        color: Colors.TEXT_COLOR
    },

    separator: {
        marginTop: 10,
        marginBottom: 5,
        borderWidth: .2,
        borderColor: Colors.LIGHT_GRAY,
        width: '100%'
    },

    buttonsGroup: {
        marginTop: 5,
        width: '100%'
    },

    textButton: {
        color: Colors.WHITE_SAFE_COLOR
    },

    normalText: {
        fontSize: 18,
        color: Colors.TEXT_COLOR
    },

    codeGeneratedContent: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },

    textCode: {
        fontSize: 42,
        color: Colors.PRIMARY_COLOR
    },

    errorText: {
        color: Colors.ERROR_COLOR,
        textAlign: 'center'
    }
})
