import { QueryClient, QueryClientProvider } from "react-query";

import { Todo } from "../components/Dashboard/Todo";
import { getCookie } from "../src/utils/tokenHelpers";
import { isNilOrEmpty } from "../src/utils/helpers";

const queryClient = new QueryClient();

const DashBoard = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Todo />
    </QueryClientProvider>
  );
};

// export const getServerSideProps = async (context) => {
//   const { req } = context;
//   const cookies = req.headers.cookie;
//   const accessToken = getCookie(cookies);
//   console.log("accessToken", accessToken);
//   if (isNilOrEmpty(accessToken)) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: true,
//       },
//     };
//   }
//   return {
//     props: {},
//   };
// };
export default DashBoard;
