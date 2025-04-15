import { format } from "date-fns";
import { View, Text } from "react-native";

import styles from "../utils/styles";

const ReviewItem = ({ review }) => {
  const { rating, text, createdAt, user } = review;

  const formattedDate = format(new Date(createdAt), "dd.MM.yyyy");

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>{rating}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.username}>{user.username}</Text>
          <Text style={styles.date}>{formattedDate}</Text>
          <Text style={styles.reviewText}>{text}</Text>
        </View>
      </View>
    </View>
  );
};

export default ReviewItem;