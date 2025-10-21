import React from "react";
import {
    BadgeCheckIcon,
    DownloadIcon,
    FileDigit,
    FileDown,
    FileText,
    Hash,
    InfoIcon,
    Instagram,
    Paperclip,
    SquareArrowOutUpRight,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/Components/ui/button";
import Footer from "@/Components/Footer";
import FlashMessage from "@/Components/FlashMessage";
import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";

export default function Show({ surat, verificationUrl }) {
    return (
        <>
            <Head title={surat.nama_surat} />
            <FlashMessage />
            <Navbar />
            <div className="flex justify-center border-b">
                <div className="mx-5 flex w-full max-w-screen-xl justify-between border-x px-4 pb-10 pt-7 md:px-14 md:pb-16 md:pt-12">
                    <div className="flex max-w-4xl flex-col justify-center gap-2 md:gap-3">
                        <h1 className="text-xl font-semibold text-foreground md:text-3xl">
                            {surat.nama_surat}
                        </h1>
                        <p className="text-base font-light text-muted-foreground md:text-xl">
                            {surat.tanggal_surat}
                        </p>
                        <div className="mt-1 inline-flex h-6 w-fit min-w-5 shrink-0 items-center justify-center gap-0.5 rounded-md bg-blue-200 px-2 text-sm/none leading-3 text-blue-900 transition-colors dark:border">
                            <BadgeCheckIcon size={14} />
                            Terverifikasi
                        </div>
                    </div>
                    <QRCodeSVG
                        className="hidden rounded-md border border-dashed p-2.5 md:block"
                        value={verificationUrl}
                        size={170}
                        bgColor={"#ffffff"}
                        fgColor={"#000000"}
                    />
                </div>
            </div>
            <div className="border-b">
                <div className="mx-5 -mt-5 max-w-screen-xl border-x px-4 pb-5 md:px-14 md:pb-14">
                    <div className="shadow-xs relative z-50 flex h-10 items-center justify-between rounded-lg border border-neutral-200 bg-white bg-gradient-to-r from-gray-50 via-transparent to-transparent px-2">
                        <div className="flex w-full items-center gap-3">
                            <div className="inline-flex h-6 w-fit min-w-5 shrink-0 items-center justify-center gap-1 rounded-md bg-primary px-1.5 font-mono text-xs/none uppercase leading-3 text-white transition-colors">
                                <FileDigit size={12} />
                                <span className="hidden md:block">Nomor</span>
                            </div>
                            <div className="flex-1 truncate text-sm font-light text-neutral-950 dark:text-white">
                                <span> {surat.nomor_surat} </span>
                            </div>
                        </div>
                    </div>
                    <div className="shadow-xs relative z-50 mt-4 items-center justify-between rounded-xl border border-neutral-200 bg-white p-4 md:mt-10">
                        <div className="mb-3.5 flex w-full items-center gap-3">
                            <div className="flex items-center gap-2.5">
                                <div className="flex h-6 w-6 items-center justify-center rounded-md border border-neutral-200 bg-white p-1 dark:border-white/5 dark:bg-neutral-800">
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <h3 className="text-sm font-semibold text-neutral-900 md:text-base">
                                    Lampiran Dokumen
                                </h3>
                            </div>
                        </div>
                        <div className="mb-3 rounded-lg border border-dashed">
                            <div className="flex h-11 items-center justify-between gap-3 rounded-lg pl-4 pr-2.5 hover:bg-white/50">
                                {surat.file_url ? (
                                    <>
                                        <div className="flex items-center gap-2">
                                            <InfoIcon
                                                size={12}
                                                className="text-muted-foreground"
                                            />
                                            <div className="flex-1 font-mono text-xs leading-3 text-neutral-900 dark:text-neutral-400">
                                                Ditemukan 1 file{" "}
                                                <span className="hidden md:block">
                                                    yang dilampirkan
                                                </span>
                                            </div>
                                        </div>
                                        <a
                                            href={surat.file_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-semibold underline"
                                        >
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="-mr-1 h-8 text-xs"
                                            >
                                                <FileDown
                                                    size={11}
                                                    className="-mx-0.5"
                                                />
                                                <span className="hidden md:block">
                                                    Download
                                                </span>
                                            </Button>
                                        </a>
                                    </>
                                ) : (
                                    <>
                                        <InfoIcon
                                            size={12}
                                            className="text-muted-foreground"
                                        />
                                        <div className="flex-1 font-mono text-xs leading-3 text-neutral-900 dark:text-neutral-400">
                                            Tidak ada file yang dilampirkan
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        {surat.file_url ? (
                            <div className="overflow-hidden rounded-md border">
                                <iframe
                                    src={`${surat.file_url}#toolbar=0`}
                                    className="h-[450px] w-full md:h-[1200px]"
                                    style={{
                                        border: "none",
                                        margin: 0,
                                        padding: 0,
                                        display: "block",
                                    }}
                                    title="PDF Viewer"
                                ></iframe>
                            </div>
                        ) : (
                            <div className="flex h-[700px] items-center justify-center overflow-hidden rounded-md border">
                                <h1>Tidak Ditemukan</h1>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
        // <>
        //     {/* Main container for centering the content */}
        //     <main className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        //         <Card className="w-full max-w-2xl shadow-lg">
        //             <CardHeader className="text-center">
        //                 {/* School Logo */}
        //                 <img
        //                     src="/img/logosekolah.png"
        //                     alt="Logo Sekolah"
        //                     className="w-20 h-20 mx-auto mb-4"
        //                 />

        //                 {/* Verification Status */}
        //                 <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-500">
        //                     <CheckCircle className="w-8 h-8" />
        //                     <CardTitle className="text-2xl font-bold">
        //                         Dokumen Terverifikasi
        //                     </CardTitle>
        //                 </div>
        //                 <CardDescription className="mt-2 text-base">
        //                     Surat ini adalah dokumen yang sah dan terverifikasi
        //                     oleh sistem kami.
        //                 </CardDescription>
        //             </CardHeader>
        //             <CardContent className="grid gap-6 text-base">
        //                 {/* Document Details */}
        //                 <div className="space-y-3">
        //                     <div className="flex justify-between border-b pb-2">
        //                         <span className="font-semibold text-gray-600 dark:text-gray-400">
        //                             Nama/Perihal
        //                         </span>
        //                         <span className="text-right font-medium">
        //                             {surat.nama_surat}
        //                         </span>
        //                     </div>
        //                     <div className="flex justify-between border-b pb-2">
        //                         <span className="font-semibold text-gray-600 dark:text-gray-400">
        //                             Nomor Surat
        //                         </span>
        //                         <span className="text-right font-medium">
        //                             {surat.nomor_surat}
        //                         </span>
        //                     </div>
        //                     <div className="flex justify-between">
        //                         <span className="font-semibold text-gray-600 dark:text-gray-400">
        //                             Tanggal Surat
        //                         </span>
        //                         <span className="text-right font-medium">
        //                             {surat.tanggal_surat}
        //                         </span>
        //                     </div>
        //                 </div>

        //                 {/* Embedded PDF Viewer */}
        //                 {surat.file_url ? (
        //                     <div>
        //                         <h3 className="mb-</svg>2 font-semibold text-gray-700 dark:text-gray-300">
        //                             Lampiran Dokumen:
        //                         </h3>
        //                         <div className="overflow-hidden rounded-md border">
        //                             <div className="scale-[1.08] -translate-y-[6px] origin-top">
        //                                 <iframe
        //                                     src={`${surat.file_url}#toolbar=0`}
        //                                     className="w-full h-[500px]"
        //                                     style={{
        //                                         border: "none",
        //                                         margin: 0,
        //                                         padding: 0,
        //                                         display: "block",
        //                                     }}
        //                                     title="PDF Viewer"
        //                                 ></iframe>
        //                             </div>
        // </a>                        </div>
        //                     </div>
        //                 ) : (
        //                     <p className="text-center text-sm text-gray-500 mt-4">
        //                         <em>Tidak ada file PDF yang dilampirkan.</em>
        //                     </p>
        //                 )}
        //             </CardContent>
        //             <CardFooter className="flex flex-col items-center justify-center pt-6 border-t">
        //                 {/* QR Code Display */}
        //                 <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        //                     VERIFICATION QR CODE
        //                 </p>
        //                 {/* Generate the QR code on the client-side */}
        //                 <QRCodeSVG
        //                     value={verificationUrl}
        //                     size={150}
        //                     bgColor={"#ffffff"}
        //                     fgColor={"#000000"}
        //                 />
        //             </CardFooter>
        //         </Card>
        //     </main>
        // </>
    );
}
