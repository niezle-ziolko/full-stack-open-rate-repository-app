import PropTypes from "prop-types";
import { View, Text, Image, StyleSheet, TouchableOpacity, Button } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: theme.colors.white
  },
  topRow: {
    flexDirection: theme.flexDirection.row,
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
    color: theme.colors.primary
  },
  description: {
    color: theme.colors.secondary,
    marginBottom: 6
  },
  language: {
    backgroundColor: theme.colors.blue,
    fontWeight: theme.fontWeights.bold,
    alignSelf: "flex-start",
    color: theme.colors.white,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    overflow: "hidden"
  },
  button: {
    backgroundColor: theme.colors.blue,
    padding: 12,
    borderRadius: 5,
    alignItems: theme.align.center,
    marginTop: 15
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: theme.fontWeights.bold,
    textTransform: theme.display.none,
    fontSize: 15
  },
  stats: {
    flexDirection: theme.flexDirection.row,
    justifyContent: "space-around",
    marginTop: 10
  },
  statItem: {
    alignItems: theme.align.center
  },
  statLabel: {
    color: theme.colors.secondary
  }
});

const formatThousands = (value) =>
  value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value;

const Stat = ({ value, label }) => (
  <View style={styles.statItem} testID={`statItem-${label}`}>
    <Text style={{ fontWeight: theme.fontWeights.bold }} testID={`statValue-${label}`}>
      {formatThousands(value)}
    </Text>
    <Text style={styles.statLabel} testID={`statLabel-${label}`}>{label}</Text>
  </View>
);

Stat.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired
};

const RepositoryItem = ({ item, showGithubButton }) => {
  const handleOpenGitHub = () => {
    Linking.openURL(item.url);
  };

  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={styles.topRow}>
        <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} testID="repositoryAvatar" />
        <View style={styles.info}>
          <Text style={styles.name} testID="repositoryName">{item.fullName}</Text>
          <Text style={styles.description} testID="repositoryDescription">{item.description}</Text>
          <Text style={styles.language} testID="repositoryLanguage">{item.language}</Text>
        </View>
      </View>
      <View style={styles.stats}>
        <Stat value={item.stargazersCount} label="Stars" />
        <Stat value={item.forksCount} label="Forks" />
        <Stat value={item.reviewCount} label="Reviews" />
        <Stat value={item.ratingAverage} label="Rating" />
      </View>
      {showGithubButton && (
        <TouchableOpacity style={styles.button} onPress={handleOpenGitHub}>
          <Text style={styles.buttonText}>Open in GitHub</Text>
        </TouchableOpacity>
      )}
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
    url: PropTypes.string
  }).isRequired,
  showGithubButton: PropTypes.bool
};

export default RepositoryItem;