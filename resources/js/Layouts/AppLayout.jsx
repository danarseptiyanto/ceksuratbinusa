import { AppSidebar } from "@/components/app-sidebar";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
import { Link, usePage } from "@inertiajs/react";

export default function AppLayout({
    bc1 = "Dashboard",
    bc2 = "Surat",
    children,
}) {
    const { auth, all_tahun_ajaran, active_tahun_ajaran } = usePage().props;

    const handleTahunAjaranChange = (newTahunAjaranId) => {
        window.location.href = route("tahun-ajaran.switch", newTahunAjaranId);
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex justify-between h-16 shrink-0 items-center gap-2 border-b">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbItem>{bc1}</BreadcrumbItem>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{bc2}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className="px-4">
                        {all_tahun_ajaran && (
                            <Select
                                value={active_tahun_ajaran?.id || ""}
                                onValueChange={handleTahunAjaranChange}
                            >
                                <SelectTrigger className="w-[150px]">
                                    <SelectValue placeholder="Select a fruit" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Tahun Ajaran</SelectLabel>
                                        {all_tahun_ajaran.map((ta) => (
                                            <SelectItem
                                                key={ta.id}
                                                value={ta.id}
                                            >
                                                TA {ta.tahun}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-5 pt-0">
                    <main>
                        <article>{children}</article>
                    </main>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
