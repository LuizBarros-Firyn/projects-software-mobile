import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './screens/Login';
import RegisterOptions from './screens/RegisterOptions';
import ClientRegister from './screens/ClientRegister';
import FreelancerRegister from './screens/FreelancerRegister';
import ClientMain from './screens/ClientMain';
import FreelancerMain from './screens/FreelancerMain';
import NewProject from './screens/NewProject';
import NewOffer from './screens/NewOffer';
import OffersReview from './screens/OffersReview';
import OngoingProjects from './screens/OngoingProjects';
import ProjectDevelopment from './screens/ProjectDevelopment';
import PasswordRecovery from './screens/PasswordRecovery';
import PasswordReset from './screens/PasswordReset';

const AppStack = createStackNavigator();

export default function routes() {
    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown: false}}>
                <AppStack.Screen name="Login" component={Login} />
                <AppStack.Screen name="RegisterOptions" component={RegisterOptions} />
                <AppStack.Screen name="ClientRegister" component={ClientRegister} />
                <AppStack.Screen name="FreelancerRegister" component={FreelancerRegister} />
                <AppStack.Screen name="ClientMain" component={ClientMain} />
                <AppStack.Screen name="FreelancerMain" component={FreelancerMain} />
                <AppStack.Screen name="NewProject" component={NewProject} />
                <AppStack.Screen name="NewOffer" component={NewOffer} />
                <AppStack.Screen name="OffersReview" component={OffersReview} />
                <AppStack.Screen name="OngoingProjects" component={OngoingProjects} />
                <AppStack.Screen name="ProjectDevelopment" component={ProjectDevelopment} />
                <AppStack.Screen name="PasswordRecovery" component={PasswordRecovery} />
                <AppStack.Screen name="PasswordReset" component={PasswordReset} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}