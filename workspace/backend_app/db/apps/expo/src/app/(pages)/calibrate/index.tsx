import { ScrollView, View } from "react-native";
import { router } from "expo-router";

import StyledText, { typography } from "~/components/styled/StyledText";
import TitleBar from "~/components/Title";
import Button from "~/components/ui/Button";
import GlobalLayout from "~/components/ui/GlobalLayout";

const Index = () => {
  return (
    <ScrollView>
      <TitleBar>GETTING STARTED</TitleBar>

      <View className={"flex p-4"}>
        <StyledText style={typography.h2}>
          Welcome to Your Exercise Program!{" "}
        </StyledText>
        <StyledText>
          Over the next 8 weeks, you'll be working on a simple exercise routine
          to help manage your back pain. You'll be growing a new plant each week
          to track your progress! Here’s how it works:
        </StyledText>
        <View>
          <StyledText></StyledText>
        </View>
        <StyledText style={typography.h2}>How to Use the App: </StyledText>
        <StyledText style={typography.h5}>
          Do Your Exercises Twice a Day:{" "}
        </StyledText>
        <StyledText>
          Each day, you’ll need to complete a short exercise session twice. You
          can choose when during the day to do them—morning and evening, or
          whenever suits you.{" "}
        </StyledText>
        <View>
          <StyledText></StyledText>
        </View>
        <StyledText style={typography.h5}>Exercise 3 Days a Week: </StyledText>
        <StyledText>
          You'll need to exercise at least 3 times a week, with a day of rest in
          between if needed.{" "}
        </StyledText>
        <View>
          <StyledText></StyledText>
        </View>
        <StyledText style={typography.h5}>8 Weeks of Progress: </StyledText>
        <StyledText>
          Continue this routine for 8 weeks. Each week, you'll see a new plant
          growing in the app. Every time you finish a day of exercises, your
          plant will grow a little more. By the end of the 3 days, you'll have a
          fully grown plant for that week!
        </StyledText>
        <View>
          <StyledText></StyledText>
        </View>
        <StyledText>
          Your goal is to collect 8 fully grown plants by the end of the
          program!{" "}
        </StyledText>
        <View>
          <StyledText></StyledText>
        </View>
        <StyledText>Remember: </StyledText>
        <StyledText>
          - Set your reminders to get a notification when it’s time to exercise.{" "}
        </StyledText>
        <StyledText>- You can take breaks whenever you need. </StyledText>
        <StyledText>
          - At the end of the 8 weeks, you’ll have a garden full of 8 beautiful
          plants, showing all the hard work you’ve done!
        </StyledText>
      </View>

      <Button onPress={() => router.push("/calibrate/calibration")}>
        Continue
      </Button>
    </ScrollView>
  );
};

export default Index;
