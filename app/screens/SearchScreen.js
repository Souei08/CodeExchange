// Imports
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput } from "react-native";

// Custom Components
import CustomPosts from "../components/CustomPosts";

// Style
import searchStyles from "../../assets/css/search.css";

// Api
import postApi from "../../axios/posts";

// Storage
import storage from "../../utils/storage";

// Context
import { useAuth } from "../../context/AuthContext";

// Utils
import { removeSpecialCharacters } from "../../utils/Utility";

const SearchScreen = ({ navigation }) => {
  const { searchValue, setSearchValue } = useAuth();
  const [searchPost, setSearchPost] = useState(null);
  const [authUser, setAuthUser] = useState(null);

  const searchPosts = async () => {
    try {
      const postValChecker = searchValue?.length === 0 ? null : searchValue;
      const posts = await postApi.searchPosts(postValChecker);

      setSearchPost(posts);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const getAuthUser = async () => {
    const authUser = await storage.getAuthUser();
    setAuthUser(authUser);
  };

  useEffect(() => {
    searchPosts();
    getAuthUser();
  }, [searchValue]);

  const renderItem = ({ item }) => (
    <CustomPosts
      item={item}
      allowEdit={false}
      navigation={navigation}
      loginUser={authUser}
      getPosts={searchPosts}
    />
  );

  return (
    <View style={searchStyles.searchContainer}>
      <View style={searchStyles.searchInnerContainer}>
        <TextInput
          style={searchStyles.searchInput}
          placeholder="Search"
          placeholderTextColor="#000"
          value={searchValue}
          onChangeText={(val) => {
            const result = removeSpecialCharacters(val);
            setSearchValue(result);
          }}
        />

        <Text style={searchStyles.searchTitle}>Search:</Text>
      </View>

      <FlatList
        data={searchPost}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
        numColumns={1}
        style={{
          paddingHorizontal: 40,
        }}
      />
    </View>
  );
};

export default SearchScreen;
