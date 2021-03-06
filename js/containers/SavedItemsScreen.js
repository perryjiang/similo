import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Image,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Button,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { API_SAVED_ITEMS } from '../config/constants';
import { colors } from '../config/styles';

const { SIMILO_BLUE } = colors;

export default class SavedItemsScreen extends Component {
  static navigationOptions = {
    'title': 'Saved Items',
  };

  constructor(props) {
    super(props);

    this.state = {
      data: []
    }
    this.selectItem = this.selectItem.bind(this);
    this._export = this._export.bind(this);
    this.getSavedItems = this.getSavedItems.bind(this);

    this.props.navigation.setParams({ selectItem: this.selectItem });
  }

  componentDidMount() {
    this.getSavedItems();
  }

  getSavedItems() {
    AsyncStorage.getItem('userToken')
      .then(userToken => {
        fetch(API_SAVED_ITEMS, { headers: { 'Authorization': userToken }})
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          this.setState({
            data: data.items,
          });
        })
        .catch(e => console.error(e));
      })
  }

  selectItem(item) {
    var picture = item['image_url'];
    if (!picture) {
      picture = 'http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg'
    }
    this.props.navigation.navigate('Product', {
      name: item['title'],
      price: item['price'],
      url: item['product_url'],
      picture: picture,
      item_id: item['item_id'],
      saved: true,
      navigateFromSavedItems: true,
      refresh: () => this.getSavedItems(),
    });
  }

  _export(data) {
    // TODO
    // this.props.navigation.navigate('Export', {
    //   exports: data,
    // });
  }

  _keyExtractor = (item, index) => item.product_url;

  _renderItem = ({item}) => {
    var pnum = item['price'].toString();
    var dollar = pnum.substring(0, pnum.length - 2);
    var cents = pnum.substring(pnum.length-2, pnum.length);
    var price = "$";
    if (pnum.length === 1) {
      price = price + dollar;
    }
    else {
      price = price  + dollar + "." + cents;
    }
    var picture = item['image_url'];
    if (!picture) {
      picture = 'http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg'
    }
    return (
      <TouchableOpacity onPress={() => this.selectItem(item)}>
        <View style={{borderBottomWidth: 1, borderBottomColor: 'grey', width: '100%'}}>
          <Image
            style={styles.logo}
            source={{ uri: picture }}
            resizeMode="center"
          />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <Text
              style={{
                textAlign: 'center',
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {' '}{item.title}{' '}
            </Text>
          </View>
          <Text style={{ textAlign: 'center', marginBottom: 10 }}>
            {' '}{price === '$' ? 'Price not available' : price}{' '}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const data = this.state.data;
    if (data.length) {
      return (
        <View style={styles.container}>
          <FlatList
            horizontal={false}
            data={data}
            numColumns={2}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            style={{width: '100%'}}
          />
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <Text> No Saved Items </Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  logo: {
    height: 220,
    width: 160,
    margin: 10,
    alignSelf: 'center',
  },
    touchableMenuItem: {
    width: '80%',
    marginBottom: 30,
  },
  menuText: {
    fontSize: 24,
    color: '#FFFFFF',
  }
});
