import React from "react";
import Navigation from "@/components/site/navigation";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { auth } from "@clerk/nextjs/server";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = await auth();

  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <main className="h-full">
        <Navigation user={userId ? { id: userId } : null} />
        {children}
      </main>
    </ClerkProvider>
  );
};

export default layout;
