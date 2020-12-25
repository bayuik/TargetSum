import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

class RandomNumber extends React.Component{
    static propsTpes = {
        number: PropTypes.number.isRequired,
    };

    handlePress = () => {
        console.log(this.props.number)
    }
    render(){
        return(
            <TouchableOpacity onPress={this.handlePress}>
                <Text style={styles.random}>{this.props.number}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    random: {
        backgroundColor: '#999',
        width: 100,
        marginHorizontal: 25,
        marginVertical: 15,
        fontSize: 35,
        textAlign: 'center'
    }
});

export default RandomNumber;