import { QueryClient, QueryClientProvider } from "react-query";

import { Signin } from "../components/Signin";

const queryClient = new QueryClient();

const HomePage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Signin />
    </QueryClientProvider>
  );
};

export default HomePage;
