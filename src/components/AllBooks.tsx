import {
  Button,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiDownArrow } from "react-icons/bi";
import { http } from "../service/api-url";
import BookCard from "./BookCard";
import { BookDetails } from "./BookForm";

const AllBooks = () => {
  const [books, setBooks] = useState<BookDetails[]>([]);
  const getBooks = async () => {
    await http
      .get("/posts.json")
      .then((res) => {
        setBooks(res.data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  };
  const bookGenres = [
    "Fiction",
    "Nonfiction",
    "Mystery",
    "Fantasy",
    "Science Fiction",
    "Romance",
    "Horror",
    "Biography",
    "Self-Help",
    "History",
  ];
  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="w-full">
      <div className="p-10 flex flex-col md:flex-row w-[80%] my-auto mx-auto">
        <Input placeholder="Search your books" />
        <Menu>
          <MenuButton
            as={Button}
            width={"200px"}
            mx={10}
            rightIcon={<BiDownArrow />}
          >
            Select Genre
          </MenuButton>
          <MenuList>
            {bookGenres.map((genre, index) => (
              <MenuItem key={index}>{genre}</MenuItem>
            ))}
          </MenuList>
        </Menu>
      </div>
      <Stack>
        {books.map((book, index) => (
          <BookCard key={index} book={book} index={index} />
        ))}
      </Stack>
    </div>
  );
};

export default AllBooks;
