import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { View } from 'react-native';

class RollingTotals extends React.Component {
	constructor(props) {
		super(props);
	}	
	static defaultProps = {
		EstimatedIncome: 0,
		EstimatedExpense: 0,
		ActualIncome: 0,
		ActualExpense: 0,
	};
	render() {
	//	const { style } = this.props;

		return (
			<View>
				<View
					style={{
						flexDirection: 'row',
					//	 height: 15,
						backgroundColor: '#9fb09b',
						paddingTop: 4,
						paddingLeft: 20,
						paddingRight: 20,
						paddingBottom: 4,
					}}
				>
					<View style={{ flex: 0.3 }}>
						<Text
							style={{ fontWeight: 'bold', color: '#424e3f', fontSize: 15 }}
						>
							Estimates
						</Text>
					</View>
					<View style={{ flex: 0.4 }}></View>
					<View style={{ flex: 0.3 }}>
						<Text
							style={{
								textAlign: 'right',
								fontWeight: 'bold',
								color: '#424e3f',
								fontSize: 15,
							}}
						>
							Actuals
						</Text>
					</View>
				</View>
				<View
					style={{
						flexDirection: 'row',
					//	 height: 15,
						paddingTop: 5,
						paddingBottom: 5,
						paddingLeft: 20,
						paddingRight: 20,
					}}
				>
					<View>
						<Text style={{ textAlign: 'justify' }}>$</Text>
					</View>
					<View style={{ flex: 0.3 }}>
						<Text style={{ textAlign: 'left' }}>
							{this.props.EstimatedIncome.toFixed(2)}
						</Text>
					</View>
					<View style={{ flex: 0.4 }}>
						<Text style={{ textAlign: 'center', color: 'black' }}>Income</Text>
					</View>
					<View>
						<Text style={{ textAlign: 'justify' }}>$</Text>
					</View>
					<View style={{ flex: 0.3 }}>
						<Text style={{ textAlign: 'right' }}>
							{this.props.ActualIncome.toFixed(2)}
						</Text>
					</View>
				</View>

				<View
					style={{
						flexDirection: 'row',
					//	 height: 15,
						paddingTop: 5,
						paddingBottom: 5,
						paddingLeft: 20,
						paddingRight: 20,
					}}
				>
					<View>
						<Text
							style={{
								borderBottomColor: '#737373',
								borderBottomWidth: StyleSheet.hairlineWidth,
								textAlign: 'justify',
							}}
						>
							$
						</Text>
					</View>
					<View style={{ flex: 0.3 }}>
						<Text
							style={{
								borderBottomColor: '#737373',
								borderBottomWidth: StyleSheet.hairlineWidth,
								textAlign: 'left',
							}}
						>
							{this.props.EstimatedExpense.toFixed(2)}
						</Text>
					</View>
					<View style={{ flex: 0.4 }}>
						<Text style={{ textAlign: 'center', color: 'black' }}>
							Expenses
						</Text>
					</View>
					<View>
						<Text
							style={{
								borderBottomColor: '#737373',
								borderBottomWidth: StyleSheet.hairlineWidth,
								textAlign: 'justify',
							}}
						>
							$
						</Text>
					</View>
					<View style={{ flex: 0.3 }}>
						<Text
							style={{
								borderBottomColor: '#737373',
								borderBottomWidth: StyleSheet.hairlineWidth,
								textAlign: 'right',
							}}
						>
							{this.props.ActualExpense.toFixed(2)}
						</Text>
					</View>
				</View>
				<View
					style={{
						flexDirection: 'row',
					//	 height: 5,
						paddingTop: 5,
						paddingBottom: 5,
						paddingLeft: 20,
						paddingRight: 20,
					}}
				>
					<View>
						<Text style={{ textAlign: 'justify' }}>$</Text>
					</View>
					<View style={{ flex: 0.3 }}>
						<Text style={{ textAlign: 'left' }}>
							{(
								this.props.EstimatedIncome - this.props.EstimatedExpense
							).toFixed(2)}
						</Text>
					</View>
					<View style={{ flex: 0.4 }}>
						<Text style={{ textAlign: 'center', color: 'black' }}>
							Remaining
						</Text>
					</View>
					<View>
						<Text style={{ textAlign: 'justify', color: 'red' }}>($</Text>
					</View>
					<View style={{ flex: 0.3 }}>
						<Text style={{ textAlign: 'right', color: 'red' }}>
							{(this.props.ActualIncome - this.props.ActualExpense).toFixed(2)})
						</Text>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	baseText: {
		fontFamily: 'Cochin',
	},
	titleText: {
		fontSize: 20,
		fontWeight: 'bold',
	},
});

export default RollingTotals;
