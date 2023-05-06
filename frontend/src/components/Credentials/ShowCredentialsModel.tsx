import React from 'react'
import { CredentialInterface } from '../../helper/Interfaces'

import { CopyButton, ActionIcon, Tooltip, TextInput, PasswordInput, Button } from '@mantine/core';
import { IconCopy, IconCheck } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';


interface copyDataInterface {
  dataForCopy: string
}

function CopyIcon(props: copyDataInterface) {
  return (
    <CopyButton value={props.dataForCopy} timeout={2000}>
      {({ copied, copy }) => (
        
        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
          <ActionIcon color={copied ? 'blue' : 'gray'} onClick={copy}>
            {copied ? <IconCheck size="1rem" /> : <IconCopy size="1rem" />}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  );
}

function CopyIconBtn(props:copyDataInterface){
  return (
    <CopyButton  value={props.dataForCopy}>
    {({ copied, copy }) => (
      <Button mt="xl" color={copied ? 'violet' : 'customPrimary'} onClick={copy}>
        {copied ? 'Copied Password' : 'Copy Password'}
      </Button>
    )}
  </CopyButton>
  )
}

export default function ShowCredentialsModel(credentialData: CredentialInterface) {

  const [visible, { toggle }] = useDisclosure(false);


  return (
    <div>

      <TextInput
        type='text'
        label="Your website url"
        value={credentialData.website}
        onChange={()=>""}
        rightSection={<CopyIcon dataForCopy={credentialData.website}/>}
      />
      <TextInput
        type='text'
        label="Your Email/Phone/Username"
        value={credentialData.usernameOrEmailOrPhone}
        onChange={()=>""}
        rightSection={<CopyIcon dataForCopy={credentialData.usernameOrEmailOrPhone} />}
      />

      <PasswordInput
        visible={visible}
        onVisibilityChange={toggle}
        label="Your Password"
        onChange={()=>""}
        value={credentialData.password}
      />
      <CopyIconBtn dataForCopy={credentialData.password}/>
    </div>
  )
}
