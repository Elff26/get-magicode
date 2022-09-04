import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import KnowledgeTest from '../../pages/KnowledgeTestScreen/KnowledgeTest';
import SetAGoal from '../../pages/SetAGoalScreen/SetAGoal';
import KnowledgeTestIntro from "../../pages/KnowledgeTestScreen/KnowledgeTestIntro";
import LearningTrail from "../../pages/LearningTrailScreen/LearningTrail";
import ProfileOptions from "../../pages/ProfileOptionsScreen/ProfileOptions";
import Account from "../../pages/ProfileOptionsScreen/Account";
import PrivacyAndSecurityOptions from "../../pages/ProfileOptionsScreen/PrivacyAndSecutityOptions";
import ChangePassword from "../../pages/ProfileOptionsScreen/ChangePassword";
import ChooseTechnologias from "../../pages/KnowledgeTestScreen/KnowledgeTest";

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="LearningTrail">
      <Stack.Screen name="LearningTrail" component={LearningTrail} />
      <Stack.Screen name="KnowledgeTestIntro" component={KnowledgeTestIntro} />
      <Stack.Screen name="KnowledgeTest" component={KnowledgeTest} />
    </Stack.Navigator>
  );
}

const RankingStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="ChooseTechnologies">
      <Stack.Screen name="ChooseTechnologies" component={ChooseTechnologias} />
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