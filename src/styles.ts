import { StyleSheet } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { colors } from './constants';

export const styles = StyleSheet.create({
	wrapper: {},
	containerVerticalTop: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		marginBottom: isIphoneX ? 50 : 5,
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
	header: {
		textAlign: 'center',
		paddingVertical: 10,
	},
	input: {
		backgroundColor: '#FFF',
		paddingLeft: 5,
		fontSize: 14,
		borderRadius: 10,
		marginVertical: 5,
	},
	inputText: {
		backgroundColor: '#FFF',
		paddingLeft: 15,
		fontSize: 14,
		borderRadius: 10,
		marginVertical: 5,
	},
	textSize: {
		fontSize: 14,
	},
	inputDate: {
		backgroundColor: '#FFF',
		marginVertical: 5,
		paddingVertical: 5,
		paddingLeft: 10,
		borderRadius: 10,
	},
	inputTextArea: {
		fontSize: 14,
		width: '100%',
	},
	form: {
		width: '100%',
		paddingHorizontal: 20,
		paddingBottom: 10,
	},
	pickerPlaceholderStyle: {
		color: '#444',
		fontSize: 14,
	},
	buttonStyle: {
		backgroundColor: '#ffaa44',
		marginTop: 10,
		marginHorizontal: 20,
	},
	buttonStyleNew: {
		backgroundColor: '#ffaa44',
		position: 'absolute',
		width:'89%',
		bottom: 5,
		marginTop: 5,
		marginRight: 21,
		marginLeft:25,
	},
	buttonSecondaryStyle: {
		margin: 20,
	},
	buttonSecondaryTextStyle: {
		fontWeight: '200',
		fontSize: 18,
	},
	disabledButtonStyle: {
		backgroundColor: '#BBB',
		marginTop: 5,
		marginRight: 21,
		marginLeft:25,
	},
	disabledButtonStyleNew: {
		backgroundColor: '#BBB',
		position: 'absolute',
		width:'89%',
		bottom: 5,
		marginTop: 5,
		marginRight: 21,
		marginLeft:25,
	},
	buttonTextStyle: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	pickerStyle: {
		fontSize: 14,
	},
	errorMessage: {
		textAlign: 'center',
		fontSize: 10,
		color: colors.ERROR,
	},
	treeviewText:{	
		color:'#fff',																															
		fontWeight: 'bold',				
		fontSize: 17,
		width:'90%',
	}
});
