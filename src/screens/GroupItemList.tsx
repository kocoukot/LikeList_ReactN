import {FlatList, SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {Colors} from '../utils/Colors';


export function GroupItemList(){
    return (
        <View style={styles.container}>
            <Text>
                Group item list here 
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.backgroundColor,
    },
  });
