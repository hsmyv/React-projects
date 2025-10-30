import "bootstrap/dist/css/bootstrap.min.css"
import { Routes,Route,Navigate } from "react-router-dom"
import { NewNote } from "./NewNote"
import { Container } from "react-bootstrap"
import { NoteList } from "./NoteList"
import { NoteLayout } from "./NoteLayout"
import { Note } from "./Note"
import { EditNote } from "./EditNote"
import { useState, useEffect, useMemo } from "react"
import axios from "axios"

import type {NoteType, Tag } from "./types/note"

function App(){
  
  const [notes, setNotes] = useState<NoteType[]>([])
  const [tags, setTags] = useState<Tag[]>([])

  useEffect(() => {
    axios.get("/api/notes").then(res => setNotes(res.data))
    axios.get("/api/tags").then(res => setTags(res.data))
  }, [])

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return {
        ...note,
        tags: tags.filter(tag => note.tags.some(t => t.id === tag.id))
      }
    })
  }, [notes, tags])

  async function onCreateNote(data: { title: string; markdown: string; tags: Tag[] }) {
    const res = await axios.post("/api/notes", {
      ...data,
      tags: data.tags.map(t => t.id)
    })
    setNotes(prev => [...prev, res.data])
  }

  async function onUpdateNote(id: string, data: { title: string; markdown: string; tags: Tag[] }) {
    const res = await axios.put(`/api/notes/${id}`, {
      ...data,
      tags: data.tags.map(t => t.id)
    })
    setNotes(prev => prev.map(note => (note.id === id ? res.data : note)))
  }

  async function onDeleteNote(id: string) {
    await axios.delete(`/api/notes/${id}`)
    setNotes(prev => prev.filter(note => note.id !== id))
  }

  async function addTag(tag: Tag) {
    const res = await axios.post("/api/tags", tag)
    setTags(prev => [...prev, res.data])
  }

  async function updateTag(id: string, label: string) {
    const res = await axios.put(`/api/tags/${id}`, { label })
    setTags(prev => prev.map(tag => (tag.id === id ? res.data : tag)))
  }

  async function deleteTag(id: string) {
    await axios.delete(`/api/tags/${id}`)
    setTags(prev => prev.filter(tag => tag.id !== id))
  }




  return (
  <Container className="my-4"> 
    <Routes>
      <Route path="/" element={<NoteList notes={notesWithTags} availableTags={tags} onUpdateTag={updateTag} onDeleteTag={deleteTag}/>}/>
      <Route path="/new" element={
        <NewNote 
            onSubmit={onCreateNote} 
            onAddTag={addTag}
            availableTags = {tags}
            
            />}/>
        <Route path="/:id" element={<NoteLayout notes={notesWithTags}/>}>
          <Route index element={<Note  onDelete={onDeleteNote}/>}/>
          <Route path="edit" element={<EditNote 
              onSubmit={onUpdateNote}
              onAddTag={addTag}
              availableTags = {tags}
          />}/>
        </Route>
      <Route path="*" element={<Navigate to="/" />}/>
    </Routes>
  </Container>
)
}


export default App 