import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { Wizard, WizardStep } from 'react-wizard-primitive'

import { AuthControllerContext } from 'lib/components/contextProviders/AuthControllerContextProvider'
import { DepositWizardLayout } from 'lib/components/DepositWizardLayout'
import { DepositCryptoForm } from 'lib/components/DepositCryptoForm'
import { DepositFiatForm } from 'lib/components/DepositFiatForm'
import { DepositWizardSignIn } from 'lib/components/DepositWizardSignIn'
import { FiatOrCryptoForm } from 'lib/components/FiatOrCryptoForm'
import { TicketQuantityForm } from 'lib/components/TicketQuantityForm'

export const DepositWizardContainer = (props) => {
  const router = useRouter()
  const method = router.query.method

  const authControllerContext = useContext(AuthControllerContext)
  const { usersAddress } = authControllerContext

  return <>
    <Wizard
      // onChange={({ newStepIndex, previousStepIndex }) => {
      //   console.log(`I moved from step ${previousStepIndex} to ${newStepIndex}`);
      // }}
    >
      {
        (wizard) => {
          const { activeStepIndex, previousStep, moveToStep } = wizard

          return <DepositWizardLayout
            currentWizardStep={activeStepIndex + 1}
            handlePreviousStep={previousStep}
            moveToStep={moveToStep}
            totalWizardSteps={usersAddress ? 5 : 6}
          >
            <WizardStep>
              {(step) => {
                return step.isActive && <>
                  <TicketQuantityForm
                    nextStep={step.nextStep}
                  />
                </>
              }}
            </WizardStep>
            <WizardStep>
              {(step) => {
                return step.isActive && <>
                  <FiatOrCryptoForm
                    nextStep={step.nextStep}
                  />
                </>
              }}
            </WizardStep>
            {!usersAddress && <>}
              <WizardStep>
                {(step) => {
                  return step.isActive && <>
                    <DepositWizardSignIn />
                  </>
                }}
              </WizardStep>
            </>}
            <WizardStep>
              {(step) => {
                return step.isActive && <>
                  {method === 'fiat' ?
                    <DepositFiatForm
                      nextStep={step.nextStep}
                    /> :
                    <DepositCryptoForm
                      nextStep={step.nextStep}
                    />
                  }
                </>
              }}
            </WizardStep>
          </DepositWizardLayout>
        }
      }
    </Wizard>
  </>
}