export interface IUser {
	id: string;
	username: string;
	password: string;
	email: string;
	bio?: string;
	avatar?: string;
	role: string;
	isTeacher: boolean;
	isBanned: boolean;
	banReason?: string;
}