export interface LoginResponse {
	Validated?: boolean;
}

export interface LoginRequest {
	username: string;
	password: string;
	remember?: boolean;
}

export interface SignupRequest {
	Username: string;
	Password: string;
	FirstName: string;
	LastName: string;
	Email: string;
}

export interface SignupResponse {
	UserID: number;
	Username: string;
	Password: string;
	FullName: string;
	Address: string;
	City: string;
	State: string;
	ZIP: string;
	Phone: string;
	Email: string;
	ErrorCode: number;
	ErrorMessage: string;
}
