import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import KnowledgeTest from '../../pages/KnowledgeTestScreen/KnowledgeTest';
import SetAGoal from '../../pages/SetAGoalScreen/SetAGoal';
import KnowledgeTestIntro from "../../pages/KnowledgeTestScreen/KnowledgeTestIntro";
import ListChallenges from "../../pages/ListChallengesScreen/ListChallenges";
import ProfileOptions from "../../pages/ProfileOptionsScreen/ProfileOptions";
import Account from "../../pages/ProfileOptionsScreen/Account";
import PrivacyAndSecurityOptions from "../../pages/ProfileOptionsScreen/PrivacyAndSecutityOptions";
import ChangePassword from "../../pages/ProfileOptionsScreen/ChangePassword";
import ChooseTechnologies from "../../pages/ChooseTechnologiesScreen/chooseTechnologies";
import Classroom from "../../pages/ClassroomScreen/Classroom";

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="ListChallenges">
      <Stack.Screen name="ListChallenges" component={ListChallenges} />
      <Stack.Screen name="KnowledgeTestIntro" component={KnowledgeTestIntro} />
      <Stack.Screen name="KnowledgeTest" component={KnowledgeTest} />
      <Stack.Screen name="ChooseTechnologies" component={ChooseTechnologies} />
      <Stack.Screen name="Classroom" component={Classroom} />
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