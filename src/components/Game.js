import React from 'react';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber';
import {
    View,
    StyleSheet, 
    Text,
} from 'react-native';

class Game extends React.Component {
    static propTypes = {
        randomNumberCount: PropTypes.number.isRequired,
        initialSeconds: PropTypes.number.isRequired,
    };
    state = {
        selectedIds: [],
        remainingSeconds: this.props.initialSeconds,
    };
    randomNumbers = Array
        .from({length: this.props.randomNumberCount})
        .map(() => 1 + Math.floor(10 * Math.random()));
    target = this.randomNumbers
        .slice(0, this.props.randomNumberCount - 2)
        .reduce((acc, curr) => acc + curr, 0);

    componentDidMount(){
        this.intervalId = setInterval(() => {
            this.setState(prevState => {
                return {remainingSeconds: prevState.remainingSeconds - 1};
            }, () => {
                if(this.state.remainingSeconds === 0){
                    clearInterval(this.intervalId);
                }
            });
        }, 1000);
    };

    componentWillUnmount(){
        clearInterval(this.intervalId);
    }

    isNumberSelected = numberIndex => {
        return this.state.selectedIds.indexOf(numberIndex) >= 0;
    };

    selectNumber = numberIndex => {
        this.setState(prevState => ({
            selectedIds: [...prevState.selectedIds, numberIndex]}
        ))
    }

    gameStatus = () => {
        const sumSelected = this.state.selectedIds.reduce((acc, curr) => {
            return acc + this.randomNumbers[curr];
        }, 0);
        if(this.state.remainingSeconds === 0){
            return 'LOST';
        }else if(sumSelected < this.target){
            return 'PLAYING';
        } else if(sumSelected === this.target){
            return 'WON';
        } else {
            return 'LOST';
        }
    }


    render(){
        const gameStatus = this.gameStatus();
        return(
            <View style={styles.container}>
                <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>{this.target}</Text>
                <View style={styles.randomContainer}>
                    {this.randomNumbers.map((randomNumber, index) => 
                    <RandomNumber
                    key={index}
                    id={index}
                    number={randomNumber}
                    isDisabled={this.isNumberSelected(index) || gameStatus !== 'PLAYING'}
                    onPress={this.selectNumber}
                    />
                    )}
                </View>
                <Text>{this.state.remainingSeconds}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ddd',
        flex: 1,
    },
    target: {
        fontSize: 50,
        backgroundColor: '#bbb',
        marginHorizontal: 40,
        textAlign: 'center',
        marginBottom: 30,
    },
    randomContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    STATUS_PLAYING: {
        backgroundColor: '#bbb'
    },
    STATUS_WON: {
        backgroundColor: 'green'
    },
    STATUS_LOST: {
        backgroundColor: 'red'
    },
})

export default Game;