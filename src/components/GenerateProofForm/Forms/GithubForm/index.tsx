import useGithubOptions from "@/hooks/ProofFormOptions/useGithubOptions";
import useProofMint from "@/hooks/useProofMint";
import useUserProof from "@/hooks/useUserProof";
import { addUserActiveProof, generateGithubProof } from "@/services/internal";
import { useEffect, useState } from "react";
import {
  GithubFormContainer,
  GithubFormContent,
  GithubFormTableHeader,
  GithubFormText,
  GithubFormRow,
  GithubFormInputContainer,
  GithubFormTextInput,
  GithubFormButton,
  GithubFormError,
} from "./style";
import ActionButton from "@/components/ActionButton";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import useUserProofFromBackend from "@/hooks/useUserProofFromBackend";
import useFetchCurrentActiveSubscriptionPlan from "@/hooks/useFetchCurrentActiveSubscriptionPlan";
import { SubscriptionTier } from "@prisma/client";

const GithubForm = () => {
  const { address } = useAccount();
  const {
    data: currentSubscriptionPlan,
    loading: fetchingSubscriptionPlan,
    error: errorFromSubscriptionPlan,
    fetchPlan,
  } = useFetchCurrentActiveSubscriptionPlan(address as string);
  const [tier, setTier] = useState<SubscriptionTier>();
  const { data: stats, loading: fetchingStats } = useGithubOptions();
  const { data: userCids } = useUserProofFromBackend();

  const {
    transactionHash,
    error: githubMintingError,
    submitProof,
    clearData: clearMint,
    replaceProof,
  } = useProofMint();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [numOfPrs, setNumOfPrs] = useState<string>("");
  const [numOfStarred, setNumOfStarred] = useState<string>("");
  const [numOfSponsors, setNumOfSponsors] = useState<string>("");

  const [proofPrs, setProofPrs] = useState<boolean>(false);
  const [proofStarred, setProofStarred] = useState<boolean>(false);
  const [proofSponsors, setProofSponsors] = useState<boolean>(false);

  useEffect(() => {
    if (currentSubscriptionPlan) {
      setTier(currentSubscriptionPlan.tier);
    }
  }, [currentSubscriptionPlan]);

  const clearData = () => {
    setProofPrs(false);
    setProofSponsors(false);
    setProofStarred(false);

    setNumOfPrs("");
    setNumOfStarred("");
    setNumOfSponsors("");
    clearMint();
  };

  const handleGenerate = async () => {
    setLoading(true);
    // Check if numbers are valid
    if (!proofPrs && !proofStarred && !proofSponsors) {
      toast.error("Minimum of one proof");
      return;
    }

    if (proofPrs && Number(numOfPrs) > stats.prs) {
      toast.error("Threshold cannot exceed the numbers of PR you have");
      return;
    }

    if (proofStarred && Number(numOfStarred) > stats.starred) {
      toast.error("Threshold cannot exceed the numbers of Starred you have");
      return;
    }

    if (proofSponsors && Number(numOfSponsors) > stats.sponsors) {
      toast.error("Threshold cannot exceed the numbers of Sponsors you have");
      return;
    }

    if (proofPrs && Number(numOfPrs) <= 0) {
      toast.error("Threshold of PR must be a position value");
      return;
    }

    if (proofStarred && Number(numOfStarred) <= 0) {
      toast.error("Threshold of Starred must be a position value");
      return;
    }

    if (proofSponsors && Number(numOfSponsors) <= 0) {
      toast.error("Threshold of Sponsors must be a position value");
      return;
    }

    try {
      const { data: cid } = await generateGithubProof(
        Number(numOfSponsors),
        Number(numOfStarred),
        Number(numOfPrs),
        proofPrs,
        proofStarred,
        proofSponsors
      );
      const responseFromStoringUserProof = await addUserActiveProof(
        address as string,
        cid,
        "GITHUB"
      );

      if (
        !responseFromStoringUserProof.data &&
        responseFromStoringUserProof.error
      ) {
        toast.error("Error saving proof");
        return;
      }

      await submitProof(cid as string);
      toast.success(`Minting your proof! ${transactionHash}`);
      // await fetchNewUserProof();
      clearData();
    } catch (error) {
      toast.error(
        "Something went wrong with submitting proof. Please try again."
      );
    }

    setLoading(false);
  };

  const handleReplace = async () => {
    // setError("");
    setLoading(true);
    // Check if numbers are valid
    if (!proofPrs && !proofStarred && !proofSponsors) {
      toast.error("Minimum of one proof");
      return;
    }

    if (proofPrs && Number(numOfPrs) > stats.prs) {
      toast.error("Threshold cannot exceed the numbers of PR you have");
      return;
    }

    if (proofStarred && Number(numOfStarred) > stats.starred) {
      toast.error("Threshold cannot exceed the numbers of Starred you have");
      return;
    }

    if (proofSponsors && Number(numOfSponsors) > stats.sponsors) {
      toast.error("Threshold cannot exceed the numbers of Sponsors you have");
      return;
    }

    if (proofPrs && Number(numOfPrs) <= 0) {
      toast.error("Threshold of PR must be a position value");
      return;
    }

    if (proofStarred && Number(numOfStarred) <= 0) {
      toast.error("Threshold of Starred must be a position value");
      return;
    }

    if (proofSponsors && Number(numOfSponsors) <= 0) {
      toast.error("Threshold of Sponsors must be a position value");
      return;
    }

    try {
      const { data: cid } = await generateGithubProof(
        Number(numOfSponsors),
        Number(numOfStarred),
        Number(numOfPrs),
        proofPrs,
        proofStarred,
        proofSponsors
      );
      const responseFromStoringUserProof = await addUserActiveProof(
        address as string,
        cid,
        "GITHUB"
      );

      if (
        !responseFromStoringUserProof.data &&
        responseFromStoringUserProof.error
      ) {
        toast.error("Error saving proof");
        return;
      }

      await replaceProof(cid as string);
      toast.success(`Minting your proof! ${transactionHash}`);
      // await fetchNewUserProof();
      clearData();
    } catch (error) {
      toast.error(
        "Something went wrong with submitting proof. Please try again."
      );
    }

    setLoading(false);
  };
  return (
    <GithubFormContainer>
      <GithubFormContent>
        <GithubFormTableHeader>
          <p>Type</p>
          <p>Show</p>
          <p>You have</p>
          <p>Threshold</p>
        </GithubFormTableHeader>
        {fetchingSubscriptionPlan || fetchingStats ? (
          <GithubFormText></GithubFormText>
        ) : (
          <>
            <GithubFormRow allow={true}>
              <GithubFormText>PRs</GithubFormText>
              <GithubFormInputContainer>
                <input
                  type="checkbox"
                  checked={proofPrs}
                  onChange={(e) => setProofPrs(e.target.checked)}
                />
              </GithubFormInputContainer>
              <GithubFormText>{stats.prs}</GithubFormText>
              <GithubFormInputContainer>
                <GithubFormTextInput
                  type="number"
                  value={numOfPrs}
                  onChange={(e) => setNumOfPrs(e.target.value)}
                />
              </GithubFormInputContainer>
            </GithubFormRow>

            <GithubFormRow
              allow={
                tier === SubscriptionTier.BRONZE ||
                tier === SubscriptionTier.SILVER ||
                tier === SubscriptionTier.GOLD
              }
            >
              <GithubFormText>Starred Repos</GithubFormText>
              <GithubFormInputContainer>
                <input
                  type="checkbox"
                  disabled={
                    !(
                      tier === SubscriptionTier.BRONZE ||
                      tier === SubscriptionTier.SILVER ||
                      tier === SubscriptionTier.GOLD
                    )
                  }
                  checked={proofStarred}
                  onChange={(e) => setProofStarred(e.target.checked)}
                />
              </GithubFormInputContainer>
              <GithubFormText>{stats.starred}</GithubFormText>
              <GithubFormInputContainer>
                <GithubFormTextInput
                  type="number"
                  disabled={
                    !(
                      tier === SubscriptionTier.BRONZE ||
                      tier === SubscriptionTier.SILVER ||
                      tier === SubscriptionTier.GOLD
                    )
                  }
                  value={numOfStarred}
                  onChange={(e) => setNumOfStarred(e.target.value)}
                />
              </GithubFormInputContainer>
            </GithubFormRow>

            <GithubFormRow
              allow={
                tier === SubscriptionTier.SILVER ||
                tier === SubscriptionTier.GOLD
              }
            >
              <GithubFormText>Sponsors</GithubFormText>
              <GithubFormInputContainer>
                <input
                  disabled={
                    !(
                      tier === SubscriptionTier.SILVER ||
                      tier === SubscriptionTier.GOLD
                    )
                  }
                  type="checkbox"
                  checked={proofSponsors}
                  onChange={(e) => setProofSponsors(e.target.checked)}
                />
              </GithubFormInputContainer>
              <GithubFormText>{stats.sponsors}</GithubFormText>
              <GithubFormInputContainer>
                <GithubFormTextInput
                  type="number"
                  disabled={
                    !(
                      tier === SubscriptionTier.SILVER ||
                      tier === SubscriptionTier.GOLD
                    )
                  }
                  value={numOfSponsors}
                  onChange={(e) => setNumOfSponsors(e.target.value)}
                />
              </GithubFormInputContainer>
            </GithubFormRow>

            <ActionButton
              label="Submit Proof"
              loading={loading}
              handleClick={() => {
                if (!loading) {
                  if (
                    userCids.filter((userCid) => userCid.type === "GITHUB")
                      .length > 0
                  ) {
                    handleReplace();
                  } else {
                    handleGenerate();
                  }
                }
              }}
            />
          </>
        )}
      </GithubFormContent>
    </GithubFormContainer>
  );
};

export default GithubForm;
