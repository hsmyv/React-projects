<?php

namespace App\Http\Controllers;

use App\Models\Note;
use App\Models\Tag;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    public function index()
    {
        $notes = Note::with('tags')->get();
        return response()->json($notes);
    }

    public function store(Request $request)
    {
        $note = Note::create($request->only(['title', 'markdown']));
        if($request->tags) {
            $note->tags()->sync($request->tags); // tags array [id1, id2,...]
        }
        $note->load('tags');
        return response()->json($note, 201);
    }

    public function show(Note $note)
    {
        $note->load('tags');
        return response()->json($note);
    }

    public function update(Request $request, Note $note)
    {
        $note->update($request->only(['title', 'markdown']));
        if($request->tags) {
            $note->tags()->sync($request->tags);
        }
        $note->load('tags');
        return response()->json($note);
    }

    public function destroy(Note $note)
    {
        $note->delete();
        return response()->json(null, 204);
    }
}
