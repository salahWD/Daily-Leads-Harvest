import { View, StyleSheet, Pressable, GestureResponderEvent } from "react-native"
import Svg, {
  Rect,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

type CustomBtnProps = {
  handler?: ((event: GestureResponderEvent) => void),
  withBg?: boolean,
  customStyle?: {},
};

export default function LeadCard({ children, handler, customStyle, withBg=true }: React.PropsWithChildren<CustomBtnProps>) {

  return (
    <Pressable onPress={handler}>
      <View style={{ ...styles.button, ...customStyle }}>
        {withBg == true ?
        <Svg style={ styles.buttonBg } width="100%" height="100%" viewBox="0 0 80 80" preserveAspectRatio="xMinYMin slice">
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
              {/* <Stop offset="0" stopColor="#A7A7A7" stopOpacity="1" />
              <Stop offset="1" stopColor="#D8D8D8" stopOpacity="1" /> */}
              <Stop offset="0" stopColor="#D7D7D7" stopOpacity="1" />
              <Stop offset="1" stopColor="#F8F8F8" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <Rect x="0" y="0" width="80" height="80" fill="url(#grad)"></Rect>
        </Svg>: null}
        <View style={{paddingVertical: 12,alignItems: "center", justifyContent: "center" }}>
          {children}
        </View>
      </View>
    </Pressable>
  );
}


const styles = StyleSheet.create({
  button: {
    position: "relative",
    borderRadius: 25,
    overflow: "hidden",
  },
  buttonBg: {
    flex: 1,
    flexGrow: 2,
    width: "100%",
    height: "100%",
    position: "absolute",
    left: 0,
    bottom: 0,
    zIndex: -1,
  },
});
