"use client"

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import { Button } from "./button"
import { SignedIn, UserButton, SignedOut, SignInButton } from "@clerk/nextjs"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { SidebarTrigger } from "@/components/ui/sidebar"


const items = [
  {
    title: "Testing",
    url: "#",
    icon: Home,
  }
]


export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="italic text-black text-xl mb-4 flex justify-between"><span>LoveTrain</span> <SidebarTrigger /> </SidebarGroupLabel>
          <SidebarGroupContent className="relative h-full flex flex-col justify-between items-end">
            <div className="w-full h-full">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            </div>
          <div className="self-baseline"> 
          <SignedOut>
            <Button>
            <SignInButton />
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
