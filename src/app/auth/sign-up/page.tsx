import { Metadata } from "next";
import SignUpForm from "./_components/form";

type SignUpPageProps = {};

export const metadata: Metadata = {
  title: "Sign up",
};

export default async function SignUpPage(props: SignUpPageProps) {
  return <SignUpForm />;
}
