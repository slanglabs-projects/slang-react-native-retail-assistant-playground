import React, { useState } from "react";
import { Text, View, Alert, StyleSheet, ScrollView, Button, TouchableOpacity, Image, Modal, TouchableHighlight, Switch } from 'react-native';
import SlangRetailAssistant, {
  SearchUserJourney,
  OrderManagementUserJourney,
  NavigationUserJourney,
  AssistantUIPosition,
  AssistantUserJourney,
} from '@slanglabs/react-native-slang-retail-assistant';
class Main extends React.Component {

  state = {
    intentResponse: "",
    searchAppState: SearchUserJourney.AppState.UNINITIALIZED,
    orderMgmtAppState: OrderManagementUserJourney.AppState.UNINITIALIZED,
    navigationAppState: NavigationUserJourney.AppState.UNINITIALIZED,
    orderIndex: 0,
    searchUserJourneyObj: null,
    modalVisible: false,
    searchToggle: false,
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  toggleSwitch = () => {
    this.setState({ searchToggle: !this.state.searchToggle });
  };

  startConversation = () => {
    SlangRetailAssistant.startConversation(AssistantUserJourney.SEARCH);
  }

  renderOrderMgmtViews = () => {
    const views = [];
    views.push(<TouchableHighlight
      style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
      onPress={() => {
        this.setModalVisible(!this.state.modalVisible);
        orderUserJourney = SlangRetailAssistant.getActiveOrderManagementUserJourney();
        orderUserJourney.setViewSuccess();
        orderUserJourney.notifyAppState(this.state.orderMgmtAppState);
      }}>
      <Text style={styles.textStyle}>SUCCESS</Text>
    </TouchableHighlight>);
    views.push(<TouchableHighlight
      style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
      onPress={() => {
        this.setModalVisible(!this.state.modalVisible);
        orderUserJourney = SlangRetailAssistant.getActiveOrderManagementUserJourney();
        orderUserJourney.setViewFailure();
        orderUserJourney.notifyAppState(this.state.orderMgmtAppState);
      }}>
      <Text style={styles.textStyle}>FAILURE</Text>
    </TouchableHighlight>);
    views.push(<TouchableHighlight
      style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
      onPress={() => {
        this.setModalVisible(!this.state.modalVisible);
        orderUserJourney = SlangRetailAssistant.getActiveOrderManagementUserJourney();
        orderUserJourney.setViewOrderNotFound(this.state.orderIndex);
        orderUserJourney.notifyAppState(this.state.orderMgmtAppState);
      }}>
      <Text style={styles.textStyle}>ORDER_DOES_NOT_EXIST</Text>
    </TouchableHighlight>);
    views.push(<TouchableHighlight
      style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
      onPress={() => {
        this.setModalVisible(!this.state.modalVisible);
        orderUserJourney = SlangRetailAssistant.getActiveOrderManagementUserJourney();
        orderUserJourney.setCancelConfirmation();
        orderUserJourney.notifyAppState(this.state.orderMgmtAppState);
      }}>
      <Text style={styles.textStyle}>CANCEL_CONFIRMATION</Text>
    </TouchableHighlight>);
    views.push(<TouchableHighlight
      style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
      onPress={() => {
        this.setModalVisible(!this.state.modalVisible);
        orderUserJourney = SlangRetailAssistant.getActiveOrderManagementUserJourney();
        orderUserJourney.setCancelFailure();
        orderUserJourney.notifyAppState(this.state.orderMgmtAppState);
      }}>
      <Text style={styles.textStyle}>CANCEL_FAILURE</Text>
    </TouchableHighlight>);
    views.push(<TouchableHighlight
      style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
      onPress={() => {
        this.setModalVisible(!this.state.modalVisible);
        orderUserJourney = SlangRetailAssistant.getActiveOrderManagementUserJourney();
        orderUserJourney.setCancelOrderNotFound(this.state.orderIndex);
        orderUserJourney.notifyAppState(this.state.orderMgmtAppState);
      }}>
      <Text style={styles.textStyle}>CANCEL_ORDER_NOT_FOUND</Text>
    </TouchableHighlight>);
    views.push(<TouchableHighlight
      style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
      onPress={() => {
        this.setModalVisible(!this.state.modalVisible);
        orderUserJourney = SlangRetailAssistant.getActiveOrderManagementUserJourney();
        orderUserJourney.setCancelSuccess();
        orderUserJourney.notifyAppState(this.state.orderMgmtAppState);
      }}>
      <Text style={styles.textStyle}>CANCEL_SUCCESS</Text>
    </TouchableHighlight>);
    return views;
  }

  componentDidMount() {
    const searchAppStateAlert = (resolve, reject) =>
      Alert.alert(
        'Search App State',
        'Choose An AppState',
        [
          {
            text: 'UNSUPPORTED', onPress: () => {
              this.setState({ searchAppState: SearchUserJourney.AppState.UNSUPPORTED })
              resolve(this.state.searchAppState);
            }
          },

          {
            text: 'SEARCH_RESULTS', onPress: () => {
              this.setState({ searchAppState: SearchUserJourney.AppState.SEARCH_RESULTS })
              searchAppStateConditionAlert(resolve, reject);
            }
          },
        ],
        { cancelable: false },
      );

    const searchAppStateConditionAlert = (resolve, reject) =>
      Alert.alert(
        'Search App State Condition',
        'Choose An AppState Condition',
        [
          {
            text: 'SUCCESS', onPress: () => {
              if (this.state.searchUserJourneyObj != null) {

                //Set the appropriate app state condition on the user journey object
                this.state.searchUserJourneyObj.setSearchSuccess();
                if (this.state.searchToggle) {
                
                //Set the user journey to continue in any case you want to trigger an continous conversation
                  this.state.searchUserJourneyObj.setUserJourneyToContinue(AssistantUserJourney.SEARCH, true);
                }

                //Resolve the promise with the appropriate app state.
                resolve(this.state.searchAppState);
              }
            }
          },

          {
            text: 'FAILURE', onPress: () => {
              if (this.state.searchUserJourneyObj != null) {
                this.state.searchUserJourneyObj.setSearchFailure();
                if (this.state.searchToggle) {
                  this.state.searchUserJourneyObj.setUserJourneyToContinue(AssistantUserJourney.SEARCH, true);
                }
                resolve(this.state.searchAppState);
              }
            }
          },

          {
            text: 'ITEM_NOT_FOUND', onPress: () => {
              if (this.state.searchUserJourneyObj != null) {
                this.state.searchUserJourneyObj.setSearchItemNotFound();
                if (this.state.searchToggle) {
                  this.state.searchUserJourneyObj.setUserJourneyToContinue(AssistantUserJourney.SEARCH, true);
                }
                resolve(this.state.searchAppState);
              }
            }
          },

          {
            text: 'ITEM_OUT_OF_STOCK', onPress: () => {
              if (this.state.searchUserJourneyObj != null) {
                this.state.searchUserJourneyObj.setSearchItemOutOfStock();
                if (this.state.searchToggle) {
                  this.state.searchUserJourneyObj.setUserJourneyToContinue(AssistantUserJourney.SEARCH, true);
                }
                resolve(this.state.searchAppState);
              }
            }
          },

          {
            text: 'ITEM_NOT_SPECIFIED', onPress: () => {
              if (this.state.searchUserJourneyObj != null) {
                this.state.searchUserJourneyObj.setSearchItemNotSpecified();
                if (this.state.searchToggle) {
                  this.state.searchUserJourneyObj.setUserJourneyToContinue(AssistantUserJourney.SEARCH, true);
                }
                resolve(this.state.searchAppState);
              }
            }
          },
        ],
        { cancelable: false },
      );

    const orderMgmtAppStateAlert = () =>
      Alert.alert(
        'Order Mgmt App State',
        'Choose An AppState',
        [
          {
            text: 'UNSUPPORTED', onPress: () => {
              this.setState({ orderMgmtAppState: OrderManagementUserJourney.AppState.UNSUPPORTED })
              orderUserJourney = SlangRetailAssistant.getActiveOrderManagementUserJourney();
              orderUserJourney.notifyAppState(this.state.orderMgmtAppState);
            }
          },
          {
            text: 'VIEW_ORDER', onPress: () => {
              this.setState({ orderMgmtAppState: OrderManagementUserJourney.AppState.VIEW_ORDER })
              this.setModalVisible(true);
            }
          },
          {
            text: 'CANCEL_ORDER', onPress: () => {
              this.setState({ orderMgmtAppState: OrderManagementUserJourney.AppState.CANCEL_ORDER })
              this.setModalVisible(true);
            }
          },
        ],
        { cancelable: false },
      );

    const navigationAppStateAlert = () =>
      Alert.alert(
        'Navigation App State',
        'Choose An AppState',
        [
          {
            text: 'UNSUPPORTED', onPress: () => {
              this.setState({ navigationAppState: NavigationUserJourney.AppState.UNSUPPORTED })

              //Set the appropriate app state condition on the user journey object
              navigationUserJourney = SlangRetailAssistant.getActiveNavigationUserJourney();

              //Call notify on the user journey object with the appropriate app state.
              navigationUserJourney.notifyAppState(this.state.navigationAppState);

            }
          },

          {
            text: 'NAVIGATION', onPress: () => {
              this.setState({ navigationAppState: NavigationUserJourney.AppState.NAVIGATION })
              navigationAppStateConditionAlert();
            }
          },
        ],
        { cancelable: false },
      );

    const navigationAppStateConditionAlert = () =>
      Alert.alert(
        'Navigation App State Condition',
        'Choose An AppState Condition',
        [
          {
            text: 'SUCCESS', onPress: () => {
              navigationUserJourney = SlangRetailAssistant.getActiveNavigationUserJourney();

              //Set the appropriate app state condition on the user journey object
              navigationUserJourney.setNavigationSuccess();

              //Call notify on the user journey object with the appropriate app state.
              navigationUserJourney.notifyAppState(this.state.navigationAppState);
            }
          },

          {
            text: 'FAILURE', onPress: () => {
              navigationUserJourney = SlangRetailAssistant.getActiveNavigationUserJourney();
              navigationUserJourney.setNavigationFailure();
              navigationUserJourney.notifyAppState(this.state.navigationAppState);
            }
          },
        ],
        { cancelable: false },
      );

    const retailAssistantListener = {

      //Callback handler that gets called when the user triggers a search user journey
      onSearch: (searchInfo, searchUserJourney) => {
        this.setState({
          intentResponse: "User Journey : Search\n\nAssociated Data :\n" + JSON.stringify(searchInfo, null, '\t'),
          searchUserJourneyObj: searchUserJourney
        })

        //Can return a promise but make sure it resolves to a valid app state.
        var promiseResolve, promiseReject;
        var promise = new Promise(function (resolve, reject) {
          promiseResolve = resolve;
          promiseReject = reject;
        });
        searchAppStateAlert(promiseResolve, promiseReject);

        return promise;
      },

      //Callback handler that gets called when the user triggers a order management user journey
      onOrderManagement: (orderInfo, orderUserJourney) => {
        this.setState({
          intentResponse: "User Journey : OrderManagement\n\nAssociated Data :\n" + JSON.stringify(orderInfo, null, '\t'),
          orderIndex: orderInfo["orderIndex"],
        })
        orderMgmtAppStateAlert();

        //Can also return a waiting appState but make sure to notify the actual app state later.
        return OrderManagementUserJourney.AppState.WAITING;
      },

      //Callback handler that gets called when the user triggers a navigation user journey
      onNavigation: (navigationInfo, navigationUserJourney) => {
        SearchUserJourney.context.clear();
        this.setState({
          intentResponse: "User Journey : Navigation\n\nAssociated Data :\n" + JSON.stringify(navigationInfo, null, '\t'),
        })
        navigationAppStateAlert();

        //Can also return a waiting appState but make sure to notify the actual app state later.
        return NavigationUserJourney.AppState.WAITING;
      },

      onAssistantError: errorCode => {
        switch (errorCode) {
          case SlangRetailAssistant.ErrorCode.FATAL_ERROR:
            console.log('Slang Fatal Error!');
            break;
          case SlangRetailAssistant.ErrorCode.SYSTEM_ERROR:
            console.log('Slang System Error!');
            break;
          case SlangRetailAssistant.ErrorCode.ASSISTANT_DISABLED:
            console.log('Slang Assistant Disabled!');
            break;
          case SlangRetailAssistant.ErrorCode.MISSING_CREDENTIALS:
            console.log('Slang Missing Credentials!');
            break;
          case SlangRetailAssistant.ErrorCode.INVALID_CREDENTIALS:
            console.log('Slang Invalid Credentials!');
            break;
        }
      },
    };

    console.log('Initialising Slang Retail assistant');
    try {

      //Intialize slang retail Assistant
      SlangRetailAssistant.initialize({
        requestedLocales: ['en-IN', 'hi-IN'],
        assistantId: '', //Replace this with a valid AssistantId
        apiKey: '', //Replace this with a valid API key
        triggerPosition: {
          baseUIPosition: AssistantUIPosition.BaseUIPosition.BOTTOM_RIGHT,
          offsetY: -20,
          offsetX: -20,
          draggable: false,
          forcedAtStartup: true
        },
      });

      //Set slang retail assistant callback listener
      SlangRetailAssistant.setAction(retailAssistantListener);

      //Call showTrigger in order to make the trigger visible
      SlangRetailAssistant.ui.showTrigger()

    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <ScrollView vertical={true}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Select OrderManagement AppState Condition</Text>
              {this.renderOrderMgmtViews()}
            </View>
          </View>
        </Modal>
        <View style={styles.viewStyle1}>
          <Text style={styles.headerText}> Welcome to Slang Retail Assistant Demo!!!</Text>
          <View style={styles.viewStyle2}>
            <View style={styles.buttonStyle}>
              <Button
                color="green"
                onPress={() => SlangRetailAssistant.ui.show()}
                title="Show">
              </Button>
            </View>
            <View style={styles.buttonStyle}>
              <Button
                color="black"
                onPress={() =>
                  SlangRetailAssistant.ui.hide()}
                title="Hide">
              </Button>
            </View>
          </View>
          <View style={styles.buttonStyle}>
            <Button
              title="Simulate Item Search"
              onPress={() => {
                var retailItem = {
                  name: "something",
                  quantity: 2,
                }
                SlangRetailAssistant.notifyNonVoiceUserJourney(AssistantUserJourney.SEARCH, retailItem)
              }}>
            </Button>
          </View>
          <View style={styles.buttonStyle}>
            <Button
              title="Simulate Order Mgmt"
              onPress={() => {
                var orderInfo = {
                  name: "something",
                  type: "View"
                }
                SlangRetailAssistant.notifyNonVoiceUserJourney(AssistantUserJourney.ORDER_MANAGEMENT, orderInfo)
              }}>
            </Button>
          </View>
          <View style={styles.viewStyle2}>
            <Text style={styles.subTitleText}>Continue search Conversation</Text>
            <View style={styles.container}>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={this.state.searchToggle ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={this.toggleSwitch}
                value={this.state.searchToggle}
              />
            </View>
          </View>
          <Text style={styles.subTitleText}>User Journey and Associated Data :</Text>
          <View style={styles.viewStyle3}>
            <ScrollView vertical={true}>
              <Text style={styles.intentResponseText}>{this.state.intentResponse}</Text>
            </ScrollView>
          </View>
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
  viewStyle2: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center"
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
    marginTop: 16,
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
    width: 80,
    height: 80,
    alignSelf: "center"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    marginTop: 16,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  container: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    marginTop: 12
  }
});


export default Main;
