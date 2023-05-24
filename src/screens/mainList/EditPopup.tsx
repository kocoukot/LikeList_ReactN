import {View, StyleSheet, Image, Text} from 'react-native';
const {Popover} = renderers;
import {LikedItem} from '../../store/groups';
import {
  MenuOption,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import {Colors} from '../../utils/Colors';
import {useState} from 'react';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import {PressableImage} from '../../components/IconResolve';

export function EditPopUp(prop: {item: LikedItem; onEditPress; onDeletePress}) {
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);
  return (
    <View style={styles.editBtn}>
      <Menu
        visible={visible}
        anchor={
          <PressableImage
            image={require('../../../assets/ic_more.png')}
            color={Colors.tabBarInactiveColor}
            size={20}
            onPress={showMenu}
          />
        }
        onRequestClose={hideMenu}>
        <MenuItem
          onPress={() => {
            hideMenu();
            prop.onEditPress();
          }}>
          Edit
        </MenuItem>
        <MenuItem
          onPress={() => {
            hideMenu();
            prop.onDeletePress();
          }}
          textStyle={{color: Colors.red}}>
          Delete
        </MenuItem>
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  editBtn: {
    top: 0,
    left: 0,
    position: 'absolute',
    padding: 8,
  },
  imageButtonStyle: {
    height: 20,
    width: 20,
    flex: 1,
    tintColor: Colors.tabBarInactiveColor,
  },
  text: {
    textAlign: 'center',
    paddingHorizontal: 16,
    paddingVertical: 4,
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteStyle: {
    color: Colors.red,
  },
});
