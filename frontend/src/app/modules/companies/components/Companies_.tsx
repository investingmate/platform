import React, {useRef, useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {API, Storage} from 'aws-amplify'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {onError} from '../../../../lib/errorLib'
import {s3Upload} from '../../../../lib/awsLib'
import config from '../../../../config'
import {INote} from "../../../../utils/Interfaces";

export function Companies() {
  const file = useRef<any>(null)
  const {id} = useParams()
  const nav = useNavigate()
  const [note, setNote] = useState<INote | null>(null)
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    function loadNote() {
      return API.get('notes', `/notes/${id}`, {})
    }
    async function onLoad() {
      try {
        const note = await loadNote()
        const {content, attachment} = note
        if (attachment) {
          note.attachmentURL = await Storage.vault.get(attachment)
        }
        setContent(content)
        setNote(note)
      } catch (e) {
        onError(e)
      }
    }
    onLoad()
  }, [id])

  function validateForm() {
    return content.length > 0
  }

  function formatFilename(str: string) {
    return str.replace(/^\w+-/, '')
  }

  function handleFileChange(event: any) {
    file.current = event.target.files[0]
  }

  function saveNote(note: INote) {
    return API.put('notes', `/notes/${id}`, {
      body: note,
    })
  }

  function deleteNote() {
    return API.del('notes', `/notes/${id}`, {})
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    let attachment
    event.preventDefault()
    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE / 1000000} MB.`)
      return
    }
    setIsLoading(true)
    try {
      if (file.current) {
        attachment = await s3Upload(file.current)
      }
      await saveNote({
        content,
        attachment: attachment || note?.attachment,
      })
      nav('/')
    } catch (e) {
      onError(e)
      setIsLoading(false)
    }
  }

  async function handleDelete(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault()
    const confirmed = window.confirm('Are you sure you want to delete this note?')
    if (!confirmed) {
      return
    }
    setIsDeleting(true)
    try {
      await deleteNote()
      nav('/')
    } catch (e) {
      onError(e)
      setIsDeleting(false)
    }
  }

  return (
    <div className='Notes'>
      {note && (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='content'>
            <Form.Control
              as='textarea'
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='file'>
            <Form.Label>Attachment</Form.Label>
            {note && note.attachment && (
              <p>
                <a target='_blank' rel='noopener noreferrer' href={note.attachmentURL ?? ""}>
                  {formatFilename(note.attachment)}
                </a>
              </p>
            )}
            <Form.Control onChange={handleFileChange} type='file' />
          </Form.Group>
          <Button size='lg' type='submit' active={isLoading} disabled={!validateForm()}>
            Save
          </Button>
          <Button size='lg' variant='danger' onClick={handleDelete} active={isDeleting}>
            Delete
          </Button>
        </Form>
      )}
    </div>
  )
}
