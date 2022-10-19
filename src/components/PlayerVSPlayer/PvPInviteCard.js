import { useContext, useEffect, useState } from "react";
import { Dimensions, Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Colors from "../../utils/ColorPallete/Colors";
import ButtonComponent from '../Buttons/ButtonComponent';
import { SocketContext } from '../../utils/Socket/socket';
import PvPEnterRoom from "./PvPEnterRoom";
import PvPCreateRoom from "./PvPCreateRoomComponent";
import CardComponent from "../Card/CardComponent";

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
            socket.off('roomNotExists');
        }
    }, [user, roomNumber, error]);

    async function createRoom() {
        socket.emit('play', user.userID);
    }

    async function acceptChallenge() {
        setError("");
        socket.emit('acceptChallenge', roomNumber, user.userID);
    }

    return (
        <>
            {
                showCard && (
                    <CardComponent showCard={showCard} setShowCard={setShowCard}>
                        <Text style={styles.pvpCardTitle}>Desafiar Jogadores</Text>
                        {
                            !createdRoomNumber && (
                                <View style={styles.pvpCardContent}>
                                    <PvPEnterRoom 
                                        acceptChallenge={acceptChallenge} 
                                        roomNumber={roomNumber} 
                                        setRoomNumber={setRoomNumber} 
                                        error={error} 
                                    />

                                    <View style={styles.separator}></View>
                                    <Text style={styles.normalText}>OU</Text>
                    
                                    <View style={styles.buttonsGroup}>
                                        <ButtonComponent onPress={createRoom}>
                                            <Text style={styles.textButton}>Criar uma sala</Text>
                                        </ButtonComponent>
                                    </View>
                                </View>
                            )
                        }

                        {
                            (createdRoomNumber && createdRoomNumber !== "") ? (
                                <PvPCreateRoom 
                                    createdRoomNumber={createdRoomNumber}
                                    setCreatedRoomNumber={setCreatedRoomNumber}
                                />
                            ) : null
                        }
                    </CardComponent>
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
    }
})
