
import { useState } from 'react';
import { Stepper, Button, Group } from '@mantine/core';


interface uploadingProcess {
  uploadingProcessCount: number
}


export function FileUploadProcessModel(props: uploadingProcess) {
  //   const [active, setActive] = useState(1);
  // const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  // const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      {/* <Stepper ta="center" active={active} onStepClick={setActive}  breakpoint="md"> */}
      <Stepper ta="center" active={props.uploadingProcessCount} breakpoint="md">
        <Stepper.Step label="Uploading" description="to IPFS" loading={props.uploadingProcessCount === 0}>
          We Are Uploading File To IPFS. Please Wait...
        </Stepper.Step>
        <Stepper.Step label="Encriptiong" description="File" loading={props.uploadingProcessCount === 1}>
          We are encriptioing your Your File Credentials to make it secure. Please Confirm and wait.
        </Stepper.Step>
        <Stepper.Step label="Confirm" description="Transaction" loading={props.uploadingProcessCount === 2}>
          Please Confirm the transaction with Wallet.
        </Stepper.Step>
        <Stepper.Step label="Please" description="Wait" loading={props.uploadingProcessCount === 3}>
          Please wait for some time. We are adding your encrypted File in smart contract.
        </Stepper.Step>
        <Stepper.Completed>
          File Added Seccefully.
        </Stepper.Completed>
      </Stepper>

      {/* // <Group position="center" mt="xl">
      //   <Button variant="default" onClick={prevStep}>Back</Button>
      //   <Button onClick={nextStep}>Next step</Button>
      // </Group> */}
    </>
  );
}