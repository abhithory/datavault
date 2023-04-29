
import { useState } from 'react';
import { Stepper, Button, Group } from '@mantine/core';

export function FileUploadProcessModel() {
    const [active, setActive] = useState(1);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Stepper ta="center" active={active} onStepClick={setActive}  breakpoint="md">
        <Stepper.Step label="Encriptiong" description="File" loading={active === 1}>
          We are encriptioing your file to make it secure
        </Stepper.Step>
        <Stepper.Step label="Uploading" description="File to IPFS" loading={active === 2}>
          We are uploading your file to IPFS
        </Stepper.Step>
        <Stepper.Step label="Confirm" description="Transaction" loading={active === 3}>
          Please Confirm the transaction with Wallet
        </Stepper.Step>
        <Stepper.Completed>
          File Upload Seccefully. 
        </Stepper.Completed>
      </Stepper>
      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>Back</Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group>
    </>
  );
}