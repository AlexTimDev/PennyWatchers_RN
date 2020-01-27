import { LoginRequest } from '../Auth/types';

export interface CategoriesResponse {
	DropDownList: Category[];
	ErrorCode: number;
	ErrorMessage: string | null;
}

export interface Category {
	BudgetID: number;
	Category: string;
	SubCategory: string;
	Amount: number;
}

export interface CategoryFormat {
	MajorCategory: string;
	MinorCategory: string[];
}

export interface PeopleResponse {
	DropDownList: Person[];
	ErrorCode: number;
	ErrorMessage: string | null;
}

export interface Person {
	PersonID: number;
	UserID: number;
	PersonName: string;
}

export interface ExpenseRequest {
	expenseID: number;
	username: string;
	password: string;
	budgetId: number;
	date: string;
	amount: number;
	note: string;
	personId: number;
	ExpenseBase?: number;
	ExpenseTax?: number;
	ExpenseTip?: number;
}

export interface ExpenseResponse {
	TotalBudget: number;
	TotalExpenses: number;
	RemainingAmount: number;
	ErrorCode: number;
	ErrorMessage: string | null;
}

export interface GetCategoriesRequest extends LoginRequest {
	month?: string;
	year?: string;
}

export interface Expense {
	BudgetID: number;
	ExpenseID: number;
	CategoryName: string;
	ExpenseDate: string;
	ExpenseAmount: number;
	ExpenseNote: string;
	PersonID: number;
	PersonName: string;
	ExpenseBase: number;
	ExpenseTax: number;
	ExpenseTip: number;
	ReceiptID: number;
}

export interface ExpensesResponse {
	ExpenseItemList: Expense[];
	ErrorCode: number;
	ErrorMessage: string | null;
}
