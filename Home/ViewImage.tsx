
import React, { useEffect, useState } from "react";
import { View, Image, FlatList, TextInput, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import Snackbar from 'react-native-snackbar';

const Home = ({ navigation }: any) => {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const imageApi = async (searchText = '', page = 1) => {
    let url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s";
    if (searchText) {
      url += `&text=${searchText}`;
    }
    try {
      setLoading(true)
      let response = await fetch(url);
      let resp = await response.json();
      setData(resp.photos.photo);

    } catch (error: any) {

      showRetrySnackbar();
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    imageApi();
  }, [data]);


  let isRetrying = false;

  const showRetrySnackbar = () => {
    if (!isRetrying) {
      isRetrying = true;
      Snackbar.show({
        text: 'Network error. Tap to retry.',
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: 'RETRY',
          textColor: 'green',
          onPress: () => {
            imageApi().finally(() => {
              isRetrying = false;
            });
          },
        },
      });
    }
  };


  const updateData = () => {
    imageApi(searchText);
  };
  const loadMoreData = () => {
    setPage(prevPage => prevPage + 1);
    imageApi(searchText, page + 1);
  };

  const renderFooter = () => {
    return loading ? <ActivityIndicator style={{ marginVertical: 10 }} size="large" color="blue" /> : null;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#2c2c2c",alignContent:"center",justifyContent:"center" }}>
      <View style={{ justifyContent: "center", alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10,backgroundColor:"#1f1f1f",elevation:10 }}>
        <TextInput
          style={{ width: 300, height: "auto", borderColor: 'gray', borderWidth: 1, marginRight: 10, paddingLeft: 10, color: "#fff", fontWeight: "900", borderRadius: 10 }}
          placeholder="Search Images"
          placeholderTextColor={'#979797'}
          onChangeText={text => setSearchText(text)}
          value={searchText}
        />
        <TouchableOpacity onPress={updateData} style={{ padding: 10, backgroundColor: 'blue', borderRadius: 5, marginTop: 15 }}>
          <Text style={{ color: 'white' }}>Search</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={{ flex: 1 }}
        data={data}
        numColumns={3}
        contentContainerStyle={{justifyContent:"center",alignItems:"center"}}
        renderItem={({ item }) => (
          <View style={{ padding: 10 }}>
            <Image
              source={{ uri: item.url_s }}
              style={{ width: 100, height: 100, borderRadius: 10 }}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={renderFooter}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.1}

      />
    </View>
  );
};

export default Home;
