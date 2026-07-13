import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;

    login: (
        user: User,
        access: string,
        refresh: string
    ) => void;

    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            refreshToken: null,

            login: (user, access, refresh) =>
                set({
                    user,
                    accessToken: access,
                    refreshToken: refresh,
                }),

            logout: () =>
                set({
                    user: null,
                    accessToken: null,
                    refreshToken: null,
                }),
        }),
        {
            name: "auth-storage",
        }
    )
);