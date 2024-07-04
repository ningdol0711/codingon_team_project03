import { CommentdbProps } from "./commenttypes";
import { UserdbProps } from "./logintypes";
import { ProddbProps } from "./productstypes";

export interface RevdbProps {
    rev_idx?: number;
    user_idx?: number;
    prod_idx?: number;
    rev_isAuth?: boolean;
    rev_text?: string;
    rev_createdAt?: string;
    rev_img?: string;
    rev_authImg?: string;
    rev_title?: string;
    rev_rating?: number;
    User?: UserdbProps;
    Product?: ProddbProps;
    Comments?: CommentdbProps;
}

export interface RevTabledbProps {
    rev_idx?: number;
    user_idx?: number;
    prod_idx?: number;
    rev_isAuth?: boolean;
    rev_text?: string;
    rev_createdAt?: string;
    rev_img?: string;
    rev_authImg?: string;
    rev_title?: string;
    User?: UserdbProps;
    Product?: ProddbProps;
}