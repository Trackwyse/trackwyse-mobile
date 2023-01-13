/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import Text from "@/components/Text";
import Container from "@/components/Container";

interface PermissionsProps {
  title?: string;
  description?: string;
}

const Permissions: React.FC<PermissionsProps> = ({ title, description }) => {
  return (
    <Container>
      <Text variant="title">{title}</Text>
      <Text variant="subtitle">{description}</Text>
    </Container>
  );
};

export default Permissions;
