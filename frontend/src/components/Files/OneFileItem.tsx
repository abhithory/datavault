import React from 'react'
import { FileInterface } from '../../helper/Interfaces';
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

export default function OneFileItem(file: FileInterface) {
    return (
    <Card style={{"width":"16rem"}} shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{file.fileName}</Text>
      </Group>
        {/* <Badge color="pink" variant="light">
          On Sale
        </Badge> */}

      {/* <Text size="sm" color="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes with tours and
        activities on and around the fjords of Norway
      </Text> */}
      <a href={file.fileHash} target='_blank'>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        Check File Now
      </Button>
      </a>
    </Card>
  );
}