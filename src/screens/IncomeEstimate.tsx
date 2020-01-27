import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';
import { NavigationScreenProps } from 'react-navigation';

import { orderBy } from 'lodash';

import { AppHeader } from '../components/AppHeader';
import { Income } from '../store/Income/types';

// updated by LJC
import {
	GetIncomeAction,
	getIncomeAction,
	SaveIncomeListAction,
	saveIncomeListAction,
} from '../store/Income/actions';
import { MonthYearSwitcher, MonthYear } from '../components/MonthYearSwitcher';
import { HeaderWithAddIcon } from '../components/HeaderWithAddIcon';
import { Loader } from '../components/Loader';
import {
	View,
	Button,
	TouchableOpacity,
	Text,
	Dimensions,
	StyleSheet,
	TextInput,
} from 'react-native';
import { Icon,H1 } from 'native-base';
 

interface Props extends NavigationScreenProps {
	isLoading: boolean;
	username: string;
	password: string;
	IncomeList: Income[];

	// Dispatch props
	getIncomeList: (
		username: string,
		password: string,
		month: number,
		year: number,
	) => GetIncomeAction;

	saveIncomeList: (
		username: string,
		password: string,
		month: string,
		year: string,
		IncomeList: Income[],
	) => SaveIncomeListAction;
}

interface State {
	IncomeList: Income[];
	month: number;
	year: number;
	username: string;
	password: string;
}

export class UnconnectedIncomeEstimate extends Component<Props, State> {
	willFocusSubscription: any = null;
	state = {
		month: new Date().getMonth() + 1,
		year: new Date().getFullYear(),
		IncomeList: [],
		username: '',
		password: '',
	};

	componentDidMount() {
		this.willFocusSubscription = this.props.navigation.addListener(
			'willFocus',
			() => this.changeIncomeList(),
		);
	}
	componentWillUnmount() {
		this.willFocusSubscription.remove();
	}

	componentWillReceiveProps(props) {
		this.setState({
			IncomeList: props.IncomeList,
			username: props.username,
			password: props.password,
		});
	}

	changeIncomeList() {
		const { username, password } = this.props;
		const { month, year } = this.state;
		this.props.getIncomeList(username, password, month, year);
	}

	onChangeMonthYear = ({ month, year }: MonthYear) => {
		this.setState({ month, year }, this.changeIncomeList);
	}

	onSaveIncome = () => {

		
		const { username, password } = this.props;
		const { month, year } = this.state;
		const IncomeList = this.state.IncomeList;

		this.props.saveIncomeList(
			username,
			password,
			month.toString(),
			year.toString(),
			IncomeList,
		);
	}

	onFindGross(identifier: string, self: boolean) {
		const list = this.state.IncomeList;
		const obj = list.find(
			(e) => e.IncomeIdentifier === identifier && e.Self == self,
		);
		if (obj) {
			return String(Math.abs(obj.GrossAmount));
		}
		return '';
	}

	// This is sum part

	onSumMyselfMonthly(self: boolean) {
		const myselfList = this.state.IncomeList.filter((obj) => obj.Self === self);
		let sum: number;
		sum = 0;
		myselfList.map((item) => {

			if (item.IncomeIdentifier == '5a' ||
				item.IncomeIdentifier == '5b' ||
				item.IncomeIdentifier == '5c' ||
				item.IncomeIdentifier == '5d' ||
				item.IncomeIdentifier == '5e' ||
				item.IncomeIdentifier == '5f' ||
				item.IncomeIdentifier == '5g' ||
				item.IncomeIdentifier == '5h')  sum = sum - Math.abs(Number(item.GrossAmount));
			else sum = sum + Math.abs(Number(item.GrossAmount));
		});

		return String(Math.abs(sum));
	}

	onSumGrossIncome(self: boolean) {
		const myselfList = this.state.IncomeList.filter(
			(obj) =>
				obj.Self === self &&
				(obj.IncomeIdentifier == '2' || obj.IncomeIdentifier == '3'),
		);
		let sum: number;
		sum = 0;
		myselfList.map((item) => {
			sum = sum + Number(item.GrossAmount);
		});

		return String(Math.abs(sum));
	}

	onSumPayrollDeductions(self: boolean) {
		const myselfList = this.state.IncomeList.filter(
			(obj) => obj.Self === self && ( obj.IncomeIdentifier === '5h' || obj.IncomeIdentifier === '5a'|| obj.IncomeIdentifier === '5b'|| obj.IncomeIdentifier === '5c'|| obj.IncomeIdentifier === '5d'|| obj.IncomeIdentifier === '5e'|| obj.IncomeIdentifier === '5f'|| obj.IncomeIdentifier === '5g' )
		);
		let sum: number;
		sum = 0;
		myselfList.map((item) => {
			sum = sum + Math.abs(item.GrossAmount);
		});

		return String(Math.abs(sum));
	}

	onSumHomePay(self: boolean) {
		const myselfList = this.state.IncomeList.filter(obj =>
				   (obj.Self === self) &&
				   (obj.IncomeIdentifier == '2' ||
					obj.IncomeIdentifier == '3' ||
					obj.IncomeIdentifier == '5a' ||
					obj.IncomeIdentifier == '5b' ||
					obj.IncomeIdentifier == '5c' ||
					obj.IncomeIdentifier == '5d' ||
					obj.IncomeIdentifier == '5e' ||
					obj.IncomeIdentifier == '5f' ||
					obj.IncomeIdentifier == '5g' ||
					obj.IncomeIdentifier == '5h'),
		);
		
		let sum: number = 0;		
		myselfList.map((item) => {
			
			if (item.IncomeIdentifier == '5a' ||
				item.IncomeIdentifier == '5b' ||
				item.IncomeIdentifier == '5c' ||
				item.IncomeIdentifier == '5d' ||
				item.IncomeIdentifier == '5e' ||
				item.IncomeIdentifier == '5f' ||
				item.IncomeIdentifier == '5g' ||
				item.IncomeIdentifier == '5h')  sum = sum - Math.abs(Number(item.GrossAmount));
			else sum = sum + Math.abs(Number(item.GrossAmount));
			});
			return String(Math.abs(sum));
		}

	onSumOtherIncome(self: boolean) {
		const myselfList = this.state.IncomeList.filter(
			(obj) => obj.Self === self && obj.IncomeIdentifier == '8h',
		);
		let sum: number;
		sum = 0;
		myselfList.map((item) => {
			sum = sum + item.GrossAmount;
		});

		return String(Math.abs(sum));
	}

	onSumOtherDeductions(self: boolean) {			
		
		const myselfList = this.state.IncomeList.filter(
			(obj) => obj.Self === self && obj.IncomeIdentifier == '5h',
		);
	
		let sum: number;
		sum = 0;
		myselfList.map((item) => {
			sum = sum + Math.abs(Number(item.GrossAmount));
		});

		return String(Math.abs(sum));
	}

	onSumOtherGoverment(self: boolean) {
		const myselfList = this.state.IncomeList.filter(
			(obj) => obj.Self === self && obj.IncomeIdentifier == '8f',
		);
		let sum: number;
		sum = 0;
		myselfList.map((item) => {
			sum = sum + item.GrossAmount;
		});

		return String(Math.abs(sum));
	}

	onSumAllOtherIncome(self: boolean) {
		const myselfList = this.state.IncomeList.filter(
			(obj) =>
				obj.Self === self &&
				(obj.IncomeIdentifier == '8a' ||
					obj.IncomeIdentifier == '8b' ||
					obj.IncomeIdentifier == '8c' ||
					obj.IncomeIdentifier == '8d' ||
					obj.IncomeIdentifier == '8e' ||
					obj.IncomeIdentifier == '8f' ||
					obj.IncomeIdentifier == '8g' ||
					obj.IncomeIdentifier == '8h'),
		);
		let sum: number;
		sum = 0;
		myselfList.map((item) => {
			sum = sum + item.GrossAmount;
		});

		return String(Math.abs(sum));
	}

	// -----------end-----------

	navigateToAddPage = (tabIndex:number) => {
		
		this.props.navigation.navigate('AddEditIncomeEstimate', {
			month: this.state.month,
			year: this.state.year,
			username: this.state.username,
			password: this.state.password,
			tabIndex: tabIndex,
		});
	}
	
	navigateToAdd = () => {
		
		this.props.navigation.navigate('AddEditIncomeEstimate', {
			month: this.state.month,
			year: this.state.year,
			username: this.state.username,
			password: this.state.password,
			tabIndex:0,		
		});
	}

	onValueChange = (identifier: string, self: boolean, value: string) => {
		const IncomeList = this.state.IncomeList;
		let obj = IncomeList.find(
			(e) => e.IncomeIdentifier === identifier && e.Self === self,
		);

		if (!obj) {
			obj = {};
			obj.IncomeID = 1;
			obj.IncomeIdentifier = identifier;
			obj.Self = self;
			obj.IncomeSource = '';
			obj.HelpString = '';
			IncomeList.push(obj);
		}
		obj.GrossAmount = Number(value);
		this.setState({ IncomeList });
	}

	render() {
		return (
			<Container>

				<AppHeader navigation={this.props.navigation} />
				<H1 style ={{
							flexDirection: 'row',
							marginTop: 10,
							textAlign: 'center',
							alignItems: 'center',
							justifyContent: 'center'
							}}>Income Estimates</H1>
				{/* <HeaderWithAddIcon
					  navigateToAdd={this.navigateToAdd}
					title="Income Estimates"
				/> */}

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
						
						<View style={styles.ParentView}>							
							
						
							<View style={styles.headView}>
									<Text style={styles.myselfView} > Myself </Text>
									<Text style={styles.spouseView} > Spouse </Text>
							</View>
							
							<View>
								<Text>Monthly gross wages, salary, and commissions</Text>
								<View style={styles.headInputView}>
									<TextInput
										keyboardType={'numeric'}
										style={styles.myselfInputView}
										value={this.onFindGross('2', true)}
										onChangeText={(text) => this.onValueChange('2', true, text)}
									></TextInput>
									<TextInput
										keyboardType={'numeric'}
										style={styles.spouseInputView}
										value={this.onFindGross('2', false)}
										onChangeText={(text) => this.onValueChange('2', false, text)}
									></TextInput>
								</View>
							</View>

							<View>
								<Text>Estimate and list monthly overtime pay</Text>
								<View style={styles.headInputView}>
									<TextInput
										keyboardType={'numeric'}
										style={styles.myselfInputView}
										onChangeText={(text) => this.onValueChange('3', true, text)}
										value={this.onFindGross('3', true)}
									></TextInput>
									<TextInput
										keyboardType={'numeric'}
										style={styles.spouseInputView}
										onChangeText={(text) => this.onValueChange('3', false, text)}
										value={this.onFindGross('3', false)}
									></TextInput>
								</View>
							</View>
							<View style={styles.separator}>
								{/* <View style={styles.totalHeaderView}>
									<Text style={styles.totalTitleView}>Gross income</Text>
									<Text style={styles.myselfTotalView}>
										{'$' + this.onSumGrossIncome(true)}
									</Text>
									<Text style={styles.spouseTotalView}>
										{'$' + this.onSumGrossIncome(false)}
									</Text>
								</View> */}
								<View>
									<Text style={{ padding:7, paddingLeft:0, fontWeight:'bold', color:'black'}}>Gross income</Text>									
									<View style={{flexDirection:'row'}}>
										<Text style={{ width: 50, height:20, position: 'relative', marginLeft:130,
											fontWeight:'bold', color:'black'}} >{'$' + this.onSumGrossIncome(true)}</Text>
										<Text style={{width: 50, height:20, position: 'relative', marginLeft:60,
											fontWeight:'bold', color:'black'}} >{'$' + this.onSumGrossIncome(false)} </Text>
									</View>														
							
								</View>
							</View>
							<Text style={{fontStyle: 'italic',padding:10, paddingLeft:0}}>All payroll deductions</Text>  							
							<View>
								<Text>Tax, Medicare, and Social Security deducations</Text>
								<View style={styles.headInputView}>
									<TextInput
										keyboardType={'numeric'}
										style={styles.myselfInputView}
										onChangeText={(text) => this.onValueChange('5a', true, text)}
										value={this.onFindGross('5a', true)}
									></TextInput>
									<TextInput
										keyboardType={'numeric'}
										style={styles.spouseInputView}
										onChangeText={(text) => this.onValueChange('5a', false, text)}
										value={this.onFindGross('5a', false)}
									></TextInput>
								</View>
							</View>

							<View>
								<Text>Mandatory contributions for retirement plans</Text>
								<View style={styles.headInputView}>
									<TextInput
										keyboardType={'numeric'}
										style={styles.myselfInputView}
										onChangeText={(text) => this.onValueChange('5b', true, text)}
										value={this.onFindGross('5b', true)}
									></TextInput>
									<TextInput
										keyboardType={'numeric'}
										style={styles.spouseInputView}
										onChangeText={(text) => this.onValueChange('5b', false, text)}
										value={this.onFindGross('5b', false)}
									></TextInput>
								</View>
							</View>

							<View>
								<Text>Voluntary contributions for retirement plans</Text>
								<View style={styles.headInputView}>
									<TextInput
										keyboardType={'numeric'}
										style={styles.myselfInputView}
										onChangeText={(text) => this.onValueChange('5c', true, text)}
										value={this.onFindGross('5c', true)}
									></TextInput>
									<TextInput
										keyboardType={'numeric'}
										style={styles.spouseInputView}
										onChangeText={(text) => this.onValueChange('5c', false, text)}
										value={this.onFindGross('5c', false)}
									></TextInput>
								</View>
							</View>

							<View>
								<Text>Required payments of retirement fund loans</Text>
								<View style={styles.headInputView}>
									<TextInput
										keyboardType={'numeric'}
										style={styles.myselfInputView}
										onChangeText={(text) => this.onValueChange('5d', true, text)}
										value={this.onFindGross('5d', true)}
									></TextInput>
									<TextInput
										keyboardType={'numeric'}
										style={styles.spouseInputView}
										onChangeText={(text) => this.onValueChange('5d', false, text)}
										value={this.onFindGross('5d', false)}
									></TextInput>
								</View>
							</View>

							<View>
								<Text>Insurance</Text>
								<View style={styles.headInputView}>
									<TextInput
										keyboardType={'numeric'}
										style={styles.myselfInputView}
										onChangeText={(text) => this.onValueChange('5e', true, text)}
										value={this.onFindGross('5e', true)}
									></TextInput>
									<TextInput
										keyboardType={'numeric'}
										style={styles.spouseInputView}
										onChangeText={(text) => this.onValueChange('5e', false, text)}
										value={this.onFindGross('5e', false)}
									></TextInput>
								</View>
							</View>

							<View>
								<Text>Domestic support obligations</Text>
								<View style={styles.headInputView}>
									<TextInput
										keyboardType={'numeric'}
										style={styles.myselfInputView}
										onChangeText={(text) => this.onValueChange('5f', true, text)}
										value={this.onFindGross('5f', true)}
									></TextInput>
									<TextInput
										keyboardType={'numeric'}
										style={styles.spouseInputView}
										onChangeText={(text) => this.onValueChange('5f', false, text)}
										value={this.onFindGross('5f', false)}
									></TextInput>
								</View>
							</View>

							<View>
								<Text>Union dues</Text>
								<View style={styles.headInputView}>
									<TextInput
										keyboardType={'numeric'}
										style={styles.myselfInputView}
										onChangeText={(text) => this.onValueChange('5g', true, text)}
										value={this.onFindGross('5g', true)}
									></TextInput>
									<TextInput
										keyboardType={'numeric'}
										style={styles.spouseInputView}
										onChangeText={(text) => this.onValueChange('5g', false, text)}
										value={this.onFindGross('5g', false)}
									></TextInput>
								</View>
							</View>
							<View>
								<Text>Other deductions </Text>
								
								<View style={styles.headInputView}>

									<TouchableOpacity
										style={{ width: '11%', height: 30,marginLeft:'10%', }}
										onPressOut={() => this.navigateToAddPage(0)}
									>
										<Icon
											type="SimpleLineIcons"
											name="note"
											style={{
												marginTop:5,
												marginBottom:5,
												color: '#ffaa44',
												fontSize: 20,
												textAlign: 'center',
												
											}}
										/>
									</TouchableOpacity>
									
									<Text
																			
										style={{
													width: '25%',
													height: 30,	
													marginLeft:'5%',											
												
													marginTop: 15,
													padding: 3,
												}}
										
										
									>{'$' + this.onSumOtherDeductions(true)}</Text>
									<Text
									
										style={{

											width: '25%',
											height: 30,
											marginLeft:'5%',	
										
											marginTop: 15,
											padding: 3,
										}}
										
										
									>{'$' + this.onSumOtherDeductions(false)}</Text>									
								</View>
							</View>							
							<View>
								<Text style={{ padding:7, paddingLeft:0, fontWeight:'bold', color:'black'}}>Payroll deductions</Text>									
								<View style={{flexDirection:'row'}}>
									<Text style={{ width: 50, height:20, position: 'relative', marginLeft:130,
										 fontWeight:'bold', color:'black'}} >{'$' + this.onSumPayrollDeductions(true)}</Text>
									<Text style={{width: 50, height:20, position: 'relative', marginLeft:60,
										 fontWeight:'bold', color:'black'}} >{'$' + this.onSumPayrollDeductions(false)} </Text>
								</View>														
							
							</View>
							<View style={styles.separator}>

							<Text style={{ padding:7, paddingLeft:0, fontWeight:'bold', color:'black'}}>Monthly take-home pay</Text>									
								<View style={{flexDirection:'row'}}>
									<Text style={{ width: 50, height:20, position: 'relative', marginLeft:130,
										 fontWeight:'bold', color:'black'}} >{'$' + this.onSumHomePay(true)}</Text>
									<Text style={{width: 50, height:20, position: 'relative', marginLeft:60,
										 fontWeight:'bold', color:'black'}} >{'$' + this.onSumHomePay(false)} </Text>
								</View>														
							</View>
							<Text style={{fontStyle: 'italic',padding:10, paddingLeft:0}}>All other income regularly received</Text> 
							<View>
								<Text>Business and rental property income</Text>
								<View style={styles.headInputView}>
									<TextInput
										keyboardType={'numeric'}
										style={styles.myselfInputView}
										onChangeText={(text) => this.onValueChange('8a', true, text)}
										value={this.onFindGross('8a', true)}
									></TextInput>
									<TextInput
										keyboardType={'numeric'}
										style={styles.spouseInputView}
										onChangeText={(text) => this.onValueChange('8a', false, text)}
										value={this.onFindGross('8a', false)}
									></TextInput>
								</View>
							</View>

							<View>
								<Text>Interest and dividends </Text>
								<View style={styles.headInputView}>
									<TextInput
										keyboardType={'numeric'}
										style={styles.myselfInputView}
										onChangeText={(text) => this.onValueChange('8b', true, text)}
										value={this.onFindGross('8b', true)}
									></TextInput>
									<TextInput
										keyboardType={'numeric'}
										style={styles.spouseInputView}
										onChangeText={(text) => this.onValueChange('8b', false, text)}
										value={this.onFindGross('8b', false)}
									></TextInput>
								</View>
							</View>

							<View>
								<Text>Family support received </Text>
								<View style={styles.headInputView}>
									<TextInput
										keyboardType={'numeric'}
										style={styles.myselfInputView}
										onChangeText={(text) => this.onValueChange('8c', true, text)}
										value={this.onFindGross('8c', true)}
									></TextInput>
									<TextInput
										keyboardType={'numeric'}
										style={styles.spouseInputView}
										onChangeText={(text) => this.onValueChange('8c', false, text)}
										value={this.onFindGross('8c', false)}
									></TextInput>
								</View>
							</View>

							<View>
								<Text>Unemployment compensation </Text>
								<View style={styles.headInputView}>
									<TextInput
										keyboardType={'numeric'}
										style={styles.myselfInputView}
										onChangeText={(text) => this.onValueChange('8d', true, text)}
										value={this.onFindGross('8d', true)}
									></TextInput>
									<TextInput
										keyboardType={'numeric'}
										style={styles.spouseInputView}
										onChangeText={(text) => this.onValueChange('8d', false, text)}
										value={this.onFindGross('8d', false)}
									></TextInput>
								</View>
							</View>

							<View>
								<Text>Social Security </Text>
								<View style={styles.headInputView}>
									<TextInput
										keyboardType={'numeric'}
										style={styles.myselfInputView}
										onChangeText={(text) => this.onValueChange('8e', true, text)}
										value={this.onFindGross('8e', true)}
									></TextInput>
									<TextInput
										keyboardType={'numeric'}
										style={styles.spouseInputView}
										onChangeText={(text) => this.onValueChange('8e', false, text)}
										value={this.onFindGross('8e', false)}
									></TextInput>
								</View>
							</View>

							<View>
								<Text>
									Other government assistance that you regularly receive{' '}
								</Text>
								<View style={styles.headInputView}>

									<TouchableOpacity
										style={{ width: '11%', height: 30, marginLeft:'10%' }}
										onPressOut={() => this.navigateToAddPage(1)}
									>
										<Icon
											type="SimpleLineIcons"
											name="note"
											style={{
												marginTop:5,
												marginBottom:5,
												color: '#ffaa44',
												fontSize: 20,												
												textAlign: 'center',
											}}
										/>
									</TouchableOpacity>
									<Text
									
										style={{

											width: '25%',
											height: 30,
											marginLeft:'5%',												
											marginTop: 15,
											padding: 3,
										}}
										
										
									>{'$' + this.onSumOtherGoverment(true)}</Text>
									<Text
									
										style={{

											width: '25%',
											height: 30,
											marginLeft:'5%',											
											marginTop: 15,
											padding: 3,
										}}
										
										
									>{'$' + this.onSumOtherGoverment(false)}</Text>
									
								</View>
							</View>

							<View>
								<Text>Pension or retirement income </Text>
								<View style={styles.headInputView}>
									<TextInput
										keyboardType={'numeric'}
										style={styles.myselfInputView}
										onChangeText={(text) => this.onValueChange('8g', true, text)}
										value={this.onFindGross('8g', true)}
									></TextInput>
									<TextInput
										keyboardType={'numeric'}
										style={styles.spouseInputView}
										onChangeText={(text) => this.onValueChange('8g', false, text)}
										value={this.onFindGross('8g', false)}
									></TextInput>
								</View>
							</View>
							<View>
								<Text>Other monthly income </Text>
								<View style={styles.headInputView}>


									<TouchableOpacity
										style={{ marginLeft:'10%', width: '11%', height: 30 }}
										onPressOut={() => this.navigateToAddPage(2)}
									>
										<Icon
											type="SimpleLineIcons"
											name="note"
											style={{
												marginTop:5,
												marginBottom:5,
												color: '#ffaa44',
												fontSize: 20,												
												textAlign: 'center',
											}}
										/>
									</TouchableOpacity>
									
									<Text
										
										style={{

											width: '25%',
											height: 30,
											marginLeft:'5%',										
											marginTop: 15,
											padding: 3,
										}}
									
										
									>{'$' + this.onSumOtherIncome(true)}</Text>
									<Text
										
										style={{

											width: '25%',
											height: 30,
											marginLeft: 20,										
											marginTop: 15,
											padding: 3,
										}}
										
										
									>{'$' + this.onSumOtherIncome(false)}</Text>
									
								</View>
							</View>

							<View>
								{/* <View style={styles.totalHeaderView}>
									<Text style={styles.totalTitleView}>All other income</Text>
									<Text style={styles.myselfTotalView}>
										{'$' + this.onSumAllOtherIncome(true)}
									</Text>
									<Text style={styles.spouseTotalView}>
										{'$' + this.onSumAllOtherIncome(false)}
									</Text>
								</View> */}
								<View>
									<Text style={{ padding:7, paddingLeft:0, fontWeight:'bold', color:'black'}}>All other income</Text>									
									<View style={{flexDirection:'row'}}>
										<Text style={{ width: 50, height:20, position: 'relative', marginLeft:130,
											fontWeight:'bold', color:'black'}} >{'$' + this.onSumAllOtherIncome(true)}</Text>
										<Text style={{width: 50, height:20, position: 'relative', marginLeft:60,
											fontWeight:'bold', color:'black'}} >{'$' + this.onSumAllOtherIncome(false)} </Text>
									</View>					
							
								</View>								
							</View>
							<View>
								{/* <View style={styles.totalHeaderView}>
									<Text style={styles.totalTitleView}>Monthly income</Text>
									<Text style={styles.myselfTotalView}>
										{'$' + this.onSumMyselfMonthly(true)}
									</Text>
									<Text style={styles.spouseTotalView}>
										{'$' + this.onSumMyselfMonthly(false)}
									</Text>
								</View> */}
								<View>
									<Text style={{ padding:7, paddingLeft:0, fontWeight:'bold', color:'black'}}>Monthly income</Text>									
									<View style={{flexDirection:'row', marginBottom:10}}>
										<Text style={{ width: 50, height:20, position: 'relative', marginLeft:130,
											fontWeight:'bold', color:'black'}} >{'$' + this.onSumMyselfMonthly(true)}</Text>
										<Text style={{width: 50, height:20, position: 'relative', marginLeft:60,
											fontWeight:'bold', color:'black'}} >{'$' + this.onSumMyselfMonthly(false)} </Text>
									</View>								
								</View>						
							</View>						
							
						</View>					
					)}
					
				</Content>			

				<TouchableOpacity
					style={{ width: '80%', height: 45, alignSelf:'center', backgroundColor:'#ffaa44'}}
					onPressOut={() => this.onSaveIncome()}
					
				>
					<Text style={{  alignSelf:'center', color:'white', fontSize: 17, fontWeight:'bold',padding:10}}>SAVE</Text>
				</TouchableOpacity>
				<Text style ={{ width:'100%', height:40}}	 />
			</Container>
		);
	}
}

// updated by LJC
const { width, height } = Dimensions.get('window');
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
	'window',
);
function wp(percentage: number) {
	const value = (percentage * width) / 100;
	return Math.round(value);
}
function wh(percentage: number) {
	const value = (percentage * height) / 100;
	return Math.round(value);
}

const innerWidth = wp(90);
const spouseWidth = wp(30);
const myselfWidth = wp(60);

const btnHeight = wh(70);
const styles = StyleSheet.create({
	
	headView: {
		width: innerWidth,
		height: 30,
		alignSelf: 'center',
		flexDirection: 'row',
	},
	ParentView: {
		width: innerWidth,
		alignSelf: 'center',
	},
	spouseView: {
		width: '25%',
		height:30,		
		color: 'black',
		fontSize: 15,
		textAlign: 'left',
		fontWeight: 'bold',

		// letterSpacing: 0.5,
	},
	myselfView: {		

		width: '25%',
		height: 30,
		marginLeft: '30%',		
		fontWeight: 'bold',
		fontSize: 15,
		color: 'black',	
		textAlign:'left',	
	},
	headInputView: {
		width: innerWidth,
		height: 50,
		alignSelf: 'center',
		flexDirection: 'row',
		
	},

	spouseInputView: {
		width: '20%',
		height: 30,
		marginLeft: '10%',
		borderColor: 'gray',
		borderWidth: 1,
		marginTop: 15,
		padding: 3,	
	},
	myselfInputView: {
		width: '15%',
		height: 30,
		marginLeft: '25%',		
		borderColor: 'gray',
		borderWidth: 1,
		marginTop: 15,		
		padding: 3,		
	},

	spouseTotalView: {
		width: 100,
		height: 30,
		// marginRight: 30,
		marginTop: 15,
		padding: 3,
		color: 'black',
		fontWeight: 'bold',
		// letterSpacing: 0.5,
	},
	myselfTotalView: {
		width: 100,
		height: 30,
		// marginRight: 20,
		marginTop: 15,
		padding: 3,
		color: 'black',
		fontWeight: 'bold',
		// letterSpacing: 0.5,
	},
	totalTitleView: {
		width: 110,
		height: 120,
		marginRight: 20,
		marginTop: 15,
		padding: 3,
		color: 'black',
		fontWeight: 'bold',
	},
	totalHeaderView: {
		width: innerWidth,
		height: 30,
		alignSelf: 'center',
		flexDirection: 'row',
		color: 'black',
		fontWeight: 'bold',
		marginBottom: 10,
	},

	save_btn: {
		width: '80%',
		height: 70,
		bottom: 50,
		fontSize:60,
		position: "absolute",
		alignSelf: 'center',
		flexDirection: 'row',		
		marginTop: 10,
	},

	separator: {
		marginVertical: 8,
		borderBottomColor: '#737373',
		borderBottomWidth: StyleSheet.hairlineWidth,		
	},
});
// ----------updated by LJC--------------end

const mapStateToProps = ({
	session: { username, password },
	income: { IncomeList, isLoading },
}: any) => ({
	isLoading,
	username,
	password,
	IncomeList,
});

const mapDispatchToProps = (dispatch: any) => ({
	getIncomeList: (
		username: string,
		password: string,
		month: number,
		year: number,
	) => dispatch(getIncomeAction({ username, password, month, year })),

	saveIncomeList: (
		username: string,
		password: string,
		month: number,
		year: number,
		IncomeList: Income[],
	) =>
		dispatch(
			saveIncomeListAction({ username, password, month, year, IncomeList }),
		),
});

export const IncomeEstimate = connect(
	mapStateToProps,
	mapDispatchToProps,
)(UnconnectedIncomeEstimate);
