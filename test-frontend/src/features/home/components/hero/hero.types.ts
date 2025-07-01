import { ReactNode } from "react";

export interface HeroProps {
  badge: string;
  heading: string | ReactNode;
  description: string;
  buttons: {
    primary: {
      text: string;
      url: string;
    };
    secondary: {
      text: string;
      url: string;
    };
  };
  image: {
    src: string;
    alt: string;
  };
}
