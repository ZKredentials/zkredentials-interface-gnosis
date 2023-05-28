import { useSigner } from "wagmi";
import { ethers } from "ethers";

const useSignMessage = () => {
  const { data: _signer } = useSigner();

  const handleSignMessage = async (message: string) => {
    try {
      const provider = new ethers.providers.Web3Provider(
        (_signer?.provider as any).provider,
        "any"
      );
      const signer = provider.getSigner();
      return await signer.signMessage(message);
    } catch (error) {}
  };

  return { handleSignMessage };
};

export default useSignMessage;
