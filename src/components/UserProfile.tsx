import { useParams } from "react-router-dom";
import userStore from "../store/userStore";
import { useEffect } from "react";
import { http } from "../service/api-url";

const UserProfile = () => {
  const user = userStore((s) => s.user);
  const { id } = useParams();
  useEffect(() => {
    http.get(`/users/${id}.json`).then((res) => console.log(res.data));
  }, [user]);
  console.log(user);
  return <div>{user.uid}</div>;
};

export default UserProfile;
