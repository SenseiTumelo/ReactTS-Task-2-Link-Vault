
import { useState } from "react";
import { Text } from "../Text/Text"
import { Modal } from "../Modal/Modal";
import { Form } from "../Form/Form";

export const Header = () => {
  const [open, setOpen]= useState(false);
  const handleOpen = ()=> setOpen(true);
  const handleClose = ()=> setOpen(false);

  return (
    <header>
        <nav>
            <Text variant="h1">Bookmark</Text>
            <button  onClick={handleOpen}>+Add</button>
          <Modal isOpen={open} onClose={handleClose}>
            <Form/>
          </Modal>
        </nav>
    </header>
  )
}
