import { useState } from 'react';
import { Box, Button, Container, Flex, IconButton, Input, List, ListItem, Text, useColorModeValue } from '@chakra-ui/react';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTask = () => {
    if (input.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: input.trim(), isCompleted: false }]);
      setInput('');
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Container maxW="container.md" py={8}>
      <Flex as="nav" mb={4} justify="space-between" align="center">
        <Text fontSize="2xl" fontWeight="bold">Todo App</Text>
      </Flex>
      <Box bg={useColorModeValue('gray.100', 'gray.700')} p={4} borderRadius="md" boxShadow="base">
        <Flex as="form" onSubmit={(e) => { e.preventDefault(); handleAddTask(); }}>
          <Input placeholder="Add a new task" value={input} onChange={(e) => setInput(e.target.value)} />
          <Button type="submit" colorScheme="blue" ml={2}>Add</Button>
        </Flex>
        <List spacing={3} mt={4}>
          {tasks.map(task => (
            <ListItem key={task.id} display="flex" justifyContent="space-between" alignItems="center">
              <Text as={task.isCompleted ? 's' : ''}>{task.text}</Text>
              <Flex>
                <IconButton aria-label="Complete Task" icon={<FaCheckCircle />} onClick={() => handleToggleComplete(task.id)} colorScheme={task.isCompleted ? 'green' : 'gray'} />
                <IconButton aria-label="Delete Task" icon={<FaTrash />} onClick={() => handleDeleteTask(task.id)} colorScheme="red" ml={2} />
              </Flex>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default Index;