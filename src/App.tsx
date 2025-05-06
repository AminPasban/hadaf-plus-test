// layouts
import Header from "./layouts/Header";
// context
import { MessageProvider } from "./contexts/MessageContext";
// components
import DomainsTable from "./components/DomainsTable";
import ManageDomainDrawer from "./components/ManageDomainDrawer";

function App() {
    return (
        <div className="container mx-auto font-base">
            <Header />
            <MessageProvider>
                <ManageDomainDrawer />
                <main className="pt-4 pb-12">
                    <DomainsTable />
                </main>
            </MessageProvider>
        </div>
    );
}

export default App;
