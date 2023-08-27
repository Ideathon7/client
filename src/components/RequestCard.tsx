import {
  Button,
  Card,
  CardBody,
  HStack,
  Heading,
  Icon,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdDoneOutline } from "react-icons/md";

interface Props {
  imgUrl: string;
  title: string;
  description: string;
  price: number;
  sentBy: string;
}
const RequestCard = ({ imgUrl, title, description, price, sentBy }: Props) => {
  const [isAccepted, setIsAccepted] = useState(false);
  const toast = useToast();
  return (
    <Card borderRadius={10} overflow={"hidden"}>
      <img src={imgUrl} className="h-[200px] object-cover" />
      <CardBody>
        <Stack spacing={3}>
          <Heading>{title}</Heading>
          <p>{description}</p>
          <HStack justify={"space-between"}>
            <Heading>
              ${price} <p className="text-sm">per Month</p>
            </Heading>
            <Button
              width={"80px"}
              colorScheme={isAccepted ? "green" : "purple"}
              onClick={() => {
                setIsAccepted(!isAccepted);
                toast({
                  title: "Request accepted",
                  status: "success",
                  duration: 2000,
                  position: "top",
                });
              }}
            >
              {isAccepted ? <Icon as={MdDoneOutline} /> : "Accept"}
            </Button>
          </HStack>
          <p>Sent by {sentBy}</p>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default RequestCard;
