import React, { Component } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { AudioContext } from "../context/AudioProvider";
import { RecyclerListView, LayoutProvider } from "recyclerlistview";

export class AudioList extends Component {
    static contextType = AudioContext;
    layoutProvider = new LayoutProvider((i) => 'audio', (type, dim) => {
        switch(type) {
            case 'audio':
                dim.width = Dimensions.get('window').width;
                dim.height = 70;
                break;
            default:
                dim.width = 0;
                dim.height = 0;
        }
    })
    rowRenderer = (type, item) => {
        return <Text>{item.filename}</Text>
    }
    render() {
        // return (
        //      <ScrollView>
        //         {this.context.audioFiles.map(item => <Text key={item.id}>{item.filename}</Text>)}
        //          <Text>list nhac</Text>
        //      </ScrollView>
        //  ) 
        return <AudioContext.Consumer>
            {({dataProvider}) => {
                return <View style={{flex: 1}}>
                            <RecyclerListView 
                            dataProvider={dataProvider} 
                            layoutProvider={this.layoutProvider} 
                            rowRenderer={this.rowRenderer}
                        ></RecyclerListView>
                    </View>
            }}
        </AudioContext.Consumer>
    }
}
// const AudioList = () => {
//     return (
//         <View>
//             <Text>list nhac</Text>
//         </View>
//     )
// }

export default AudioList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})