import React from 'react';
import stripe from 'tipsi-stripe';
import { GoogleSignin } from 'react-native-google-signin';
import RootNavigator from '../navigators/RootNavigator';
import AppConfig from '../ShopertinoConfig';
import { NavigationContainer } from '@react-navigation/native';

stripe.setOptions({
  publishableKey: AppConfig.stripeConfig.PUBLISHABLE_KEY,
  merchantId: AppConfig.stripeConfig.MERCHANT_ID,
  androidPayMode: AppConfig.stripeConfig.ANDROID_PAYMENT_MODE,
});
GoogleSignin.configure({
  scopes: AppConfig.GOOGLE_SIGNIN_CONFIG.SCOPES,
  webClientId: AppConfig.GOOGLE_SIGNIN_CONFIG.WEB_CLIENT_ID,
  offlineAccess: AppConfig.GOOGLE_SIGNIN_CONFIG.OFFLINE_ACCESS,
});

const AppContainer = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default AppContainer;
