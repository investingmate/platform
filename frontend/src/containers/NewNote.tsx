import * as React from "react";
import {useRef, useState} from 'react'
import {API} from 'aws-amplify'
import Form from 'react-bootstrap/Form'
import {useNavigate} from 'react-router-dom'
import LoaderButton from '../components/LoaderButton'
import {s3Upload} from '../lib/awsLib'
import {onError} from '../lib/errorLib'
import config from '../config'
import {INote} from "../utils/Interfaces";

export default function NewNote() {
  const file = useRef<any>({})
  const nav = useNavigate()
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  function validateForm() {
    return content.length > 0
  }

  function handleFileChange(event: any) {
    file.current = event.target.files[0]
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE / 1000000} MB.`)
      return
    }
    setIsLoading(true)
    try {
      const attachment = file.current ? await s3Upload(file.current) : null
      await createNote({content, attachment})
      nav('/')
    } catch (e) {
      onError(e)
      setIsLoading(false)
    }
  }

  function createNote(note: INote) {
    return API.post('notes', '/notes', {
      body: note,
    })
  }

  return (
    <div className='NewNote'>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='content'>
          <Form.Control
            value={content}
            as='textarea'
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='file'>
          <Form.Label>Attachment</Form.Label>
          <Form.Control onChange={handleFileChange} type='file' />
        </Form.Group>
        <LoaderButton
          block
          type='submit'
          size='lg'
          variant='primary'
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoaderButton>
      </Form>
    </div>
  )
}
