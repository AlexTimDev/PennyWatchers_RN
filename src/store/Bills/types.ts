export interface BillRequest {
	username: string;
	password: string;
	BillID: number;
	UserID?: number;
	BillName: string;
	BillAmount: number;
	DueDate: number;
	ErrorCode?: number;
	ErrorMessage?: string;
}

export interface BillResponse {
	Success: boolean;
	ErrorCode: number;
	ErrorMessage: string;
}
