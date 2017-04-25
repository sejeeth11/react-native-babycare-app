import React, { Component } from 'react';
import {
  View,
  StatusBar,
  StyleSheet
} from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  addChild,
  showAddChild,
  changeGender,
  changeName,
  changeChildImage
} from './actions';
import AddChildModal from './components/AddChildModal/AddChildModal';
import DosesListView from './components/DosesListView/DosesListView';
import InfoBar from './components/InfoBar/InfoBar';

class App extends Component {
  render() {
    console.log('App render with props: ' + JSON.stringify(this.props));
    const currentBabyRecord = this.props.babyRecords[this.props.currentBabyRecordId];

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <AddChildModal visible={this.props.addChildModal.visible}
          gender={this.props.addChildModal.gender}
          name={this.props.addChildModal.name}
          changeGender={this.props.changeGender}
          changeName={this.props.changeName}
          addChild={this.props.addChild}
          />
        <InfoBar babyRecord={currentBabyRecord} changeImage={this.props.changeChildImage} />
        <DosesListView />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

const mapStateToProps = (state) => {
  console.log('stateToProps: ' + JSON.stringify(state));
  return {
    currentBabyRecordId: state.babycare.currentBabyRecordId,
    babyRecords: state.babycare.babyRecords,
    addChildModal: state.babycare.addChildModal
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addChild,
    showAddChild,
    changeGender,
    changeName,
    changeChildImage
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
