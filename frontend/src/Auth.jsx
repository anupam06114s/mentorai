import "./Auth.css";
import { Component as SignInFlo } from "@/components/ui/sign-in-flo";

export default function Auth({ onLogin }) {
  return <SignInFlo onLogin={onLogin} />;
}
