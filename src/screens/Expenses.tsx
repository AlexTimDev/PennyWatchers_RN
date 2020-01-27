import React, { Component } from 'react';
import {
	Container,
	Content,
	H3,
	Text,
	Item,
	Input,
	Label,
	Icon,
} from 'native-base';
import {
	View,
	StyleSheet,
	KeyboardAvoidingView,
	TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationScreenProps } from 'react-navigation';
import { isEqual } from 'lodash';
import { TextInputMask } from 'react-native-masked-text';

import { AppHeader } from '../components/AppHeader';
import {
	getCategoriesAction,
	GetCategoriesAction,
	saveBudgetItemAction,
	SaveBudgetItemAction,
	DeleteBudgetItemAction,
	deleteBudgetItemAction,
} from '../store/Expenses/actions';
import { Category } from '../store/Expenses/types';
import { colors } from '../constants';
import { styles } from '../styles';
import { Loader } from '../components/Loader';
import { MonthYearSwitcher, MonthYear } from '../components/MonthYearSwitcher';
import { StyledButton } from '../components/StyledInputs';
import { OpenModalAction, openModalAction } from '../store/Modal/actions';
import { HeaderWithAddIcon } from '../components/HeaderWithAddIcon';

interface Props extends NavigationScreenProps {
	categories: Category[];
	isLoading: boolean;
	username: string;
	password: string;

	getCategories: (
		username: string,
		password: string,
		month?: string,
		year?: string,
	) => GetCategoriesAction;
	saveBudgetItems: (
		username: string,
		password: string,
		month: string,
		year: string,
		budgetItems: Category[],
	) => SaveBudgetItemAction;
	deleteBudgetItem: (
		username: string,
		password: string,
		BudgetID: number,
		successAction: () => void,
	) => DeleteBudgetItemAction;
	openModal: (deleteAction: () => any) => OpenModalAction;
}

interface State {
	activeSections: number[];
	categories: Category[];
	month: number;
	year: number;
	dataModified: boolean;
}

class UnconnectedExpenses extends Component<Props, State> {
	willFocusSubscription: any = null;

	state = {
		activeSections: [],
		categories: this.props.categories,
		month: new Date().getMonth() + 1,
		year: new Date().getFullYear(),
		dataModified: false,
	};

	componentDidMount() {
		this.willFocusSubscription = this.props.navigation.addListener(
			'willFocus',
			() => this.changeCategories(),
		);
	}

	componentWillUnmount() {
		this.willFocusSubscription.remove();
	}

	componentDidUpdate(prevProps: Props) {
		if (!isEqual(this.props.categories, prevProps.categories)) {
			this.setState({
				categories: this.props.categories,
			});
		}
	}

	renderHeader = (section: any) => {
		return (
			<View style={expenseStyles.header}>
				<H3 style={expenseStyles.headerText}>{section.title}</H3>
			</View>
		);
	}

	renderContent = (section: any) => {
		return (
			<View>
				{section.content.map((category: Category, index: number) =>
					this.renderRow(category, index),
				)}
			</View>
		);
	}

	renderRow = (category: Category, key: number) => {
		const onChangeAmount = (amount: string) => {
			const categories = this.state.categories.map((cat: Category) => {
				if (cat.BudgetID === category.BudgetID) {
					return { ...cat, Amount: amount, modified: true };
				}
				return cat;
			});
			this.setState({ categories, dataModified: true });
		};

		const onDeletePress = () =>
			this.props.openModal(() =>
				this.props.deleteBudgetItem(
					this.props.username,
					this.props.password,
					category.BudgetID,
					this.changeCategories,
				),
			);

		const onEditPress = () => {
			const { month, year } = this.state;
			this.props.navigation.navigate('AddEditCategory', {
				item: { ...category, month, year },
			});
		};

		return (
			<View key={key} style={expenseStyles.content}>
				<View style={{ flexGrow: 1 }}>
					<Text style={{ fontSize: 14 }} numberOfLines={1}>
						{category.SubCategory}
					</Text>
				</View>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Item
						style={{ ...styles.inputText, paddingLeft: 5, width: 75 }}
						regular
					>
						<Label
							style={{ fontSize: 10, position: 'absolute', top: 2, left: 8 }}
						>
							Amount
						</Label>
						<TextInputMask
							type={'money'}
							value={category.Amount}
							onChangeText={onChangeAmount}
							keyboardType="decimal-pad"
							options={{
								precision: 2,
								separator: '.',
								delimiter: ',',
								unit: '$',
								suffixUnit: '',
							}}
							customTextInput={Input}
							customTextInputProps={{ style: styles.textSize }}
						/>
					</Item>
					<TouchableOpacity
						onPress={onDeletePress}
						style={{ paddingVertical: 10, paddingLeft: 15 }}
					>
						<Icon
							type="SimpleLineIcons"
							name="trash"
							style={{ fontSize: 16 }}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={onEditPress}
						style={{ paddingVertical: 10, paddingLeft: 15 }}
					>
						<Icon type="SimpleLineIcons" name="note" style={{ fontSize: 16 }} />
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	sections = () => {
		const list: any = [];
		for (const category of this.state.categories) {
			if (!list.length || category.Category !== list[list.length - 1].title) {
				list.push({
					title: category.Category,
					content: [
						{
							...category,
							Amount:
								typeof category.Amount === 'number'
									? '$' + category.Amount.toFixed(2)
									: category.Amount,
						},
					],
				});
			} else {
				list[list.length - 1].content.push({
					...category,
					Amount:
						typeof category.Amount === 'number'
							? '$' + category.Amount.toFixed(2)
							: category.Amount,
				});
			}
		}
		return list;
	}

	onChangeMonthYear = ({ month, year }: MonthYear) =>
		this.setState({ month, year }, this.changeCategories)

	changeCategories = () => {
		const { month, year } = this.state;
		const { username, password } = this.props;
		this.props.getCategories(
			username,
			password,
			month.toString(),
			year.toString(),
		);
	}

	onSubmit = () => {
		const { username, password } = this.props;
		const { month, year } = this.state;
		const budgetItems = this.state.categories
			.filter((category) => category.modified)
			.map((category) => {
				const Amount = category.Amount.replace(/[^0-9.]/g, '');
				return { ...category, Amount };
			});
		this.props.saveBudgetItems(
			username,
			password,
			month.toString(),
			year.toString(),
			budgetItems,
		);
	}

	navigateToAdd = () => this.props.navigation.navigate('AddEditCategory');

	render() {
		return (
			<Container>
				<AppHeader navigation={this.props.navigation} />
				{/* <View style={{flex:0.1,flexDirection:'row'}}> */}
				{/* <View style={{flex:3}}> */}
				<HeaderWithAddIcon
					navigateToAdd={this.navigateToAdd}
					title="Categories"
				/>
				{/* </View> */}
				{/* <View style={{flex:1}}>
						<StyledButton
							onPress={this.onSubmit}
							disabled={!this.state.dataModified}
							text=""
						/>
					</View>
				</View> */}

				<MonthYearSwitcher
					onChangeMonthYear={this.onChangeMonthYear}
					month={this.state.month}
					year={this.state.year}
				/>
				<Content>
					{this.props.isLoading ? (
						<View style={{ alignSelf: 'center' }}>
							<Loader />
						</View>
					) : (
						this.sections().map((section: any, index: number) => (
							<View key={index}>
								{this.renderHeader(section)}
								{this.renderContent(section)}
							</View>
						))
					)}
				</Content>
				<KeyboardAvoidingView behavior="position" style={{ paddingBottom: 35 }}>
					<StyledButton
						onPress={this.onSubmit}
						disabled={!this.state.dataModified}
						text="Save"
					/>
				</KeyboardAvoidingView>
			</Container>
		);
	}
}

const mapStateToProps = ({
	config: { categories, isLoading },
	session: { username, password },
}: any) => ({
	categories,
	isLoading,
	username,
	password,
});

const mapDispatchToProps = (dispatch: any) => ({
	getCategories: (
		username: string,
		password: string,
		month?: string,
		year?: string,
	) => dispatch(getCategoriesAction({ username, password, month, year })),
	saveBudgetItems: (
		username: string,
		password: string,
		month: string,
		year: string,
		budgetItems: Category[],
	) =>
		dispatch(
			saveBudgetItemAction({ username, password, month, year, budgetItems }),
		),
	deleteBudgetItem: (
		username: string,
		password: string,
		BudgetID: number,
		successAction: () => void,
	) =>
		dispatch(
			deleteBudgetItemAction({ username, password, BudgetID, successAction }),
		),
	openModal: (deleteAction: () => any) =>
		dispatch(
			openModalAction({
				message: 'Are you sure?',
				modalType: 'delete',
				okayAction: deleteAction,
			}),
		),
});

export const Expenses = connect(
	mapStateToProps,
	mapDispatchToProps,
)(UnconnectedExpenses);

const expenseStyles = StyleSheet.create({
	header: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 10,
		padding: 10,
		backgroundColor: colors.BLUE_GRAY,
		borderRadius: 5,
	},
	content: {
		marginHorizontal: 50,
		marginVertical: 5,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	headerText: {
		color: colors.LIGHT_GRAY,
	},
});
