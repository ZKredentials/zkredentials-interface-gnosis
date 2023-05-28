import VerifyProofView from "@/views/VerifyProofView";
import { useRouter } from "next/router";

const ProofPage = () => {
  const router = useRouter();
  const { cid } = router.query;

  return <VerifyProofView cid={cid as string} />;
};

export default ProofPage;
