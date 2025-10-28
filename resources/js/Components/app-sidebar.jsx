import * as React from "react";
import {
    BookOpen,
    Bot,
    CalendarClock,
    CalendarPlus2Icon,
    Command,
    FileCheck,
    FileInput,
    FileOutput,
    FileQuestionMark,
    FileType,
    FileType2,
    Frame,
    LayoutGrid,
    LifeBuoy,
    Map,
    PieChart,
    Send,
    Settings2,
    SquareTerminal,
    TextAlignStart,
    User,
} from "lucide-react";

import { Link } from "@inertiajs/react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navSecondary: [
        {
            title: "Support",
            url: "#",
            icon: LifeBuoy,
        },
        {
            title: "Feedback",
            url: "#",
            icon: Send,
        },
    ],
};

export function AppSidebar({
    all_tahun_ajaran,
    active_tahun_ajaran,
    user,
    ...props
}) {
    const handleTahunAjaranChange = (newTahunAjaranId) => {
        window.location.href = route("tahun-ajaran.switch", newTahunAjaranId);
    };
    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    {/* <Command className="size-4" /> */}
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
                                    <span className="truncate text-xs">
                                        Semarang
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <ul className="ms-3 mt-1 flex min-w-0 flex-col gap-1">
                    <li className="group/menu-item relative flex w-[218px] items-center gap-2">
                        <Link href={route("surat.index", { action: "create" })}>
                            <button className="peer/menu-button outline-hidden group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&amp;&gt;span:last-child]:truncate [&amp;&gt;svg]:size-4 [&amp;&gt;svg]:shrink-0 flex h-8 w-full min-w-8 items-center gap-2 overflow-hidden rounded-md bg-primary p-2 text-left text-sm text-primary-foreground ring-sidebar-ring transition-[width,height,padding] duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground focus-visible:ring-2 active:bg-primary/90 active:text-primary-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    stroke="none"
                                    className="tabler-icon tabler-icon-circle-plus-filled"
                                >
                                    <path d="M4.929 4.929a10 10 0 1 1 14.141 14.141a10 10 0 0 1 -14.14 -14.14zm8.071 4.071a1 1 0 1 0 -2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0v-2h2a1 1 0 1 0 0 -2h-2v-2z"></path>
                                </svg>
                                <span className="pr-7 text-[13px]">
                                    Buat Surat Keluar
                                </span>
                            </button>
                        </Link>
                        <Link href={route("surat.index")}>
                            <button
                                data-slot="button"
                                className="[&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:shrink-0 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shadow-xs inline-flex size-8 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md border bg-background text-sm font-medium outline-none transition-all hover:bg-accent hover:text-accent-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 group-data-[collapsible=icon]:opacity-0 dark:border-input dark:bg-input/30 dark:hover:bg-input/50"
                            >
                                <TextAlignStart size={17} />
                            </button>
                        </Link>
                    </li>
                </ul>
                <SidebarGroup className="-mt-2">
                    <SidebarGroupLabel>Surat</SidebarGroupLabel>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link href={route("dashboard")}>
                                    <LayoutGrid />
                                    <span>Dashboard</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link href={route("surat.index")}>
                                    <FileOutput />
                                    <span>Surat Keluar</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link href={route("surat.index")}>
                                    <FileCheck />
                                    <span>Surat Internal</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link href={route("surat-masuk.index")}>
                                    <FileInput />
                                    <span>Surat Masuk</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup className="-mt-4">
                    <SidebarGroupLabel>Lainnya</SidebarGroupLabel>
                    <SidebarMenu>
                        {/* <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link href="#">
                                    <FileType2 />
                                    <span>PDF Surat Keluar</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link href="#">
                                    <FileType />
                                    <span>PDF Surat Masuk</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem> */}
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link href={route("tahun-ajaran.index")}>
                                    <CalendarClock />
                                    <span>Tahun Ajaran</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        {(user?.email === "tu@binusasmg.sch.id" ||
                            user?.email === "ops@binusasmg.sch.id") && (
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href={route("users.index")}>
                                        <User />
                                        <span>Manajemen User</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )}
                        {/* <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link href="#">
                                    <FileQuestionMark />
                                    <span>Dokumentasi</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem> */}
                    </SidebarMenu>
                </SidebarGroup>
                {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
                {/* <Card className="mx-3 mb-0.5 mt-auto hidden py-3 shadow-none md:block">
                    <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1 px-3">
                        <div className="text-sm font-semibold leading-tight">
                            Welcome!
                        </div>
                        <div className="text-[13px] text-muted-foreground">
                            Aplikasi masih dalam pengembangan. Lihat dokumentasi
                            untuk informasi lebih lanjut.
                            <p>
                                <Link
                                    href="/docs"
                                    className="text-primary hover:underline"
                                >
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="mt-2 h-7 w-full text-[13px]"
                                    >
                                        Dokumentasi
                                    </Button>
                                </Link>
                            </p>
                        </div>
                    </div>
                </Card>*/}
                {all_tahun_ajaran && (
                    <div className="mx-3 mb-3 mt-auto">
                        <Select
                            value={active_tahun_ajaran?.id || ""}
                            onValueChange={handleTahunAjaranChange}
                        >
                            <SelectTrigger className="w-full">
                                <CalendarClock
                                    size={15}
                                    className="-mr-1 text-muted-foreground"
                                />
                                <SelectValue placeholder="Pilih Tahun Ajaran" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Tahun Ajaran</SelectLabel>
                                    {all_tahun_ajaran.map((ta) => (
                                        <SelectItem key={ta.id} value={ta.id}>
                                            {ta.tahun}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                )}
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
