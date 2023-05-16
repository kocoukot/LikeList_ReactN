import { ImageSourcePropType } from "react-native";

export const IC_LIST = require('./ic_list.png');

export interface IImage {
  title: string;
  image: ImageSourcePropType;
}
export const ICONS_LIST: IImage[] = [
    
  {title: 'ic_chees', image: require('./ic_chees.png')},
  {title: 'ic_sousage', image: require('./ic_sousage.png')},
  {title: 'ic_burger', image: require('./ic_burger.png')},
  {title: 'ic_bowl', image: require('./ic_bowl.png')},
  {title: 'ic_icecream', image: require('./ic_icecream.png')},
  {title: 'ic_coffe_cap', image: require('./ic_coffe_cap.png')},
  {title: 'ic_coffee_beans', image: require('./ic_coffee_beans.png')},
  {title: 'ic_tea_pot', image: require('./ic_tea_pot.png')},
  {title: 'ic_capcake', image: require('./ic_capcake.png')},
  {title: 'ic_cola', image: require('./ic_cola.png')},
  {title: 'ic_bear', image: require('./ic_bear.png')},
  {title: 'ic_wine', image: require('./ic_wine.png')},
];
