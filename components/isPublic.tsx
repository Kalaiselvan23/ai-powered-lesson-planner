"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function isPublicRoute(Component: any) {
    return function IsPublicRoute(props: any) {
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