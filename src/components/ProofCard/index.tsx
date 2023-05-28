import { FC } from "react";
import { ProofCardContainer, ProofCardLogo, ProofCardTypeText } from "./style";
import GithubIcon from "@/assets/icons/GithubIcon.svg";
import TwitterIcon from "@/assets/icons/TwitterIcon.svg";
import Image from "next/image";
import ViewIcon from "@/assets/icons/ViewIcon.svg";
import ShareIcon from "@/assets/icons/ShareIcon.svg";
import toast from "react-hot-toast";
import { capitalizeText } from "@/utils/helper";

const getIcon = (type: string) => {
  switch (type) {
    case "GITHUB":
      return GithubIcon;
    case "TWITTER":
      return TwitterIcon;
    default:
      return GithubIcon;
  }
};

interface IProps {
  proof: any;
}

const ProofCard: FC<IProps> = ({ proof }) => {
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "http://localhost:3000";

  const url = `${origin}/proof/${proof.cid}`;

  const copyToClipboard = () => {
    if (window) {
      navigator.clipboard.writeText(url);
      toast.success("Copied!");
    }
  };

  return (
    <ProofCardContainer>
      <ProofCardLogo>
        <Image src={getIcon(proof.type)} alt={proof.type} fill />
      </ProofCardLogo>
      <ProofCardTypeText>{capitalizeText(proof.type)}</ProofCardTypeText>
      <a href={url} target="_blank">
        <ProofCardLogo clickable>
          <Image src={ViewIcon} alt={`View ${proof.type}`} fill />
        </ProofCardLogo>
      </a>

      <ProofCardLogo clickable onClick={copyToClipboard}>
        <Image src={ShareIcon} alt={`Share ${proof.type}`} fill />
      </ProofCardLogo>
    </ProofCardContainer>
  );
};

export default ProofCard;
