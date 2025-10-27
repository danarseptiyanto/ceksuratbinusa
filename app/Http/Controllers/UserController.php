<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    private function checkAccess()
    {
        $allowedEmails = ['tu@binusasmg.sch.id', 'ops@binusasmg.sch.id'];
        if (!in_array(auth()->user()->email, $allowedEmails)) {
            abort(403, 'Unauthorized');
        }
    }

    public function index()
    {
        $this->checkAccess();
        $users = User::all();
        return Inertia::render('Users/Index', [
            'users' => $users
        ]);
    }

    public function create()
    {
        $this->checkAccess();
        return Inertia::render('Users/Create');
    }

    public function store(Request $request)
    {
        $this->checkAccess();
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return redirect()->route('users.index')->with('success', 'User created successfully.');
    }

    public function show(User $user)
    {
        //
    }

    public function edit(User $user)
    {
        $this->checkAccess();
        return Inertia::render('Users/Edit', [
            'user' => $user
        ]);
    }

    public function update(Request $request, User $user)
    {
        $this->checkAccess();
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        if ($request->password) {
            $user->update(['password' => Hash::make($request->password)]);
        }

        return redirect()->route('users.index')->with('success', 'User updated successfully.');
    }

    public function destroy(User $user)
    {
        $this->checkAccess();
        $user->delete();
        return redirect()->route('users.index')->with('success', 'User deleted successfully.');
    }
}