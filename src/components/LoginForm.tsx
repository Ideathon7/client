import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

const schema = z.object({
  email: z.string(),
  password: z.string().min(3),
});
type UserData = z.infer<typeof schema>;

const LoginForm = () => {
  const { register, getValues } = useForm<UserData>({
    resolver: zodResolver(schema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const { email, password } = getValues();
    await signInWithEmailAndPassword(auth, email, password).then((res) => {
      window.localStorage.setItem("user", JSON.stringify(res.user));
      window.location.href = `/user-profile/${res.user.uid}`;
    });
    setIsLoading(false);
  };
  return (
    <div className="flex justify-center h-screen items-center">
      <div className="w-[100%] md:w-[30%] border-black border-4 rounded-3xl p-5 text-center my-5">
        <h1 className="text-3xl font-bold mb-3">Sign Up</h1>
        <form onSubmit={(event: FormEvent) => handleLogin(event)}>
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

              <Button mt={5} type="submit" disabled={!isLoading}>
                {isLoading ? "Loading..." : "Sign Up"}
              </Button>
            </Stack>
            <FormHelperText>
              Don't have an account{" "}
              <Link to="/register" className="underline text-blue-400">
                Login
              </Link>
            </FormHelperText>
          </FormControl>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
