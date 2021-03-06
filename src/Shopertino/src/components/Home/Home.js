import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, ActivityIndicator, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useColorScheme } from 'react-native-appearance';
import Categories from './Categories';
import NewArrivals from './NewArrivals';
import Featured from './Featured';
import BestSellers from './BestSellers';
import ProductDetailModal from '../Modals/ProductDetailModal/ProductDetailModal';
import { IMLocalized } from '../../Core/localization/IMLocalization';
import dynamicStyles from './styles';
import AppStyles from '../../AppStyles';
import CategoryCard from '../CategoryCard/GroupShoppingCategoryCard';

function Home(props) {
  const route = useRoute();
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const {
    navigation,
    categories,
    newArrivals,
    bestSellers,
    featured,
    shippingMethods,
    onModalCancelPress,
    onAddToBag,
    wishlist,
    user,
    isProductDetailVisible,
    product,
    appConfig,
  } = props;

  if (!newArrivals.length) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          color={AppStyles.colorSet[colorScheme].mainThemeForegroundColor}
        />
      </View>
    );
  }
  const item = {
    name: "invite people to shop together and share experiences!"
  };
  return (
    <ScrollView style={styles.container}>
      <Categories
        navigation={navigation}
        categories={categories}
        onCategoryPress={props.onCategoryPress}
      />
      <CategoryCard
        onCategoryPress={() => props.onCategoryPress(item)}
        item={item}
      />
      <NewArrivals
        title={IMLocalized('New Arrivals From Our Direct Sellers')}
        dataSource={newArrivals}
        onCardPress={props.onCardPress}
        navigation={navigation}
        appConfig={appConfig}
      />
      <Featured
        onCardPress={props.onCardPress}
        featuredProducts={featured}
        title={IMLocalized('Featured Items From Our Direct Sellers')}
        appConfig={appConfig}
      />
      <BestSellers
        onCardPress={props.onCardPress}
        bestSellerProducts={bestSellers}
        title={IMLocalized('Best Picks From Our Direct Sellers')}
        navigation={navigation}
        shouldLimit={true}
        limit={10}
        appConfig={appConfig}
      />
      <ProductDetailModal
        item={product}
        shippingMethods={shippingMethods}
        visible={isProductDetailVisible}
        wishlist={wishlist}
        user={user}
        onAddToBag={onAddToBag}
        onCancelPress={onModalCancelPress}
        appConfig={appConfig}
        navigation={navigation}
        orderAPIManager={route.params.orderAPIManager}
      />
    </ScrollView>
  );
}

Home.propTypes = {
  navigation: PropTypes.object,
  categories: PropTypes.array,
  newArrivals: PropTypes.array,
  bestSellers: PropTypes.array,
  featured: PropTypes.array,
  user: PropTypes.object,
  wishlist: PropTypes.array,
  shippingMethods: PropTypes.array,
  stripeCustomer: PropTypes.string,
  onCardPress: PropTypes.func,
  onCategoryPress: PropTypes.func,
  onAddToBag: PropTypes.func,
  product: PropTypes.object,
  onModalCancelPress: PropTypes.func,
  isProductDetailVisible: PropTypes.bool,
};

export default Home;
