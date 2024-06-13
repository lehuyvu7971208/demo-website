import { Metadata } from "next";
import SignInForm from "./_components/form";

type SignInPageProps = {};

export const metadata: Metadata = {
  title: "Sign In",
};

export default async function SignInPage(props: SignInPageProps) {
  return <SignInForm />;
}
