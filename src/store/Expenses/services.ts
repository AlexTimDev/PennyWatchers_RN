import { baseURL } from '../../config';
import { ExpenseRequest } from './types';
import { urlHeaders } from '../../constants';

const today = new Date();
const currentMonth = (today.getMonth() + 1).toString();
const currentYear = today.getFullYear().toString();

export const getCategories = (
	username: string,
	password: string,
	month: string = currentMonth,
	year: string = currentYear,
): Promise<Response> => {
	const url =
		baseURL +
		`/Expenses/GetCategoryList?username=${username}&password=${password}&BudgetYear=${year}&budgetMonth=${month}`;
	return fetch(url);
};

export const getPeople = (
	username: string,
	password: string,
): Promise<Response> => {
	const url =
		baseURL + `/Users/GetPeopleList?username=${username}&password=${password}`;
	return fetch(url);
};

export const saveExpense = (
	expenseRequest: ExpenseRequest,
): Promise<Response> => {
	const {
		budgetId,
		date,
		amount,
		personId,
		expenseID,
		ExpenseTax,
		ExpenseTip,
		ExpenseBase,
	} = expenseRequest;
	const note = encodeURI(expenseRequest.note);
	const url =
		baseURL +
		'/Expenses/SaveExpense?' +
		`username=${expenseRequest.username}&password=${expenseRequest.password}`;
	const body = JSON.stringify({
		ExpenseNote: note,
		ExpenseID: expenseID,
		ExpenseDate: date,
		BudgetID: budgetId,
		PersonID: personId,
		ExpenseAmount: amount,
		ExpenseTax,
		ExpenseTip,
		ExpenseBase,
	});

	return fetch(url, { method: 'POST', body, headers: urlHeaders });
};

export const getExpenses = (
	username: string,
	password: string,
	month: string,
	year: string,
): Promise<Response> => {
	const url =
		baseURL +
		`/Expenses/GetExpenseItemList?username=${username}&password=${password}&budgetMonth=${month}&budgetYear=${year}`;
	return fetch(url);
};

export const saveBudgetItem = (
	username: string,
	password: string,
	BudgetID: number,
	Category: string,
	SubCategory: string,
	Amount: number,
	budgetMonth: string,
	budgetYear: string,
): Promise<Response> => {
	const url =
		baseURL +
		`/Budgets/SaveBudgetItem?username=${username}&password=${password}&BudgetID=${BudgetID}&category=${Category}` +
		`&subCategory=${SubCategory}&dollarAmount=${Amount}&budgetMonth=${budgetMonth}&budgetYear=${budgetYear}`;
	return fetch(url);
};

export const deleteExpense = (
	username: string,
	password: string,
	expenseID: number,
): Promise<Response> => {
	const url =
		baseURL +
		`/Expenses/DeleteExpense?username=${username}&password=${password}&expenseID=${expenseID}`;
	return fetch(url);
};

export const deleteBudgetItem = (
	username: string,
	password: string,
	BudgetID: number,
): Promise<Response> => {
	const url =
		baseURL +
		`/Budgets/DeleteBudgetItem?username=${username}&password=${password}&BudgetID=${BudgetID}`;
	return fetch(url);
};
