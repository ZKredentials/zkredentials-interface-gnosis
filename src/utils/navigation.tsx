import theme from "@/styles/theme";

interface INavigation {
  route: Routes;
  name: string;
}

export enum Routes {
  ROOT = "/",
  WALLET = "/wallet",
  CREATE = "/create",
  ACCOUNT = "/accounts",
  SUBSCRIPTION = "/subscription",
}

export const getNavigationIcon = (route: Routes, selected: boolean) => {
  const color = selected ? theme.colors.title : theme.colors.highlight;
  switch (route) {
    case Routes.ROOT:
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 22V12H15V22"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case Routes.WALLET:
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.8572 1.28571H2.14291C1.6688 1.28571 1.28577 1.66874 1.28577 2.14285V21.8571C1.28577 22.3312 1.6688 22.7143 2.14291 22.7143H21.8572C22.3313 22.7143 22.7143 22.3312 22.7143 21.8571V2.14285C22.7143 1.66874 22.3313 1.28571 21.8572 1.28571ZM20.7858 13.7143H12.4286V10.2857H20.7858V13.7143ZM20.7858 20.7857H3.21434V3.21428H20.7858V8.57142H11.5715C11.0974 8.57142 10.7143 8.95446 10.7143 9.42856V14.5714C10.7143 15.0455 11.0974 15.4286 11.5715 15.4286H20.7858V20.7857ZM13.8215 12C13.8215 12.2842 13.9344 12.5567 14.1353 12.7576C14.3362 12.9585 14.6088 13.0714 14.8929 13.0714C15.1771 13.0714 15.4496 12.9585 15.6505 12.7576C15.8515 12.5567 15.9643 12.2842 15.9643 12C15.9643 11.7158 15.8515 11.4433 15.6505 11.2424C15.4496 11.0414 15.1771 10.9286 14.8929 10.9286C14.6088 10.9286 14.3362 11.0414 14.1353 11.2424C13.9344 11.4433 13.8215 11.7158 13.8215 12Z"
            fill={color}
          />
        </svg>
      );
    case Routes.CREATE:
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.1965 2.35715H12.8036C12.9465 2.35715 13.0179 2.42858 13.0179 2.57143V21.4286C13.0179 21.5714 12.9465 21.6429 12.8036 21.6429H11.1965C11.0536 21.6429 10.9822 21.5714 10.9822 21.4286V2.57143C10.9822 2.42858 11.0536 2.35715 11.1965 2.35715Z"
            fill={color}
          />
          <path
            d="M3.00005 10.9821H21.0001C21.1429 10.9821 21.2143 11.0536 21.2143 11.1964V12.8036C21.2143 12.9464 21.1429 13.0179 21.0001 13.0179H3.00005C2.8572 13.0179 2.78577 12.9464 2.78577 12.8036V11.1964C2.78577 11.0536 2.8572 10.9821 3.00005 10.9821Z"
            fill={color}
          />
        </svg>
      );
    case Routes.ACCOUNT:
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 13C10.4295 13.5741 10.9774 14.0492 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9404 15.7513 14.6898C16.4231 14.4392 17.0331 14.0471 17.54 13.54L20.54 10.54C21.4508 9.59699 21.9548 8.33397 21.9434 7.02299C21.932 5.71201 21.4061 4.45794 20.4791 3.5309C19.5521 2.60386 18.298 2.07802 16.987 2.06663C15.676 2.05523 14.413 2.55921 13.47 3.47L11.75 5.18"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 11C13.5705 10.4259 13.0226 9.95083 12.3934 9.60707C11.7642 9.26331 11.0684 9.05889 10.3533 9.00768C9.63816 8.95646 8.92037 9.05964 8.24861 9.31023C7.57685 9.56082 6.96684 9.95294 6.45996 10.46L3.45996 13.46C2.54917 14.403 2.04519 15.666 2.05659 16.977C2.06798 18.288 2.59382 19.5421 3.52086 20.4691C4.4479 21.3961 5.70197 21.922 7.01295 21.9334C8.32393 21.9448 9.58694 21.4408 10.53 20.53L12.24 18.82"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case Routes.SUBSCRIPTION:
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1 10H23"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 22V12H15V22"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
};

const NavigationRoutes: INavigation[] = [
  {
    name: "Home",
    route: Routes.ROOT,
  },
  {
    name: "Wallet",
    route: Routes.WALLET,
  },
  {
    name: "Create Proof",
    route: Routes.CREATE,
  },
  {
    name: "Linked Accounts",
    route: Routes.ACCOUNT,
  },
  {
    name: "Subscription",
    route: Routes.SUBSCRIPTION,
  },
];

export default NavigationRoutes;
