import React from "react";
import { Text, View, StyleSheet, ScrollView, Button, Image} from 'react-native';
import SlangConvaTrigger, {
  SlangRetailAssistant
} from '@slanglabs/slang-conva-react-native-retail-assistant';
class Main extends React.Component {

  state = {
    intentResponse: "",
  };

  componentDidMount() {
    console.log('Initialising Slang Retail assistant');
    try {
      SlangRetailAssistant.initialize({
        requestedLocales: ['en-IN', 'hi-IN'],
        assistantId: '<AssistantId>',
        apiKey: '<APIKey>'
      });
      SlangRetailAssistant.setAction({
        onSearch: (searchInfo, searchUserJourney) => {
          this.setState({
            intentResponse: "User Journey : Search\n\nAssociated Data :\n" + JSON.stringify(searchInfo, null, '\t'),
            searchUserJourneyObj: searchUserJourney
          })
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <ScrollView vertical={true}>
        <View style={styles.viewStyle1}>
          <Text style={styles.headerText}> Welcome to Slang Retail Assistant Demo!!!</Text>
          <Text style={styles.subTitleText}>User Journey and Associated Data :</Text>
          <View style={styles.viewStyle3}>
            <ScrollView vertical={true}>
              <Text style={styles.intentResponseText}>{this.state.intentResponse}</Text>
            </ScrollView>
          </View>
          <View style={styles.buttonStyle}>
            <Button
              title="Simulate Text Search"
              onPress={() => {
                SlangRetailAssistant.notifyTextSearch("<ItemName>");
              }}>
            </Button>
          </View>
          <View style={styles.buttonStyle}>
            <Button
              title="Simulate CTR Event"
              onPress={() => {
                var eventInfo = {
                  eventName: "<EventName>",
                  itemName: "<ItemName>",
                  itemQuantity: "<ItemQuantity>"
                }
                SlangRetailAssistant.notifyCTREvent(eventInfo);
              }}>
            </Button>
          </View>
          <SlangConvaTrigger   
            style={styles.triggerStyle}
        />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle1: {
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
    justifyContent: 'space-between',
    marginBottom: 16,
    flexDirection: "column",
  },
  viewStyle3: {
    marginTop: 16,
    justifyContent: 'space-between',
    marginBottom: 16,
    backgroundColor: '#000000',
    flexDirection: "column",
    minHeight: 200
  },
  buttonStyle: {
    height: 50,
    marginRight: 8,
    marginTop: 8,
    minWidth: 70,
    alignSelf: 'flex-start',
    justifyContent: "center"
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: "center",
    padding: 16,
    marginEnd: 16
  },
  subTitleText: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: "left",
    marginTop: 16
  },
  intentResponseText: {
    padding: 16,
    fontSize: 16,
    textAlign: "left",
    fontFamily: 'monospace',
    color: 'white'
  },
  triggerStyle: {
    width: 50,
    height: 50,
    alignSelf: "center"
  }
});


export default Main;