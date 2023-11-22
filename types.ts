export type ServerError = {
  log: string;
  status: number;
  message: { err: string };
};

export interface TimerProps {
  isLoggedIn: boolean;
  username: string | null;
}
export interface LoginProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  username: string | null;
  setUsername: React.Dispatch<React.SetStateAction<string | null>>;
}
