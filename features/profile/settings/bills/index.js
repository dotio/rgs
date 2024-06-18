import {BillInfo} from './bill-info'
import {Wrapper} from '../../../../ui/wrapper'

export const BillList = ({bills}) => {
  return (
    <Wrapper flow={'column'} gap={'6px'}>
      {bills.map((bill) => (<BillInfo key={bill.id} bill={bill} />))}
    </Wrapper>
  )
}