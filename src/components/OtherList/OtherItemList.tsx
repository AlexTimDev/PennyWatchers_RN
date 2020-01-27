import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Header from './Header';
import Body from './Body';
import { NavigationScreenProps } from 'react-navigation';
import { Income } from '../../store/Income/types';
import { baseURL } from '../../config';
import { urlHeaders } from '../../constants';
import {Modal,Button, TouchableHighlight, Alert} from 'react-native'
import { cancel } from 'redux-saga/effects';



interface Props extends NavigationScreenProps {
	isLoading: boolean;
	username: string;
	password: string;
	month: string;
	year: string;
	tabIndex: number;
}

interface State {
	ItemList: any[];
	IncomeList: Income[];
	month: string;
	year: string;
	username: string;
	password: string;
	Total_myself_amount: number;
	Total_spouse_amount: number;
	tabIndex: number;
	modalVisible: boolean;
	deleteState: number;
}

interface IncomeSchedule {
	myself_source: string;
	myself_amount: number;
	spouse_source: string;
	spouse_amount: number;
}

export class OtherItemList extends Component<Props, State> {
	// willFocusSubscription: any = null;
	state = {
		ItemList: [],
		IncomeList: [],
		month: '',
		year: '',
		username: '',
		password: '',
		Total_myself_amount: 0,
		Total_spouse_amount: 0,
		tabIndex: 0,
		modalVisible: false,
		deleteState: 0,
	};	

	componentWillReceiveProps(props) {
		
			this.setState(
				{
					month: props.month,
					year: props.year,
					username: props.username,
					password: props.password,
					tabIndex: props.tabIndex,
					
				},
				() => this.getIncomeList(),
			);				
	}

	onSumDeduction (self: boolean,tabIndex: number) {
		
			
			let identifier : string = '5h';
			if ( tabIndex == 0) identifier = '5h';
			else if (tabIndex == 1) identifier = '8f';
			else identifier = '8h';
		
			const myselfList = this.state.IncomeList.filter(
				(obj) => obj.Self === self && obj.IncomeIdentifier == identifier,
			);
			let sum: number;
			sum = 0;
			myselfList.map((item) => {
				sum = sum + Math.abs(item.GrossAmount);
			});
	
			return String(Math.abs(sum));		
	}

	getIncomeList = () => {
		const username = this.state.username;
		const password = this.state.password;
		const month = this.state.month;
		const year = this.state.year;

		const url =
			baseURL +
			`/Income/GetIncomeScheduleItems?username=${username}&password=${password}&IncomeMonth=${month}&IncomeYear=${year}`;
		fetch(url)
			.then((res) => res.json())
			.then((json) => {
				const IncomeList = json.IncomeScheduleList;
				this.setState({ IncomeList }, () => {
					
				
					this.renderItems();
					 let mysselfSum = this.onSumDeduction (true,this.props.tabIndex);
					 let spouseSum = this.onSumDeduction (false,this.props.tabIndex);
					 this.setState ({ Total_myself_amount: mysselfSum, Total_spouse_amount:spouseSum});
				});
			});
	}

	saveIncomeList = () => {
		const username = this.state.username;
		const password = this.state.password;
		const month = this.state.month;
		const year = this.state.year;
		const url =
			baseURL +
			`/Income/SaveIncomeSchedule?username=${username}&password=${password}&IncomeMonth=${month}&IncomeYear=${year}`;

		const body = JSON.stringify({
			IncomeScheduleList: this.state.IncomeList,
			ErrorCode: 1,
			ErrorMessage: 'sample string 2',
		});

		fetch(url, { method: 'POST', body, headers: urlHeaders });
	}

	renderItems() {

		let identiStr = '';
		if (this.state.tabIndex == 0) {
			identiStr = '5h';
		} else if (this.state.tabIndex == 1) {
			identiStr = '8f';
		} else {
			identiStr = '8h';
		}
		
		const tempList = this.state.IncomeList.filter(
			(obj) => obj.IncomeIdentifier == identiStr,
		);

		const prestateItemList = this.state.ItemList;
		let tempItem: IncomeSchedule = {};
		const ItemList: [] = [];

		const myselfList = tempList.filter((obj) => obj.Self == true);

		const spouseList = tempList.filter((obj) => obj.Self == false);

		const length = Math.max(myselfList.length, spouseList.length);

		for (let i = 0; i < length; i++) {
			if (myselfList[i]) {
				tempItem.myself_amount = Math.abs(Number(myselfList[i].GrossAmount));
				tempItem.myself_source = myselfList[i].IncomeSource;

				if (spouseList[i]) {
					tempItem.spouse_amount = Math.abs(Number(spouseList[i].GrossAmount));
					tempItem.spouse_source = spouseList[i].IncomeSource;
				} else {
					tempItem.spouse_amount = 0;
					tempItem.spouse_source = '';
				}
			} else {
				tempItem.myself_amount = 0;
				tempItem.myself_source = '';
				tempItem.spouse_amount = Math.abs(Number(spouseList[i].GrossAmount));
				tempItem.spouse_source = spouseList[i].IncomeSource;
			}

			ItemList.push(tempItem);
			tempItem = {};
		}
		this.setState({ ItemList });
	}

	addItem = (Item: any) => {
		const prestate = this.state;
		prestate.ItemList.push(Item);
		let myself_amount: number = 0;
		let spouse_amount: number = 0;
		prestate.ItemList.map((item) => {
			myself_amount = myself_amount + Math.abs(Number(item.myself_amount));
			spouse_amount = spouse_amount + Math.abs(Number(item.spouse_amount));
		});
		prestate.Total_myself_amount = myself_amount;
		prestate.Total_spouse_amount = spouse_amount;
		this.setState(prestate);
		// updated by LJC

		if (Item.myself_source != '' && Item.myself_amount != 0) {
			let IncomeObj: Income;
			IncomeObj = {};
			IncomeObj.IncomeID = 0;
			IncomeObj.Self = true;
			IncomeObj.GrossAmount = Item.myself_amount;
			IncomeObj.HelpString = '';
			IncomeObj.IncomeSource = Item.myself_source;

			if (this.state.tabIndex === 0) {
				IncomeObj.IncomeIdentifier = '5h';
			} else if (this.state.tabIndex === 1) {
				IncomeObj.IncomeIdentifier = '8f';
			} else {
				IncomeObj.IncomeIdentifier = '8h';
			}
			const IncomeList = this.state.IncomeList;
			IncomeList.push(IncomeObj);
			this.setState({ IncomeList });
		}

		if (Item.spouse_source != '' && Item.spouse_amount != 0) {
			let IncomeObj: Income;
			IncomeObj = {};
			IncomeObj.IncomeID = 0;
			IncomeObj.Self = false;
			IncomeObj.GrossAmount = Item.spouse_amount;
			IncomeObj.HelpString = '';
			IncomeObj.IncomeSource = Item.spouse_source;

			if (this.state.tabIndex === 0) {
				IncomeObj.IncomeIdentifier = '5h';
			} else if (this.state.tabIndex === 1) {
				IncomeObj.IncomeIdentifier = '8f';
			} else {
				IncomeObj.IncomeIdentifier = '8h';
			}

			const IncomeList = this.state.IncomeList;
			IncomeList.push(IncomeObj);
			this.setState({ IncomeList });
		}
		this.saveIncomeList();
	}

	setModalVisible(visible) {
		this.setState({modalVisible: visible});
	}	
	

	deleteItem = (index: number) => {

		const item = this.state.ItemList[index];
		let identifier = '';
		if (this.state.tabIndex === 0) {
			identifier = '5h';
		} else if (this.state.tabIndex === 1) {
			identifier = '8f';
		} else {
			identifier = '8h';
		}		
		
	
		var tempList = this.state.IncomeList;	
		var nFlag :boolean = false;

		Alert.alert(
			//title
			'Warning',
			//body
			'Do you want to delete ?',
			[
			  {text: 'Myself', onPress: () => 
			  
			 	{
					 
					tempList = tempList.filter (obj=> {	
		
						if ( (Math.abs(obj.GrossAmount) === Math.abs(item.myself_amount))  &&
							(obj.IncomeIdentifier === identifier) &&
									(obj.Self === true) &&
							(obj.IncomeSource === item.myself_source)) {
			
			
								if (nFlag == false) {
									
									nFlag = true;
									return false;
								}
								else return true;
							}
						else return true;		
					});
					nFlag = false;
					this.setState({ IncomeList: tempList }, ()=>
					{
						this.saveIncomeList();
						this.renderItems();
						nFlag = false;
					});
					
				 }
			 },
			  {text: 'Spouse', onPress: () => {
				  
				tempList = tempList.filter (obj=> {	
		
					if ( (Math.abs(obj.GrossAmount) === Math.abs(item.spouse_amount))  &&
						(obj.IncomeIdentifier === identifier) &&
								(obj.Self === false) &&
						(obj.IncomeSource === item.spouse_source)) {
		
							if (nFlag == false) {
								
								nFlag = true;
								return false;
							}
							else return true;
						}
					else return true;		
				});
	
				this.setState({ IncomeList: tempList }, ()=>
				{
					
					this.saveIncomeList();
					this.renderItems();
					nFlag = false;
				});		
				
			  }
			},
			  {text: 'Cancel', onPress: () => cancel()},
			],
			{ cancelable: true }
		  );		
	}

	changeItem = (Item: any) => {
		
		const item = this.state.ItemList[Item.selectIndex];
		let identifier = '';
		if (this.state.tabIndex === 0) {
			identifier = '5h';
		} else if (this.state.tabIndex === 1) {
			identifier = '8f';
		} else {
			identifier = '8h';
		}
	
		let nFlag: boolean = false;
		let tempList = this.state.IncomeList.filter (obj=> {	
		
			if ( (Math.abs(obj.GrossAmount) === Math.abs(item.spouse_amount))  &&
				(obj.IncomeIdentifier === identifier) &&
						(obj.Self === false) &&
				(obj.IncomeSource === item.spouse_source)) {

					if (nFlag == false) {
						
						nFlag = true;
						return false;
					}
					else return true;
				}
			else return true;		
		});

		nFlag = false;

		let myselfList = tempList.filter (obj=> {	
		
			if ( (Math.abs(obj.GrossAmount) === Math.abs(item.myself_amount))  &&
				(obj.IncomeIdentifier === identifier) &&
						(obj.Self === true) &&
				(obj.IncomeSource === item.myself_source)) {

					if (nFlag == false) {
						
						nFlag = true;
						return false;
					}
					else return true;
				}
			else return true;		
		});	

		const myselfObj: any[] = {};
		myselfObj.Self = true;
		myselfObj.IncomeIdentifier = identifier;
		myselfObj.IncomeID = 0;
		myselfObj.IncomeSource = Item.myself_source;
		myselfObj.GrossAmount = Item.myself_amount;
		myselfObj.HelpString = '';
		
		const spouseObj: any[] = {};
		spouseObj.Self = false;
		spouseObj.IncomeIdentifier = identifier;
		spouseObj.IncomeID = 0;
		spouseObj.IncomeSource = Item.spouse_source;
		spouseObj.GrossAmount = Item.spouse_amount;
		spouseObj.HelpString = '';
		
		myselfList.push(myselfObj);
		myselfList.push(spouseObj);
				
		this.setState({ IncomeList: myselfList }, () => {
			this.saveIncomeList();
		});

		const preItemList = this.state.ItemList;
		preItemList[Item.selectIndex].myself_source = Item.myself_source;
		preItemList[Item.selectIndex].myself_amount = Item.myself_amount;
		preItemList[Item.selectIndex].spouse_source = Item.spouse_source;
		preItemList[Item.selectIndex].spouse_amount = Item.spouse_amount;
		let myself_amount: number = 0;
		let spouse_amount: number = 0;
		preItemList.map((item) => {
			myself_amount = myself_amount + Number(item.myself_amount);
			spouse_amount = spouse_amount + Number(item.spouse_amount);
		});
		this.setState({
			ItemList: preItemList,
			Total_myself_amount: myself_amount,
			Total_spouse_amount: spouse_amount,
		});
	}
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.title}>
					<View style={{ flex: 2 }}></View>
					<Text style={styles.titleItem1}>Myself</Text>
					<Text style={styles.titleItem1}>Spouse</Text>
					<View style={{ flex: 2 }}></View>
				</View>
				<View style={{ flex: 1, flexDirection: 'row' }}>
					<Text
						style={{
							flex: 2,
							textAlign: 'center',
							textAlignVertical: 'center',
						}}
					>
						Total
					</Text>
					<Text style={styles.titleItem2}>
						${this.state.Total_myself_amount}
					</Text>
					<Text style={styles.titleItem2}>
						${this.state.Total_spouse_amount}
					</Text>
					<View style={{ flex: 2 }}></View>
				</View>
				<Header addItem={this.addItem} />
				<Body
					itemList={this.state.ItemList}
					deleteItem={this.deleteItem}
					changeItem={this.changeItem}
				/>				
				
			</View>
			
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#EEE',
	},
	title: {
		flex: 1,
		flexDirection: 'row',
		textAlign: 'center',
	},
	titleItem1: {
		flex: 3,
		paddingTop: 10,
		fontWeight: '400',
		fontSize: 16,
		textAlign: 'center',
		color: '#3a8081',
	},
	titleItem2: {
		flex: 3,
		fontWeight: '400',
		fontSize: 16,
		textAlign: 'center',
		color: '#3a8081',
	},
});
