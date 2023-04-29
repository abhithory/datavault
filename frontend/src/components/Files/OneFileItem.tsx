import React from 'react'
import { FileInterface } from '../../helper/Interfaces';
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { IconLock } from '@tabler/icons-react';


export default function OneFileItem(file: FileInterface) {
  return (
    <Card style={{ "width": "16rem", "minHeight": "14rem" }} className='dfjccaicfdc' shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section mt="xl">
        <IconLock className='textPrimary' size="4rem" />
      </Card.Section>
      <Group >
        <Text lineClamp={1}>{file.fileName}</Text>
      </Group>
      <Badge color="violet" variant="light">
      20 March, 2023
      </Badge>
     

      {/* <Text size="sm" color="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes with tours and
        activities on and around the fjords of Norway
      </Text> */}
      <a href={file.fileHash} target='_blank'>

        <Button variant="light" className='textWhite' fullWidth mt="md" radius="md">
          Open File
        </Button>
      </a>
    </Card>
  );
}