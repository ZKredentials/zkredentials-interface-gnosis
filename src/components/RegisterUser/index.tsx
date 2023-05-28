import { FC, useState } from "react";
import ActionButton from "../ActionButton";
import { RegisterUserContainer, RegisterUserText } from "./style";
import { useAccount } from "wagmi";
import useSignMessage from "@/hooks/useSignMessage";
import { registerUserAccount } from "@/services/internal";
import toast from "react-hot-toast";

interface IProps {
  callback: () => Promise<void>;
}

const RegisterUser: FC<IProps> = ({ callback }) => {
  const { address } = useAccount();
  const [registering, setRegistering] = useState<boolean>(false);
  const { handleSignMessage } = useSignMessage();

  const handleRegistration = async () => {
    setRegistering(true);
    console.log(`Registering account for ${address}`);
    const signMessageHash = await handleSignMessage(
      `Registering ZKredentials subscription account for ${address}`
    );

    if (signMessageHash) {
      console.log("signMessageHash", signMessageHash);
      const response = await registerUserAccount(address as string);
      if (!response.data || response.error) {
        toast.error(response.error as string);
        return;
      }

      setRegistering(false);
      toast.success("You have successfully registered");
      await callback();
    }
  };

  return (
    <RegisterUserContainer>
      <RegisterUserText>User is not registered.</RegisterUserText>
      <RegisterUserText>
        Click the button below to sign message to trigger a registration
        process.
      </RegisterUserText>
      <ActionButton
        loading={registering}
        label="Sign Message"
        handleClick={handleRegistration}
      />
    </RegisterUserContainer>
  );
};

export default RegisterUser;
