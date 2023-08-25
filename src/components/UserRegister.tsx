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
} from "@chakra-ui/react";
import { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";

const UserRegister = () => {
  const [category, setCategory] = useState<string[]>([]);
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[100%] md:w-[30%] border-black border-4 rounded-3xl p-5 text-center">
        <h1 className="text-3xl font-bold mb-3">Sign Up</h1>
        <FormControl gap={5}>
          <Stack spacing={5}>
            <div>
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </div>
            <div>
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </div>
            <div>
              <FormLabel>Phone Number</FormLabel>
              <Input type="number" />
            </div>
            <div>
              <FormLabel>Select Category</FormLabel>
              <Select
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

            <FormHelperText>We'll never share your email.</FormHelperText>
            <Button mt={5} type="submit">
              Sign Up
            </Button>
          </Stack>
        </FormControl>
      </div>
    </div>
  );
};

export default UserRegister;
