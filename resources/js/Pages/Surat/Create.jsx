// resources/js/Pages/Surat/Create.jsx
import AppLayout from "@/Layouts/AppLayout";
import { useForm, Link } from "@inertiajs/react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";

// shadcn/ui components
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Calendar } from "@/Components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { cn } from "@/lib/utils";

export default function Create({ suggestedNumber }) {
    const { data, setData, post, errors, processing } = useForm({
        nomor_surat: suggestedNumber,
        nama_surat: "",
        tanggal_surat: new Date().toISOString().slice(0, 10),
        pdf_file: null,
    });

    function submit(e) {
        e.preventDefault();
        post(route("surat.store"), {
            forceFormData: true,
        });
    }

    return (
        <AppLayout bc1="Surat Keluar" bc2="Buat Surat Keluar">
            <div className="py-7 border-b -mx-5 px-5">
                <h1 className="text-2xl font-semibold">Surat Keluar</h1>
                <p className="text-muted-foreground">
                    Buat, kelola, atau hapus daftar surat keluar.
                </p>
            </div>
            <div className="py-5">
                <div className="mx-auto">
                    <form onSubmit={submit}>
                        <Card>
                            <CardHeader className="border-b">
                                <h1 className="font-semibold text-lg leading-tight">
                                    Formulir Surat Baru
                                </h1>
                            </CardHeader>
                            <CardContent className="space-y-5 pt-4">
                                {/* Nomor Surat */}
                                <div className="space-y-2">
                                    <Label htmlFor="nomor_surat">
                                        Nomor Surat
                                    </Label>
                                    <Input
                                        id="nomor_surat"
                                        type="text"
                                        value={data.nomor_surat}
                                        onChange={(e) =>
                                            setData(
                                                "nomor_surat",
                                                e.target.value
                                            )
                                        }
                                        autoComplete="off"
                                    />
                                    {errors.nomor_surat && (
                                        <p className="text-sm text-destructive">
                                            {errors.nomor_surat}
                                        </p>
                                    )}
                                </div>

                                {/* Nama/Perihal Surat */}
                                <div className="space-y-2">
                                    <Label htmlFor="nama_surat">
                                        Nama / Perihal Surat
                                    </Label>
                                    <Input
                                        id="nama_surat"
                                        type="text"
                                        value={data.nama_surat}
                                        onChange={(e) =>
                                            setData(
                                                "nama_surat",
                                                e.target.value
                                            )
                                        }
                                        autoComplete="off"
                                    />
                                    {errors.nama_surat && (
                                        <p className="text-sm text-destructive">
                                            {errors.nama_surat}
                                        </p>
                                    )}
                                </div>

                                {/* Tanggal Surat - Date Picker */}
                                <div className="space-y-2">
                                    <Label htmlFor="tanggal_surat">
                                        Tanggal Surat
                                    </Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !data.tanggal_surat &&
                                                        "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {data.tanggal_surat ? (
                                                    format(
                                                        new Date(
                                                            data.tanggal_surat
                                                        ),
                                                        "PPP"
                                                    )
                                                ) : (
                                                    <span>Pilih tanggal</span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={
                                                    new Date(data.tanggal_surat)
                                                }
                                                onSelect={(date) =>
                                                    setData(
                                                        "tanggal_surat",
                                                        format(
                                                            date,
                                                            "yyyy-MM-dd"
                                                        )
                                                    )
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    {errors.tanggal_surat && (
                                        <p className="text-sm text-destructive">
                                            {errors.tanggal_surat}
                                        </p>
                                    )}
                                </div>

                                {/* PDF File Upload */}
                                <div className="space-y-2">
                                    <Label htmlFor="pdf_file">
                                        Upload PDF (Optional)
                                    </Label>
                                    <Input
                                        id="pdf_file"
                                        type="file"
                                        accept=".pdf"
                                        onChange={(e) =>
                                            setData(
                                                "pdf_file",
                                                e.target.files[0]
                                            )
                                        }
                                    />
                                    {errors.pdf_file && (
                                        <p className="text-sm text-destructive">
                                            {errors.pdf_file}
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                            <CardFooter className="border-t pt-5 bg-muted rounded-b-lg flex justify-end gap-2">
                                <Button asChild variant="outline">
                                    <Link href={route("surat.index")}>
                                        Cancel
                                    </Link>
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing && (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Save
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
