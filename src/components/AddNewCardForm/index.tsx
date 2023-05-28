import { FC, useState } from "react";
import TextField from "../TextField";
import {
  AddNewCardFormContainer,
  AddNewCardFormContent,
  AddNewCardFormTitle,
} from "./style";
import ActionButton from "../ActionButton";
import { saveUserCardInformation } from "@/services/circle";
import Checkbox from "../Checkbox";
import { storeNewCard } from "@/services/internal";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";

interface IProps {
  callback: () => Promise<void>;
}

const AddNewCardForm: FC<IProps> = ({ callback }) => {
  const { address } = useAccount();
  const [loading, setLoading] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("4007400000000007");
  const [expiryMonth, setExpiryMonth] = useState<string>("");
  const [expiryYear, setExpiryYear] = useState<string>("");
  const [cvv, setCVV] = useState<string>("123");
  const [country, setCountry] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isActiveCard, setIsActiveCard] = useState<boolean>(false);

  const handleAddCard = async () => {
    setLoading(true);
    if (!name) return;
    const response = await saveUserCardInformation({
      expMonth: Number(expiryMonth),
      expYear: Number(expiryYear),
      customerName: name,
      country,
      district,
      city,
      postalCode,
      email,
      phoneNumber,
      cvv,
      cardNumber,
    });

    if (!response.data || response.error) {
      toast.error("Error creating card information");
      setLoading(false);
      return;
    }

    const dbResponse = await storeNewCard(
      address as string,
      response.data,
      isActiveCard
    );

    if (!dbResponse.data || dbResponse.error) {
      toast.error("Error saving card information");
      setLoading(false);
      return;
    }

    await callback();
    toast.success("Registered card successfully");
    setLoading(false);
  };

  const handleName = (text: string) => {
    setName(text);
  };

  const handleCardNumber = (text: string) => {
    setCardNumber(text);
  };

  const handleExpiryMonth = (text: string) => {
    setExpiryMonth(text);
  };

  const handleExpiryYear = (text: string) => {
    setExpiryYear(text);
  };

  const handleCVV = (text: string) => {
    setCVV(text);
  };

  const handleCountry = (text: string) => {
    setCountry(text);
  };

  const handleDistrict = (text: string) => {
    setDistrict(text);
  };

  const handleCity = (text: string) => {
    setCity(text);
  };

  const handlePostalCode = (text: string) => {
    setPostalCode(text);
  };

  const handleEmail = (text: string) => {
    setEmail(text);
  };

  const handlePhoneNumber = (text: string) => {
    setPhoneNumber(text);
  };

  const handleIsActiveCard = () => {
    setIsActiveCard(!isActiveCard);
  };

  return (
    <AddNewCardFormContainer>
      <AddNewCardFormTitle>Add New Card</AddNewCardFormTitle>
      <AddNewCardFormContent>
        <TextField label="Name" type="text" handleChange={handleName} />
        <TextField
          label="Card Number"
          type="text"
          value={cardNumber}
          handleChange={handleCardNumber}
        />
        <TextField
          label="Expiry Month"
          type="number"
          handleChange={handleExpiryMonth}
        />
        <TextField
          label="Expiry Year"
          type="number"
          handleChange={handleExpiryYear}
        />
        <TextField
          label="CVV"
          type="text"
          handleChange={handleCVV}
          value={cvv}
        />
        <TextField label="Country" type="text" handleChange={handleCountry} />
        <TextField label="District" type="text" handleChange={handleDistrict} />
        <TextField label="City" type="text" handleChange={handleCity} />
        <TextField
          label="Postal Code"
          type="text"
          handleChange={handlePostalCode}
        />
        <TextField label="Email" type="text" handleChange={handleEmail} />
        <TextField
          label="Phone Number"
          type="text"
          handleChange={handlePhoneNumber}
        />
        <Checkbox
          label="Set Card to Active"
          value={isActiveCard}
          handleChange={handleIsActiveCard}
        />
        <ActionButton
          loading={loading}
          label="Add Card"
          handleClick={handleAddCard}
        />
      </AddNewCardFormContent>
    </AddNewCardFormContainer>
  );
};

export default AddNewCardForm;
