import { ReactNode } from "react";
import { ProddbProps } from "./productstypes";
import { RevdbProps } from "./reviewtypes";

export interface BannerProps {
    bannerTxt: string;
    onClick?: () => void;
}

export interface ProProps {
    width?: string;
    height?: string;
    prod_idx?: number;
    prod_name?: string;
    product: ProddbProps;
    isLiked?: Boolean;
}

export interface SearchProps {
    searchOpt: string;
    search: (val: string) => void;
}

export interface PostTableProps {
    fontSize?: string;
    isAdmin?: boolean;
    thTxt?: string;
    thBtn?: ReactNode;
    rev_idx?: number;
    reviewArr?: RevdbProps[];
    filteredRevArr?: RevdbProps[];
}

export interface GreenBtnProps {
    greenBtn_txt: string;
    width?: string;
    height?: string;
    onClick?: () => void;
    rev_props?: RevdbProps;
}

export interface RevProps {
    width?: string;
    height?: string;
    rev_idx?: number;
    rev_img?: string;
    review: RevdbProps;
}

export interface LoginProps {
    onClose?: () => void;
}

export interface SidebarProps {
    getProds: (category: String) => void;
}