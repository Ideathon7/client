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
import { zodResolver } from "@hookform/resolvers/zod";
import { User, createUserWithEmailAndPassword } from "firebase/auth";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineCancel } from "react-icons/md";
import { z } from "zod";
import { auth } from "../firebase";
import { http } from "../service/api-url";

const schema = z.object({
  email: z.string(),
  password: z.string().min(3),
  phone: z.number().min(10),
  category: z.string().array(),
});

type UserData = z.infer<typeof schema>;

const UserRegister = () => {
  const { register, getValues } = useForm<UserData>({
    resolver: zodResolver(schema),
  });
  const [category, setCategory] = useState<string[]>([]);

  const handleRegister = async (event: FormEvent) => {
    event.preventDefault();
    console.log("loading...");

    const { email, password, phone } = getValues();

    try {
      const { uid, email: userEmail }: User =
        await createUserWithEmailAndPassword(auth, email, password).then(
          (res) => {
            window.localStorage.setItem("user", JSON.stringify(res.user));
            return res.user;
          }
        );

      await http
        .post(`/users/${uid}.json`, {
          userId: uid,
          email: userEmail,
          phone: phone,
          category: category,
        })
        .then((res) => console.log(res.data));
      window.location.href = `/user-profile/${uid}`;
    } catch (ex) {}
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[100%] md:w-[30%] border-black border-4 rounded-3xl p-5 text-center">
        <h1 className="text-3xl font-bold mb-3">Sign Up</h1>
        <form onSubmit={(event: FormEvent) => handleRegister(event)}>
          <FormControl gap={5}>
            <Stack spacing={5}>
              <div>
                <FormLabel>Email address</FormLabel>
                <Input {...register("email")} type="email" />
              </div>
              <div>
                <FormLabel>Password</FormLabel>
                <Input {...register("password")} type="password" />
              </div>
              <div>
                <FormLabel>Phone Number</FormLabel>
                <Input {...register("phone")} type="number" />
              </div>
              <div>
                <FormLabel>Select Category</FormLabel>
                <Select
                  {...register("category")}
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
        </form>
      </div>
    </div>
  );
};

export default UserRegister;
