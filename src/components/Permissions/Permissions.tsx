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
