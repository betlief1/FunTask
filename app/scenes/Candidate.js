import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity,AsyncStorage, FlatList } from 'react-native';
import { Actions } from "react-native-router-flux";
import * as con from '../config/config'
import * as uti from '../utils/Utils'

/*
  API usage :  https://playground-test-api.herokuapp.com/api/candidate/:id
*/

export default class Candidate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      name: null,
      candidatee: null
    };
  }

 
  _onPress() {
    
    Alert.alert(this.state.name);
  
  }

  componentDidMount(){
    uti.FetchData("https://playground-test-api.herokuapp.com/api/candidate/:id", this.props.token)
    .then(res => {
        console.log(res);
        this.setState({
          token : res,
          candidatee : res.candidate,
          name: res.candidate.candidateName
        });
    }).catch(error => {
      console.log(error);
    });
  }

  /*

      Postman kullanarak Api'ye get isteği yolladım aşağıdaki json sonucunu aldım.
      Parametre olarak FetchData metoduna this.props.token'i gönderdim.
      Fakat postman'de yaptığım isteği FetchData metodunda yapmaya çalıştığımda result olarak bana geri döndüremedim.
      Eğer FetchData metodundan resultu alsaydım ismi name olan state'e atıp ordan Text'e yazdırıcaktım.
      Ve aynı şekilde alert olarak onPress fonksiyonunda ismi gösterebilirdim.

      {
        "candidate": {
            "candidateName": "Berkay Dagli",
            "candidateId": "5c2f0f30d649e300176e34c9"
        },
        "result": "success"
      }
  */

  render() {
    const candidateToken = this.props.token;
    
    return (
      <View style={styles.container}>
        <Text styles={styles.welcome}>Welcome</Text>
        <Text styles={styles.welcome}>{this.state.name}</Text>

        <TouchableOpacity onPress={() => this._onPress()} style={styles.actionButton}>
          <Text style={styles.actionText}>Get My Informations</Text>
        </TouchableOpacity>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  actionButton: {
    borderWidth: 1,
    overflow: "hidden",
    marginTop: "3%",
    backgroundColor: "white",
    width: "80%", height: "6%",
    borderRadius: 20,
    borderColor: "#4286f4",
    marginBottom: 10
  },
  actionText: {
    marginTop: 3,
    textAlign: "center",
    alignContent: 'center',
    fontSize: 20,
    color: "#4286f4",
    backgroundColor: 'rgba(0,0,0,0)'
  }
});
