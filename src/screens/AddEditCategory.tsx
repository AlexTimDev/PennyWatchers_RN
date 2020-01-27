import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Content, Form, H1, Container } from 'native-base';
import { get } from 'lodash';
import { NavigationScreenProps } from 'react-navigation';

import { styles } from '../styles';
import {
	getCategoriesAction,
	GetCategoriesAction,
	SaveBudgetItemAction,
	saveBudgetItemAction,
} from '../store/Expenses/actions';
import { Category, Expense } from '../store/Expenses/types';
import { AppHeader } from '../components/AppHeader';
import {
	StyledTextInput,
	StyledButton_new,
	StyledTextPickerCombo,
	StyledDropDownList,
} from '../components/StyledInputs';
import { MonthYearSwitcher, MonthYear } from '../components/MonthYearSwitcher';
import { View, Text } from 'react-native';

import { baseURL } from '../config';
import { uniq } from 'lodash';
import { Loader } from '../components/Loader';

interface Props extends NavigationScreenProps {
	isLoading: boolean;
	categories: string[];
	username: string;
	password: string;
	date: Date;

	// Dispatch props
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
}

interface State {
	month: number;
	year: number;
	category: string;
	subCategory: string;
}

export class UnconnectedAddEditCategory extends Component<Props, State> {

	constructor(props){
		super(props);
		this.loadingData();
	}

	itemToEdit: any = get(this.props.navigation, 'state.params.item', null);
	state = {
		month: !!this.itemToEdit
			? this.itemToEdit.month
			: this.props.date.getMonth() + 1,
		year: !!this.itemToEdit
			? this.itemToEdit.year
			: this.props.date.getFullYear(),
		category: !!this.itemToEdit
			? this.itemToEdit.Category
			: this.props.categories[0],
		subCategory: !!this.itemToEdit ? this.itemToEdit.SubCategory : '',
		isLoading: true,
		categoriesList: [
			{
				major: '',
				minor: [
					{
						title: '',
						completed: false,
					},
				]
			},
		],
		changeflag: true,
		saveMode:true,
		
	};

	loadingData = () => {

		const username = this.props.username;
		const password = this.props.password;
		const month = this.state.month;
		const year = this.state.year;
		const url =
			baseURL +
			`/Budgets/GetUnusedCategories?username=${username}&password=${password}&budgetMonth=${month}&budgetYear=${year}`;
		fetch(url).then(res => res.json())
		.then(json => {

			let AllList = json.UnusedCategoryList;//categories list;
			let uniqList = uniq(AllList.map((budgetItem: Category) => budgetItem.Category));//category kind
			let tmpCategories = [];
			uniqList.map((kindItem, kindIndex) => {
				tmpCategories.push({ major: kindItem, minor: [] });
			});
			AllList.map((elItem, elIndex) => {
				tmpCategories.find((finditem) => finditem.major === elItem.Category).minor.push({ title: elItem.SubCategory, completed: false });
			});

			this.setState({
				isLoading: false,
				categoriesList: tmpCategories,
			});
		});
	}

	onChangeMonth = (month: number) => this.setState({ month });
	onChangeYear = (year: number) => this.setState({ year });
	onChangeSubCategory = (subCategory: string) => this.setState({subCategory:subCategory, changeflag:false});
	onChangeCategory = (category: string) => this.setState({category});
	onChangeSaveMode = (saveMode: boolean) => this.setState({saveMode});

	onChangeMonthYear = ({ month, year }: MonthYear) => {
		const isLoading : boolean = true;
		const categoriesList : [] = '';
		this.setState({ month, year, isLoading, categoriesList }, () => this.loadingData());
	}

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

	onSubmitPress = () => {
		const { username, password } = this.props;
		const { month, year} = this.state;
		const subCategory = this.state.subCategory;
		const category = this.state.category;
		let sendingData : Category[] = [];
		this.state.saveMode ?
		(
			this.state.categoriesList.map((eleItem, index) => {
				eleItem.minor.map((minorItem, minorindex) => {
					if (minorItem.completed) {
						sendingData.push({
							SubCategory: minorItem.title,
							Category: eleItem.major,
							BudgetID: !!this.itemToEdit ? this.itemToEdit.BudgetID : 0,
							Amount: 0,
						});
					} 
				
				});
			})		
		 ) : (
			sendingData.push({
				SubCategory: subCategory,
				Category: category,
				BudgetID: !!this.itemToEdit ? this.itemToEdit.BudgetID : 0,
				Amount: 0,
			})
		)
		
		this.props.saveBudgetItems(
			username,
			password,
			month.toString(),
			year.toString(),
			sendingData,
		)
	}
	onSelectItem = (index: number, index1: number) => {
		let tmpCategories = this.state.categoriesList;
		tmpCategories[index].minor[index1].completed = !tmpCategories[index].minor[index1].completed;
		this.setState({
			categoriesList : tmpCategories,
			changeflag : false,
		});
	}
	buttonEnabled = () =>
		this.state.category.length > 0 && this.state.subCategory.length > 0

	render() {
		return (
			<Container>
				<AppHeader navigation={this.props.navigation} back={true} />
				<H1 style={styles.header}>Add a Category</H1>

						<Content contentContainerStyle={styles.containerVerticalTop}>
						<Form style={styles.form}>
							<MonthYearSwitcher
								onChangeMonthYear={this.onChangeMonthYear}
								month={this.state.month}
								year={this.state.year}
							/>
							<StyledDropDownList
								categories={this.state.categoriesList}
								onSelectItem={this.onSelectItem}
								value={this.state.category}
								value1={this.state.subCategory}
								onChangeSubCategory={this.onChangeSubCategory}
								onChangeCategory={this.onChangeCategory}
								onChangeSaveMode={this.onChangeSaveMode}
								placeholder="Major category"
								showInitialValueInTextField={!!this.itemToEdit}
							/>
						</Form>
						<StyledButton_new
							onPress={this.onSubmitPress}
							disabled={this.state.changeflag}
							loading={this.state.isLoading}
							text="Add Selected"
						/>
					</Content>
		
			</Container>
		);
	}
}

const mapStateToProps = ({
	config: { categoriesUnique },
	session: { username, password },
	data: { date },
}: any) => ({
	categories: categoriesUnique,
	username : username,
	password : password,
	date: date,
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
			saveBudgetItemAction({
				username,
				password,
				month,
				year,
				budgetItems,
				isCategory: true,
			}),
		),
});

export const AddEditCategory = connect(
	mapStateToProps,
	mapDispatchToProps,
)(UnconnectedAddEditCategory);
