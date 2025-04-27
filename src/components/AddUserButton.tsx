import { Button, CloseButton, Dialog, Field, Input } from '@chakra-ui/react'
import { useState } from 'react';
interface AddUserButtonProps {
    addUser: (username: string) => void;
}
const AddUserButton = ({ addUser }: AddUserButtonProps) => {
    const [username, setUsername] = useState('');
    return (    
        <Dialog.Root
            placement="center"
            motionPreset="slide-in-bottom"
          >
            <Dialog.Trigger asChild>
                <Button variant="outline">+ Add Github User</Button>
            </Dialog.Trigger>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Add User</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                  <Field.Root>
                    <Field.Label>Username</Field.Label>
                    <Input 
                        type='text'
                        w="full"
                        placeholder="type github username eg: nhiug"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        variant="outline"
                    />
                  </Field.Root>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </Dialog.ActionTrigger>
                    <Dialog.ActionTrigger asChild>
                        <Button bg="black" color="white" onClick={() => addUser(username)}>Add</Button>
                    </Dialog.ActionTrigger>
                  </Dialog.Footer>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
          </Dialog.Root>
    )
};
export default AddUserButton;