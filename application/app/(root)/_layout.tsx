import { useUser } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";

export default function Layout() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <Redirect href={"/sign-in"} />;
  } else {
    return <Stack screenOptions={{ headerShown: false }} />;
  }
}
