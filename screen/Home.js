import React, {useState, useEffect}  from "react";
import { View, Text, StyleSheet, Button, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";

export default function Home({navigation}) {
    const [feed,setFeed] = useState([]);
  
  //get album feed
  useEffect (() => {
    fetch('https://jsonplaceholder.typicode.com/albums')
    .then((re)=>re.json())
    .then((Response)=>{
        setFeed(Response);
        // console.log(Response);
    })
  }, []);


      return (
    <View style={styles.container}>
      <Text style={styles.Heading}>My Albums</Text>

      <View style={styles.mainPostView}>
        {feed.length < 1?
          <ActivityIndicator size={"large"} color={"#2FBBF0"}/>
          :
          <FlatList
              data={feed}
              // keyExtractor={item => item.id}
              keyExtractor={(item,index)=>{return item.id.toFixed()}}
              renderItem={({item,index})=>(
                <TouchableOpacity onPress={()=> navigation.navigate('Album', {id:item.id})}>
                  <View style={styles.postAlbums}>
                      <View style={styles.albumContainer}>
                          <View>
                            <Text style={styles.albumName}>Album Title : {item.title}</Text>
                          </View>
                      </View>
                  </View>
                  </TouchableOpacity>
  )}
          />

        }
         
        </View>
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

        