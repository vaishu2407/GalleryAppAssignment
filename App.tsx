
import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Home from './Home/Home';
import Page from './Home/Page';
import ViewImage from './Home/ViewImage';

const HomeRoute = () => (
  <Home/>
);

const Page1Route = () => (
 <Page/>
);

const Page2Route= () => (
  <ViewImage/>
);

const renderTabBar = (props:any)=> (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: 'white' }}
    style={{ backgroundColor: 'red' }}
    tabStyle={{backgroundColor:"#008b91"}}

  />
);

const App = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'home', title: 'Home' },
    { key: 'page1', title: 'Page1' },
    { key: 'page2', title: 'Page2' },
  ]);

  const renderScene = SceneMap({
    home: HomeRoute,
    page1: Page1Route,
    page2: Page2Route,
  });

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: 300 }}
        renderTabBar={renderTabBar}

      />
     
   </View>
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;

