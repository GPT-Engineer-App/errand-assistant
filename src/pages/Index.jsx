import { useState } from 'react';
import { Box, Button, Container, Flex, IconButton, Input, List, ListItem, Text, useToast, VStack } from '@chakra-ui/react';
import { FaTrash, FaCheck } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const handleAddTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'No task entered',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, isCompleted: false }]);
    setInput('');
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleCompleteTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8}>
        <Text fontSize="2xl" fontWeight="bold">Todo App</Text>
        <Flex as="form" onSubmit={(e) => { e.preventDefault(); handleAddTask(); }} width="100%">
          <Input
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            flexGrow={1}
            mr={2}
          />
          <Button colorScheme="blue" px={8} type="submit">Add</Button>
        </Flex>
        <List width="100%" spacing={2}>
          {tasks.map(task => (
            <ListItem key={task.id} display="flex" justifyContent="space-between" alignItems="center" p={2} boxShadow="md" borderRadius="md">
              <Text as={task.isCompleted ? 's' : ''}>{task.text}</Text>
              <Flex>
                <IconButton
                  icon={<FaCheck />}
                  aria-label="Complete Task"
                  colorScheme="green"
                  onClick={() => handleCompleteTask(task.id)}
                  mr={2}
                />
                <IconButton
                  icon={<FaTrash />}
                  aria-label="Delete Task"
                  colorScheme="red"
                  onClick={() => handleDeleteTask(task.id)}
                />
              </Flex>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;