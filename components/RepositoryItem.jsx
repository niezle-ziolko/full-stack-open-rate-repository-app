import PropTypes from "prop-types";
import { View, Text, Image, StyleSheet } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: theme.colors.white
  },
  topRow: {
    flexDirection: "row",
    marginBottom: 10
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15
  },
  info: {
    flex: 1
  },
  name: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    marginBottom: 4,
    color: theme.colors.textPrimary
  },
  description: {
    color: theme.colors.textSecondary,
    marginBottom: 6
  },
  language: {
    backgroundColor: theme.colors.primary,
    alignSelf: "flex-start",
    color: "white",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    overflow: "hidden"
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10
  },
  statItem: {
    alignItems: "center"
  },
  statLabel: {
    color: theme.colors.textSecondary
  }
});

const formatThousands = (value) =>
  value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value;

const Stat = ({ value, label }) => (
  <View style={styles.statItem}>
    <Text style={{ fontWeight: theme.fontWeights.bold }}>{formatThousands(value)}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

Stat.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired
};

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.name}>{item.fullName}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.stats}>
        <Stat value={item.stargazersCount} label="Stars" />
        <Stat value={item.forksCount} label="Forks" />
        <Stat value={item.reviewCount} label="Reviews" />
        <Stat value={item.ratingAverage} label="Rating" />
      </View>
    </View>
  );
};

RepositoryItem.propTypes = {
  item: PropTypes.shape({
    ownerAvatarUrl: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    stargazersCount: PropTypes.number.isRequired,
    forksCount: PropTypes.number.isRequired,
    reviewCount: PropTypes.number.isRequired,
    ratingAverage: PropTypes.number.isRequired,
  }).isRequired,
};

export default RepositoryItem;