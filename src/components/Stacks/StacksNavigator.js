import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SetAGoal from '../../pages/SetAGoalScreen/SetAGoal';
import ListChallenges from "../../pages/ListChallengesScreen/ListChallenges";
import ProfileOptions from "../../pages/ProfileOptionsScreen/ProfileOptions";
import Account from "../../pages/ProfileOptionsScreen/Account";
import PrivacyAndSecurityOptions from "../../pages/ProfileOptionsScreen/PrivacyAndSecutityOptions";
import ChangePassword from "../../pages/ProfileOptionsScreen/ChangePassword";
import ChooseTechnologies from "../../pages/ChooseTechnologiesScreen/chooseTechnologies";
import Classroom from "../../pages/ClassroomScreen/Classroom";
import ClassroomExercise from "../../pages/ClassroomScreen/ClassroomExercise";

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="ListChallenges">
      <Stack.Screen name="ListChallenges" component={ListChallenges} />
      <Stack.Screen name="ChooseTechnologies" component={ChooseTechnologies} />
      <Stack.Screen name="Classroom" component={Classroom} />
      <Stack.Screen name="ClassroomExercise" component={ClassroomExercise} />
    </Stack.Navigator>
  );
}

const RankingStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="ChooseTechnologies">
      <Stack.Screen name="ChooseTechnologies" component={ChooseTechnologies} />
    </Stack.Navigator>
  );
}

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="ProfileOptions">
      <Stack.Screen name='ProfileOptions' component={ProfileOptions} />
      <Stack.Screen name='Account' component={Account} />
      <Stack.Screen name='PrivacyAndSecurity' component={PrivacyAndSecurityOptions} />
      <Stack.Screen name='ChangePassword' component={ChangePassword} />
      <Stack.Screen name='SetAGoal' component={SetAGoal} />
    </Stack.Navigator>
  );
}

export { MainStackNavigator, ProfileStackNavigator, RankingStackNavigator };