import { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export default function FlashMessage() {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return <Toaster position="bottom-center" />;
}
