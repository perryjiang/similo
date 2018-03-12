import React, { Component } from 'react';
import { View, Button } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import { selectPhotoFromGallery, takePhotoWithCamera } from '../lib';

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Similo',
  };

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Take Photo"
          onPress={takePhotoWithCamera.bind(this)}
        />
        <Button
          title="Upload Photo"
          onPress={selectPhotoFromGallery.bind(this)}
        />
        <Button
          title="Saved Items"
          onPress={() => this.props.navigation.navigate('SavedItems')}
        />
        <Button
          title="History"
          onPress={() => this.props.navigation.navigate('History')}
        />
        <Button
          title="Settings"
          onPress={() => this.props.navigation.navigate('Settings')}
        />
      </View>
    );
  }
}
