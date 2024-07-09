import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

interface Contact {
  id: number;
  fullName: string;
  company: string | null;
  workPhone: string | null;
  mobilePhone: string | null;
  email: string | null;
}

export default function Index() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch("http://192.168.10.152:8586/webapi/api/contacts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: Contact[]) => {
        setContacts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const filteredData = contacts.filter(
    (item) =>
      item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.company &&
        item.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.workPhone && item.workPhone.includes(searchQuery)) ||
      (item.mobilePhone && item.mobilePhone.includes(searchQuery)) ||
      (item.email &&
        item.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      {filteredData.map((item) => (
        <View key={item.id} style={styles.itemContainer}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemName}>{item.fullName}</Text>
            {item.company !== null && item.company !== "-" && (
              <Text style={styles.itemCompany}>{item.company}</Text>
            )}
          </View>
          {item.workPhone !== null && item.workPhone !== "-" && (
            <Text style={styles.itemText}>Work Phone: {item.workPhone}</Text>
          )}
          {item.mobilePhone !== null && item.mobilePhone !== "-" && (
            <Text style={styles.itemText}>
              Mobile Phone: {item.mobilePhone}
            </Text>
          )}
          {item.email !== null && item.email !== "-" && (
            <Text style={styles.itemText}>Email: {item.email}</Text>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: "center",
    backgroundColor: "#161a22",
    padding: 20,
  },
  searchInput: {
    width: "100%",
    backgroundColor: "#292a3e",
    padding: 10,
    borderRadius: 10,
    color: "white",
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: "column",
    width: "100%",
    backgroundColor: "#292a3e",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  itemName: {
    color: "white",
    fontSize: 20,
  },
  itemCompany: {
    color: "white",
    fontSize: 16,
  },
  itemText: {
    color: "white",
    fontSize: 18,
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
});
