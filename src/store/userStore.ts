import { User } from "firebase/auth";
import { create } from "zustand";

interface UserStore {
  user: User;
  setUser: (user: User) => void;
}

const userStore = create<UserStore>((set) => ({
  user: {} as User,
  setUser: (user) => set(() => ({ user })),
}));
export default userStore;
