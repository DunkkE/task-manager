import { Modal, Form, Button } from 'react-bootstrap'
import React from 'react'
import {useState} from 'react'



const AddTask = ({onAdd, showAddTask, onHide}) => {
    const [text,setText] = useState('')
    const [day,setDay] = useState('')
    const [reminder,setReminder] = useState(false)
    const [show, setShow] = useState(false)

  const handleClose = () => {
      onHide()
    };

    const onSubmit = (e) => {
        e.preventDefault()

        if(!text)
        {
            alert("Please add a task")
            return

           
        }
        onAdd({text, day, reminder})
        setText('')
        setDay('')
        setReminder(false)
        handleClose()
    }
  
    return (
        <>
          <Modal show={showAddTask} onHide={handleClose}>
            <Modal.Header className="text-center" closeButton>
              <Modal.Title className="modal-title" style={{fontWeight:'bolder', fontSize:'x-large'}}>Add A Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                        <Form.Group>
                            <Form.Label>Task</Form.Label>
                            <Form.Control type="text" placeholder="Enter Task" onChange={(e) => setText(e.target.value)}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Date and Time</Form.Label>
                            <Form.Control type="text" placeholder="Enter Date and Time" onChange={(e) => setDay(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Set Reminder?" onChange={(e) => setReminder(e.currentTarget.checked)} />
                        </Form.Group>
                        <Modal.Footer>
              <Button variant="primary" type='submit'>
                Save Task
              </Button>
            </Modal.Footer>
                </Form>
               
            </Modal.Body>
            
          </Modal>
        </>
      );
    }

export default AddTask
