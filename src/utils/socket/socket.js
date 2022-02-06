import {io} from 'socket.io-client';

//tạo file này ta có thể chia sẻ socket cho những component khác
//bằng việc chỉ cần import file này
//socket sẽ luôn giữ nguyên các trạng thái

const ENDPOINT = process.env.REACT_APP_ENDPOINT;



const socket = io(ENDPOINT,{
  //không tự động kết nối
  // chỉ kết nối khi gọi socket.connect()
  autoConnect:false,
})

export default socket;