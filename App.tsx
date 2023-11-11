import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View, StyleSheet,} from "react-native";

type Users = {
  name: string;
  email: string;
  id: string;
  gender: string;
  status: string;
};

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Users[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://gorest.co.in/public/v2/users");
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Ошибка:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.main}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#1fda1b" />
      ) : (
        <FlatList
          style={styles.list}
          data={data}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.text}>Name: {item.name} </Text>
              <Text style={styles.text}>Email: {item.email} </Text>
              <Text style={styles.text}>ID: {item.id}</Text>
              <Text style={styles.text}>Gender: {item.gender}</Text>
              <Text style={styles.text}>Status: {item.status}</Text>
              <View style={styles.str} />
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#5d5d5d",
    flex: 1,
    padding: 30,
  },
  list: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 23,
  },
  text: {
    color: "#000000",
    fontSize: 14,
    fontFamily: "",
  },
  str: {
    borderBottomColor: "#1fda1b",
    borderBottomWidth: 2.7,
    padding: 10,
    bottom: 10,
  },
});

export default App;
