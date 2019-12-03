import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Image
} from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import {
  Header,
  Left,
  Body,
  Right,
  Button,
  Title,
  Text,
  Icon,
  List,
  ListItem
} from "native-base";
import Constants from "expo-constants";

class CustomHeader extends React.Component {
  render() {
    const { title, isHome } = this.props;
    return (
      <Header>
        {!isHome && (
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
        )}

        <Body>
          <Title>{title}</Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={isHome ? () => this.props.navigation.toggleDrawer() : null}
          >
            <Icon name="menu" />
          </Button>
        </Right>
      </Header>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.statusBar}>
        <CustomHeader
          title="Posts Details"
          navigation={this.props.navigation}
        />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={styles.text}>Details!</Text>
        </View>
      </SafeAreaView>
    );
  }
}

class DetailsSettingsScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.statusBar}>
        <CustomHeader
          title="Settings Details"
          navigation={this.props.navigation}
        />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={styles.text}>DetailsSettingsScreen!</Text>
        </View>
      </SafeAreaView>
    );
  }
}

class HomeScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.statusBar}>
        <CustomHeader
          title="Posts"
          isHome={true}
          navigation={this.props.navigation}
        />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Button onPress={() => this.props.navigation.navigate("Details")}>
            <Text style={styles.text}>Go to Details</Text>
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}

export class Login extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.statusBar}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Login Page</Text>
          <Button
            style={styles.marginTop}
            onPress={() => this.props.navigation.navigate("app")}
          >
            <Text style={styles.text}>Login</Text>
          </Button>
          <Button
            style={styles.marginTop}
            onPress={() => this.props.navigation.navigate("Register")}
          >
            <Text style={styles.text}>Register</Text>
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}

export class Register extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.statusBar}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Button onPress={() => this.props.navigation.goBack()}>
            <Text style={styles.text}>Sign Up and Back to Login</Text>
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.statusBar}>
        <CustomHeader
          title="Settings"
          isHome={true}
          navigation={this.props.navigation}
        />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Button onPress={() => this.props.navigation.navigate("Details")}>
            <Text style={styles.text}>Go to Private Setting</Text>
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}

class Profile extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.statusBar}>
        <CustomHeader title="Profile" navigation={this.props.navigation} />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={styles.text}>Profile Screen</Text>
        </View>
      </SafeAreaView>
    );
  }
}

class AboutUs extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.statusBar}>
        <CustomHeader title="About Us" navigation={this.props.navigation} />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={styles.text}>About Us</Text>
        </View>
      </SafeAreaView>
    );
  }
}

class SideMenu extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.statusBar}>
        <View style={styles.sidemenuHeader}>
          <Image
            style={styles.profileImg}
            source={require("./assets/avatar.png")}
          />
        </View>
        <ScrollView>
          <List>
            <ListItem onPress={() => this.props.navigation.navigate("Profile")}>
              <Text>Profile</Text>
            </ListItem>
            <ListItem onPress={() => this.props.navigation.navigate("About")}>
              <Text>About Us</Text>
            </ListItem>
          </List>
        </ScrollView>
        <List>
          <ListItem onPress={() => this.props.navigation.navigate("auth")}>
            <Text>Logout</Text>
          </ListItem>
        </List>
      </SafeAreaView>
    );
  }
}

export default class MainAppStarter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentDidMount() {
    try {
      await Font.loadAsync({
        Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
        Roboto_medium: require("./assets/fonts/Roboto-Medium.ttf"),
        ...Ionicons.font
      });
      this.setState({ isReady: true });
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    if (!this.state.isReady) {
      return (
        <View>
          <AppLoading />
        </View>
      );
    }
    return <AppNavigator />;
  }
}

const navOptionHandler = navigation => ({
  header: null
});

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: navOptionHandler
  },
  Details: {
    screen: DetailsScreen,
    navigationOptions: navOptionHandler
  }
});

const SettingsStack = createStackNavigator({
  Settings: {
    screen: SettingsScreen,
    navigationOptions: navOptionHandler
  },
  Details: {
    screen: DetailsSettingsScreen,
    navigationOptions: navOptionHandler
  }
});

const MainTabs = createBottomTabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: "Posts",
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="md-home" size={25} color="blue" />
      )
    }
  },
  Settings: {
    screen: SettingsStack,
    navigationOptions: {
      tabBarLabel: "Settings",
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="md-settings" size={25} color="blue" />
      )
    }
  }
});

const MainStack = createStackNavigator({
  Tabs: {
    screen: MainTabs,
    navigationOptions: navOptionHandler
  },
  Profile: {
    screen: Profile,
    navigationOptions: navOptionHandler
  },
  About: {
    screen: AboutUs,
    navigationOptions: navOptionHandler
  }
});

const DrawerNavigation = createDrawerNavigator(
  {
    drawer: MainStack
  },
  {
    contentComponent: SideMenu,
    drawerWidth: (Dimensions.get("window").width * 3) / 4
  }
);

const AuthStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: navOptionHandler
  },
  Register: {
    screen: Register,
    navigationOptions: navOptionHandler
  }
});

const app = createSwitchNavigator(
  {
    app: DrawerNavigation,
    auth: AuthStack
  },
  { initialRouteName: "auth" }
);

const AppNavigator = createAppContainer(app);

const styles = StyleSheet.create({
  text: {
    fontFamily: "Roboto",
    fontSize: 15
  },
  statusBar: {
    marginTop: Constants.statusBarHeight,
    flex: 1
  },
  sidemenuHeader: {
    height: 150,
    alignItems: "center",
    justifyContent: "center"
  },
  profileImg: {
    width: 110,
    height: 110,
    borderRadius: 55
  },
  marginTop: {
    marginTop: 5
  }
});
