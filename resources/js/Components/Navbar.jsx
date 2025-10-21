import React from "react";
import { Button } from "@/components/ui/button";
import { ShieldUser, SquareArrowOutUpRight, UserRoundPen } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function Navbar() {
    return (
        <div className="flex justify-center border-b">
            <div className="mx-5 flex w-full max-w-screen-xl items-center justify-between gap-2 border-x px-4 py-2 md:px-14">
                <Link
                    href="/"
                    className="flex h-12 items-center gap-2 overflow-hidden rounded-md text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:text-sidebar-accent-foreground focus-visible:ring-2 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent group-data-[collapsible=icon]:!p-0"
                >
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                        <img
                            src="/img/logosekolah.png"
                            className="p-1.5"
                            alt="BN"
                        />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                            SMK Bina Nusantara
                        </span>
                        <span className="truncate text-xs">Semarang</span>
                    </div>
                </Link>
                <div className="hidden md:block">
                    <Link href="/login" className="me-2">
                        <Button>
                            <UserRoundPen className="-mx-0.5 !h-3.5 !w-3.5" />
                        </Button>
                    </Link>
                    <a
                        href="http://binusasmg.sch.id"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button variant="outline" className="text-xs">
                            <SquareArrowOutUpRight className="-mx-0.5 !h-3.5 !w-3.5" />
                            Website Sekolah
                        </Button>
                    </a>
                </div>
                <Link
                    href="/login"
                    className="flex h-12 items-center gap-2 overflow-hidden rounded-md text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:text-sidebar-accent-foreground focus-visible:ring-2 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent group-data-[collapsible=icon]:!p-0 md:hidden"
                >
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                        <UserRoundPen className="-mx-0.5 !h-3.5 !w-3.5" />
                    </div>
                </Link>
            </div>
        </div>
    );
}
