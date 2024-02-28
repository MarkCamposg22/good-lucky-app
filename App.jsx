import { CreditContextProvider } from './src/contexts/CreditContext';
import { Routes } from './src/routes';

export default function App() {
    return (
        <CreditContextProvider>
            <Routes />
        </CreditContextProvider>
    );
}
