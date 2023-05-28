import { useUserProof } from "@/context/UserProofContext";
import {
  GenericContainer,
  GenericTitle,
  GenericContent,
} from "../GenericLayout";
import ProofCard from "@/components/ProofCard";
import useUserProofFromBackend from "@/hooks/useUserProofFromBackend";

const WalletView = () => {
  const { data } = useUserProofFromBackend();
  const { state } = useUserProof();

  return (
    <GenericContainer>
      <GenericTitle>Wallet</GenericTitle>
      <GenericContent>
        {state.proofs.map((proof) => (
          <ProofCard key={proof.cid} proof={proof} />
        ))}
      </GenericContent>
    </GenericContainer>
  );
};

export default WalletView;
