export const getAddPostModalVisible = (state) => state.groups.addPostModalVisible;

//lấy thông tin chi tiết của một nhóm
export const getGroupDetails = (state) => state.groups.groupDetails;

//lấy id của nhóm hiện tại đang ở
export const getGroupId = (state) => state.groups.groupDetails?._id;

//lấy ra giá trị isManager
export const getIsManager = (state) => state.groups.groupDetails?.isManager;

//lấy giá trị isInspector
export const getIsInspector = (state) => state.groups.groupDetails?.isInspector;

//lấy createAt của nhóm hiện tại
export const getGroupCreatedAt = (state) => state.groups.groupDetails?.createdAt;

//lấy thông tin mô tả của nhóm
export const getGroupDescription = (state) => state.groups.groupDetails?.informations.description;

//lấy thông tin isMember khi người dùng truy cập vào nhóm
export const getGroupIsMember = (state) => state.groups.groupDetails?.isMember;


//trạng thái loading khi đang load thông tin
export const getGroupDetailsLoading = (state) => state.groups.groupDetailsLoading;
//lỗi khi load thông tin
export const getGroupDetailsError = (state) => state.groups.groupDetailsError;


//lấy danh sách bài post của nhóm
export const getGroupsPosts = (state)=>state.groups.posts;
//lấy trạng thái loading khi fetch posts
export const getGroupsPostsLoading = (state)=> state.groups.fetchLoading;

//lấy giá trị skip
export const getGroupsPostsSkip = (state) => state.groups.skip;

//lấy can load
export const getGroupsPostsCanLoad = (state) => state.groups.canLoad;

//lấy giá trị đã load lần đầu
export const getGroupsPostFirstLoad = (state) => state.groups.postFirstLoad;


//lấy giá trị hiển thị modal chỉnh sửa thông tin của nhóm

export const getEditGroupInformationsModalVisible = (state) => state.groups.editGroupInformationsModalVisible