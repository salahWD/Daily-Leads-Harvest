import { StyleSheet, View, Pressable, GestureResponderEvent, } from 'react-native';

export type CardProps = {
  handler?: ((event: GestureResponderEvent) => void),
}

export default function Card({ handler, children }: React.PropsWithChildren<CardProps>) {

  return (
    <View style={styles.container}>
      {handler ?
        <Pressable onPress={handler}>
        {children}
      </Pressable>:
        children
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingVertical: 18,
    backgroundColor: "white",
    elevation: 2,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 15,
    flex: 1,
  },
});
