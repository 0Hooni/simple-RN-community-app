import { create } from 'zustand';

interface AuthStore {
  // 로그인
  loginEmail: string;
  loginPassword: string;
  setLoginEmail: (email: string) => void;
  setLoginPassword: (password: string) => void;
  resetLoginForm: () => void;

  // 회원가입
  signupEmail: string;
  signupPassword: string;
  signupNickname: string;
  setSignupEmail: (email: string) => void;
  setSignupPassword: (password: string) => void;
  setSignupNickname: (nickname: string) => void;
  resetSignupForm: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  // 로그인
  loginEmail: '',
  loginPassword: '',
  setLoginEmail: (email) => set({ loginEmail: email }),
  setLoginPassword: (password) => set({ loginPassword: password }),
  resetLoginForm: () => set({ loginEmail: '', loginPassword: '' }),

  // 회원가입
  signupEmail: '',
  signupPassword: '',
  signupNickname: '',
  setSignupEmail: (email) => set({ signupEmail: email }),
  setSignupPassword: (password) => set({ signupPassword: password }),
  setSignupNickname: (nickname) => set({ signupNickname: nickname }),
  resetSignupForm: () =>
    set({ signupEmail: '', signupPassword: '', signupNickname: '' }),
}));
