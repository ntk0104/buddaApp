import { createStackNavigator, createAppContainer } from 'react-navigation';

import  HeadScreen  from './Head'
import  InviteFriendScreen  from './InviteFriend'
import  MyPrayersScreen  from './MyPrayers'
import  PrayHistoryScreen  from './PrayHistory'
import  PrayWithYouScreen  from './PrayWithYou'
import  SubscribedScreen  from './Subscribed'

const MainNavigation = createStackNavigator({
    Head: HeadScreen,
    InviteFriend: InviteFriendScreen,
    MyPrayers: MyPrayersScreen,
    PrayHistory: PrayHistoryScreen,
    PrayWithYou: PrayWithYouScreen,
    Subscribed: SubscribedScreen
}, {
    initialRouteName: 'Head',
    headerMode: 'none' // for design by myself instead of using default
})

export default createAppContainer(MainNavigation)