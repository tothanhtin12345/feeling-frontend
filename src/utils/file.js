//hàm xử lý các file trong thư mục
//chỉ phù hợp với các file default ra mảng routes (mỗi route có giá trị path)
export const parseModules = (context) => {
  //mảng để chứa các routes
  const routes = [];
  //mảng để chứa các paths
  const paths = [];

  //xét duyệt từng file trong thư mục
  context.keys().forEach((fileName) => {
    // console.log(fileName)
    //lấy ra giá trị default trong mỗi file
    const object = context(fileName).default;
    //nhét giá trị routes trong mỗi file vào mảng
    routes.push(...object);
    //lấy ra giá trị path trong mỗi đối tượng routes
    //câu lệnh dưới ta có thể hiểu là
    // đầu tiên object.map((o) => o.path) được một mảng path
    // sau đó ... là phân tách mảng thành các giá trị riêng và push vào mảng paths
    paths.push(...object.map((o) => o.path));
  });

  return {
    routes,
    paths,
  };
};

//hàm nhận diện file thông qua mimetype