import { QueryClient, QueryClientProvider } from "react-query";

import { Signin } from "../components/Signin";

const queryClient = new QueryClient();

export default Signin();
{
  return (
    <QueryClientProvider client={queryClient}>
      <Signin />
    </QueryClientProvider>
  );
}
