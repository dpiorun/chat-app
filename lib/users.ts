import { User } from "@/types/backendTypes";

export async function getUsers() {
  let res;
  try {
    res = await fetch("https://randomuser.me/api/?results=10");
  } catch (error) {
    console.error(error);
    return;
  }

  const { results }: { results: User[] } = await res.json();
  return [...results];
}
