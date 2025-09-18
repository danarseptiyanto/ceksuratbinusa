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
import { Link, usePage } from "@inertiajs/react";

export default function AppLayout({ header, children }) {
    const { auth, all_tahun_ajaran, active_tahun_ajaran } = usePage().props;

    const handleTahunAjaranChange = (e) => {
        const newTahunAjaranId = e.target.value;
        // This will make a GET request to a route we will create soon
        window.location.href = route("tahun-ajaran.switch", newTahunAjaranId);
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">
                                        Building Your Application
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>
                                        Data Fetching
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <main className="container">
                        <header
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <h1>{header}</h1>
                            {all_tahun_ajaran && (
                                <select
                                    value={active_tahun_ajaran?.id || ""}
                                    onChange={handleTahunAjaranChange}
                                    style={{ maxWidth: "200px" }}
                                >
                                    {all_tahun_ajaran.map((ta) => (
                                        <option key={ta.id} value={ta.id}>
                                            T.A. {ta.tahun}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </header>
                        <article>{children}</article>
                    </main>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
