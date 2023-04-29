import React from 'react'
import { CredentialInterface, CredentialWithFunctionInterface } from '../../helper/Interfaces'

import { Card, Image, Text, Badge, Button, Group, Chip } from '@mantine/core';
import { IconPassword } from '@tabler/icons-react';


export default function OneCredentialItem(credential: CredentialWithFunctionInterface) {
  return (
    <Card style={{ "width": "16rem" }} shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section ta="center" style={{ "marginTop": ".4rem" }}>
        <IconPassword className='textPrimary' size="4rem" />
      </Card.Section>
      <Group position="center">
        <Badge color="violet" size="lg" variant="light">
          {credential.website}
        </Badge>
      </Group>


      {/* <Group position="center" mt="xs">
        <Text weight={500}>{credential.usernameOrEmailOrPhone}</Text>
      </Group>
      <Group position="center" mt="xs">
        <Text weight={500}>{credential.password}</Text>
      </Group> */}

      <Button onClick={()=>credential.openCredentialModel(credential.index)} variant="light" className='textWhite' fullWidth mt="md" radius="md">
        Show Credentials
      </Button>
    </Card>
  )
}
