import {
  Badge,
  Button,
  GridItem,
  HStack,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import avatar from "../assets/avatar.jpeg";
import { http } from "../service/api-url";
import userStore from "../store/userStore";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import Loader from "./Loader";
import { BookDetails } from "./BookForm";
import BookCard from "./BookCard";
import RequestCard from "./RequestCard";

interface UserData {
  displayName: string;
  uid: string;
  email: string;
  phone: string;
  category: [];
  request: BookDetails[];
}

const UserProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const user = userStore((s) => s.user);
  const [isClicked, setIsClicked] = useState(false);
  const [books, setBooks] = useState<BookDetails[]>([]);
  const [userData, setUserData] = useState<UserData>();
  const { id } = useParams();
  const getData = async () => {
    await http.get(`/users/${id}.json`).then((res) => {
      console.log(res.data);
      setUserData(res.data);
    });
  };

  const getBooks = async () => {
    await http.get("/posts.json").then((res) => {
      const temp: BookDetails[] = res.data;
      setBooks(temp?.filter((books) => books.uid === user.uid));
      console.log("user books", res.data);
    });
  };
  useEffect(() => {
    setIsLoading(true);
    getData();
    getBooks();
    setIsLoading(false);
  }, [user]);
  if (isLoading) return <Loader />;

  return (
    <div className="w-[100%]">
      <div className="w-[80%] p-5 flex flex-col md:flex-row mx-auto my-5">
        <div className="w-[300px] h-[300px]">
          <img src={avatar} className="object-cover  rounded-[50%]" />
        </div>
        <Stack spacing={5} m={"auto"} textAlign={["center", "start"]}>
          <h1 className="text-3xl">{userData?.displayName}</h1>
          <h1>+91 {userData?.phone}</h1>

          <HStack>
            {userData?.category.map((item, index) => (
              <Badge key={index} colorScheme="pink" p={4}>
                {item}
              </Badge>
            ))}
            <Button colorScheme="purple">
              <Icon as={AiOutlineEdit} />
            </Button>
            <Link to="/add-book">
              <Button colorScheme="purple">
                Add books
                <Icon as={AiOutlinePlus} />
              </Button>
            </Link>
          </HStack>
        </Stack>
      </div>
      <HStack justify={"center"} spacing={10}>
        <Heading
          p={2}
          borderRadius={10}
          textAlign={"center"}
          my={5}
          cursor={"pointer"}
          bg={isClicked ? "" : "purple"}
          onClick={() => setIsClicked(!isClicked)}
        >
          My Posts
        </Heading>
        <Heading
          p={2}
          borderRadius={10}
          textAlign={"center"}
          my={5}
          bg={!isClicked ? "" : "purple"}
          cursor={"pointer"}
          onClick={() => setIsClicked(!isClicked)}
        >
          Requests
        </Heading>
      </HStack>

      {!isClicked &&
        books?.map((book, index) => <BookCard index={index} book={book} />)}

      {isClicked && userData?.request && (
        <div className="my-5">
          <SimpleGrid columns={[1, 3, 4]} gap={5}>
            {userData?.request.map((req, index) => (
              <GridItem key={index}>
                <RequestCard
                  sentBy={req.sendBy}
                  imgUrl={req.imgUrl}
                  title={req.bookTitle}
                  description={req.description}
                  price={req.price}
                />
              </GridItem>
            ))}
          </SimpleGrid>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
