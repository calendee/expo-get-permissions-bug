import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import * as Permissions from 'expo-permissions';

function UsePermissions() {
  const [permission, getPermission] = Permissions.usePermissions(Permissions.CAMERA);
  console.log('permission',permission);
  useEffect(() => {
    console.log('In useEffect. Calling getPermission');
    getPermission();
  },[])

  return (
    <View>
      <Text>UsePermissions</Text>
      <Text>Status: {permission?.status}</Text>
    </View>
  )
}

function GetPermissionsAsync() {
  const [permissions, setPermissions] = useState();
  console.log('GetPermissionsAsync -> permissions state', permissions);
  useEffect(() => {
    async function getPermissions() {
      console.log('GetPermissionsAsync -> In useEffect. Calling Permissions.getAsync');
      const permissions = await Permissions.getAsync(Permissions.CAMERA);
      console.log('GetPermissionsAsync -> In useEffect -> permissions', permissions);
      setPermissions(permissions)
    }

    getPermissions();
  },[])

  return (
    <View>
      <Text>GetPermissionsAsync</Text>
      <Text>Status: {permissions?.status}</Text>
    </View>
  )
}

export default function App() {
  const [displayedComponent, setDisplayedComponent] = useState();

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Pressable
        onPress={() => {
          setDisplayedComponent("UsePermissions")
        }}
        style={styles.button}
      >
        <Text style={styles.text}>Show UsePermissions Component</Text>
      </Pressable>

      <Pressable
        onPress={() => {
          setDisplayedComponent("GetPermissionsAsync")
        }}
        style={styles.button}
      >
        <Text style={styles.text}>Show GetPermissionsAsync Component</Text>
      </Pressable>

      {displayedComponent === "UsePermissions" ? (<UsePermissions/>) : null}
      {displayedComponent === "GetPermissionsAsync" ? (<GetPermissionsAsync/>) : null}

    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#5386E4',
    padding: 10,
    margin: 5,
    color: "#FFF",
    borderRadius: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },  
  text: {
    color: "#FFF"
  },
});
