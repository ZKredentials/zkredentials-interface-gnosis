import { FC, memo, useState } from "react";
import {
  ProofSummaryCardContainer,
  ProofSummaryCardContent,
  ProofSummaryCardSection,
  ProofSummaryCardSeeMore,
  ProofSummaryCardText,
  ProofSummaryCardTextDetail,
} from "./style";

interface IVerifyProofDetails {
  prs?: string;
  prsThreshold?: number;
  starred?: string;
  starredThreshold?: number;
  sponsors?: string;
  sponsorsThreshold?: number;
  prsProofDetails?: string;
  starredProofDetails?: string;
  sponsorsProofDetails?: string;
}

interface IProps {
  loading: boolean;
  data: IVerifyProofDetails;
}

const ProofSummaryCard: FC<IProps> = ({ loading, data }) => {
  const [viewMorePrs, setViewMorePrs] = useState<boolean>(false);
  const [viewMoreStarred, setViewMoreStarred] = useState<boolean>(false);
  const [viewMoreSponsors, setViewMoreSponsors] = useState<boolean>(false);

  return (
    <ProofSummaryCardContainer>
      {loading ? (
        <ProofSummaryCardContent>
          <ProofSummaryCardText>Loading...</ProofSummaryCardText>
        </ProofSummaryCardContent>
      ) : (
        <ProofSummaryCardContent>
          {data?.prs && (
            <ProofSummaryCardSection>
              <ProofSummaryCardText>
                You have at least {data?.prsThreshold} Pulled Requests
              </ProofSummaryCardText>
              {viewMorePrs ? (
                <ProofSummaryCardTextDetail
                  onClick={() => setViewMorePrs(false)}
                >
                  {data.prsProofDetails}
                </ProofSummaryCardTextDetail>
              ) : (
                <ProofSummaryCardSeeMore onClick={() => setViewMorePrs(true)}>
                  View Proof
                </ProofSummaryCardSeeMore>
              )}
            </ProofSummaryCardSection>
          )}

          {data?.starred && (
            <ProofSummaryCardSection>
              <ProofSummaryCardText>
                You have at least {data?.starredThreshold} Starred Repositories
              </ProofSummaryCardText>
              {viewMoreStarred ? (
                <ProofSummaryCardTextDetail
                  onClick={() => setViewMoreStarred(false)}
                >
                  {data.starredProofDetails}
                </ProofSummaryCardTextDetail>
              ) : (
                <ProofSummaryCardSeeMore
                  onClick={() => setViewMoreStarred(true)}
                >
                  View Proof
                </ProofSummaryCardSeeMore>
              )}
            </ProofSummaryCardSection>
          )}

          {data?.sponsors && (
            <ProofSummaryCardSection>
              <ProofSummaryCardText>
                You have at least {data?.sponsorsThreshold} Sponsors
              </ProofSummaryCardText>
              {viewMoreSponsors ? (
                <ProofSummaryCardTextDetail
                  onClick={() => setViewMoreSponsors(false)}
                >
                  {data.sponsorsProofDetails}
                </ProofSummaryCardTextDetail>
              ) : (
                <ProofSummaryCardSeeMore
                  onClick={() => setViewMoreSponsors(true)}
                >
                  View Proof
                </ProofSummaryCardSeeMore>
              )}
            </ProofSummaryCardSection>
          )}
        </ProofSummaryCardContent>
      )}
    </ProofSummaryCardContainer>
  );
};

export default memo(ProofSummaryCard);
