
export interface UserInterface {
  userData: {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    userImage: string;
  };
  isUserLoading: boolean;
  error: string | null;
  token: string | null;
}