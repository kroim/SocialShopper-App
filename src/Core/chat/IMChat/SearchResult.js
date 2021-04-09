import React from 'react';
import {TouchableOpacity} from 'react-native';
import {View, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function SearchResult({item, method, index}) {
  // console.log('itm ', item.id);
  const handleVote = (term, type) => {
    method(term, type, item.id);
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        // alignSelf: 'center',
        marginBottom: '7%',
        justifyContent: 'space-between',
      }}>
      <Text
        style={{
          fontSize: 17,
        }}>
        {item.title}
        <Text>Search Result Title Here</Text>
      </Text>

      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            fontSize: 17,
            marginRight: '20%',
          }}>
          {item.votes}
          <Text>Votes Here</Text>
        </Text>
        <View style={{flexDirection: 'column'}}>
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
