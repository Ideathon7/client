import {
  Badge,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Icon,
  Input,
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineCancel } from "react-icons/md";
import { z } from "zod";
import { http } from "../service/api-url";
import userStore from "../store/userStore";

const schema = z.object({
  bookTitle: z.string().min(5).max(50),
  description: z.string(),
  author: z.string().min(3),
  publisher: z.number().min(10),
  genre: z.string().array(),
  price: z.number(),
  imgUrl: z.string(),
  uid: z.string(),
  displayName: z.string(),
  sendBy: z.string(),
});

export type BookDetails = z.infer<typeof schema>;

const BookForm = () => {
  const { register, getValues } = useForm<BookDetails>({
    resolver: zodResolver(schema),
  });
  const toast = useToast();
  const { uid, displayName } = userStore((s) => s.user);
  const [category, setCategory] = useState<string[]>([]);
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!uid)
      return toast({
        title: "Please Sign in to continue",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    const { bookTitle, description, author, price, imgUrl, publisher } =
      getValues();

    try {
      const response = await http.get("/posts.json");
      const preData = response.data;

      // Check if preData is defined and not null
      const existingBooks = preData
        ? Array.isArray(preData)
          ? preData
          : Object.values(preData)
        : [];

      // Rest of your code remains the same
      const newBook = {
        bookTitle,
        description,
        author,
        price,
        publisher,
        imgUrl,
        genre: category,
        uid,
        displayName,
      };
      const updatedBooks = [newBook, ...existingBooks];

      await http
        .put(`/posts.json`, updatedBooks)
        .then((res) => console.log(res.data));

      toast({
        title: "Account created.",
        description: "Your book has been added for sale.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      window.location.href = "/all-books";
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-[100%] p-5">
      <h1 className="text-center text-4xl p-4">Post your book</h1>
      <form
        className="w-100% md:w-[50%] mx-auto"
        onSubmit={(event: FormEvent) => handleSubmit(event)}
      >
        <FormControl gap={5}>
          <Stack spacing={5}>
            <div>
              <FormLabel>Book Title</FormLabel>
              <Input {...register("bookTitle")} type="text" />
            </div>
            <div>
              <FormLabel>Description</FormLabel>
              <Input {...register("description")} type="text" />
            </div>
            <div>
              <FormLabel>Author</FormLabel>
              <Input {...register("author")} type="text" />
            </div>
            <div>
              <FormLabel>Publisher</FormLabel>
              <Input {...register("publisher")} type="text" />
            </div>
            <div>
              <FormLabel>Price per Month</FormLabel>
              <Input {...register("price")} type="number" />
            </div>
            <div>
              <FormLabel>Image Url</FormLabel>
              <Input {...register("imgUrl")} type="string" />
            </div>
            <div>
              <FormLabel>Genre</FormLabel>
              <Select
                {...register("genre")}
                variant={"outline"}
                size={"lg"}
                onChange={(event) =>
                  setCategory([...category, event.currentTarget.value])
                }
              >
                <option value="">Select a category</option>
                <option value="fiction">Fiction</option>
                <option value="nonfiction">Nonfiction</option>
                <option value="fantasy">Fantasy</option>
                <option value="mystery">Mystery</option>
                <option value="sciencefiction">Science Fiction</option>
                <option value="romance">Romance</option>
                <option value="horror">Horror</option>
                <option value="biography">Biography</option>
                <option value="selfhelp">Self-Help</option>
                <option value="history">History</option>
              </Select>
            </div>
            <HStack>
              {category.map((item, index) => (
                <Badge key={index} colorScheme="pink" w={"fit-content"} p={2}>
                  {item}{" "}
                  <Icon
                    as={MdOutlineCancel}
                    boxSize={"20px"}
                    cursor={"pointer"}
                    onClick={() =>
                      setCategory(category.filter((c) => c !== item))
                    }
                  />
                </Badge>
              ))}
            </HStack>

            <FormHelperText>We'll never share your data.</FormHelperText>
            <Button mt={5} type="submit">
              Post for Rent
            </Button>
          </Stack>
        </FormControl>
      </form>
    </div>
  );
};

export default BookForm;
