import Image from "next/image";
import {
  SideNavigationContainer,
  SideNavigationContent,
  SideNavigationExpansionButton,
  SideNavigationItem,
  SideNavigationItemIcon,
  SideNavigationItemText,
  SideNavigationLogo,
  SideNavigationSection,
  SideNavigationTitle,
  TopNavigationBurger,
  TopNavigationContainer,
  TopNavigationContent,
  TopNavigationMain,
} from "./style";
import MainLogo from "@/assets/logo/TransparentBg.svg";
import MainLogo2 from "@/assets/logo/TransparentBgWithPadding.svg";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FC, useEffect, useState } from "react";
import ExpandableButton from "../ExpandableButton";
import NavigationRoutes, {
  Routes,
  getNavigationIcon,
} from "@/utils/navigation";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAccount } from "wagmi";
import useWindowDimensions from "@/hooks/useWindowDImensions";

interface IProps {
  expand: boolean;
  handleExpand: (_expand: boolean) => void;
}
const Navigation: FC<IProps> = ({ expand, handleExpand }) => {
  const { address } = useAccount();
  const router = useRouter();
  const { windowDimensions, MEDIUM_SCREEN_SIZE } = useWindowDimensions();

  const handleExpandNavigation = () => {
    handleExpand(!expand);
  };

  const isCurrentPath = (path: string) => {
    return router.pathname === path;
  };

  const handleRedirectInMobile = (route: Routes) => {
    router.push(route);
    handleExpand(false);
  };

  /**
   * Fix UI-hydration Issue
   */
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  if (domLoaded) {
    if (windowDimensions.width < MEDIUM_SCREEN_SIZE) {
      return (
        <TopNavigationContainer expand={expand}>
          <TopNavigationContent>
            {address ? (
              <>
                {NavigationRoutes.map((route) => (
                  <SideNavigationItem
                    key={route.name}
                    selected={isCurrentPath(route.route)}
                    onClick={() => handleRedirectInMobile(route.route)}
                  >
                    <SideNavigationItemIcon>
                      {getNavigationIcon(
                        route.route,
                        isCurrentPath(route.route)
                      )}
                    </SideNavigationItemIcon>
                    <SideNavigationItemText
                      expand={expand}
                      selected={isCurrentPath(route.route)}
                    >
                      {route.name}
                    </SideNavigationItemText>
                  </SideNavigationItem>
                ))}
              </>
            ) : (
              <SideNavigationItem
                key={NavigationRoutes[0].name}
                selected={isCurrentPath(NavigationRoutes[0].route)}
                onClick={() =>
                  handleRedirectInMobile(NavigationRoutes[0].route)
                }
              >
                <SideNavigationItemIcon>
                  {getNavigationIcon(
                    NavigationRoutes[0].route,
                    isCurrentPath(NavigationRoutes[0].route)
                  )}
                </SideNavigationItemIcon>
                <SideNavigationItemText
                  expand={expand}
                  selected={isCurrentPath(NavigationRoutes[0].route)}
                >
                  {NavigationRoutes[0].name}
                </SideNavigationItemText>
              </SideNavigationItem>
            )}
            <ConnectButton showBalance={false} accountStatus="full" />
          </TopNavigationContent>
          <TopNavigationMain>
            <SideNavigationLogo>
              <Image
                src={MainLogo}
                alt="ZKredentials Logo"
                width={28}
                height={28}
              />
              <SideNavigationTitle expand={true}>
                ZKredentials
              </SideNavigationTitle>
            </SideNavigationLogo>

            <TopNavigationBurger
              onClick={handleExpandNavigation}
              expand={expand}
            >
              <i />
              <i />
              <i />
            </TopNavigationBurger>
          </TopNavigationMain>
        </TopNavigationContainer>
      );
    }

    return (
      <SideNavigationContainer expand={expand}>
        <SideNavigationExpansionButton onClick={handleExpandNavigation}>
          <ExpandableButton expand={expand} />
        </SideNavigationExpansionButton>
        <SideNavigationSection>
          <SideNavigationLogo>
            <Image
              src={MainLogo2}
              alt="ZKredentials Logo"
              width={64}
              height={64}
            />
            <SideNavigationTitle expand={expand}>
              ZKredentials
            </SideNavigationTitle>
          </SideNavigationLogo>
          <SideNavigationContent>
            {address ? (
              <>
                {NavigationRoutes.map((route) => (
                  <Link key={route.name} href={route.route}>
                    <SideNavigationItem selected={isCurrentPath(route.route)}>
                      <SideNavigationItemIcon>
                        {getNavigationIcon(
                          route.route,
                          isCurrentPath(route.route)
                        )}
                      </SideNavigationItemIcon>
                      <SideNavigationItemText
                        expand={expand}
                        selected={isCurrentPath(route.route)}
                      >
                        {route.name}
                      </SideNavigationItemText>
                    </SideNavigationItem>
                  </Link>
                ))}
              </>
            ) : (
              <Link
                key={NavigationRoutes[0].name}
                href={NavigationRoutes[0].route}
              >
                <SideNavigationItem
                  selected={isCurrentPath(NavigationRoutes[0].route)}
                >
                  <SideNavigationItemIcon>
                    {getNavigationIcon(
                      NavigationRoutes[0].route,
                      isCurrentPath(NavigationRoutes[0].route)
                    )}
                  </SideNavigationItemIcon>
                  <SideNavigationItemText
                    expand={expand}
                    selected={isCurrentPath(NavigationRoutes[0].route)}
                  >
                    {NavigationRoutes[0].name}
                  </SideNavigationItemText>
                </SideNavigationItem>
              </Link>
            )}
          </SideNavigationContent>
        </SideNavigationSection>
        <ConnectButton
          showBalance={false}
          accountStatus={expand ? "full" : "avatar"}
        />
      </SideNavigationContainer>
    );
  }

  return <></>;
};

export default Navigation;
