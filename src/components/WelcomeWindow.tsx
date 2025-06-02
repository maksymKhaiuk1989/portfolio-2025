import { Input } from "./ui-kit/Input";

export const WelcomeWindow = () => {
  return (
    <div className="p-10 text-xl border-shadow">
      <h2>Hello</h2>
      <p>Pls enter your user name:</p>
      <Input />
    </div>
  );
};
