import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChooseTechnologies from "../../pages/ChooseTechnologiesScreen/ChooseTechnologies";
import KnowledgeTest from '../../pages/KnowledgeTestScreen/KnowledgeTest';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="KnowledgeTest">
      <Stack.Screen name="ChooseTechnologies" component={ChooseTechnologies} />
      <Stack.Screen name="KnowledgeTest" component={KnowledgeTest} />
    </Stack.Navigator>
  );
}

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChooseTechnologies" component={ChooseTechnologies} />
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