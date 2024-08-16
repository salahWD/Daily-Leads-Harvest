import { StyleSheet, View, Pressable, GestureResponderEvent, } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { GestureEvent } from 'react-native-gesture-handler';
import { Link } from 'expo-router';

export type FloatBtnProps = {
  /* ======
  in case i foregut: i can set the handler function param as one of the belllow ways:
  ====== */
  handler?: ((event: GestureResponderEvent) => void),
  // handler(params: type): void
  // handler?(e: GestureResponderEvent): void,
  icon: "adduser" | "leftcircle",
}

export default function FloatBtn({ icon='adduser', handler, children }: React.PropsWithChildren<FloatBtnProps>) {

  return (
    <View style={styles.container}>
      {handler ?
        <Pressable onPress={handler}>
          {children ? children :
          <AntDesign style={styles.icon} name={icon} size={24} color="currentColor" /> }
        </Pressable>
      :
        <Link href="/addLead" style={styles.icon}>
          {children ? children :
          <AntDesign name={icon} size={32} color="currentColor" /> }
        </Link>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 15,
    right: 15,
  },
  icon: {
    backgroundColor: "#D7D7D7",
    borderRadius: 50,
    width: 55,
    height: 55,
    fontSize: 32,
    elevation: 3,
    textAlign: "center",
    textAlignVertical: "center",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#C3C3C3",
    color: "#3B3B3B",
    borderWidth: 1
  },
});
