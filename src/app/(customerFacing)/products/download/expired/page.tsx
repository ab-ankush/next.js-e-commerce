import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Expired() {
  return (
    <>
      <h1 className="text-4xl mb-4">Your Download Link Expired</h1>
      <Button asChild>
        <Link href="/orders">Go back to products</Link>
      </Button>
    </>
  );
}
