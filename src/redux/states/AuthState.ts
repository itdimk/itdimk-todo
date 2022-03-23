import { User } from "firebase/auth";

export interface AuthState {
    user: User | null;
    isLoading: Boolean
}