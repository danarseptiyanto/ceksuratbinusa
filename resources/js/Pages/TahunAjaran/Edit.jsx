import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Link, useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";

export default function Edit({ tahunAjaran }) {
    const { data, setData, put, processing, errors } = useForm({
        tahun: tahunAjaran.tahun,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("tahun-ajaran.update", tahunAjaran.id));
    };

    return (
        <AppLayout bc1="Tahun Ajaran" bc2="Edit Tahun Ajaran">
            <div className="-mx-5 border-b px-5 py-5">
                <h1 className="text-2xl font-semibold leading-normal">
                    Edit Tahun Ajaran
                </h1>
                <p className="text-muted-foreground">
                    Ubah detail tahun ajaran.
                </p>
            </div>
            <div className="mt-5">
                <Card className="max-w-md">
                    <CardHeader>
                        <CardTitle>Form Tahun Ajaran</CardTitle>
                        <CardDescription>
                            Masukkan detail tahun ajaran.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <Label htmlFor="tahun">Tahun Ajaran</Label>
                                <Input
                                    id="tahun"
                                    type="text"
                                    value={data.tahun}
                                    onChange={(e) => setData("tahun", e.target.value)}
                                    placeholder="e.g. 2024/2025"
                                />
                                {errors.tahun && (
                                    <p className="text-sm text-red-600">{errors.tahun}</p>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}>
                                    Simpan
                                </Button>
                                <Link href={route("tahun-ajaran.index")}>
                                    <Button variant="outline" type="button">
                                        Batal
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}