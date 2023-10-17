import React, { useEffect, useState } from 'react';
import { View, Button, Text, SafeAreaView } from 'react-native';
import 'react-native-get-random-values';
import { WebView } from 'react-native-webview';

// In a React Native application
import Parse from 'parse/react-native.js';
import AsyncStorage from '@react-native-async-storage/async-storage';


//Initializing the SDK
Parse.setAsyncStorage(AsyncStorage);
//Paste below the Back4App Application ID AND the JavaScript KEY
Parse.initialize('tJWIBpvw7MYJar4RS1SV628SlWXxcUZRATM9mLdF', 'wRkRUmbP5KU32AGBpZa2vFB5RMQFBteo4VgTMBxt');
//Point to Back4App Parse API address
Parse.serverURL = 'https://parseapi.back4app.com/';

const App = () => {
  const [person, setPerson] = useState(new Parse.Object('Person'));

  async function addPerson() {
    try {
      //create a new Parse Object instance
      const newPerson = new Parse.Object('Person');
      //define the attributes you want for your Object
      newPerson.set('name', 'Nhat');
      newPerson.set('email', 'tranhungnhat@luvina.net');
      newPerson.set('note', 'Testing');
      //save it on Back4App Data Store
      await newPerson.save();
    } catch (error) {
      console.log('Error saving new person: ', error);
    }
  }

  async function fetchPerson() {
    //create your Parse Query using the Person Class you've created
    let query = new Parse.Query('Person');
    //run the query to retrieve all objects on Person class, optionally you can add your filters
    let queryResult = await query.find();
    //the result is an arry of objects. Pick the first result 
    const currentPerson = queryResult[6];
    //access the Parse Object attributes
    console.log('person id: ', currentPerson.get('objectId'));
    console.log('person name: ', currentPerson.get('name'));
    console.log('person email: ', currentPerson.get('email'));
    console.log('person notes: ', currentPerson.get('note'));
    setPerson(currentPerson);
  }

  useEffect(() => {
    fetchPerson()
  }, []);

  return (
    <SafeAreaView>
      <View>
        <Text>Name: {person.get('name')}</Text>
        <Text>Email: {person.get('email')}</Text>
        <Text>Note: {person.get('note')}</Text>
        <Button title='Add person' onPress={addPerson} />
        <Button title='Fetch person' onPress={fetchPerson} />
        {/* Your other components here ....*/}
      </View>
    </SafeAreaView>
  )
}

export default App;
