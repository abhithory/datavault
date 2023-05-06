import React from 'react'
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { IconLock } from '@tabler/icons-react';

interface OneFileInterface {
  advanceEncryptionStatus: boolean,
  fileName: string,
  fileHash: string,
  decryptedStatus: boolean,
  DecryptFile: (n: number) => void,
  downloadEncryptedFile:(n:number) => void,
  index: number,
  isDownloading: boolean
}

export default function OneFileItem(file: OneFileInterface) {
  return (
    <Card style={{ "width": "16rem", "minHeight": "14rem" }} className='dfjccaicfdc' shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section mt="xl">
        <IconLock className='textPrimary' size="4rem" />
      </Card.Section>
      <Group >
        <Text lineClamp={1}>{file.fileName}</Text>
      </Group>
      {/* <Badge color="violet" variant="light">
        20 March, 2023
      </Badge> */}
      <Badge color={file.advanceEncryptionStatus ? "red" : "violet"} variant="light">
        {file.advanceEncryptionStatus ?
          "Advance Encrypted"
          :
          "Normal Encrypted"
        }
      </Badge>

      {file.decryptedStatus ?
        (file.advanceEncryptionStatus ?
          <Button onClick={() => file.downloadEncryptedFile(file.index)} variant="light" className='textWhite' fullWidth mt="md" radius="md" loading={file.isDownloading}>
            Download File
          </Button>
          :
          <a href={file.fileHash} target='_blank'>
            <Button variant="light" className='textWhite' fullWidth mt="md" radius="md">
              Open File
            </Button>
          </a>
        )
        :
        <Button onClick={() => file.DecryptFile(file.index)} variant="light" color="indigo" fullWidth mt="md" radius="md">
          Decrypt File
        </Button>
      }
    </Card>
  );
}