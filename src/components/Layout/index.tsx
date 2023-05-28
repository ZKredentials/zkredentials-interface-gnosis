import Meta from "../Meta";
import { LayoutContainer, LayoutContent } from "./style";
import Navigation from "../Navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useInitializeLinkedAccounts from "@/hooks/useInitalizeLinkedAccounts";

const Layout = ({ children }: { children: React.ReactNode }) => {
  useInitializeLinkedAccounts();

  const router = useRouter();
  const [expand, setExpand] = useState<boolean>(false);

  const handleExpand = (_expand: boolean) => {
    setExpand(_expand);
  };

  // This will stop any animation happening before the page is loaded
  useEffect(() => {
    if (typeof window !== `undefined`) {
      const layoutElement = document.getElementById(`layout`);
      if (layoutElement) {
        layoutElement.classList.remove("stopAnimation");
      }
    }
  }, []);

  const renderNavigation = router.pathname !== "/proof/[cid]";

  return (
    <>
      <Meta />
      <LayoutContainer id="layout" className="stopAnimation">
        {renderNavigation && (
          <Navigation expand={expand} handleExpand={handleExpand} />
        )}
        <LayoutContent navExpand={expand} isNavigation={renderNavigation}>
          {children}
        </LayoutContent>
      </LayoutContainer>
    </>
  );
};
export default Layout;
