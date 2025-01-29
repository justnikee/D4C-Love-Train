"use client";

import { Home, Settings, MessageSquare, Users, LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Sidebar() {
  return (
    <div className="flex flex-col h-screen w-64 border-r bg-background p-4">
      {/* Logo or App Name */}
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-xl font-semibold">ChatGPT Clone</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-2">
        <Link href="/">
          <Button
            variant="ghost"
            className="w-full justify-start"
          >
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
        </Link>
        <Link href="/chat">
          <Button
            variant="ghost"
            className="w-full justify-start"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Chat
          </Button>
        </Link>
        <Link href="/team">
          <Button
            variant="ghost"
            className="w-full justify-start"
          >
            <Users className="mr-2 h-4 w-4" />
            Team
          </Button>
        </Link>
        <Link href="/settings">
          <Button
            variant="ghost"
            className="w-full justify-start"
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </Link>
      </nav>

      {/* Logout Button */}
      <div className="mt-auto">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => {
            // Handle logout logic here
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}