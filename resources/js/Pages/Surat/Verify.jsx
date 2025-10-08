import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { BadgeCheckIcon, FileText, InfoIcon, Paperclip } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Separator } from "@/Components/ui/separator";

export default function Show({ surat, verificationUrl }) {
    return (
        <>
            <div className="border-b">
                <div className="max-w-screen-xl justify-between mx-auto flex items-center gap-2 px-14 py-2 border-x">
                    <a
                        href="#"
                        data-sidebar="menu-button"
                        data-size="lg"
                        data-active="false"
                        className="flex items-center gap-2 overflow-hidden rounded-md text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-12 text-sm group-data-[collapsible=icon]:!p-0"
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
                </div>
            </div>
            <div className="border-b">
                <div className="max-w-screen-xl mx-auto px-14 py-2 border-x">
                    <div className="flex flex-col gap-3 my-12 max-w-5xl">
                        <h1 className="text-3xl font-semibold text-foreground">
                            {surat.nama_surat}
                        </h1>
                        <p className="text-xl font-light text-muted-foreground">
                            {surat.tanggal_surat}
                        </p>
                        <div className="inline-flex w-fit shrink-0 items-center justify-center gap-0.5 leading-3 transition-colors dark:border h-6 min-w-5 rounded-md px-2 text-sm/none bg-blue-200 text-blue-900 ">
                            <BadgeCheckIcon size={14} />
                            Terverifikasi
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-b">
                <div className="max-w-screen-xl mx-auto px-14 pb-5 -mt-5 border-x">
                    <div className="relative z-50 flex h-10 items-center justify-between rounded-lg border border-neutral-200 bg-white px-2 shadow-xs dark:border-white/10 dark:bg-[#1a1a1a]">
                        <div className="flex w-full items-center gap-3">
                            <div className="inline-flex h-6 w-fit min-w-5 shrink-0 items-center justify-center gap-1 rounded-md bg-primary px-1.5 font-mono text-xs/none leading-3 text-white uppercase transition-colors">
                                <Paperclip size={12} />
                                Nomor
                            </div>
                            <div className="flex-1 truncate text-sm font-light text-neutral-950 dark:text-white">
                                <span> {surat.nomor_surat} </span>
                            </div>
                        </div>
                    </div>
                    <div className="relative z-50 mt-10 p-4 items-center justify-between rounded-xl border border-neutral-200 bg-white shadow-xs ">
                        <div className="flex w-full items-center gap-3 mb-3.5">
                            <div className="flex items-center gap-2.5">
                                <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-white/5 rounded-md w-6 h-6 flex items-center justify-center p-1">
                                    <FileText className="w-4 h-4 text-muted-foreground" />
                                </div>
                                <h3 className="text-base font-semibold text-neutral-900">
                                    Lampiran Dokumen
                                </h3>
                            </div>
                        </div>
                        <div className="border border-dashed rounded-lg mb-3">
                            <div className="flex h-11 cursor-pointer items-center gap-3 rounded-lg pr-2.5 pl-4 hover:bg-white/50">
                                {surat.file_url ? (
                                    <>
                                        <InfoIcon
                                            size={12}
                                            className="text-muted-foreground"
                                        />
                                        <div className="flex-1 font-mono text-xs leading-3 text-neutral-900 dark:text-neutral-400">
                                            Ditemukan 1 file yang dilampirkan{" "}
                                        </div>
                                        <a
                                            href={surat.file_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="underline font-semibold"
                                        >
                                            Unduh File
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
                                {/* <div className="scale-[1.08] -translate-y-[6px] origin-top"> */}
                                <iframe
                                    src={`${surat.file_url}#toolbar=0`}
                                    className="w-full h-[1200px]"
                                    style={{
                                        border: "none",
                                        margin: 0,
                                        padding: 0,
                                        display: "block",
                                    }}
                                    title="PDF Viewer"
                                ></iframe>
                                {/* </div> */}
                            </div>
                        ) : (
                            <div className="overflow-hidden flex justify-center items-center h-[700px] rounded-md border">
                                <h1>Tidak Ditemukan</h1>
                            </div>
                        )}
                    </div>
                </div>
            </div>
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
        //                         <h3 className="mb-2 font-semibold text-gray-700 dark:text-gray-300">
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
        //                         </div>
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
