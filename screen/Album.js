import React, {useState,useEffect}  from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator,FlatList, Button, TouchableOpacity } from "react-native";

export default function Album({route, navigation}) {
    const [album, setAlbum] = useState([]);
  
    const { id } = route.params;
    
    console.log(id);

    //get album details feed
  useEffect (() => {
    fetch('https://jsonplaceholder.typicode.com/albums/'+ id + '/photos')
    .then((re)=>re.json())
    .then((Response)=>{
        setAlbum(Response);
        console.log(Response);
    })
  }, []);
    
    return (    
//         albumId
// : 
// 3
// id
// : 
// 101
// thumbnailUrl
// : 
// "https://via.placeholder.com/150/e743b"
// title
// : 
// "incidunt alias vel enim"
// url
// : 
// "https://via.placeholder.com/600/e743b"


    <View style={styles.mainPostView}>
            {album.length < 1?
            <ActivityIndicator size={"large"} color={"#2FBBF0"}/>
            :
            <FlatList
                data={album}
                keyExtractor={item => item.id}
                renderItem={({item,index})=>(
                    <TouchableOpacity onPress={()=> navigation.navigate('Album', {id:item.id})}>
                    <View style={styles.postAlbums}>
                        <View style={styles.albumContainer}>
                            <View>
                                <Text style={styles.albumName}>Title : {item.title}</Text>
                            </View>
                        </View>
                        <View style={styles.container}>
                            <Image
                                style={{width: 100, height: 100}}
                                source={{uri: item.thumbnailUrl}}
                            />
                        </View>
                    </View>
                    </TouchableOpacity>
    )}
            />

            }
            
            </View>

    );
}
 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
      },
      Heading : {
        fontSize: 32,
        marginTop: 60,
        marginLeft: 15,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      postAlbums : {
        // display: 'flex',
        alignItems: 'center',
        flex: 1,
        
      },
      albumContainer : {
        width: '80%',
        height: '100px',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(255, 165, 0)',
        marginBottom: 20,
      
      },
      albumName : {
        fontWeight: 'bold',
        flexDirection: 'row',
        padding: 15,
      }
  });