import { QueryClient, QueryClientProvider } from "react-query";

import { Signup } from "../components/Signup/Signup";

const queryClient = new QueryClient();

const registerUser = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Signup />
    </QueryClientProvider>
  );
};

export default registerUser;
