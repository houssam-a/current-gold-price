import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { Routes, Route } from "react-router-dom";
import { Calculator } from "./pages/Calculator";
import { Charts } from "./pages/Charts";
import { CurrencyConverter } from "./pages/CurrencyConverter";
import { NotFound } from "./pages/NotFound";
import { Layout } from "./components/Layout";

// Update import path from Index to HomePage
import HomePage from "./pages/HomePage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="calculator" element={<Calculator />} />
          <Route path="charts" element={<Charts />} />
          <Route path="currency-converter" element={<CurrencyConverter />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster position="top-center" expand={false} richColors />
    </QueryClientProvider>
  );
}

export default App;
