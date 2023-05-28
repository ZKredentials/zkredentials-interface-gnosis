import { useRouter } from "next/router";
import { useEffect } from "react";
import { LOCAL_STORAGE_GITHUB_ACCESS_TOKEN } from "@/utils/constants";

const CallbackPage = () => {
  const router = useRouter();
  const { access_token } = router.query;

  const storeHandlerInLocalStorage = (access_token: string) => {
    localStorage.setItem(LOCAL_STORAGE_GITHUB_ACCESS_TOKEN, access_token);
  };

  useEffect(() => {
    if (access_token) {
      storeHandlerInLocalStorage(access_token as string);
      window.close();
    }
  }, [access_token]);

  return <div>REDIRECTING</div>;
};

export default CallbackPage;
