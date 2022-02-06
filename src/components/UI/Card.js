import { CardStlyled } from "../Styled/Card";
const Card = ({children, className, style, ...props}) => {
  return <CardStlyled className={className} style={{...style}}>
    {children}
  </CardStlyled>
}
export default Card;