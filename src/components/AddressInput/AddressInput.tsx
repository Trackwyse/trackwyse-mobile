/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import { useFormik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import tw from "@/lib/tailwind";
import Text from "@/components/Text";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Container from "@/components/Container";

interface AddressInputProps {
  title: string;
  description: string;
  initialAddress?: AddressInput;
  onSubmit: (address: AddressInput, addressInput: any) => void;
  mutation: any;
}

const AddressInput: React.FC<AddressInputProps> = ({
  title,
  description,
  initialAddress,
  onSubmit,
  mutation,
}) => {
  const addressInput = useFormik({
    initialValues: {
      address1: initialAddress?.address1 || "",
      address2: initialAddress?.address2 || "",
      city: initialAddress?.city || "",
      state: initialAddress?.state || "",
      zip5: initialAddress?.zip5 || "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values: AddressInput) => {
      onSubmit(values, addressInput);
    },
  });

  return (
    <Container>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        style={tw`h-full w-full`}
      >
        <Text variant="title">{title}</Text>
        <Text variant="subtitle">{description}</Text>

        <Input
          placeholder="Address 1"
          size="lg"
          style={tw`my-1`}
          value={addressInput.values.address1}
          disabled={mutation.isLoading}
          error={addressInput.errors.address1}
          onChangeText={addressInput.handleChange("address1")}
        />
        <Input
          placeholder="Address 2"
          size="lg"
          style={tw`my-1`}
          value={addressInput.values.address2}
          disabled={mutation.isLoading}
          error={addressInput.errors.address2}
          onChangeText={addressInput.handleChange("address2")}
        />
        <Input
          placeholder="City"
          size="lg"
          style={tw`my-1`}
          value={addressInput.values.city}
          disabled={mutation.isLoading}
          error={addressInput.errors.city}
          onChangeText={addressInput.handleChange("city")}
        />
        <Input
          placeholder="State"
          size="lg"
          style={tw`my-1`}
          value={addressInput.values.state}
          disabled={mutation.isLoading}
          error={addressInput.errors.state}
          onChangeText={addressInput.handleChange("state")}
        />
        <Input
          placeholder="Zip Code"
          size="lg"
          style={tw`my-1`}
          value={addressInput.values.zip5}
          disabled={mutation.isLoading}
          error={addressInput.errors.zip5}
          onChangeText={addressInput.handleChange("zip5")}
        />
        <Button
          size="lg"
          style={tw`mt-2`}
          loading={mutation.isLoading}
          onPress={() => addressInput.handleSubmit()}
        >
          Update
        </Button>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default AddressInput;
