import { useState } from "react";
import {
    CirclePlus,
    MoreHorizontal,
    Pencil,
    Trash2,
    Loader2,
    Search,
} from "lucide-react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AppLayout from "@/Layouts/AppLayout";
import { Link, useForm, usePage } from "@inertiajs/react";

export default function Index({ users }) {
    const { delete: destroy } = useForm();
    const [searchTerm, setSearchTerm] = useState("");
    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const { flash } = usePage().props;

    const createForm = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const editForm = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    function handleCreateSubmit(e) {
        e.preventDefault();
        createForm.post(route("users.store"), {
            onSuccess: () => {
                createForm.reset();
                setCreateOpen(false);
            },
        });
    }

    function handleEditSubmit(e) {
        e.preventDefault();
        editForm.patch(route("users.update", editingUser.id), {
            onSuccess: () => {
                editForm.reset();
                setEditOpen(false);
                setEditingUser(null);
            },
        });
    }

    function handleEdit(user) {
        setEditingUser(user);
        editForm.setData({
            name: user.name,
            email: user.email,
            password: "",
            password_confirmation: "",
        });
        setEditOpen(true);
    }

    function handleDelete(userId) {
        if (confirm("Are you sure you want to delete this user?")) {
            destroy(route("users.destroy", userId), {
                preserveScroll: true,
            });
        }
    }

    return (
        <AppLayout bc1="Users" bc2="Manage Users">
            <div className="-mx-5 border-b px-5 py-5">
                <h1 className="text-2xl font-semibold leading-normal">
                    Manajemen User
                </h1>
                <p className="text-muted-foreground">
                    Create, edit, or delete user accounts.
                </p>
            </div>
            <div className="mb-4 mt-5 flex items-center justify-between">
                <div className="relative w-72">
                    <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                    />
                </div>
                <Button variant="default" onClick={() => setCreateOpen(true)}>
                    <CirclePlus /> Tambah User
                </Button>
            </div>

            <div className="overflow-hidden rounded-lg border">
                <Table>
                    <TableHeader className="bg-muted">
                        <TableRow>
                            <TableHead className="w-[10px] border-r">
                                No
                            </TableHead>
                            <TableHead className="w-[200px] border-r">
                                Name
                            </TableHead>
                            <TableHead className="border-r">Email</TableHead>
                            <TableHead className="w-min px-2">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user, index) => (
                                <TableRow key={user.id}>
                                    <TableCell className="border-r text-center">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell className="border-r">
                                        {user.name}
                                    </TableCell>
                                    <TableCell className="border-r">
                                        {user.email}
                                    </TableCell>
                                    <TableCell className="w-8 px-0 py-0 text-center">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    className="m-0 h-8 w-8 p-0"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                className="w-36"
                                                align="end"
                                            >
                                                <DropdownMenuItem
                                                    className="cursor-pointer"
                                                    onClick={() =>
                                                        handleEdit(user)
                                                    }
                                                >
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    className="cursor-pointer text-red-600 focus:text-red-600"
                                                    onClick={() =>
                                                        handleDelete(user.id)
                                                    }
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan="4"
                                    className="h-24 text-center"
                                >
                                    No users found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Create Dialog */}
            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleCreateSubmit} className="space-y-4">
                        <DialogHeader>
                            <DialogTitle>Create New User</DialogTitle>
                            <DialogDescription>
                                Fill in the details to create a new user
                                account.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-2">
                            <Label htmlFor="create_name">Name</Label>
                            <Input
                                id="create_name"
                                type="text"
                                value={createForm.data.name}
                                onChange={(e) =>
                                    createForm.setData("name", e.target.value)
                                }
                                autoComplete="off"
                            />
                            {createForm.errors.name && (
                                <p className="text-sm text-destructive">
                                    {createForm.errors.name}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="create_email">Email</Label>
                            <Input
                                id="create_email"
                                type="email"
                                value={createForm.data.email}
                                onChange={(e) =>
                                    createForm.setData("email", e.target.value)
                                }
                                autoComplete="off"
                            />
                            {createForm.errors.email && (
                                <p className="text-sm text-destructive">
                                    {createForm.errors.email}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="create_password">Password</Label>
                            <Input
                                id="create_password"
                                type="password"
                                value={createForm.data.password}
                                onChange={(e) =>
                                    createForm.setData(
                                        "password",
                                        e.target.value,
                                    )
                                }
                            />
                            {createForm.errors.password && (
                                <p className="text-sm text-destructive">
                                    {createForm.errors.password}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="create_password_confirmation">
                                Confirm Password
                            </Label>
                            <Input
                                id="create_password_confirmation"
                                type="password"
                                value={createForm.data.password_confirmation}
                                onChange={(e) =>
                                    createForm.setData(
                                        "password_confirmation",
                                        e.target.value,
                                    )
                                }
                            />
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                disabled={createForm.processing}
                            >
                                {createForm.processing && (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                )}
                                Create
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleEditSubmit} className="space-y-4">
                        <DialogHeader>
                            <DialogTitle>Edit User</DialogTitle>
                            <DialogDescription>
                                Update the user details.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-2">
                            <Label htmlFor="edit_name">Name</Label>
                            <Input
                                id="edit_name"
                                type="text"
                                value={editForm.data.name}
                                onChange={(e) =>
                                    editForm.setData("name", e.target.value)
                                }
                                autoComplete="off"
                            />
                            {editForm.errors.name && (
                                <p className="text-sm text-destructive">
                                    {editForm.errors.name}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="edit_email">Email</Label>
                            <Input
                                id="edit_email"
                                type="email"
                                value={editForm.data.email}
                                onChange={(e) =>
                                    editForm.setData("email", e.target.value)
                                }
                                autoComplete="off"
                            />
                            {editForm.errors.email && (
                                <p className="text-sm text-destructive">
                                    {editForm.errors.email}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="edit_password">
                                New Password (leave blank to keep current)
                            </Label>
                            <Input
                                id="edit_password"
                                type="password"
                                value={editForm.data.password}
                                onChange={(e) =>
                                    editForm.setData("password", e.target.value)
                                }
                            />
                            {editForm.errors.password && (
                                <p className="text-sm text-destructive">
                                    {editForm.errors.password}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="edit_password_confirmation">
                                Confirm New Password
                            </Label>
                            <Input
                                id="edit_password_confirmation"
                                type="password"
                                value={editForm.data.password_confirmation}
                                onChange={(e) =>
                                    editForm.setData(
                                        "password_confirmation",
                                        e.target.value,
                                    )
                                }
                            />
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                disabled={editForm.processing}
                            >
                                {editForm.processing && (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                )}
                                Update
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
