"use client";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";

import { GET_USER_BY_EMAIL } from "entities/User/config/schemas";
import { IUser } from "entities/User/config/types";

export const UserCard = () => {
  const { data, loading, error } = useQuery(GET_USER_BY_EMAIL, {
    variables: { email: "2" },
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>Error {error.message}</p>;
  }

  return (
    <div>
      {data?.getUserByEmail.email}
      {data?.getUserByEmail.username}
    </div>
  );
};
