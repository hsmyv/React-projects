<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Todo;

class TodoController extends Controller
{
    public function index() {
        return response()->json(Todo::all());
    }

    public function store(Request $request) {
        $request->merge(['checked' => $request->checked ?? false]);
        $todo = Todo::create($request->only(['item', 'checked']));
        return response()->json($todo);
    }

    public function update(Request $request, $id) {
        $todo = Todo::findOrFail($id);
        $todo->update($request->only(['item', 'checked']));
        return response()->json($todo);
    }

    public function destroy($id) {
        $todo = Todo::findOrFail($id);
        $todo->delete();
        return response()->noContent();
    }
}
