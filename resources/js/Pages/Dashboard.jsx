import AppLayout from "@/Layouts/AppLayout";
import { usePage, router } from "@inertiajs/react";
import { FileOutput, FileCheck, FileInput, CalendarClock } from "lucide-react";
import StatCard from "@/Components/StatCard";

export default function Page() {
    const { auth, stats } = usePage().props;

    return (
        <AppLayout bc1="Dashboard" bc2="Dashboard">
            <div className="-mx-5 border-b px-5 py-5 pb-6">
                <h1 className="text-2xl font-semibold leading-normal">
                    Dashboard
                </h1>
                <p className="text-muted-foreground">
                    Selamat datang di halaman Dashboard, {auth.user.name}.
                </p>
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        icon={FileOutput}
                        title="Surat Keluar"
                        description="Jumlah surat keluar yang dibuat pada tahun ajaran saat ini."
                        value={stats.surat_keluar}
                        label="Nomor Surat"
                        onButtonClick={() => router.visit(route("surat.index"))}
                    />
                    <StatCard
                        icon={FileCheck}
                        title="Surat Internal"
                        description="Jumlah surat Internal yang dibuat pada tahun ajaran saat ini."
                        value={stats.surat_keluar}
                        label="Nomor Surat"
                        onButtonClick={() => router.visit(route("surat.index"))}
                    />
                    <StatCard
                        icon={FileInput}
                        title="Surat Masuk"
                        description="Jumlah surat masuk yang dibuat pada tahun ajaran saat ini."
                        value={stats.surat_keluar}
                        label="Nomor Surat"
                        onButtonClick={() => router.visit(route("surat.index"))}
                    />
                    <StatCard
                        icon={CalendarClock}
                        title="Tahun Ajaran"
                        description="Jumlah Tahun Ajaran yang dibuat pada tahun ajaran saat ini."
                        value={stats.surat_keluar}
                        label="Nomor Surat"
                        onButtonClick={() => router.visit(route("surat.index"))}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
