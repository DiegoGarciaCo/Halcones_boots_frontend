// src/components/AuthForm.tsx
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { useAuth } from "@/lib/authContext";

type AuthVariant = "login" | "signup" | "forgotPassword";

interface AuthFormProps {
  variant?: AuthVariant;
}

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});

const SignupSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

const ForgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export default function AuthForm({ variant = "login" }: AuthFormProps) {
  const isLogin = variant === "login";
  const isSignup = variant === "signup";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { checkAuth, isLoggedIn, isChecking } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isChecking) {
    return <div>Loading...</div>;
  }

  if (isLoggedIn) {
    window.location.replace("/");
  }

  const config = {
    login: {
      heading: "Sign In to Your Account",
      submitText: "Sign In",
      altText: "Don’t have an account?",
      altLinkText: "Sign Up",
      altLinkHref: "/sign-up",
      forgotPasswordLink: true,
      endpoint: "http://localhost:8080/api/auth/login",
    },
    signup: {
      heading: "Create Your Account",
      submitText: "Sign Up",
      altText: "Already have an account?",
      altLinkText: "Sign In",
      altLinkHref: "/login",
      forgotPasswordLink: false,
      endpoint: "http://localhost:8080/api/auth/sign-up",
    },
    forgotPassword: {
      heading: "Reset Your Password",
      submitText: "Send Reset Link",
      altText: "Remember your password?",
      altLinkText: "Sign In",
      altLinkHref: "/login",
      forgotPasswordLink: false,
      endpoint: "http://localhost:8080/api/auth/forgot-password",
    },
  };

  const {
    heading,
    submitText,
    altText,
    altLinkText,
    altLinkHref,
    forgotPasswordLink,
    endpoint,
  } = config[variant];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setApiError(null);
    setIsSubmitting(true);

    let schema: z.ZodObject<any>;
    let data: any;

    if (isLogin) {
      schema = LoginSchema;
      data = { email: formData.email, password: formData.password };
    } else if (isSignup) {
      schema = SignupSchema as unknown as z.ZodObject<any>;
      data = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      };
    } else {
      schema = ForgotPasswordSchema;
      data = { email: formData.email };
    }

    try {
      const validatedData = schema.parse(data);

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedData),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      // Handle successful response (e.g., redirect or show success message)
      if (isLogin) {
        type resData = {
          roles: string[];
        };
        checkAuth();

        const data: resData = await response.json();

        if (data.roles.includes("admin")) {
          window.location.replace("/admin/dashboard");
        } else {
          window.location.replace("/");
        }
      } else if (isSignup) {
        window.location.replace("/login");
      } else {
        console.log("Reset link sent, show confirmation");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setSuccessMessage("Reset link sent, check your email");
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else if (error instanceof Error) {
        setApiError(error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-dark-leather min-h-screen flex items-center justify-center">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        {/* Logo and Heading */}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            alt="Halcones Boots"
            src="/logo.png" // Replace with your logo in /public/
            width={40}
            height={40}
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-ivory-cream">
            {heading}
          </h2>
        </div>

        {/* Form */}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignup && (
              <div className="flex gap-2">
                <div className="flex-1">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-ivory-cream"
                  >
                    First Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md bg-ivory-cream/10 px-3 py-1.5 text-ivory-cream outline-1 -outline-offset-1 outline-ivory-cream/20 placeholder:text-dusty-taupe focus:outline-2 focus:-outline-offset-2 focus:outline-tanned-leather sm:text-sm"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-ivory-cream"
                  >
                    Last Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md bg-ivory-cream/10 px-3 py-1.5 text-ivory-cream outline-1 -outline-offset-1 outline-ivory-cream/20 placeholder:text-dusty-taupe focus:outline-2 focus:-outline-offset-2 focus:outline-tanned-leather sm:text-sm"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-ivory-cream"
              >
                Email Address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-ivory-cream/10 px-3 py-1.5 text-ivory-cream outline-1 -outline-offset-1 outline-ivory-cream/20 placeholder:text-dusty-taupe focus:outline-2 focus:-outline-offset-2 focus:outline-tanned-leather sm:text-sm"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
                {successMessage && (
                  <p className="mt-1 text-sm text-green-500">
                    {successMessage}
                  </p>
                )}
              </div>
            </div>

            {(isLogin || isSignup) && (
              <>
                <div>
                  <div
                    className={
                      forgotPasswordLink
                        ? "flex items-center justify-between"
                        : ""
                    }
                  >
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-ivory-cream"
                    >
                      Password
                    </label>
                    {forgotPasswordLink && (
                      <div className="text-sm">
                        <Link
                          href="/forgot-password"
                          className="font-semibold text-tanned-leather hover:text-aged-brass"
                        >
                          Forgot Password?
                        </Link>
                      </div>
                    )}
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      autoComplete={
                        isLogin ? "current-password" : "new-password"
                      }
                      className="block w-full rounded-md bg-ivory-cream/10 px-3 py-1.5 text-ivory-cream outline-1 -outline-offset-1 outline-ivory-cream/20 placeholder:text-dusty-taupe focus:outline-2 focus:-outline-offset-2 focus:outline-tanned-leather sm:text-sm"
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.password}
                      </p>
                    )}
                  </div>
                </div>

                {isSignup && (
                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="block text-sm font-medium text-ivory-cream"
                    >
                      Confirm Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="confirm-password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        autoComplete="new-password"
                        className="block w-full rounded-md bg-ivory-cream/10 px-3 py-1.5 text-ivory-cream outline-1 -outline-offset-1 outline-ivory-cream/20 placeholder:text-dusty-taupe focus:outline-2 focus:-outline-offset-2 focus:outline-tanned-leather sm:text-sm"
                      />
                      {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

            {apiError && (
              <p className="text-sm text-red-500 text-center">{apiError}</p>
            )}

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full justify-center rounded-md bg-tanned-leather px-3 py-1.5 text-sm font-semibold text-ivory-cream shadow-xs hover:bg-aged-brass focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aged-brass disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : submitText}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-dusty-taupe">
            {altText}{" "}
            <Link
              href={altLinkHref}
              className="font-semibold text-tanned-leather hover:text-aged-brass"
            >
              {altLinkText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
