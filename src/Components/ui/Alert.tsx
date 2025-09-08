import { AlertDialog, Button, Flex } from "@radix-ui/themes";

interface AlertProps {
  isOpen: boolean;
  title: string;
  message: string;
  handleClose: () => void;
}

export const Alert = ({ isOpen, title, message, handleClose }: AlertProps) => {
  return (
    <AlertDialog.Root open={isOpen}>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>{title}</AlertDialog.Title>
        <AlertDialog.Description size="2">{message}</AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel onClick={handleClose}>
            <Button variant="soft" color="gray">
              Fechar
            </Button>
          </AlertDialog.Cancel>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
