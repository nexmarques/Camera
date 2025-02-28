import React, { useState } from "react";
import { Text, StyleSheet, SafeAreaView, View, TouchableOpacity, Image } from "react-native";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function App() {

  const [photo, setPhoto] = useState(null) 

  function openAlbum(){
    const options = {
      mediaType: "photo",
      quality: 1,
      selectionLimit: 1
    }
    launchImageLibrary(options, (response) =>{
      if(response.didCancel){
        console.log("Cancelled");
        return;
      }
      if(response.error){
        console.log("Error: ", response.errorMessage);
        return;
      }
      console.log("Response: ", response.assets);
      setPhoto(response.assets[0].uri)
    })
  }

  async function openCamera(){
    const options = {
      mediaType: "photo",
      quality: 1,   
      saveToPhotos: true   
    }
    const response = await launchCamera(options)
    setPhoto(response.assets[0].uri)
    
  }
  
  return (
    <SafeAreaView style={styles.container} >
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={openAlbum} >
          <Text style={styles.buttonText} >Abrir Álbum</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={openCamera} >
          <Text style={styles.buttonText} >Abrir Camera</Text>
        </TouchableOpacity>      
      </View>

      { photo !== null &&(
        <Image 
        source={{uri: photo}}
        style={styles.image}
      />
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    alignItems: "center",  
    justifyContent: 'center',  
  },
  buttons:{
    flexDirection: 'row',   
    gap: 14,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#121212',
    padding: 4,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 4,    
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image:{
    width: '90%',
    height: 300,
    objectFit: 'cover'
  }
});