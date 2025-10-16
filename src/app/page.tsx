import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Profile } from "@/components/profile";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <Button variant={"default"}>Click me</Button>
      <Button variant={"secondary"}>Click me</Button>
      <Button variant={"destructive"}>Click me</Button>
      <Button variant={"outline"}>Click me</Button>
      <Button variant={"ghost"}>Click me</Button>
      <Button variant={"link"}>Click me</Button>
      <ModeToggle />
      <Profile />
    </div>
  );
}
