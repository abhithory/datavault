import React from 'react'
import { CredentialInterface } from '../../helper/Interfaces'

import { Card, Image, Text, Badge, Button, Group, Chip } from '@mantine/core';
import { IconPassword } from '@tabler/icons-react';


interface CredentialWithFunctionInterface{
  index:number,
  website:string,
  usernameOrEmailOrPhone:string,
  password:string,
  decryptedStatus:boolean,
  openCredentialModel:(n:number)=>void,
  DecryptCredentials:(n:number)=>void
}

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
      {credential.decryptedStatus?
      <Button onClick={()=>credential.openCredentialModel(credential.index)} variant="light" className='textWhite' fullWidth mt="md" radius="md">
      Show Credentials
    </Button>
      :
      <Button onClick={()=>credential.DecryptCredentials(credential.index)} variant="light" color="indigo" fullWidth mt="md" radius="md">
        Decrypt Credentials
      </Button>
      }
    </Card>
  )
}
