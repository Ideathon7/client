import { Button, HStack, Icon, Stack, useToast } from "@chakra-ui/react";
import { BiFace, BiTimeFive } from "react-icons/bi";
import userStore from "../store/userStore";
import { BookDetails } from "./BookForm";
import { http } from "../service/api-url";
import { UserData } from "./UserRegister";
interface Props {
  index: number;
  book: BookDetails;
}
const BookCard = ({ index, book }: Props) => {
  const user = userStore((s) => s.user);
  const toast = useToast();
  const handleRent = async (bookDetails: BookDetails) => {
    try {
      const { email, displayName, phone, category, request } = await http
        .get<UserData>(`/users/${bookDetails.uid}.json`)
        .then((res) => res.data);

      const existingReq = request
        ? Array.isArray(request)
          ? request
          : Object.values(request)
        : [];
      const updatedRequest = [
        { ...bookDetails, sendBy: user.displayName },
        ...existingReq,
      ];
      await http
        .put(`/users/${bookDetails.uid}.json`, {
          email,
          displayName,
          phone,
          category,
          request: updatedRequest,
        })
        .then((res) => console.log(res.data));
      toast({
        title: "Request sent successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    } catch (ex) {
      toast({
        title: "Sign Up or Login to continue",
        status: "info",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  return (
    <div key={index} className="my-5 flex justify-center">
      <div className="flex flex-col md:flex-row w-[80%] rounded-xl overflow-hidden">
        <img src={book.imgUrl} className="w-[200px] h-[200px] object-cover" />
        <Stack className="mx-5" w={"100%"} justify={"space-evenly"}>
          <HStack display={"flex"} justify={"space-between"}>
            <h1 className="text-4xl">{book.bookTitle}</h1>
            {user?.uid !== book.uid ? (
              <Button onClick={() => handleRent(book)}>Rent</Button>
            ) : null}
          </HStack>
          <Stack justify={"space-between"}>
            <p>{book.description}</p>
            <h1 className="text-3xl text-bold">${book.price} per month</h1>
          </Stack>
          <HStack>
            <p>
              <Icon as={BiTimeFive} boxSize={"30px"} mx={2} />2 mins
            </p>

            <p>
              <Icon as={BiFace} boxSize={"30px"} mx={2} />
              {user?.displayName === book?.displayName
                ? "You"
                : book.displayName}
            </p>
          </HStack>
        </Stack>
      </div>
    </div>
  );
};

export default BookCard;
