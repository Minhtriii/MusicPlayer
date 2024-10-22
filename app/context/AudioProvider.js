import React, {Component, createContext} from "react";
import { Text, View, Alert   } from "react-native";
import * as MediaLibrary from  'expo-media-library';
import {DataProvider} from 'recyclerlistview';

export const AudioContext = createContext();

export class AudioProvider extends Component {
    constructor(props){
        super(props)
        this.state = {
            audioFiles : [],
            permissionError: false,
            dataProvider: new DataProvider((r1, r2) => r1 !== r2)
        }
    }

    getAudioFiles = async () => {
        const {dataProvider, audioFiles} = this.state
        let media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio',
        })
        media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio',
            first: media.totalCount,
        })
        //console.log(media)
        this.setState({...this.state, dataProvider: dataProvider.cloneWithRows([...audioFiles, ...media.assets]), audioFiles: [...audioFiles, ...media.assets]})
    }

    permissionAlert = () => {
        Alert.alert("Yêu cầu quyền truy cập", "Ứng dụng cần đọc file âm thanh!", [{
            text: 'I am ready',
            onPress: () => this.getPermission()
        },{
            text: 'cancel',
            onPress: () => this.permissionAlert()
        }])
    }

    getPermission = async () => {
        // {
        //     "canAskAgain" : true,
        //     "expires": "never",
        //     "granted": false,
        //     "status": "undetermined",
        // }
        const permission = await MediaLibrary.getPermissionsAsync()
        console.log(permission)
        if(permission.granted){
            // lay tat ca audio file
            this.getAudioFiles()
        }

        if(!permission.canAskAgain && !permission.granted){
            this.setState({...this.state, permissionError: true})
        }

        if(!permission.granted && permission.canAskAgain){
            const {status, canAskAgain} = await MediaLibrary.requestPermissionsAsync()

            if(status === 'denied' && canAskAgain){
                // hien len nguoi dung phai cho phep quyen truy cap
                this.permissionAlert()
            }

            if(status === 'granted'){
                // lay tat ca audio file
                this.getAudioFiles()
            }

            if(status === 'denied' && !canAskAgain){
                // hien len nguoi dung phai cho phep quyen truy cap
                this.setState({...this.state, permissionError: true})
            }
        }
    }

    componentDidMount(){
        this.getPermission()
    }

    render() {
        const {audioFiles, dataProvider, permissionError} = this.state;
        if(permissionError) 
            return
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{fontSize: 25, textAlign: 'center', color: 'red'}}>Hình như bạn chưa cho phép quyền truy cập</Text>
                </View>
        return (
            <AudioContext.Provider value={{audioFiles, dataProvider}}>
                {this.props.children}
            </AudioContext.Provider>
        )
    }
}

export default AudioProvider