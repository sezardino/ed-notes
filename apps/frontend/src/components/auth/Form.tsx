import React from "react";
import { twMerge } from "tailwind-merge";
import { Button, InputField, Toggle } from "ui";

interface Props extends React.HTMLProps<HTMLDivElement> {}

export const AuthForm: React.FC<Props> = (props) => {
  const { className, ...rest } = props;

  return (
    <section
      {...rest}
      className={twMerge("bg-gray-50 dark:bg-gray-900", className)}
    >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form>
              <InputField
                label="Your email"
                type="email"
                placeholder="example@mail.com"
                name="email"
              />
              <InputField
                label="Password"
                type="password"
                placeholder="••••••••"
                name="password"
              />

              <div className="flex items-center justify-between">
                <Toggle label="Remember me" />
                <Button text="Forgot password?" variant="link" />
              </div>

              <Button type="submit" text="Sign in" className="w-full mt-4" />

              <p className="mt-4 text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Button text="Sign up" variant="link" />
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
