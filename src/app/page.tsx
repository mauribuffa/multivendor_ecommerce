import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <div className="w-100 flex justify-end">
        <ThemeToggle />
      </div>
      <h1 className="font-barlow font-bold text-2xl">Hello World</h1>
      <Button>Click me</Button>
    </div>
  );
}
