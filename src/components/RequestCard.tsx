import {
  Button,
  Card,
  CardBody,
  HStack,
  Heading,
  Stack,
} from "@chakra-ui/react";

interface Props {
  imgUrl: string;
  title: string;
  description: string;
  price: number;
  sentBy: string;
}
const RequestCard = ({ imgUrl, title, description, price, sentBy }: Props) => {
  return (
    <Card borderRadius={10} overflow={"hidden"}>
      <img src={imgUrl} className="h-[300px] object-cover" />
      <CardBody>
        <Stack spacing={3}>
          <Heading>{title}</Heading>
          <p>{description}</p>
          <HStack justify={"space-between"}>
            <Heading>
              ${price} <p className="text-sm">per Month</p>
            </Heading>
            <Button colorScheme="purple">Accept Request</Button>
          </HStack>
          <p>Sent by {sentBy}</p>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default RequestCard;
