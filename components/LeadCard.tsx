import { StyleSheet, View, Text, } from 'react-native';
import Svg, {
  Rect,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

export type LeadCardProps = {
  name: string,
  relationShip: string,
  contactMedia: string,
  date: Date | null,
}

export default function LeadCard({ name, relationShip, contactMedia, date = null }: LeadCardProps) {

  const formattedDate = date?.toJSON()?.slice(2, 10);
  // console.log(formattedDate)

  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Svg style={styles.headerBg} width="100%" height="100%" viewBox="0 0 80 80" preserveAspectRatio="xMinYMin slice">
            <Defs>
              <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0" stopColor="#171717" stopOpacity="1" />
                <Stop offset="1" stopColor="#212121" stopOpacity="1" />
              </LinearGradient>
            </Defs>
            <Rect x="0" y="0" width="80" height="80" fill="url(#grad)"></Rect>
          </Svg>
          <View style={styles.nameBox}>
            <AntDesign style={ styles.icon } name="user" size={28} color="currentColor" />
            <Text style={styles.title}>{ name }</Text>
          </View>
          <View style={styles.dateBox}>
            <Feather style={ styles.dateIcon } name="calendar" size={18} color="currentColor" />
            <Text style={styles.dateTitle}>{ formattedDate }</Text>
          </View>
        </View>
        <View style={styles.content}>
          <Text style={{ ...styles.relation, ...styles.badge }}>{ relationShip }</Text>
          <Text style={{ ...styles.media, ...styles.badge }}>{ contactMedia }</Text>
        </View>
      </View>
    </View>
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
    flexDirection: "row",
    paddingHorizontal: 18,
    alignItems: "center",
    height: 52,
    justifyContent: "space-between",
  },
  headerBg: {
    flex: 1,
    width: "100%",
    height: "100%",
    maxHeight: 200,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
  },
  icon: {
    // color: "#888",// dark mood
    color: "#555",
    // paddingTop: 14,
    // paddingBottom: 8,
  },
  nameBox: {
    gap: 8,
    flexDirection: "row",
  },
  title: {
    // paddingTop: 14,
    // paddingBottom: 8,
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
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    // backgroundColor: "#999",// dark mood
    backgroundColor: "#555",
    borderRadius: 10,
  },
  relation: {
  },
  media: {
  },
});
