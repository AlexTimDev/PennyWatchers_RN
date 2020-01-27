/********
 * Calendar Reducer
 */
import { AnyAction } from 'redux';
import { orderBy } from 'lodash';

import { getDateYearFirst } from '../../utilities/utilities';
import { LOGOUT } from '../Auth/actions';
import {
	GET_INFORMATION_SUCCESS,
	GET_INFORMATION,
	GET_INFORMATION_SEARCH,
	GET_INFORMATION_SEARCH_SUCCESS,
	CLEAR_SEARCH,
	SET_GLOBAL_DATE,
} from './actions';
import { colors } from '../../constants';
import { BillRequest } from '../Bills/types';
import { Expense } from '../Expenses/types';
import { Receipt } from '../Receipts/types';
import { ActualIncome, Income } from '../Income/types';
import {getChangeMonth} from '../../utilities/utilities'

const dots = {
	expense: {
		key: Math.random() * 10000,
		type: 'Expense',
		color: colors.DARK_PURPLE,
	},
	receipt: {
		key: Math.random() * 10000,
		type: 'Receipt',
		color: colors.DARK_BLUE,
	},
	income: {
		key: Math.random() * 10000,
		type: 'Income',
		color: colors.DARK_GREEN,
	},
	bill: {
		key: Math.random() * 10000,
		type: 'Bill',
		color: colors.DARK_ORANGE,
	},
};

class OrderedSearchRes1{
	ref : any;
	id: string;
	name: string;
	children: any[]=[];
}
class OrderedSearchRes0{
	ref : any;
	id: string;
	name: string;
	children: Array<OrderedSearchRes1> = [];
}

export interface CalendarState {
	dates: {};
	dots: {};
	search: any[];
	isLoading: boolean;
	date: Date;
	newArray:any[];
}

export const defaultState: CalendarState = {
	dates: {},
	dots: [],
	search: [],
	isLoading: false,
	date: new Date(),
	newArray:[]
};

export const data = (
	state = defaultState,
	action: AnyAction,
): CalendarState => {
	switch (action.type) {
		case GET_INFORMATION:
		case GET_INFORMATION_SEARCH:
			return { ...state, isLoading: true };

		case GET_INFORMATION_SEARCH_SUCCESS:
			
			const search = orderBy(
				[
					...action.informationResponse.BillList.BillList.map(
						(item: BillRequest) => ({ ...item, date: new Date() }),
					),
					...action.informationResponse.ExpenseItemList.ExpenseItemList.map(
						(item: Expense) => ({ ...item, date: new Date(item.ExpenseDate) }),
					),
					...action.informationResponse.ReceiptList.ReceiptList.map(
						(item: Receipt) => ({ ...item, date: new Date(item.ReceiptDate) }),
					),
					...action.informationResponse.ActualIncomeList.ActualIncomeItemList.map(
						(item: ActualIncome) => ({...item,date: new Date(String(item.ActualIncomeDate)),
					}),
							
					),
					
					...action.informationResponse.IncomeEstimateList.IncomeEstimateList.map(
						(item: Income) => ({ ...item, date: new Date(item.IncomeYear+"/"+item.IncomeMonth+"/"+"1" ) }),
					),
				],
				['date'],
				'desc',
			);

	//------------------new Array creat----------------------------------
				let newArray : Array<OrderedSearchRes0> = [];
				let inpYear:number=0 , inpMonth:number=0;	
				let newYear:number=0 , newMonth: number=0;	
				let yearIdx:number=0 , monthIdx: number = 0;
			
				console.log("search",search);
				newYear = 0;

				for (let inpItem of search) {
					inpYear = inpItem.date.getFullYear();
					inpMonth = inpItem.date.getMonth();
					
				 	console.log("inpItem",inpItem,"inpYear",inpYear,"inpMonth",inpMonth);
					 console.log("yearIdx",yearIdx,"monthIdx",monthIdx);

					 if (newYear != inpYear)
					{
						newArray.push(new OrderedSearchRes0);
						newArray[yearIdx].id = inpYear.toString();
						newArray[yearIdx].name = inpYear.toString();
						newYear = inpYear;
						newMonth = 100;	//not in (0~11)
						monthIdx = 0;

						yearIdx++;
					}
					if(newMonth != inpMonth){
						newArray[yearIdx-1].children.push(new OrderedSearchRes1);
						newArray[yearIdx-1].children[monthIdx].id = inpYear.toString()+"."+inpMonth.toString();
						newArray[yearIdx-1].children[monthIdx].name = getChangeMonth(inpMonth);

						newMonth = inpMonth;
						monthIdx++;
					}
					console.log("yearIdx",yearIdx-1,"monthIdx",monthIdx-1);
					newArray[yearIdx-1].children[monthIdx-1].children.push(inpItem);
				}
				console.log("newArray",newArray);
			
			return { ...state, isLoading: false, search, newArray };

		case GET_INFORMATION_SUCCESS:
			const newDates: any = state.dates;
			let newDots: any = state.dots;
			try {
				const blist = action.informationResponse.BillList.BillList;

				// Create arrays for dates and dots for new data
				for (
					const i = new Date(action.startDate);
					i <= new Date(action.endDate);
					i.setDate(i.getDate() + 1)
				) {
					// Add the bills for the date if they exist or set as an empty array
					const bills = blist.filter(
						(bill: BillRequest) => bill.DueDate === i.getDate(),
					);
					newDates[getDateYearFirst(i)] = bills;

					// Remove the dot object for this day so it can be rebuilt
					newDots = newDots.filter(
						(dotObj: any) => dotObj.date !== getDateYearFirst(i),
					);

					// Add the initial dot with or without bill dot
					newDots.push({
						date: getDateYearFirst(i),
						dots: !!bills.length ? [dots.bill] : [],
					});
				}

				const elist =
					action.informationResponse.ExpenseItemList.ExpenseItemList;
				for (const item of elist) {
					const dt = getDateYearFirst(item.ExpenseDate);
					newDates[dt].push(item);
					newDots = newDots.map((dotObj: any) => {
						if (dotObj.date === dt && !checkDots(dotObj.dots, 'Expense')) {
							return {
								...dotObj,
								dots: [...dotObj.dots, dots.expense],
							};
						}
						return dotObj;
					});
				}

				const rlist = action.informationResponse.ReceiptList.ReceiptList;

				for (const item of rlist) {
					const dt = getDateYearFirst(item.ReceiptDate);
					if (!newDates[dt]) {
						newDates[dt] = [];
					}
					newDates[dt].push(item);

					newDots = newDots.map((dotObj: any) => {
						if (dotObj.date === dt && !checkDots(dotObj.dots, 'Receipt')) {
							return {
								...dotObj,
								dots: [...dotObj.dots, dots.receipt],
							};
						}
						return dotObj;
					});
				}

				const ilist =
					action.informationResponse.ActualIncomeList.ActualIncomeItemList;

				for (const item of ilist) {
					const dt = getDateYearFirst(item.ActualIncomeDate);
					if (!newDates[dt]) {
						newDates[dt] = [];
					}
					newDates[dt].push(item);

					newDots = newDots.map((dotObj: any) => {
						if (dotObj.date === dt && !checkDots(dotObj.dots, 'Income')) {
							return {
								...dotObj,
								dots: [...dotObj.dots, dots.income],
							};
						}
						return dotObj;
					});
				}
				return { ...state, dates: newDates, dots: newDots, isLoading: false };
			} catch (err) {
				return { ...state, isLoading: false };
			}

		case SET_GLOBAL_DATE:
			return { ...state, date: new Date(action.date) };

		case LOGOUT:
		case CLEAR_SEARCH:
			return { ...state, search: [] };

		default:
			return state;
	}
};

function checkDots(dotArray: any, key: string) {
	return dotArray.filter((item: any) => item.type === key).length >= 1;
}

function filterYearMonth(inputdate:string, key:string){

	if (key=='year'){
		var n = str.search("W3Schools");
	}

}

