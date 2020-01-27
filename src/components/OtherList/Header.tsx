import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	TextInput,
	TouchableOpacity,
	Text,
} from 'react-native';
import { Icon } from 'native-base';

class Header extends Component {
	state = {
		myself_source: '',
		myself_amount: '',
		spouse_source: '',
		spouse_amount: '',
	};

	addNewItem = () => {
		if (this.state.myself_source != '' || this.state.spouse_source != '') {

			this.props.addItem(this.state);
			this.setState({
				myself_source: '',
				myself_amount: '',
				spouse_source: '',
				spouse_amount: '',
			});
		}
	}
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.content_l}>
					<View style={{ flexDirection: 'column' }}>
						<View style={{ flex: 1, flexDirection: 'row' }}>
							<Text
								style={{
									flex: 2,
									textAlign: 'center',
									textAlignVertical: 'center',
									paddingRight: 10,
								}}
							>
								Source
							</Text>
							<TextInput
								style={styles.inputText}
								placeholder="Enter new"
								autoCorrect={false}
								value={this.state.myself_source}
								onChangeText={(newval) =>
									this.setState({ myself_source: newval })
								}
							/>
							<TextInput
								style={styles.inputText}
								placeholder="Enter new"
								autoCorrect={false}
								value={this.state.spouse_source}
								onChangeText={(newval) =>
									this.setState({ spouse_source: newval })
								}
							/>
						</View>
						<View style={{ flex: 1, flexDirection: 'row' }}>
							<Text
								style={{
									flex: 2,
									textAlign: 'center',
									textAlignVertical: 'center',
									paddingRight: 10,
								}}
							>
								Amount
							</Text>
							<TextInput
								style={styles.inputText}
								placeholder="Enter new"
								autoCorrect={false}
								keyboardType = 'numeric'
								value={this.state.myself_amount.toString()}								
								onChangeText={(newval) =>
									this.setState({ myself_amount: newval })
								}
							/>
							<TextInput
								style={styles.inputText}
								placeholder="Enter new"
								autoCorrect={false}
								keyboardType = 'numeric'
								value={this.state.spouse_amount.toString()}
								onChangeText={(newval) =>
									this.setState({ spouse_amount: newval })
								}
							/>
						</View>
					</View>
				</View>
				<View style={styles.content_R}>
					<TouchableOpacity
						style={{
							width: '100%',
							height: '100%',
							backgroundColor: '#3a8081',
							borderRadius: 5,
						}}
						onPressOut={this.addNewItem}
					>
						<Text
							style={{
								color: 'white',
								textAlignVertical: 'center',
								textAlign: 'center',
								height: '100%',
							}}
						>
							{' '}
							ADD{' '}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		borderBottomWidth: 1,
		paddingTop: 3,
		paddingBottom: 2,
		borderColor: '#3a8081',
	},
	content_l: { flex: 4 },
	content_R: {
		// flex: 1,
		width: 64,
		alignContent: 'center',
		alignItems: 'center',
		padding: 4,
		paddingRight: 8,
	},
	inputText: {
		flex: 3,
		borderColor: '#3a8081',
		borderWidth: 1,
		height: 30,
		padding: 2,
		paddingLeft: 5,
		marginRight: 5,
		marginLeft: 5,
		marginTop: 2,
		marginBottom: 2,
	},
	addBtn: {
		color: '#3a8081',
	},
});

export default Header;
