import { Dispatch, SetStateAction } from "react";

export interface Usertype {
  firstName: string;
  lastName: string;
  userImage: string;
  handleTaskOpen: (id: string) => void;
}

export interface PasswordModal {
  passwordModalOpen: boolean;
  setPasswordModalOpen: Dispatch<SetStateAction<boolean>>;
  userId: string;
  setProfileModalOpen: Dispatch<SetStateAction<boolean>>;
}

export interface EditProfileModal extends Omit<Usertype, "handleTaskOpen" | "userImage"> {
  userId: string;
  email: string;
  imagePreview: string;
  setFirstName: Dispatch<SetStateAction<string>>;
  setLastName: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setImagePreview: Dispatch<SetStateAction<string>>;
  setUserImage: Dispatch<SetStateAction<string>>;
  profileModalOpen: boolean;
  setPasswordModalOpen: Dispatch<SetStateAction<boolean>>;
  handleProfileModalClose: () => void;
}
