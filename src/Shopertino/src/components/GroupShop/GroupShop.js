import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import dynamicStyles from './styles';
import { IMLocalized } from '../../Core/localization/IMLocalization';

import { Appearance, AppearanceProvider } from 'react-native-appearance';
import { AppNavigator, RootNavigator } from '../../Messenger/src/navigations/AppNavigation';

const MainNavigator = AppNavigator;

function GroupShop(props) {
  // const colorScheme = useColorScheme();
  // const styles = dynamicStyles(colorScheme);
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  return (
    // <View style={styles.container}>
    //   <Text>GROUP SHOP</Text>
    // </View>
    // <MainNavigator screenProps={{ theme: colorScheme}} />
    <RootNavigator />
  );
}

export default GroupShop;
