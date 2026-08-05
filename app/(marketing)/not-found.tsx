import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mesh-gradient-hero flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow">404</p>
      <h1 className="display-title mb-4 text-4xl md:text-5xl">Page not found</h1>
      <p className="mb-10 max-w-md font-medium text-theme-muted">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/">
          <Button className="font-extrabold">Back to home</Button>
        </Link>
        <Link href="/services">
          <Button variant="outline" className="font-bold">
            Browse services
          </Button>
        </Link>
      </div>
    </div>
  );
}
