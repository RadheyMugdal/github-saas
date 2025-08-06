import FAQ from "@/components/landing-page/Faq";
import Features from "@/components/landing-page/Feature";
import Footer from "@/components/landing-page/Footer";
import Header from "@/components/landing-page/Header";
import Hero from "@/components/landing-page/Hero";
import HowItWorks from "@/components/landing-page/HowItWorks";
import Pricing from "@/components/landing-page/Pricing";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import React from "react";

const LandingPage = async () => {
  const data = await auth.api.getSession({ headers: await headers() })
  if (data?.session) {
    redirect("/dashboard")
  }
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <HowItWorks />

        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
