import React, { Component } from 'react';
import {
  Modal,
  TextInput,
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './AddChildModalStyleSheet'
import { changeGender, changeName } from '../../actions';

export default class AddChildModal extends Component {
  constructor() {
    super();
    this.state = {
      gender: undefined,
      name: '',
      nameInputFocused: false
    }
  }
  nameInputColor() {
    return this.props.name && this.props.name.length > 0 ?
      styles.nameInputBlackStyle :
      styles.nameInputGreyStyle;
  }
  handleGenderButton(gender) {
    console.log(gender + ' button pressed');
  }
  renderGenderButton(gender, backgroundColor, buttonTextColor) {
    const fontAwesomeName = gender === 'female' ? 'venus' : 'mars';

    return (
      <Icon.Button
        name={fontAwesomeName}
        backgroundColor={backgroundColor}
        onPress={() => this.props.changeGender(gender)}
      >
        <Text style={{color: buttonTextColor}}>{gender}</Text>
      </Icon.Button>
    );
  }
  renderGenderButtons() {
    const { gender } = this.props;

    const isGirl = gender === 'female';
    const isBoy = gender === 'male';

    const renderedGirlButton = this.renderGenderButton(
      'female',
      isGirl ? '#dd4792' : '#ffDFFC',
      isGirl ? '#FFFFFF' : '#000000'
    );
    const renderedBoyButton = this.renderGenderButton(
      'male',
      isBoy ? '#0000CC' : '#BBBBFF',
      isBoy ? '#FFFFFF' : '#000000'
    );

    return (
      <View style={styles.genderButtonsContainerStyle}>
        <View>
          <View style={{flexDirection: 'row'}}>
            { renderedGirlButton }
            <Text style={{marginHorizontal: 5}}> </Text>
            { renderedBoyButton }
          </View>
        </View>
      </View>
    );
  }
  renderNames() {
    const nameLabel = 'Name:';
    return (
      <View style={styles.nameContainer}>
        <Text>{nameLabel}</Text>
        <TextInput
          placeholder={'Type child\'s name'}
          placeholderTextColor={'#AAAAAA'}
          value={this.props.name}
          onChangeText={(text) => this.props.changeName(text)}
          style={styles.nameInput}
          clearButtonMode={'always'} />
      </View>
    );
  }
  renderSubmitButton() {
    const { name, gender } = this.props;

    if (name === '' || gender === '') {
      return undefined;
    }
    return (
      <View style={{marginTop: 10, alignItems: 'center'}}>
        <Icon.Button
          name='heart'
          backgroundColor={'#AAFFAA'}
          style={{borderColor: '#55AA55'}}
          onPress={() => this.props.addChild({ name, gender })}
        >
          <Text style={{color: '#000000'}}>Add Child</Text>
        </Icon.Button>
      </View>
    );
  }
  render() {
    const renderedGenderButtons = this.renderGenderButtons();
    const renderedNameWidget = this.renderNames();
    const renderedSubmitButton = this.renderSubmitButton();

    return (
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={this.props.visible}
        onRequestClose={() => {alert("Modal has been closed.")}} >
        {renderedGenderButtons}
        {renderedNameWidget}
        {renderedSubmitButton}
      </Modal>
    );
  }
}

AddChildModal.propTypes = {
  gender: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  changeGender: React.PropTypes.func.isRequired,
  changeName: React.PropTypes.func.isRequired,
  addChild: React.PropTypes.func.isRequired
}
