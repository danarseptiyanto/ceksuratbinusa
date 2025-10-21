import { AppSidebar } from "@/components/app-sidebar";
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
import { Head, Link, usePage } from "@inertiajs/react";
import FlashMessage from "@/Components/FlashMessage";

export default function AppLayout({
    bc1 = "Dashboard",
    bc2 = "Surat",
    title = "Cek Surat Binusa",
    children,
}) {
    const { auth, all_tahun_ajaran, active_tahun_ajaran } = usePage().props;

    const handleTahunAjaranChange = (newTahunAjaranId) => {
        window.location.href = route("tahun-ajaran.switch", newTahunAjaranId);
    };

    return (
        <>
            <Head title={title} />
            <SidebarProvider>
                <AppSidebar all_tahun_ajaran={all_tahun_ajaran} active_tahun_ajaran={active_tahun_ajaran} />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b">
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

                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-5 pt-0">
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
