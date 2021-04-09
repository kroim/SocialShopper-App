import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {View, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import firebase from '@react-native-firebase/app';

const currentUser = firebase.auth().currentUser;

export default function SearchTerm({item, method, index,}) {
  const [counter, setCounter] = useState(0);
  // const [type, setType] = useState(null);

  const handleVote = (term, type) => {
    method(item.term, type, item.docId);
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        marginBottom: '7%',
        justifyContent: 'space-between',
      }}>
      <Text
        style={{
          fontSize: 17,
        }}>
        {item.term}
      </Text>

      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            fontSize: 17,
          }}>
          {item.votes}
        </Text>
        <View style={{flexDirection: 'column', marginLeft: '20%'}}>
          <TouchableOpacity onPress={() => handleVote(item.term, 'plus')}>
            <AntDesign name="caretup" color={'green'} size={14} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleVote(item.term, 'minus')}>
            <AntDesign name="caretdown" color={'red'} size={14} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
