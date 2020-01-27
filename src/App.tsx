import React, { Component } from 'react';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import codePush from 'react-native-code-push';

import { configureStore } from './store/configureStore';
import { Platform } from 'react-native';
import { RootNavigator } from './AppNavigation';
import { setTopLevelNavigator } from './utilities/navigation';
import { Root } from 'native-base';
import { Modal } from './screens/Modal';

const store = configureStore();

interface Props {}
interface State {
	loggedIn: boolean;
}

class App extends Component<Props, State> {
	state = {
		loggedIn: false,
	};

	componentDidMount() {
		// For Android, hide the splashscreen after mount
		if (Platform.OS === 'android') {
			SplashScreen.hide();
		}
	}

	render() {
		return (
			<Provider store={store}>
				<Root>
					<RootNavigator
						ref={(navigatorRef) => {
							setTopLevelNavigator(navigatorRef);
						}}
					/>
					<Modal />
				</Root>
			</Provider>
		);
	}
}

export default codePush({
	checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
	installMode: codePush.InstallMode.IMMEDIATE,
})(App);
