import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Footer, FooterTab, Text, Icon, Button } from 'native-base';
import { NavigationScreenProps } from 'react-navigation';
import { colors } from '../constants';

const activeTabColors = [
	colors.LIGHT_GREEN,
	colors.BLUE_GRAY,
	colors.LIGHT_BLUE,
	colors.LIGHT_ORANGE,
];

interface Props extends NavigationScreenProps {}

export class AppFooter extends Component<Props> {
	state = {
		active: false,
	};

	TabButton = (
		iconType:
			| 'FontAwesome'
			| 'AntDesign'
			| 'Entypo'
			| 'EvilIcons'
			| 'Feather'
			| 'FontAwesome5'
			| 'Foundation'
			| 'Ionicons'
			| 'MaterialCommunityIcons'
			| 'MaterialIcons'
			| 'Octicons'
			| 'SimpleLineIcons'
			| 'Zocial'
			| undefined,
		iconName: string,
		tabName: string,
		tabRoute: string,
		tabNumber: number,
	) => {
		const navigate = () => this.props.navigation.navigate(tabRoute);
		return (
			<Button
				vertical
				style={{
					backgroundColor:
						this.props.navigation.state.index === tabNumber
							? activeTabColors[tabNumber]
							: colors.LIGHT_GRAY,
				}}
				active={this.props.navigation.state.index === tabNumber}
				onPress={navigate}
			>
				<Icon style={styles.footerTabIcon} type={iconType} name={iconName} />
				<Text style={styles.footerTabText}>{tabName}</Text>
			</Button>
		);
	}

	render() {
		return (
			<Footer>
				<FooterTab
					style={{
						backgroundColor: colors.LIGHT_GRAY,
						color: colors.DARK_GRAY,
					}}
				>
					{this.TabButton('FontAwesome', 'money', 'Income', 'Income', 0)}
					{this.TabButton(
						'SimpleLineIcons',
						'drawer',
						'Categories',
						'Expenses',
						1,
					)}
					{this.TabButton(
						'SimpleLineIcons',
						'calendar',
						'Calendar',
						'Calendar',
						2,
					)}
					{this.TabButton('SimpleLineIcons', 'folder', 'Report', 'Report', 3)}
				</FooterTab>
			</Footer>
		);
	}
}

const styles = StyleSheet.create({
	footerTabText: {
		fontSize: 10,
		color: colors.DARK_GRAY,
	},
	footerTabIcon: {
		color: colors.DARK_GRAY,
	},
});
