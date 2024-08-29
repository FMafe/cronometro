/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Alert,
} from 'react-native';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      textoStatus: 'Parado',
      textoBotao: 'Ligar',
      segundo:  0,
      idTimer: null,
      voltas: [],
    };
  }

  ligar = () => { 
    if(this.state.idTimer == null){
      this.setState({textoStatus: 'Ligado', textoBotao: 'Volta'});
      this.state.idTimer = setInterval(() => this.setState({segundo: this.state.segundo + 1}), 1000)
    } else {
      this.marcarVolta();
      this.setState({segundo: 0});
    }  
  }

  finalizar = () => {
    clearInterval(this.state.idTimer);
    this.setState({idTimer: null});
    this.setState({textoStatus: 'Parado', textoBotao: 'Ligar'});
    
    const numVoltas = this.state.voltas.length;
    let somaTempos = 0;
    let tempoMaisRapido = Infinity;
    this.state.voltas.forEach((tempo) => {
      somaTempos += tempo;
      if (tempo < tempoMaisRapido) {
        tempoMaisRapido = tempo;
      }
    });

    const mediaTempo = somaTempos / numVoltas;
    
    Alert.alert(
      'Corrida Finalizada',
      `Número de Voltas: ${numVoltas}\nMédia de Tempo: ${mediaTempo.toFixed(2)} s\nVolta mais Rápida: ${tempoMaisRapido} s`,
      [
        {text: 'OK', onPress: () => this.zerarApp()}
      ],
      { cancelable: false }
    );
  }

  zerarApp = () => {
    this.setState({
      textoStatus: 'Parado',
      textoBotao: 'Ligar',
      segundo: 0,
      voltas: [],
    });
  }

  marcarVolta = () => {
    this.setState({voltas: [...this.state.voltas, this.state.segundo], segundo: 0});
  }

  render() {
    return (
      <ScrollView contentContainerStyle={estilo.container}>
        <View style={{alignItems: 'center'}}>
          <Image
              source={require('./corredor.gif')}
              style={{ width: 90, height: 110, marginVertical: 55 }}
          />
          <Text style={{color:'black',fontSize: 40, margin: 40}}>{this.state.segundo} s</Text>
          <Text style={{color:'black',fontSize: 40, margin: 40}}>{this.state.textoStatus}</Text>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={estilo.botao} onPress={this.ligar} >
              <Text style={{color:'black',fontSize: 30, margin: 6}}>{this.state.textoBotao}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={estilo.botao} onPress={this.finalizar} >
              <Text style={{color:'black',fontSize: 30, margin: 6}}>Finalizar</Text>
            </TouchableOpacity>
          
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>  
            <Text style={{color:'black',fontSize: 20, margin: 15}}>Volta</Text>
            <Text style={{color:'black',fontSize: 20, margin: 15}}>Tempo</Text>
          </View>
          {this.state.voltas.map((volta, index) => (
            <View key={index} style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color:'black',fontSize: 20, margin: 15,}}>{index + 1}</Text>
              <Text style={{color:'black',fontSize: 20, margin: 17}}>{volta} s</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }
}

const estilo = StyleSheet.create({
  botao: {
    backgroundColor: 'lightblue',
    height: 50,
    borderRadius: 10,
    margin: 15,
  }
  
})