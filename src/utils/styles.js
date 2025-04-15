import { StyleSheet } from "react-native";

import theme from "./theme";

const styles = StyleSheet.create({
  container: {
    padding: theme.numbers.fiveTeen,
    backgroundColor: theme.colors.white
  },
  box: {
    flexDirection: theme.flexDirection.row,
    marginBottom: theme.numbers.ten
  },
  header: {
    padding: theme.numbers.fiveTeen,
    backgroundColor: theme.colors.primary,
    flexDirection: theme.flexDirection.row
  },
  scrollContainer: {
    flexDirection: theme.flexDirection.row,
    alignItems: theme.align.center
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  headerText: {
    color: theme.colors.white,
    fontWeight: theme.fontWeights.bold
  },
  text: {
    color: theme.colors.primary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal
  },
  colorTextSecondary: {
    color: theme.colors.secondary
  },
  colorPrimary: {
    color: theme.colors.primary
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold
  },
  avatar: {
    width: theme.numbers.fifty,
    height: theme.numbers.fifty,
    borderRadius: theme.numbers.five,
    marginRight: theme.numbers.fiveTeen
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
    borderRadius: theme.numbers.five,
    overflow: "hidden"
  },
  button: {
    backgroundColor: theme.colors.blue,
    padding: 12,
    borderRadius: theme.numbers.five,
    alignItems: theme.align.center,
    marginTop: theme.numbers.fiveTeen
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: theme.fontWeights.bold,
    textTransform: theme.display.none,
    fontSize: theme.numbers.fiveTeen
  },
  stats: {
    flexDirection: theme.flexDirection.row,
    justifyContent: "space-around",
    marginTop: theme.numbers.ten
  },
  statItem: {
    alignItems: theme.align.center
  },
  statLabel: {
    color: theme.colors.secondary
  },
  ratingContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderColor: theme.colors.blue,
    borderWidth: 2,
    alignItems: theme.align.center,
    justifyContent: theme.align.center,
    marginRight: theme.numbers.fiveTeen
  },
  rating: {
    color: theme.colors.blue,
    fontWeight: theme.fontWeights.bold,
    fontSize: 16
  },
  info: {
    flexShrink: 1
  },
  username: {
    fontWeight: theme.fontWeights.bold,
    fontSize: 16
  },
  date: {
    color: theme.colors.secondary,
    marginTop: 2
  },
  reviewText: {
    marginTop: theme.numbers.five,
    fontSize: 14,
    lineHeight: 20
  },
  form: {
    padding: 16,
    gap: 12,
    backgroundColor: theme.colors.white
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.grey,
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
  },
  errorInput: {
    borderColor: theme.colors.red
  },
  errorText: {
    color: theme.colors.red,
    marginTop: -8,
    marginLeft: 8
  },
  gap: {
    marginBottom: theme.numbers.ten
  }
});

export default styles;