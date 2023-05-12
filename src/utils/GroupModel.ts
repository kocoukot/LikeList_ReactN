import uuid from 'react-native-uuid';

class GroupModel {
  id: string = uuid.v4().toString();
  itemName: string = '';
  itemGroup: string = '';
  itemColor: string = 'red';

  constructor(itemName: string = '', itemGroup = '', itemColor: string, id: string = uuid.v4().toString()) {
    this.id = id
    this.itemName = itemName;
    this.itemGroup = itemGroup;
    // this.itemSubname = itemSubname;
    this.itemColor = itemColor;
  }

  toString() {
    return (
      'GroupModel id' +
      this.id +
      ' name ' +
      this.itemName +
      ' group ' +
      this.itemGroup +
      ' color ' +
      this.itemColor
    );
  }

  toJson() {
    return {
      id: this.id,
      itemName: this.itemName,
      itemGroup: this.itemGroup,
      itemColor: this.itemColor,
    };
  }

  
}

export default GroupModel;
