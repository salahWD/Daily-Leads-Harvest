import { StyleSheet, View, Text, Pressable, } from 'react-native';
import Svg, {
  Rect,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { Member } from '@/utils/types';

type MemberCardProps = {
  handler?(e: any): void,
}

export default function MemberCard({ name, dxnId, date = undefined, handler }: Member & MemberCardProps) {

  const formattedDate = date ? date?.toJSON()?.slice(2, 10) : new Date().toJSON()?.slice(2, 10);

  return (
    <Pressable onPress={handler}>
      <View style={styles.card}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Svg style={styles.headerBg} width="100%" height="100%" viewBox="0 0 80 80" preserveAspectRatio="xMinYMin slice">
              <Defs>
                <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                  {/* <Stop offset="0" stopColor="#171717" stopOpacity="1" /> */}
                  {/* <Stop offset="1" stopColor="#212121" stopOpacity="1" /> */}
                  <Stop offset="0" stopColor="#68eb74" stopOpacity="1" />
                  <Stop offset="1" stopColor="#d0fbd8" stopOpacity="1" />
                </LinearGradient>
              </Defs>
              <Rect x="0" y="0" width="80" height="80" fill="url(#grad)"></Rect>
            </Svg>
            <View style={styles.contentBox}>
              <View style={styles.nameBox}>
                <AntDesign style={ styles.icon } name="user" size={28} color="currentColor" />
                <Text style={styles.title}>{ name }</Text>
              </View>
              <View style={styles.dateBox}>
                <Feather style={ styles.dateIcon } name="calendar" size={18} color="currentColor" />
                <Text style={styles.dateTitle}>{ formattedDate }</Text>
              </View>
            </View>
            <View style={{ height: 1, backgroundColor: "black", opacity: 0.2, marginHorizontal: 50 }}></View>
            <View style={styles.content}>
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <Text>رقم العضوية: {dxnId}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    // backgroundColor: "#212121",// dark mood
    backgroundColor: "#fff",
    borderRadius: 25,
    overflow: "hidden",
    elevation: 1,
    marginBottom: 20
  },
  container: {
  },
  header: {
    position: "relative",
  },
  headerBg: {
    flex: 1,
    flexDirection: "row",
    flexGrow: 2,
    width: "100%",
    height: "100%",
    maxHeight: 200,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
  },
  contentBox: {
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 14,
    paddingBottom: 8,
  },
  icon: {
    // color: "#888",// dark mood
    color: "#555",
  },
  nameBox: {
    gap: 8,
    flexDirection: "row",
  },
  title: {
    // color: "#9f9f9f",// dark mood
    color: "#333",
    fontSize: 19,
    fontWeight: "semibold",
  },
  dateBox: {
    alignItems: "center",
    gap: 6,
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  dateIcon: {
    // color: "#666",// dark mood
    color: "#777",
    fontSize: 20,
  },
  dateTitle: {
    // color: "#888",// dark mood
    color: "#555",// dark mood
    fontSize: 14,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
});
