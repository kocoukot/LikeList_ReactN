import {ICONS_LIST} from '../../../../assets';
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  Pressable,
  Platform,
} from 'react-native';
import {Colors} from '../../../utils/Colors';

export default function IconsListComponent({
  onIconSelect,
  selectedIcon,
  selectedColor,
}) {

  return (
    
    <View style={styles.iconsSection}>

      <FlatList
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        style={{height: 10}}
        data={ICONS_LIST}
        numColumns={4}
        renderItem={itemData => (
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor:
                  selectedIcon == itemData.item
                    ? selectedColor
                    : Colors.transparent,
              },
            ]}>
            <Pressable
              style={({pressed}) => {
                return pressed
                  ? {flex: 1, opacity: Platform.OS == 'ios' ? 0.2 : 1}
                  : {flex: 1};
              }}
              onPress={() => {
                onIconSelect(itemData.item);
              }}
              android_ripple={{
                color: Colors.ripple,
                borderless: true,
              }}>
              <Image
                source={itemData.item}
                style={{flex: 1, aspectRatio: 1, margin: 8}}
              />
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    aspectRatio: 1,
    margin: 8,
    borderRadius: 50,

    alignItems: 'center',
  },
  iconsSection: {
    flex: 1,
    borderColor: Colors.buttonColor,
    borderWidth: 2,
    marginEnd: 16,
    borderRadius: 16,
    height: 200,
  },
});
