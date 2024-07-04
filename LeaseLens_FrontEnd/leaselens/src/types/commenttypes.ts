import { UserdbProps } from "./logintypes";

export interface CommentdbProps {
  com_idx?: number;
  rev_idx?: Number;
  user_idx?: Number;
  com_text?: string;
  createdAt?: string;
  User?: UserdbProps;
  isAdmin?: Boolean | null;
  rev_authImg?: string;
}