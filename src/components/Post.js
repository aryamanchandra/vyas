import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Post = ({ post }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: post.userProfilePicture }} style={styles.profilePicture} />
        <Text style={styles.username}>{post.username}</Text>
        <Text style={styles.date}>{post.date}</Text>
      </View>

      <Image source={{ uri: post.imageUrl }} style={styles.image} />
      
      {/* <View style={styles.captionContainer}></View> */}

      <View style={styles.captionContainer}>
        <Text style={styles.username}>{post.username}</Text>
        <Text style={styles.caption}>{post.caption}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
  },
  date: {
    fontWeight: 'bold',
    marginLeft:"auto",
  },
  image: {
    width: '100%',
    height: 300,
  },
  captionContainer: {
    padding: 10,
    flexDirection: 'row',
  },
  caption: {
    paddingLeft:5
  },
});

export default Post;