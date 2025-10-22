import AppLayout from "@/Layouts/AppLayout";
import { usePage, router } from "@inertiajs/react";
import {
    FileOutput,
    FileCheck,
    FileInput,
    CalendarClock,
    ArrowUpRight,
} from "lucide-react";
import StatCard from "@/Components/StatCard";
import { Card } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Arrow } from "@radix-ui/react-dropdown-menu";

export default function Page() {
    const {
        auth,
        stats,
        latest_surat_keluar,
        latest_surat_internal,
        latest_surat_masuk,
    } = usePage().props;

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
                        value={stats.surat_internal}
                        label="Nomor Surat"
                        onButtonClick={() => router.visit(route("surat.index"))}
                    />
                    <StatCard
                        icon={FileInput}
                        title="Surat Masuk"
                        description="Jumlah surat masuk yang dibuat pada tahun ajaran saat ini."
                        value={stats.surat_masuk}
                        label="Nomor Surat"
                        onButtonClick={() => router.visit(route("surat.index"))}
                    />
                    <StatCard
                        icon={CalendarClock}
                        title="Tahun Ajaran"
                        description="Jumlah Tahun Ajaran yang dibuat pada tahun ajaran saat ini."
                        value={stats.tahun_ajaran}
                        label="Nomor Surat"
                        onButtonClick={() => router.visit(route("surat.index"))}
                    />
                </div>
            </div>
            <div className="space-y-6 py-6">
                <Card className="p-6">
                    <div className="mb-3 flex items-center justify-between">
                        <div className="space-y-1">
                            <h2 className="text-lg font-semibold leading-none tracking-tight">
                                Surat Keluar
                            </h2>
                            <p className="text-balance text-sm text-muted-foreground">
                                Surat keluar terbaru yang telah dibuat pada
                                sistem.
                            </p>
                        </div>
                        <Button
                            variant=""
                            size="sm"
                            onClick={() => router.visit(route("surat.index"))}
                        >
                            Surat Keluar <ArrowUpRight className="" size={14} />
                        </Button>
                    </div>
                    {latest_surat_keluar.length > 0 ? (
                        latest_surat_keluar.map((surat, index) => (
                            <tr
                                key={surat.id}
                                className={`flex w-full items-center justify-between ${
                                    index !== latest_surat_keluar.length - 1
                                        ? "border-b"
                                        : ""
                                }`}
                            >
                                <td className="py-3 align-middle">
                                    <div className="text-sm font-medium">
                                        {surat.nomor_surat}
                                    </div>
                                    <div className="hidden text-sm text-muted-foreground md:inline">
                                        {surat.nama_surat}
                                    </div>
                                </td>

                                <td className="text-right align-middle text-sm">
                                    {new Date(
                                        surat.tanggal_surat,
                                    ).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr className="mt-5 flex w-full items-center justify-center rounded-md border border-dashed p-10">
                            <td className="text-sm text-muted-foreground">
                                Surat keluar kosong
                            </td>
                        </tr>
                    )}
                </Card>
                <Card className="p-6">
                    <div className="mb-3 flex items-center justify-between">
                        <div className="space-y-1">
                            <h2 className="text-lg font-semibold leading-none tracking-tight">
                                Surat Internal
                            </h2>
                            <p className="text-balance text-sm text-muted-foreground">
                                Surat keluar terbaru yang telah dibuat pada
                                sistem.
                            </p>
                        </div>
                        <Button
                            variant=""
                            size="sm"
                            onClick={() => router.visit(route("surat.index"))}
                        >
                            Surat Internal
                            <ArrowUpRight className="" size={14} />
                        </Button>
                    </div>
                    {latest_surat_internal.length > 0 ? (
                        latest_surat_internal.map((surat, index) => (
                            <tr
                                key={surat.id}
                                className={`flex w-full items-center justify-between ${
                                    index !== latest_surat_internal.length - 1
                                        ? "border-b"
                                        : ""
                                }`}
                            >
                                <td className="py-3 align-middle">
                                    <div className="text-sm font-medium">
                                        {surat.nomor_surat}
                                    </div>
                                    <div className="hidden text-sm text-muted-foreground md:inline">
                                        {surat.nama_surat}
                                    </div>
                                </td>

                                <td className="text-right align-middle text-sm">
                                    {new Date(
                                        surat.tanggal_surat,
                                    ).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr className="mt-5 flex w-full items-center justify-center rounded-md border border-dashed p-10">
                            <td className="text-sm text-muted-foreground">
                                Surat internal kosong
                            </td>
                        </tr>
                    )}
                </Card>
                <Card className="p-6">
                    <div className="mb-3 flex items-center justify-between">
                        <div className="space-y-1">
                            <h2 className="text-lg font-semibold leading-none tracking-tight">
                                Surat Masuk
                            </h2>
                            <p className="text-balance text-sm text-muted-foreground">
                                Surat masuk terbaru yang telah dibuat pada
                                sistem.
                            </p>
                        </div>
                        <Button
                            variant=""
                            size="sm"
                            onClick={() =>
                                router.visit(route("surat-masuk.index"))
                            }
                        >
                            Surat Masuk <ArrowUpRight className="" size={14} />
                        </Button>
                    </div>
                    {latest_surat_masuk.length > 0 ? (
                        latest_surat_masuk.map((surat, index) => (
                            <tr
                                key={surat.id}
                                className={`flex w-full items-center justify-between ${
                                    index !== latest_surat_masuk.length - 1
                                        ? "border-b"
                                        : ""
                                }`}
                            >
                                <td className="py-3 align-middle">
                                    <div className="text-sm font-medium">
                                        {surat.nomor_surat}
                                    </div>
                                    <div className="hidden text-sm text-muted-foreground md:inline">
                                        {surat.nama_surat}
                                    </div>
                                </td>

                                <td className="text-right align-middle text-sm">
                                    {new Date(
                                        surat.tanggal_surat,
                                    ).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr className="mt-5 flex w-full items-center justify-center rounded-md border border-dashed p-10">
                            <td className="text-sm text-muted-foreground">
                                Surat masuk kosong
                            </td>
                        </tr>
                    )}
                </Card>
            </div>
        </AppLayout>
    );
}
