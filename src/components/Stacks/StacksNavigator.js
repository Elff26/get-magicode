import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChooseTechnologies from "../../pages/ChooseTechnologiesScreen/ChooseTechnologies";
import KnowledgeTest from '../../pages/KnowledgeTestScreen/KnowledgeTest';
import SetAGoal from '../../pages/SetAGoalScreen/SetAGoal';
import KnowledgeTestIntro from "../../pages/KnowledgeTestScreen/KnowledgeTestIntro";

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="ChooseTechnologies">
      <Stack.Screen name="ChooseTechnologies" component={ChooseTechnologies} />
      <Stack.Screen name="KnowledgeTestIntro" component={KnowledgeTestIntro} />
      <Stack.Screen name="KnowledgeTest" component={KnowledgeTest} />
    </Stack.Navigator>
  );
}

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='SetAGoal' component={SetAGoal} />
    </Stack.Navigator>
  );
}

const RankingStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChooseTechnologies" component={ChooseTechnologies} />
    </Stack.Navigator>
  );
}

export { MainStackNavigator, ProfileStackNavigator, RankingStackNavigator };