import Image from "next/image";
import Link from "next/link";

export function PageFooter() {
  return (
    <footer className="bg-surface-0 border-border/50 border-t py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-6">
            <Image
              src="/getgains-logo.png"
              alt="Get Gains"
              width={120}
              height={30}
              className="h-8 w-auto"
            />
            <span className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Get Gains. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/contact"
              className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
