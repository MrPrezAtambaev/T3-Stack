import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { api } from "~/utils/api";
import { IconLogout, IconLogin } from "@tabler/icons-react";
import { ActionIcon, Avatar } from "@mantine/core";

const Login = ({ dark }: any) => {
  const { data: sessionData } = useSession();

  const textColor = dark ? "text-gray" : "text-black";

  // const { data: secretMessage } = api.example.getSecretMessage.useQuery(
  //   undefined,
  //   { enabled: sessionData?.user !== undefined }
  // );

  return (
    <div className="flex items-center justify-center gap-4">
      <p className={`text-right text-xl ${textColor}`}>
        {sessionData?.user.name}
      </p>
      <Avatar src={sessionData?.user?.image} size="md" radius="xl" />
      <ActionIcon
        className={`${textColor} items-center`}
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? <IconLogout /> : <IconLogin />}
      </ActionIcon>
    </div>
  );
};

export default Login;
