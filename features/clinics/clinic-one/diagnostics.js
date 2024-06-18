import React from 'react'
import { useSelector } from 'react-redux'
import { Well } from '../../../ui/well'
import { DiagnosticsAccordeon } from '../components/diagnostics-accordion'
import {T} from '../../../utils/translation'
import {Container} from '../../../ui/grid/container'
import {TitleText} from '../../../ui/title-text'

export const ClinicDiagnostics = () => {
  const diagnostics = useSelector((state) => state.clinics.clinicDiagnostics)

  return (
    <Well>
      <Container flow={'column'}>
        <TitleText color={'black'} padding={'0 0 16px'}><T ucFirst>clinic.diagnostics.title</T></TitleText>
        {diagnostics && diagnostics.map(({ id, title, items }) => {
          return <DiagnosticsAccordeon key={id ? id : '1'} title={title ? title : 'УЗИ'} diagnostics={items} />
        })}
      </Container>
    </Well >
  )
}
