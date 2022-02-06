import NotifyWindow from '../components/Notify/NotifyWindow';
const Notify = ({children}) => {
  return <div style={{padding:"0px 40px 20px 40px", backgroundColor:"#FFFFFF", minHeight:"100%"}}>
    <NotifyWindow expand={false}/>
  </div>
}

export default Notify;