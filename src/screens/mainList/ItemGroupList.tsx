import {
  FlatList,
  View,
  StyleSheet,
  Text,
  Pressable,
  Dimensions,
  Image,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

export function GroupsList({itemsList}) {
  const navigation = useNavigation();

  function renderCardItem(itemData) {
    return <GroupCard itemInfo={itemData.item} />;
  }

  function GroupCard({itemInfo}) {
    function onCardSelect() {
      navigation.navigate('Details' as never, {
        groupName: itemInfo.itemGroup,
      }  as never);
    }

    return (
      <View style={[styles.cardOuterView]}>
        <Pressable
          style={({pressed}) => {
            return pressed
              ? [
                  styles.cardInnerView,
                  styles.pressed,
                  {backgroundColor: itemInfo.itemColor},
                ]
              : [styles.cardInnerView, {backgroundColor: itemInfo.itemColor}];
          }}
          onPress={onCardSelect}
          android_ripple={{color: Colors.ripple, borderless: true}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              flex: 1,
              paddingHorizontal: 18,
            }}>
            <Text style={styles.title} >{itemInfo.itemGroup}</Text>
            <View style={{width:8}}/>
            <Image
              style={{
                flex: 1,
                tintColor: Colors.tabBarInactiveColor,
              }}
              resizeMode="contain"
              source={itemInfo.itemGroupIcon}
            />
          </View>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      numColumns={2}
      contentContainerStyle={styles.list}
      data={itemsList}
      keyExtractor={item => item.id}
      renderItem={renderCardItem}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
    // justifyContent: 'space-between',
    paddingBottom: 88,
  },
  cardOuterView: {
    margin: 8,
    aspectRatio: 2,
    width: windowWidth / 2 - 16,
    // flex: 1,
    elevation: 4,
    borderRadius: 28,
  },
  cardInnerView: {
    flex: 1,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.shadowColor,
    shadowRadius: 28,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 0.02,
    textAlign:"center",
    flex:2
  },
  pressed: {
    borderRadius: 28,
    opacity: 0.5,
  },
});
