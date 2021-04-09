import PropTypes from 'prop-types';
import React from 'react';
import { ImageBackground, TouchableOpacity, Text } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import dynamicStyles from './group-shopping-card-styles';
import { useNavigation } from '@react-navigation/native';

function CategoryCard(props) {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);

  const { item, imageContainerStyle, onCategoryPress } = props;

  const catPress = () => {
    console.log('catPress')
    navigation.navigate('GroupShop')
  }

  const navigation = useNavigation();

  return (
    <ImageBackground
      source={{ uri: item.photo }}
      style={[styles.categoryImageContainer, imageContainerStyle]}
      imageStyle={styles.categoryImage}
      resizeMode="cover">
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={catPress}
        style={styles.categoryTextContainerView}>
        <Text style={styles.categoryText}>{item.name.toUpperCase()}</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

CategoryCard.propTypes = {
  item: PropTypes.object.isRequired,
  onCategoryPress: PropTypes.func,
  imageContainerStyle: PropTypes.object,
};

export default CategoryCard;
