import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  Container,
  Content,
  Left,
  Right,
  Text,
  List,
  ListItem,
  Card,
  View,
  Body,
} from 'native-base';
import {WebView} from 'react-native-webview';

export default class AnatomyExample extends Component {
  state = {
    lottery_det: [],
    link: '',
  };

  componentDidMount() {
    this.getLotteryDet();
  }

  getLotteryDet = () => {
    fetch('https://manal.ml/get_lottery.php')
      .then(response => response.json())
      .then(jsonRes => {
        this.setState({lottery_det: jsonRes});
        console.log(jsonRes);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  showLotteries = () => {
    return this.state.lottery_det.map((item, key) => (
      <ListItem avatar>
        <Left>
          <Text>{item.No}</Text>
        </Left>
        <Body>
          <Text>{item.lottery_name}</Text>
        </Body>
        <Right>
          <TouchableOpacity
            onPress={() => this.setState({link: item.lottery_link})}>
            <Text style={styles.link}>View</Text>
          </TouchableOpacity>
        </Right>
      </ListItem>
    ));
  };

  viewLottery = link => {
    return (
      <View>
        <Text>{link}</Text>
      </View>
    );
  };

  render() {
    if (this.state.link) {
      return <WebView source={{uri: this.state.link}} />;
    } else {
      return (
        <Container>
          <Content>
            <View style={styles.container}>
              <Card style={styles.card_container}>
                <List>
                  <ListItem avatar>
                    <Left>
                      <Text>No</Text>
                    </Left>
                    <Body>
                      <Text>Lottery Name</Text>
                    </Body>
                    <Right>
                      <Text>View</Text>
                    </Right>
                  </ListItem>
                  {this.showLotteries()}
                </List>
              </Card>
            </View>
          </Content>
        </Container>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 50,
  },
  link: {
    color: '#589895',
    textAlign: 'right',
  },
});
