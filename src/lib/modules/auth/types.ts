export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  email: string;
  username: string;
  password: string;
}

export interface AuthenticatedUser {
  username: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  status: number;
}

export interface AuthPayload {
  token: string;
  user: AuthenticatedUser;
}
