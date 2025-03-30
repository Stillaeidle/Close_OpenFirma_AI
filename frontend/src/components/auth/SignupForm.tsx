import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Label } from "@/components/ui/Label";
import { PasswordInput } from "@/components/ui/PasswordInput";
import Link from "next/link";

interface SignupFormProps {
  onSubmit: (data: {
    name: string;
    email: string;
    password: string;
    organization?: string;
    newsletter: boolean;
  }) => void;
}

export default function SignupForm({ onSubmit }: SignupFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    organization: "",
    newsletter: false,
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await onSubmit({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        organization: formData.organization || undefined,
        newsletter: formData.newsletter,
      });
    } catch (error) {
      console.error("Signup error:", error);
      setErrors({ form: "Failed to sign up. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />
        {errors.name && (
          <p className="text-destructive text-xs mt-1">{errors.name}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="name@example.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        {errors.email && (
          <p className="text-destructive text-xs mt-1">{errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <PasswordInput
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />
        {errors.password && (
          <p className="text-destructive text-xs mt-1">{errors.password}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />
        {errors.confirmPassword && (
          <p className="text-destructive text-xs mt-1">
            {errors.confirmPassword}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="organization">Organization (Optional)</Label>
        <Input
          id="organization"
          name="organization"
          placeholder="Your company or organization"
          value={formData.organization}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-3 pt-2">
        <div className="flex items-start gap-2">
          <Checkbox
            id="agreeToTerms"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="mt-1"
          />
          <div>
            <Label htmlFor="agreeToTerms" className="font-normal">
              I agree to the{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </Label>
            {errors.agreeToTerms && (
              <p className="text-destructive text-xs mt-1">
                {errors.agreeToTerms}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Checkbox
            id="newsletter"
            name="newsletter"
            checked={formData.newsletter}
            onChange={handleChange}
            className="mt-1"
          />
          <Label htmlFor="newsletter" className="font-normal">
            I&apos;d like to receive updates about products, features and
            announcements
          </Label>
        </div>
      </div>

      {errors.form && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {errors.form}
        </div>
      )}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Creating account...
          </>
        ) : (
          "Create account"
        )}
      </Button>
    </form>
  );
}
