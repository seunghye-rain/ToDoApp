import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useSelector } from "react-redux";
import InputForm from "../components/InputForm";
import TodoItem from "../components/TodoItem";
import { signOut, getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const MainScreen = () => {
  const todos = useSelector((state) => state.todo.todos);
  const todoTasks = todos.filter((item) => item.state === "todo");
  const completedTasks = todos.filter((item) => item.state === "done");
  const navigation = useNavigation();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace("Login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"default"} />
      <View style={styles.headerContainer}>
        <Text style={styles.pageTitle}>ToDo App</Text>
        <TouchableOpacity style={styles.logOutButton} onPress={handleLogout}>
          <Text style={styles.logOutText}>-</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listView}>
        <Text style={styles.listTitle}>할 일</Text>
        {todoTasks.length !== 0 ? (
          <FlatList
            data={todoTasks}
            renderItem={({ item }) => <TodoItem {...item} />}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <Text style={styles.emptyListText}>할 일이 없습니다.</Text>
        )}
      </View>
      <View style={styles.seperator} />
      <View style={styles.listView}>
        <Text style={styles.listTitle}>완료된 일</Text>
        {completedTasks.length !== 0 ? (
          <FlatList
            data={completedTasks}
            renderItem={({ item }) => (
              <TodoItem {...item} keyExtractor={(item) => item.id} />
            )}
          />
        ) : (
          <Text style={styles.emptyListText}>완료된 일이 없습니다.</Text>
        )}
      </View>
      <InputForm />
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 50 : 0, //안드로이드일 때는 padding 20, OS일 때는 0 => android, ios 분기 처리 (ios의 경우 이미 safeAreaView 컴포넌트로 처리함)
    backgroundColor: "#f7f8fa",
  },
  pageTitle: {
    marginBottom: 10,
    paddingHorizontal: 15,
    fontSize: 50,
    fontWeight: "600",
  },
  seperator: {
    marginHorizontal: 10,
    marginTop: 25,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.2)",
  },
  listView: {
    flex: 1,
  },
  listTitle: {
    marginBottom: 25,
    paddingHorizontal: 15,
    fontSize: 30,
    fontWeight: "500",
  },
  emptyListText: {
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 15,
    fontSize: 15,
    lineHeight: 20,
    color: "#737373",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logOutButton: {
    marginBottom: 25,
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 42,
    height: 42,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 4,
  },
  logOutText: {
    color: "white",
    fontSize: 25,
  },
});
