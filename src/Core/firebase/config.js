import { decode, encode } from 'base-64';
import './timerConfig';
global.addEventListener = (x) => x;
if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBE3gu52ULizM3Cxi7mW0vkAK3JuwoVlMs',
  authDomain: 'social-marketplace-3c8df.firebaseapp.com',
  databaseURL: 'https://social-marketplace-3c8df.firebaseio.com',
  projectId: 'social-marketplace-3c8df',
  storageBucket: 'social-marketplace-3c8df.appspot.com',
  messagingSenderId: '669832752221',
  appId: '1:669832752221:ios:f00ae82596ef26585e31b4',
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export { firebase };
