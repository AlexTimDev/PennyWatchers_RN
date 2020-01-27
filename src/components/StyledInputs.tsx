import React from 'react';
import { Item, Input, Button, Text, Textarea, Picker, Icon } from 'native-base';
import { TextInputMask } from 'react-native-masked-text';
import DatePicker from 'react-native-datepicker';
import {
	TextInputProperties,
	View,
	StyleSheet,
	ScrollView,
	FlatList,
	Image,
	TouchableOpacity,
	SafeAreaView,
} from 'react-native';

import DropDownItem from './react-native-drop-down-item';
import { Category, CategoryFormat } from '../store/Expenses/types';
import { uniq } from 'lodash';

import { styles } from '../styles';
import { Loader } from './Loader';

const IC_ARR_DOWN = require('../images/ic_arr_down.png');
const IC_ARR_UP = require('../images/ic_arr_up.png');
const IC_CHECK_OK = require('../images/check.png');
const IC_CHECK_NO = require('../images/circle.png');

interface TextInputProps extends TextInputProperties {
	value: string;
	onChangeText: (text: string) => void;
	placeholder: string;
}

export const StyledTextInput = (props: TextInputProps) => {
	const { value, onChangeText, placeholder, ...rest } = props;
	return (
		<Item style={styles.inputText} regular>
			<Input
				placeholder={placeholder}
				value={value}
				onChangeText={onChangeText}
				style={styles.textSize}
				{...rest}
			/>
		</Item>
	);
};

export const StyledMoneyInput = (props: TextInputProps) => {
	const { value, onChangeText, placeholder, style, ...rest } = props;
	return (
		<Item style={[styles.inputText, style]} regular>
			<TextInputMask
				placeholder={placeholder}
				type={'money'}
				value={value}
				onChangeText={onChangeText}
				options={{
					precision: 2,
					separator: '.',
					delimiter: ',',
					unit: '$',
					suffixUnit: '',
				}}
				keyboardType="numeric"
				customTextInput={Input}
				customTextInputProps={{ style: styles.textSize }}
				{...rest}
			/>
		</Item>
	);
};

interface CommonBottomProps {
	onPress: any;
	text: string;
	style?: any;
}

interface ButtonProps extends CommonBottomProps {
	disabled: boolean | null;
	loading?: boolean;
}

export const StyledButton = (props: ButtonProps) => {
	const { disabled, onPress, loading, text } = props;
	return (
		<Button
			block
			style={
				disabled || loading ? styles.disabledButtonStyle : styles.buttonStyle
			}
			onPress={onPress}
			disabled={disabled || loading}
		>
			{loading ? (
				<Loader />
			) : (
				<Text style={styles.buttonTextStyle}>{text}</Text>
			)}
		</Button>
	);
};
export const StyledButton_new = (props: ButtonProps) => {
	const { disabled, onPress, loading, text } = props;
	return (
		<Button
			block
			style={
				disabled || loading
					? styles.disabledButtonStyleNew
					: styles.buttonStyleNew
			}
			onPress={onPress}
			disabled={disabled || loading}
		>
			{loading ? (
				<Loader />
			) : (
				<Text style={styles.buttonTextStyle}>{text}</Text>
			)}
		</Button>
	);
};

export const DgStyledButton = (props: ButtonProps) => {
	const { disabled, onPress, loading } = props;
	return (
		<Button
			block
			style={
				disabled || loading ? styles.disabledButtonStyle : styles.buttonStyle
			}
			onPress={onPress}
			disabled={disabled || loading}
		>
			<Icon name="md-checkmark" />
		</Button>
	);
};

interface DateProps {
	date: string;
	onDateChange: (date: string) => void;
	disabled?: boolean;
}

export const StyledDateInput = (props: DateProps) => {
	return (
		<Item
			style={{
				...styles.inputDate,
				backgroundColor: props.disabled ? '#EEE' : '#FFF',
			}}
			regular
		>
			<DatePicker
				date={props.date}
				mode="date"
				format="MM/DD/YY"
				confirmBtnText="Confirm"
				cancelBtnText="Cancel"
				onDateChange={props.onDateChange}
				showIcon={false}
				disabled={!!props.disabled}
				customStyles={{
					dateInput: {
						borderWidth: 0,
						alignItems: 'flex-start',
						marginLeft: 10,
					},
					dateText: {
						fontSize: 14,
					},
				}}
			/>
		</Item>
	);
};

interface TextAreaProps {
	value: string;
	onChangeText: (text: string) => void;
	placeholder: string;
}

export const StyledTextArea = (props: TextAreaProps) => {
	return (
		<Item style={styles.input} regular>
			<Textarea
				rowSpan={5}
				placeholder={props.placeholder}
				style={styles.inputTextArea}
				onChangeText={props.onChangeText}
				value={props.value}
			/>
		</Item>
	);
};

interface PickerProps {
	items: Element[];
	selectedValue: any;
	onValueChange: (value: any) => void;
	placeholder: string;
}

export const StyledPicker = (props: PickerProps) => {
	return (
		<Item style={styles.input} regular>
			<Picker
				mode="dropdown"
				selectedValue={props.selectedValue}
				onValueChange={props.onValueChange}
				placeholder={props.placeholder}
				placeholderStyle={styles.pickerPlaceholderStyle}
				textStyle={styles.pickerStyle}
			>
				{props.items}
			</Picker>
		</Item>
	);
};
export const StyledDgPicker = (props: PickerProps) => {
	return (
		<Item style={styles.input} regular>
			<Picker
				mode="dropdown"
				selectedValue={props.selectedValue}
				onValueChange={props.onValueChange}
				placeholder={props.placeholder}
				placeholderStyle={styles.pickerPlaceholderStyle}
				textStyle={styles.pickerStyle}
			>
				{props.items}
			</Picker>
		</Item>
	);
};

export const StyledSecondaryButton = (props: CommonBottomProps) => (
	<Button
		block
		style={[styles.buttonSecondaryStyle, props.style]}
		onPress={props.onPress}
		light
	>
		<Text style={styles.buttonSecondaryTextStyle}>{props.text}</Text>
	</Button>
);

interface AutoCompleteProps {
	data: string[];
	defaultValue: string;
	onChangeText: (text: string) => void;
	onSelection: (text: string) => void;
	placeholder: string;
}

interface TextPickerComboProps {
	items: Element[];
	value: any;
	onChangeText: (text: string) => void;
	placeholder: string;
	showInitialValueInTextField: boolean;
}

interface Subcategory {
	subcategory: Element;
	onSelect: any;
	categoryId: number;
	subId: number;
}

class SubcategoryList extends React.Component<Subcategory> {
	constructor(props) {
		super(props);
		this.state = {
			completed: false,
		};
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.state.completed !== nextState.completed;
	}

	onSelect = () => {
		const tmp = !this.state.completed;
		this.setState({ completed: tmp });
		this.props.onSelect(this.props.categoryId, this.props.subId);
	}

	render() {
		const subcategory = this.props.subcategory;
		const dataString = (str: string) => {
			const lines = str.split('\n');
			return lines[0];
		};
		return (
			<View style={styledStyles.todo}>
				<Text style={styledStyles.todoText} onPress={() => this.onSelect()}>
					{' '}
					{dataString(subcategory.title)}
				</Text>

				<TouchableOpacity
					style={styledStyles.todoCheckbox}
					onPress={() => this.onSelect()}
				>
					{subcategory.completed ? (
						<Image style={{ width: 16, height: 16 }} source={IC_CHECK_OK} />
					) : (
						<Image style={{ width: 16, height: 16 }} source={IC_CHECK_NO} />
					)}
				</TouchableOpacity>
			</View>
		);
	}
}

interface DropDownListProps {
	categories: Element[];
	value: string;
	value1: string;
	onChangeSubCategory: (text: string) => void;
	onChangeCategory: (text: string) => void;
	onChangeSaveMode: (mode: boolean) => void;
	placeholder: string;
	showInitialValueInTextField: boolean;
	onSelectItem: any;
}

export class StyledDropDownList extends React.Component<DropDownListProps> {
	state = {
		textEntry: false,
		edit: false,
		categories: [],
	};

	componentWillReceiveProps(props) {
		this.setState({
			categories: props.categories,
		});
	}

	toggleText = () => {
		this.props.onChangeSaveMode(false);
		this.setState({ textEntry: true });
	}

	togglePicker = () => {
		this.props.onChangeSaveMode(true);
		this.setState({ textEntry: false });
	}

	onChangeSubCategory = (value: string) => {
		if (!this.state.edit) {
			this.setState({ edit: true });
		}
		this.props.onChangeSubCategory(value);
	}

	onChangeCategory = (value: string) => {
		if (!this.state.edit) {
			this.setState({ edit: true });
		}
		this.props.onChangeCategory(value);
	}

	onSelect = (index: number, index1: number) => {
		this.props.onSelectItem(index, index1);
	}

	render() {
		const categories = this.state.categories;
		const dataString = (str: string) => {
			const lines = str.split('\n');
			return lines[0];
		};
		return (
			<View style={{ height: '85%' }}>
				<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
					<Button
						style={styledStyles.leftComboButton}
						primary
						bordered={this.state.textEntry}
						onPress={this.togglePicker}
					>
						<Text style={styledStyles.buttonFont}>Existing</Text>
					</Button>
					<Button
						style={styledStyles.rightComboButton}
						primary
						bordered={!this.state.textEntry}
						onPress={this.toggleText}
					>
						<Text style={styledStyles.buttonFont}>New</Text>
					</Button>
				</View>
				{this.state.textEntry ? (
					<View style={{ marginVertical: 10 }}>
						<StyledTextInput
							value={
								!this.state.edit && !this.props.showInitialValueInTextField
									? ''
									: this.props.value
							}
							onChangeText={this.onChangeCategory}
							placeholder={this.props.placeholder}
						/>

						<StyledTextInput
							placeholder={'Minor category'}
							value={this.props.value1}
							onChangeText={this.onChangeSubCategory}
						/>
					</View>
				) : (
					<View style={styledStyles.container}>
						<ScrollView style={styledStyles.scrollView}>
							{categories
								? categories.map((param: any, index: number) => {
										return (
											<View key={index} style={{ paddingLeft: 5 }}>
												<DropDownItem
													key={index}
													contentVisible={false}
													invisibleImage={IC_ARR_DOWN}
													visibleImage={IC_ARR_UP}
													header={
														<View style={styledStyles.header}>
															<Text style={styledStyles.headerTxt}>
																{param.major}
															</Text>
														</View>}
												>
													{param.minor.map((data: any, index1: number) => {
														return (
															<View key={index1}>
																<SubcategoryList
																	subcategory={data}
																	onSelect={this.onSelect}
																	categoryId={index}
																	subId={index1}
																/>
															</View>
														);
													})}
												</DropDownItem>
											</View>
										);
									})
								: null}
						</ScrollView>
					</View>
				)}
			</View>
		);
	}
}

export class StyledTextPickerCombo extends React.Component<
	TextPickerComboProps
> {
	state = {
		textEntry: false,
		edit: false,
	};

	toggleText = () => this.setState({ textEntry: true });

	togglePicker = () => this.setState({ textEntry: false });

	onChangeText = (value: string) => {
		if (!this.state.edit) {
			this.setState({ edit: true });
		}
		this.props.onChangeText(value);
	}

	render() {
		return (
			<View>
				<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
					<Button
						style={styledStyles.leftComboButton}
						primary
						bordered={this.state.textEntry}
						onPress={this.togglePicker}
					>
						<Text style={styledStyles.buttonFont}>Existing</Text>
					</Button>
					<Button
						style={styledStyles.rightComboButton}
						primary
						bordered={!this.state.textEntry}
						onPress={this.toggleText}
					>
						<Text style={styledStyles.buttonFont}>New</Text>
					</Button>
				</View>
				{this.state.textEntry ? (
					<StyledTextInput
						value={
							!this.state.edit && !this.props.showInitialValueInTextField
								? ''
								: this.props.value
						}
						onChangeText={this.onChangeText}
						placeholder={this.props.placeholder}
					/>
				) : (
					<StyledPicker
						selectedValue={this.props.value}
						onValueChange={this.props.onChangeText}
						placeholder={this.props.placeholder}
						items={this.props.items.map((item: any) => (
							<Picker.Item key={item} label={item} value={item} />
						))}
					/>
				)}
			</View>
		);
	}
}

const styledStyles = StyleSheet.create({
	leftComboButton: {
		minWidth: 100,
		justifyContent: 'center',
		alignItems: 'center',
		borderTopRightRadius: 0,
		borderBottomRightRadius: 0,
	},
	rightComboButton: {
		minWidth: 100,
		justifyContent: 'center',
		alignItems: 'center',
		borderTopLeftRadius: 0,
		borderBottomLeftRadius: 0,
	},

	buttonFont: {
		fontSize: 16,
	},

	container: {
		height: '79%',
		marginBottom: 7,
		padding: 0,
		marginTop: 7,
	},
	scrollView: {
		backgroundColor: '#FFFFFF',
		margin: 0,
	},
	header: {
		width: '100%',
		paddingVertical: 8,
		paddingHorizontal: 22,
		marginHorizontal: 0,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#3F51B5',
		marginVertical: 1,
	},
	headerTxt: {
		fontSize: 15,
		color: '#FFFFFF',
		marginRight: 60,
		flexWrap: 'wrap',
	},
	txt: {
		fontSize: 12,
	},
	todo: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 35,
		backgroundColor: '#777777',
		margin: 1,
		paddingHorizontal: 0,
	},
	todoCheckbox: {
		position: 'absolute',
		right: 18,
	},
	todoText: {
		width: '100%',
		color: '#ffffff',
		fontSize: 15,
		paddingHorizontal: 20,
	},
});
