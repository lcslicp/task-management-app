
export interface UserInterface {
  userData: {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  isUserLoading: boolean;
  error: string | null;
  token: string | null;
}

export interface UserResponseInterface {
  _id: string;
  email: string;
  token: string;
  message: string;
}

export interface ErrorResponseInterface {
  status: number;
  message: string;
}