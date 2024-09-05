import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Button,
} from 'react-native';

export type Option = {
  title: string,
  value: number | string | undefined
};

export type CustomDropdownProps = {
  data: Array<Option>,
  onSelect(e: Option | Option[]): void,
  defaultState?: Option,
  multiSelect?: boolean,
};

const CustomDropdown = ({ data, onSelect, defaultState = { title: "", value: 0 }, multiSelect = false }: CustomDropdownProps) => {
  const [visible, setVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState<Option | Option[]>(multiSelect ? [] : defaultState);

  const handleSelect = (item: Option) => {
    if (multiSelect) {
      const updatedSelection = Array.isArray(selectedValue)
        ? selectedValue.includes(item)
          ? selectedValue.filter(selected => selected.value !== item.value)
          : [...selectedValue, item]
        : [item];

      setSelectedValue(updatedSelection);
      onSelect(updatedSelection);
    } else {
      setSelectedValue(item);
      onSelect(item);
      setVisible(false);
    }
  };

  const renderSelectedValue = () => {
    if (multiSelect && Array.isArray(selectedValue)) {
      return selectedValue.length > 0
        ? selectedValue.map(item => item.title).join(", ")
        : 'إختر خياراً';
    } else {
      return selectedValue ? selectedValue.title : 'إختر خياراً';
    }
  };

  return (
    <View style={ styles.container }>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setVisible(true)}
      >
        <Text style={{ ...styles.selectedText, color: Array.isArray(selectedValue) && selectedValue.length === 0 ? "#999" : "#333" }}>
          {renderSelectedValue()}
        </Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="fade"
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={data}
              keyExtractor={(item, index) => item.value?.toString() ?? index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.optionText}>{item.title}</Text>
                  {multiSelect && (
                    <View style={[styles.optionCheckBox, selectedValue.includes(item) && styles.optionCheckBoxSelected]} />
                  )}
                </TouchableOpacity>
              )}
            />
            {multiSelect && (
              <View style={{ paddingTop: 0, }}>
                <Button title="حفظ الحالة" onPress={() => setVisible(false)}/>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  dropdown: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  selectedText: {
    fontSize: 16,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '80%',
    maxHeight: '70%',
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: "row",
    justifyContent: "space-between",
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  optionCheckBox: {
    backgroundColor: "#Efefef",
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 5,
    width: 20,
    height: 20,
  },
  optionCheckBoxSelected: {
    backgroundColor: "#007BFF",
    borderColor: "#007BFF",
  },
});
