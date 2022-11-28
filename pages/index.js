import { QueryClient, QueryClientProvider } from "react-query";

import { Signin } from "../components/Signin/Signin";
import { getCookie } from "../src/utils/tokenHelpers";
import { isNilOrEmpty } from "../src/utils/helpers";

const queryClient = new QueryClient();

const HomePage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Signin />
    </QueryClientProvider>
  );
};

export const getServerSideProps = async (context) => {
  const cookies = context.req.headers?.cookie;
  const refreshToken = getCookie(cookies);

  if (!isNilOrEmpty(refreshToken)) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
export default HomePage;
