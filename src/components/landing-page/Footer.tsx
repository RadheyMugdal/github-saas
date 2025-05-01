import React from "react";
import { Mail, Github, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 px-12 pt-16 pb-8 text-white">
      <div className="container mx-auto">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <h1 className="mb-4 text-2xl font-bold">
              Dev<span className="text-sage-400">Sage</span>
            </h1>
            <p className="mb-6 max-w-md text-slate-300">
              Simplifying developer onboarding and team collaboration with
              AI-powered code understanding and meeting analytics.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-300 hover:text-white">
                <Github size={20} />
              </a>
              <a href="#" className="text-slate-300 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-slate-300 hover:text-white">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Product</h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-slate-300 hover:text-white">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-slate-300 hover:text-white">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white">
                  Integrations
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white">
                  Roadmap
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-300 hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#contact" className="text-slate-300 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between border-t border-slate-800 pt-8 md:flex-row">
          <p className="mb-4 text-sm text-slate-400 md:mb-0">
            &copy; {new Date().getFullYear()} DevSage. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-slate-400 hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-slate-400 hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-slate-400 hover:text-white">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
