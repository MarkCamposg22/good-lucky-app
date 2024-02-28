import { useContext } from "react";
import { CreditContext } from "../contexts/CreditContext";

export const useCredit = () => {
    const context = useContext(CreditContext);
    return context;
};
