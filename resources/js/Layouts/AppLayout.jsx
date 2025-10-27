import { AppSidebar } from "@/components/app-sidebar";
import {
    Calculator,
    Calendar,
    CreditCard,
    FileCheck,
    FileInput,
    FileOutput,
    LayoutGrid,
    Settings,
    Smile,
    User,
    User2,
    UserPen,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";
import { Kbd } from "@/components/ui/kbd"

import {
    BadgeCheck,
    Bell,
    ChevronsUpDown,
    LogOut,
    Sparkles,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Head, Link, usePage, router } from "@inertiajs/react";
import FlashMessage from "@/Components/FlashMessage";
import { Button } from "@/Components/ui/button";

export default function AppLayout({
    bc1 = "Dashboard",
    bc2 = "Surat",
    title = "Cek Surat Binusa",
    children,
}) {
    const { auth, all_tahun_ajaran, active_tahun_ajaran } = usePage().props;

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route("logout"));
    };

    const [open, setOpen] = useState(false);

    useEffect(() => {
        const down = (e) => {
            if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((prev) => !prev);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    return (
        <>
            <Head title={title} />
            <SidebarProvider>
                <AppSidebar
                    all_tahun_ajaran={all_tahun_ajaran}
                    active_tahun_ajaran={active_tahun_ajaran}
                    user={auth.user}
                />
                <SidebarInset>
                    <header className="flex h-[50px] shrink-0 items-center justify-between gap-2 border-b">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator
                                orientation="vertical"
                                className="mr-2 data-[orientation=vertical]:h-4"
                            />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem className="hidden md:block">
                                        {bc1}
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className="hidden md:block" />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>{bc2}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                        <div className="px-4 inline-flex gap-1.5">
                            <Button onClick={() => setOpen(true)} variant="outline" size="sm" className="pr-2 h-8 text-[13px] rounded-lg text-muted-foreground font-normal">
                                Cari Fitur.. <Kbd className="ml-2">Ctrl</Kbd><Kbd className="-ms-1">J</Kbd>
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar className="h-8 w-8 cursor-pointer rounded-lg">
                                        <AvatarImage
                                            src={auth.user.avatar}
                                            alt={auth.user.name}
                                        />
                                        <AvatarFallback className="rounded-lg text-sm">
                                            BN
                                        </AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                    side="bottom"
                                    align="end"
                                    sideOffset={4}
                                >
                                    <DropdownMenuLabel className="p-0 font-normal">
                                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                            <Avatar className="h-8 w-8 rounded-lg">
                                                <AvatarImage
                                                    src={auth.user.avatar}
                                                    alt={auth.user.name}
                                                />
                                                <AvatarFallback className="rounded-lg">
                                                    BN
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="grid flex-1 text-left text-sm leading-tight">
                                                <span className="truncate font-semibold">
                                                    {auth.user.name}
                                                </span>
                                                <span className="truncate text-xs">
                                                    {auth.user.email}
                                                </span>
                                            </div>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <Link href="/profile">
                                            <DropdownMenuItem className="cursor-pointer">
                                                <BadgeCheck />
                                                Edit Profile
                                            </DropdownMenuItem>
                                        </Link>
                                        <Link href="/profile">
                                            <DropdownMenuItem className="cursor-pointer">
                                                <CreditCard />
                                                Reset Password
                                            </DropdownMenuItem>
                                        </Link>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={handleLogout}
                                        className="cursor-pointer"
                                    >
                                        <LogOut />
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-5 pt-0">
                        <CommandDialog open={open} onOpenChange={setOpen}>
                            <CommandInput
                                placeholder="Cari fitur atau perintah lainnya.."
                                className="focus:outline-none border-none focus:ring-0 focus:ring-offset-0"
                            />
                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup heading="Surat">
                                    <Link href={route("dashboard")}>
                                        <CommandItem className="cursor-pointer">
                                            <LayoutGrid className="!h-4 !w-4 text-muted-foreground" />
                                            <span>Dashboard</span>
                                        </CommandItem>
                                    </Link>
                                    <Link href={route("surat.index")}>
                                        <CommandItem className="cursor-pointer">
                                            <FileOutput className="!h-4 !w-4 text-muted-foreground" />
                                            <span>Surat Keluar</span>
                                        </CommandItem>
                                    </Link>
                                    <Link href={route("surat.index")}>
                                        <CommandItem className="cursor-pointer">
                                            <FileCheck className="!h-4 !w-4 text-muted-foreground" />
                                            <span>Surat Internal</span>
                                        </CommandItem>
                                    </Link>
                                    <Link href={route("surat-masuk.index")}>
                                        <CommandItem className="cursor-pointer">
                                            <FileInput className="!h-4 !w-4 text-muted-foreground" />
                                            <span>Surat Masuk</span>
                                        </CommandItem>
                                    </Link>
                                    <Link href={route("surat-masuk.index")}>
                                        <CommandItem className="cursor-pointer">
                                            <Calendar className="!h-4 !w-4 text-muted-foreground" />
                                            <span>Tahun Ajaran</span>
                                        </CommandItem>
                                    </Link>
                                </CommandGroup>
                                <CommandSeparator />
                                <CommandGroup heading="Akun" className="mt-2">
                                    <Link href="/profile">
                                        <CommandItem className="cursor-pointer">
                                            <User2 className="!h-4 !w-4 text-muted-foreground" />
                                            <span>Edit Profil</span>
                                        </CommandItem>
                                    </Link>
                                    <Link href="/profile">
                                        <CommandItem className="cursor-pointer">
                                            <UserPen className="!h-4 !w-4 text-muted-foreground" />
                                            <span>Edit Password</span>
                                        </CommandItem>
                                    </Link>
                                </CommandGroup>
                            </CommandList>
                        </CommandDialog>
                        <main>
                            <article>{children}</article>
                            <FlashMessage />
                        </main>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}
