import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function buildPageList(current, last) {
    const pages = new Set([1, last, current]);
    const window = 1;

    for (let page = current - window; page <= current + window; page++) {
        if (page >= 1 && page <= last) {
            pages.add(page);
        }
    }

    return [...pages].sort((a, b) => a - b);
}

export default function Pagination({ meta, onPageChange }) {
    if (!meta || meta.last_page <= 1) {
        return null;
    }

    const currentPage = meta.current_page;
    const lastPage = meta.last_page;
    const pages = buildPageList(currentPage, lastPage);

    const goTo = (page) => {
        if (page < 1 || page > lastPage || page === currentPage) {
            return;
        }
        onPageChange(page);
    };

    return (
        <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-sm text-muted-foreground">
                Menampilkan {meta.from ?? 0}-{meta.to ?? 0} dari {meta.total}{" "}
                data
            </p>
            <div className="flex items-center gap-1">
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={currentPage <= 1}
                    onClick={() => goTo(currentPage - 1)}
                >
                    Sebelumnya
                </Button>

                <div className="hidden items-center gap-1 md:flex">
                    {pages.map((page, index) => {
                        const previousPage = pages[index - 1];
                        const hasGap = previousPage && page - previousPage > 1;

                        return (
                            <span
                                key={page}
                                className="flex items-center gap-1"
                            >
                                {hasGap && (
                                    <span className="px-1 text-sm text-muted-foreground">
                                        ...
                                    </span>
                                )}
                                <Button
                                    type="button"
                                    variant={
                                        page === currentPage
                                            ? "default"
                                            : "outline"
                                    }
                                    size="sm"
                                    className={cn(
                                        "w-9 px-0",
                                        page === currentPage &&
                                            "pointer-events-none",
                                    )}
                                    aria-current={
                                        page === currentPage
                                            ? "page"
                                            : undefined
                                    }
                                    onClick={() => goTo(page)}
                                >
                                    {page}
                                </Button>
                            </span>
                        );
                    })}
                </div>

                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={currentPage >= lastPage}
                    onClick={() => goTo(currentPage + 1)}
                >
                    Berikutnya
                </Button>
            </div>
        </div>
    );
}
