import { Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <Stack>
      {books.map((book, index) => (
        <BookCard index={index} book={book} />
      ))}
    </Stack>
  );
};

export default AllBooks;
