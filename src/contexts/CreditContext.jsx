import { createContext, useState } from "react";

export const CreditContext = createContext({});

export const CreditContextProvider = ({ children }) => {
    const [credits, setCredits] = useState(10000);

    return (
        <CreditContext.Provider
            value={{
                credits,
                setCredits
            }}
        >
            {children}
        </CreditContext.Provider>
    );
};
