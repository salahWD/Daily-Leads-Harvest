import { StyleSheet, View, Text, } from 'react-native';
import Svg, {
  Rect,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

import { contactMediaTypes, relationShipTypes } from '@/utils/valueLists';
import { Lead } from '@/utils/types';

export default function LeadCard({ name, relationShip, contactMedia, leadsCount = 1, date = undefined }: Lead) {

  const formattedDate = date?.toJSON()?.slice(2, 10);

  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Svg style={styles.headerBg} width="100%" height="100%" viewBox="0 0 80 80" preserveAspectRatio="xMinYMin slice">
            <Defs>
              <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                {/* <Stop offset="0" stopColor="#171717" stopOpacity="1" /> */}
                {/* <Stop offset="1" stopColor="#212121" stopOpacity="1" /> */}
                <Stop offset="0" stopColor="#E7E7E7" stopOpacity="1" />
                <Stop offset="1" stopColor="#F8F8F8" stopOpacity="1" />
              </LinearGradient>
            </Defs>
            <Rect x="0" y="0" width="80" height="80" fill="url(#grad)"></Rect>
          </Svg>
          <View style={styles.contentBox}>
            <View style={styles.nameBox}>
              {leadsCount > 1 ?
               <Feather style={ styles.icon } name="users" size={28} color="currentColor" /> :
               <AntDesign style={ styles.icon } name="user" size={28} color="currentColor" /> }
              <Text style={styles.title}>{ leadsCount > 1 ? `دعوة لـ(${leadsCount}) أشخاص` : name }</Text>
            </View>
            <View style={styles.dateBox}>
              <Feather style={ styles.dateIcon } name="calendar" size={18} color="currentColor" />
              <Text style={styles.dateTitle}>{ formattedDate }</Text>
            </View>
          </View>
        </View>
        <View style={styles.content}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Text>العلاقة: </Text>
            <Text style={{ ...styles.relation, ...styles.badge }}>
              { (relationShip != undefined && relationShipTypes != null && relationShipTypes[relationShip]?.title)
              ? relationShipTypes[relationShip].title
                : "غير معروف" }
            </Text>
          </View>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Text>الوسيلة: </Text>
            <Text style={{ ...styles.media, ...styles.badge }}>
              { (contactMedia != undefined && relationShipTypes != null && relationShipTypes[contactMedia]?.title)
              ? contactMediaTypes[contactMedia].title
                : "غير معروف" }
            </Text>
          </View>
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
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    // backgroundColor: "#999",// dark mood
    backgroundColor: "#EfEfEf",
    borderColor: "#DfDfDf",
    borderWidth: 1,
    borderRadius: 10,
  },
  relation: {
  },
  media: {
  },
});
