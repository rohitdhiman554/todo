import { QueryClient, QueryClientProvider } from "react-query";

import { Todo } from "../components/Todo";

const queryClient = new QueryClient();

const DashBoard = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Todo />
    </QueryClientProvider>
  );
};

export const getServerSideProps = async (context) => {
  console.log("context", context);
  const { req } = context;
  const cookies = req.headers.cookie;



  return {
    props: {},
  };
};
export default DashBoard;
