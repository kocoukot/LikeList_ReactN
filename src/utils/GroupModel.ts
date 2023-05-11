import uuid from 'react-native-uuid';

class GroupModel {
  id: string = uuid.v4().toString();
  itemName: string = '';
  itemGroup: string = '';
  itemSubname: string = '';
  itemColor: string = '';

  constructor(itemName: string = '', itemGroup = '', itemSubname = '', itemColor = '') {
    this.itemName = itemName;
    this.itemGroup = itemGroup;
    this.itemSubname = itemSubname;
    this.itemColor = itemColor;
  }
}

export default GroupModel;
