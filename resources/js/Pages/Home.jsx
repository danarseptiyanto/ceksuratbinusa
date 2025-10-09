import React from "react";
import {
    BadgeQuestionMark,
    FileType,
    HandHelping,
    QrCode,
    ShieldAlert,
    UploadCloud,
    Users,
    Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SquareArrowOutUpRight, FileDigit, Info, Search } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { WordRotate } from "@/components/ui/word-rotate";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { cn } from "@/lib/utils";
import { Card } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import Footer from "@/Components/Footer";

export default function Home() {
    return (
        <>
            <div className="flex justify-center border-b">
                <div className="mx-5 flex w-full max-w-screen-xl items-center justify-between gap-2 border-x px-14 py-2">
                    <a
                        href="#"
                        data-sidebar="menu-button"
                        data-size="lg"
                        data-active="false"
                        className="flex h-12 items-center gap-2 overflow-hidden rounded-md text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:text-sidebar-accent-foreground focus-visible:ring-2 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent group-data-[collapsible=icon]:!p-0"
                    >
                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-command size-4"
                                aria-hidden="true"
                            >
                                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"></path>
                            </svg>
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">
                                SMK Bina Nusantara
                            </span>
                            <span className="truncate text-xs">Semarang</span>
                        </div>
                    </a>
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
            </div>
            <div className="flex justify-center border-b">
                <div className="mx-5 flex w-full max-w-screen-xl justify-between border-x pl-14">
                    <div className="container flex flex-col items-start gap-3 py-8 md:py-10 lg:py-12">
                        <div className="inline-flex items-center gap-2">
                            <h1 className="inline-flex text-2xl font-semibold leading-tight sm:text-3xl md:text-4xl lg:leading-[1.1]">
                                Verifikasi Surat{" "}
                            </h1>
                            <WordRotate
                                className="text-2xl font-semibold leading-tight sm:text-3xl md:text-4xl lg:leading-[1.1]"
                                words={[
                                    " Tugas",
                                    " Keputusan",
                                    " Keterangan",
                                    " Rekomendasi",
                                    " Pengantar",
                                    " Undangan",
                                    " Peminjaman",
                                ]}
                            />
                        </div>
                        <p className="max-w-2xl text-base font-light text-foreground sm:text-lg">
                            Cek keaslian surat keluar yang diterbitkan oleh SMK
                            Bina Nusantara Semarang dengan akurat melalui
                            platform ini. Scan kode QR atau masukkan nomor surat
                            pada form verifikasi.
                        </p>
                        <div className="flex w-full items-center justify-start gap-2 pt-2">
                            <a
                                className="inline-flex h-8 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                                href="#ceknomor"
                            >
                                Cek Nomor
                            </a>
                            <a
                                className="inline-flex h-8 items-center justify-center gap-2 whitespace-nowrap rounded-md px-3 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                                href="/blocks"
                            >
                                Laporan
                            </a>
                        </div>
                    </div>

                    <div className="relative ml-6 flex h-80 w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
                        <InteractiveGridPattern
                            className={cn(
                                "[mask-image:linear-gradient(to_right,transparent,black_90%,black_100%)] [mask-repeat:no-repeat] [mask-size:100%_100%]",
                                "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
                            )}
                        />
                    </div>
                </div>
            </div>
            <div id="ceknomor" className="flex justify-center border-b">
                <div className="mx-5 -mt-5 w-full max-w-screen-xl border-x px-14 pb-12">
                    <div className="shadow-xs relative z-50 flex h-10 items-center justify-between rounded-lg border border-neutral-200 bg-white bg-gradient-to-r from-red-50 via-transparent to-transparent px-2 dark:border-white/10 dark:bg-[#1a1a1a]">
                        <div className="flex w-full items-center gap-2">
                            <div className="inline-flex h-6 w-fit min-w-5 shrink-0 items-center justify-center gap-1 rounded-md bg-red-500 px-1.5 font-mono text-xs/none uppercase leading-3 text-white transition-colors">
                                <Info size={12} />
                                {/* Nomor */}
                            </div>
                            <div className="flex-1 truncate text-sm font-light text-neutral-950 dark:text-white">
                                <span>
                                    Laporkan ke sekolah apabila ditemukan
                                    pemalsuan surat keluar dari SMK Bina
                                    Nusantara Semarang
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-7">
                        <div className="flex gap-4">
                            <Card className="w-full p-6 shadow-none">
                                <h3 className="text-lg font-semibold">
                                    Verifikasi Surat Keluar
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Ketikan nomor surat untuk melakukan
                                    verifikasi keaslian surat
                                </p>
                                <div className="mb-2 mt-4 flex w-full items-center gap-2">
                                    <Input
                                        type="email"
                                        placeholder="Nomor surat keluar"
                                    />
                                    <Button type="submit" variant="outline">
                                        Verifikasi
                                    </Button>
                                </div>
                                <div className="mt-2 inline-flex gap-1">
                                    <BadgeQuestionMark
                                        size={15}
                                        className="text-muted-foreground"
                                    />{" "}
                                    <span className="text-xs text-muted-foreground">
                                        Butuh bantuan?
                                    </span>
                                </div>
                            </Card>
                            <Card className="w-96 border-none bg-primary p-4 shadow-none"></Card>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center border-b">
                <div className="mx-5 -mt-5 w-full max-w-screen-xl border-x px-14">
                    <section className="py-8">
                        <div className="container overflow-hidden">
                            <div className="mx-auto mt-2 flex flex-col gap-10 py-3 md:flex-row">
                                <div className="flex grow basis-0 flex-col rounded-md bg-background">
                                    <div className="mb-3 flex size-11 items-center justify-center rounded-lg border bg-background">
                                        <QrCode size={18} />
                                    </div>
                                    <h3 className="mb-2 font-semibold">
                                        QR Code Support
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Scan kode QR pada surat keluar untuk
                                        verifikasi instan dan akses informasi
                                        digital terkait.
                                    </p>
                                </div>
                                <div className="flex grow basis-0 flex-col rounded-md bg-background">
                                    <div className="mb-3 flex size-12 items-center justify-center rounded-lg border bg-background">
                                        <FileType size={18} />
                                    </div>
                                    <h3 className="mb-2 font-semibold">
                                        Cek Ketik No. Surat
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Ketikan nomor surat keluar pada form
                                        verifikasi untuk memastikan keasliannya
                                        dengan cepat.
                                    </p>
                                </div>
                                <div className="flex grow basis-0 flex-col rounded-md bg-background">
                                    <div className="mb-3 flex size-11 items-center justify-center rounded-lg border bg-background">
                                        <ShieldAlert size={18} />
                                    </div>
                                    <h3 className="mb-2 font-semibold">
                                        Lapor Pemalsuan
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Temukan surat palsu? Laporkan pemalsuan
                                        kepada kami untuk tindakan lebih lanjut.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <div className="flex justify-center border-b">
                <div className="mx-5 w-full max-w-screen-xl border-x bg-primary px-14 py-14">
                    <div className="flex items-center justify-between">
                        <p className="max-w-[490px] text-2xl font-semibold text-white">
                            Tertarik membangun masa depan cerah bersama kami?
                            Ayo daftarkan putra-putri Anda di Sekolah kami!
                        </p>
                        <Button
                            variant="secondary"
                            className="mr-12 rounded-3xl"
                        >
                            SPMB 2025/2026
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
