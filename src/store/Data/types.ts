import { Expense } from '../Expenses/types';
import { Receipt } from '../Receipts/types';
import { Income } from '../Income/types';

export interface InformationResponse {
	ExpenseItemList: Expense[];
	ReceiptList: Receipt[];
	IncomeList: Income[];
	ErrorCode: number;
	ErrorMessage: string | null;
}
