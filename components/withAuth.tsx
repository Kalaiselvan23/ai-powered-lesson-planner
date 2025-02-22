"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ComponentType } from "react";

export default function withAuth<T extends object>(Component: ComponentType<T>) {
  return function IsAuth(props: T) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      if (typeof window !== "undefined") {
        const storedAuth = localStorage.getItem("user");
        if (!storedAuth) {
          router.replace("/");
        }
        setIsLoading(false);
      }
    },[router]);

    if (isLoading) {
      return null;
    }

    return <Component {...props} />;
  };
}
