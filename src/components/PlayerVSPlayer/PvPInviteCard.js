import { useContext, useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Colors from "../../utils/ColorPallete/Colors";
import ButtonComponent from '../Buttons/ButtonComponent';
import { SocketContext } from '../../utils/Socket/socket';
import PvPEnterRoom from "./PvPEnterRoom";
import PvPCreateRoom from "./PvPCreateRoomComponent";
import CardComponent from "../Card/CardComponent";
import { Picker } from "@react-native-picker/picker";
import Axios from '../../api/api';
import { set } from "react-native-reanimated";
import Messages from "../../utils/Messages";

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

export default function PvPInviteCard({ showCard, setShowCard, navigation, user, currentTechnology }) {
    const socket = useContext(SocketContext);
    const [allTechnologies, setAllTechnologies] = useState([]);
    const [roomNumber, setRoomNumber] = useState("");
    const [selectTechnology, setSelectTechnology] = useState(false);
    const [selectedTechnologyID, setSelectedTechnologyID] = useState({});
    const [createdRoomNumber, setCreatedRoomNumber] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        async function getData() {
            try {
                let resultTechs = await Axios.get('/ListAllTechnologiesWithExercise');

                if(resultTechs.data.technologies) {
                    setAllTechnologies(resultTechs.data.technologies);
                }

                setSelectedTechnologyID(currentTechnology.technology.technologyID);
            } catch(e) {
                setError(e.response.data.message);
            }
        }

        getData();
    }, []);

    useEffect(() => {
        socket.on('roomNumber', (roomNumber) => {
            setCreatedRoomNumber(roomNumber);
        });

        socket.on('initChallenge', (roomNumber) => {
            let challengeRoomNumber = roomNumber;

            setCreatedRoomNumber("");
            setRoomNumber("");
            setSelectTechnology(0);
            navigation.navigate('PvPExercise', {
                roomNumber: challengeRoomNumber
            });
        });

        socket.on('roomNotExists', () => {
            setError(Messages.ROOM_NOT_FOUND);
        });

        return () => {
            socket.off('roomNumber');
            socket.off('initChallenge');
            socket.off('roomNotExists');
        }
    }, [user, roomNumber, error]);

    async function createRoom() {
        socket.emit('play', user.userID, selectedTechnologyID);
    }

    function selectTechnologyCard() {
        setSelectTechnology(!selectTechnology);
    }

    async function acceptChallenge() {
        setError("");
        socket.emit('acceptChallenge', roomNumber, user.userID, selectedTechnologyID);
    }

    return (
        <>
            {
                showCard && (
                    <CardComponent showCard={showCard} setShowCard={setShowCard}>
                        <Text style={styles.pvpCardTitle}>Desafiar Jogadores</Text>
                        {
                            !createdRoomNumber && !selectTechnology ? (
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
                                        <ButtonComponent onPress={selectTechnologyCard}>
                                            <Text style={styles.textButton}>Criar uma sala</Text>
                                        </ButtonComponent>
                                    </View>
                                </View>
                            ) : null
                        }

                        {
                            !createdRoomNumber && selectTechnology && allTechnologies.length > 0 ? (
                                <View>
                                    <Picker
                                        selectedValue={selectedTechnologyID}
                                        onValueChange={(itemValue) => setSelectedTechnologyID(itemValue)}
                                    >
                                        {
                                            allTechnologies.map((technology) => (
                                                <Picker.Item key={technology.technologyID} value={technology.technologyID} label={technology.name} />
                                            ))
                                        }
                                    </Picker>
                    
                                    <View style={styles.buttonsGroup}>
                                        <ButtonComponent onPress={createRoom}>
                                            <Text style={styles.textButton}>Criar sala</Text>
                                        </ButtonComponent>
                                        <ButtonComponent onPress={() => setSelectTechnology(null)}>
                                            <Text style={styles.textButton}>Voltar</Text>
                                        </ButtonComponent>
                                    </View>
                                </View>
                            ) : null
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
        color: Colors.TEXT_COLOR,
        textAlign: 'center'
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
