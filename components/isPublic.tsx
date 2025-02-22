"use client";

import { useEffect, useState, ComponentType } from "react";
import { useRouter } from "next/navigation";

export default function isPublicRoute<T extends object>(Component: ComponentType<T>) {
    return function IsPublicRoute(props: T) {
        const router = useRouter();
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            const auth = localStorage.getItem("user");

            if (auth) {
                router.replace("/lesson-planner");
            } else {
                setIsLoading(false);
            }
        }, [router]);

        if (isLoading) {
            return null;
        }

        return <Component {...props} />;
    };
}
