import GenerateProofForm from "@/components/GenerateProofForm";
import {
  GenericContainer,
  GenericContent,
  GenericTitle,
} from "../GenericLayout";

const CreateProofView = () => {
  return (
    <GenericContainer>
      <GenericTitle>Create Proof</GenericTitle>
      <GenericContent>
        <GenerateProofForm />
      </GenericContent>
    </GenericContainer>
  );
};

export default CreateProofView;
