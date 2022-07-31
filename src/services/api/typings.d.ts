declare namespace API {
  type deleteUserUserIDParams = {
    /** 用户ID */
    userID: string;
  };

  type getRoleParams = {
    /** 角色名 */
    name?: string;
  };

  type getUserParams = {
    /** 手机号 */
    phone?: string;
    /** 账户名 */
    username?: string;
    /** 页数 */
    current?: number;
    /** 每页大小 */
    pageSize?: number;
  };

  type Organization = {
    /** 创建时间 */
    createTime?: string;
    /** 主键 */
    id?: string;
    /** 更新时间 */
    modifyTime?: string;
    /** 组织名 */
    name?: string;
    parentId?: string;
  };

  type PaginatedData = {
    list?: any;
    total?: number;
  };

  type Permission = {
    /** 创建时间 */
    createTime?: string;
    /** 主键 */
    id?: string;
    /** 更新时间 */
    modifyTime?: string;
    /** 权限名称 */
    name?: string;
    /** 父级权限 */
    parentID?: string;
  };

  type Response = {
    code?: string;
    data?: any;
    message?: string;
    success?: boolean;
  };

  type Role = {
    /** 创建时间 */
    createTime?: string;
    /** 主键 */
    id?: string;
    /** 更新时间 */
    modifyTime?: string;
    name: string;
    permissions?: Permission[];
    remark?: string;
  };

  type User = {
    /** 年龄 */
    age?: number;
    /** 头像 */
    avatar?: string;
    /** 创建时间 */
    createTime?: string;
    /** 邮箱 */
    email?: string;
    /** 主键 */
    id?: string;
    /** 更新时间 */
    modifyTime?: string;
    /** 昵称 */
    nickname?: string;
    organization?: Organization;
    /** 组织ID */
    organizationID?: string;
    /** 密码 */
    password?: string;
    /** 手机号 */
    phone?: string;
    /** 角色 */
    roles?: Role[];
    /** 性别 0: 男 1: 女 */
    sex?: number;
    /** 账户名 */
    username: string;
  };
}
