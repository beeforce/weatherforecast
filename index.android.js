/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    TextInput,
    Image,
    TouchableHighlight,
    Text, ScrollView,
    View, Switch

} from 'react-native';


export default class AwesomeProject extends Component {
    constructor() {
        super()
        this.state = {
            name: 'there',
            data: '',
            isCelciusOrNot: false

        };
    }

    _handleName(event) {
        console.log('It\'s works !')
        var name = event.nativeEvent.text
        var date = new Date().getTime() / 1000;
        var iconImg = 'http://openweathermap.org/img/w/'
        const appid = 'a508b9dcb118efa1955a29ee4b976cbd'
        fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + name + '&appid=' + appid)
            .then(
            (response) => response.json()
            )
            .then(
            (responseJSON) => {
                console.log(responseJSON)
                this.setState({ data: responseJSON })


            }
            )
            .catch((error) => {
                console.warn(error);
            });
    }
    _onPressIn(event) {
        this.setState({ pressing: true })
    }
    _onPressOut(event) {
        this.setState({ pressing: false })
    }
    isCelcius(value) {

        return (
        	
            <View>

             
                <Text>Min Tempurature: {this.state.data.list[j].temp_min}</Text>
                <Text>Max Temperature: {this.state.data.list[j].temp_max}</Text>

            </View>
        )
    }

    render() {
        var forecastDay = [];
        try {

            for (let i = 0; i < 5; i++) {
                let j = i * 8;
                forecastDay.push(
                    <View key={i}>
                        <View>
                            <Text style={styles.textstyle2}>{this.state.data.list[j].dt_txt}</Text>
                            <Image style={{ width: 50, height: 50 }} source={{ uri: 'http://openweathermap.org/img/w/' + this.state.data.list[j].weather[0].icon + '.png' }} />
                            <Text style={styles.textstyle1}>
                                Weather: {this.state.data.list[j].weather[0].main}
                            </Text>
                            <Text style={styles.textstyle}>
                                Description: {this.state.data.list[j].weather[0].description}
                            </Text>
                            <Text style={styles.textstyle}>
                                Max Temperature : {
                                    this.state.isCelciusOrNot ?
                                        parseFloat(this.state.data.list[j].main.temp_max - 273.15).toFixed(2) + ' °C' :
                                        parseFloat(((this.state.data.list[j].main.temp_max * 9) / 5) - 459.67).toFixed(2) + ' °F'}
                            </Text>
                            <Text style={styles.textstyle}>
                                Min Temperature : {
                                    this.state.isCelciusOrNot ?
                                        parseFloat(this.state.data.list[j].main.temp_min - 273.15).toFixed(2) + ' °C' :
                                        parseFloat(((this.state.data.list[j].main.temp_min * 9) / 5) - 459.67).toFixed(2) + ' °F'}
                            </Text>
                        </View>
                    </View>

                )
            }
        }
        catch (error) {

            forecastDay.push(

                <View key={0}>
                <Text style={styles.textstyle}>Nothing here !</Text>
                </View>)
        }

        return (
        	<Image
        source={require('./images.png')}
        style={styles.backgroundImage}>
            <ScrollView >
                <View style={styles.containerTop}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                        <Text style={styles.textstyle}>Please Input the place.</Text>
                            <TextInput
                                style={{ height: 40, width: 200 }}
                                onSubmitEditing={(text) => this._handleName(text)}
                            />
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>

                            <Text>°F</Text>
                            <Switch
                                onValueChange={(value) => this.setState({ isCelciusOrNot: value })}
                                style={{ marginBottom: 10 }} tintColor="#e6e6fa" onTintColor="#e6e6fa" thumbTintColor="#333333"
                                value={this.state.isCelciusOrNot} />
                            <Text>°C</Text>
                        </View>

                    </View>

                    <View>

                    </View>
                    <View>
                        <Text style={styles.textstyle3}>
                        {this.state.data == '' ? '' : this.state.data.city.name+', '+this.state.data.city.country}
                        </Text>
                    </View>
                    <View style={styles.weatherInfo}>

                        {forecastDay}


                    </View>
                </View>
            </ScrollView>
            </Image>

        );
    }
}

const styles = StyleSheet.create({
    containerTop: {
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 30,

        resizeMode: 'cover',

    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
    }, button: {
        width: 200,
        height: 200,
        borderRadius: 200,
        color: 'white'
    },
   		 weatherInfo: {
        flexDirection: 'column',
        marginTop: 20
    },
    backgroundImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor:'transparent',
    justifyContent: 'center',
    },
    textstyle:{
    	color: 'blue',
    	fontSize: 13
    },
    textstyle1:{
    	color: 'brown',
    	fontSize: 13
    },
    textstyle2:{
    	color: 'red',
    	fontSize: 13
    },
    textstyle3:{
    	color: 'black',
    	fontSize: 20
    }

});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
