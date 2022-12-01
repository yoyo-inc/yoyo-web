declare namespace API {
  type Alert = {
    content?: string;
    /** 创建时间 */
    createTime?: string;
    from?: string;
    /** 主键 */
    id?: number;
    level?: string;
    /** 更新时间 */
    modifyTime?: string;
    remark?: string;
    resolvedStatus?: number;
    /** 更新时间 */
    startAt?: string;
    status?: number;
    type?: string;
  };

  type AlertAccess = {
    accessIP: string;
    contentField?: string;
    /** 创建时间 */
    createTime?: string;
    /** 主键 */
    id?: number;
    levelField?: string;
    /** 更新时间 */
    modifyTime?: string;
    remark?: string;
    startAtField?: string;
    typeField?: string;
  };

  type AlertConfig = {
    /** 创建时间 */
    createTime?: string;
    emailEnable?: boolean;
    /** 主键 */
    id?: number;
    /** 更新时间 */
    modifyTime?: string;
    smtpAuthPassword?: string;
    smtpAuthUser?: string;
    smtpReceivers?: Record<string, any>[];
    smtpSender?: string;
    smtpServer?: string;
  };

  type AlertPush = {
    alertTypes?: string[];
    /** 创建时间 */
    createTime?: string;
    enable?: boolean;
    /** 主键 */
    id?: number;
    kafkaAddr?: string;
    kafkaNetwork?: string;
    kafkaPort?: number;
    kafkaTopic?: string;
    /** 更新时间 */
    modifyTime?: string;
    syslogAddr?: string;
    syslogNetwork?: string;
    syslogPort?: number;
    syslogTag?: string;
    type?: string;
  };

  type AuditLog = {
    /** 创建时间 */
    createTime?: string;
    detail?: string;
    /** 主键 */
    id?: number;
    ip?: string;
    /** 更新时间 */
    modifyTime?: string;
    module?: string;
    operation?: string;
    status?: number;
    user?: User;
    userID?: number;
  };

  type deleteAlertAccessIdParams = {
    /** 参数 */
    id: string;
  };

  type deleteAlertPushParams = {
    /** 参数 */
    id: string;
  };

  type deleteResourceIdParams = {
    /** 参数 */
    id: string;
  };

  type deleteRoleRoleIDParams = {
    /** 参数 */
    roleID: string;
  };

  type deleteUserUserIDParams = {
    /** 用户ID */
    userID: string;
  };

  type getAlertAccessesParams = {
    accessIP?: string;
    endTime?: string;
    startTime?: string;
  };

  type getAlertCountParams = {
    resolvedStatus?: number;
    status?: number;
  };

  type getAlertsParams = {
    content?: string;
    /** 创建时间 */
    createTime?: string;
    endTime?: string;
    from?: string;
    /** 主键 */
    id?: number;
    level?: string;
    /** 更新时间 */
    modifyTime?: string;
    remark?: string;
    resolvedStatus?: number;
    /** 更新时间 */
    startAt?: string;
    startTime?: string;
    status?: number;
    type?: string;
    /** 页数 */
    current?: number;
    /** 每页大小 */
    pageSize?: number;
  };

  type getAuditLogsParams = {
    /** 页数 */
    current?: number;
    /** 每页大小 */
    pageSize?: number;
  };

  type getResourcesParams = {
    filename?: string;
  };

  type getRolesParams = {
    /** 是否默认 */
    default?: boolean;
    /** 角色名 */
    name?: string;
  };

  type getRunlogsParams = {
    filename?: string;
    /** 页数 */
    current?: number;
    /** 每页大小 */
    pageSize?: number;
  };

  type getUsersParams = {
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
    id?: number;
    /** 更新时间 */
    modifyTime?: string;
    /** 组织名 */
    name?: string;
    parentId?: number;
  };

  type PaginatedData = {
    list?: any;
    total?: number;
  };

  type Permission = {
    /** 创建时间 */
    createTime?: string;
    /** 介绍 */
    description?: string;
    /** 是否开启 */
    enable?: boolean;
    /** 主键 */
    id?: number;
    /** 更新时间 */
    modifyTime?: string;
    /** 权限名称 */
    name?: string;
    /** 父级权限 */
    parentID?: number;
  };

  type PermissionVO = {
    children?: PermissionVO[];
    /** 创建时间 */
    createTime?: string;
    /** 介绍 */
    description?: string;
    /** 是否开启 */
    enable?: boolean;
    /** 主键 */
    id?: number;
    /** 更新时间 */
    modifyTime?: string;
    /** 权限名称 */
    name?: string;
    /** 父级权限 */
    parentID?: number;
  };

  type ResolveAlertVO = {
    content?: string;
    /** 创建时间 */
    createTime?: string;
    from?: string;
    id: string;
    level?: string;
    /** 更新时间 */
    modifyTime?: string;
    remark?: string;
    resolvedStatus?: number;
    /** 更新时间 */
    startAt?: string;
    status?: number;
    type?: string;
  };

  type Resource = {
    /** 创建时间 */
    createTime?: string;
    filename?: string;
    filesize?: number;
    filetype?: string;
    /** 主键 */
    id?: string;
    /** 更新时间 */
    modifyTime?: string;
    resourceName?: string;
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
    id?: number;
    is_default?: boolean;
    /** 更新时间 */
    modifyTime?: string;
    name: string;
    permissions?: Permission[];
    remark?: string;
  };

  type RoleVO = {
    /** 创建时间 */
    createTime?: string;
    /** 主键 */
    id?: number;
    is_default?: boolean;
    /** 更新时间 */
    modifyTime?: string;
    name: string;
    permissions?: number[];
    remark?: string;
  };

  type RunLog = {
    /** 创建时间 */
    createTime?: string;
    filename?: string;
    filesize?: string;
    /** 主键 */
    id?: number;
    /** 更新时间 */
    modifyTime?: string;
  };

  type SystemSetting = {
    /** 创建时间 */
    createTime?: string;
    description?: string;
    /** 主键 */
    id?: number;
    logo?: Resource;
    /** 更新时间 */
    modifyTime?: string;
    name?: string;
    resourceID?: string;
  };

  type UpdateAlertAccessVO = {
    accessIP: string;
    contentField?: string;
    /** 创建时间 */
    createTime?: string;
    id: number;
    levelField?: string;
    /** 更新时间 */
    modifyTime?: string;
    remark?: string;
    startAtField?: string;
    typeField?: string;
  };

  type UpdateSystemSettingVO = {
    /** 创建时间 */
    createTime?: string;
    description?: string;
    id: number;
    logo?: Resource;
    /** 更新时间 */
    modifyTime?: string;
    name?: string;
    resourceID?: string;
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
    id?: number;
    /** 更新时间 */
    modifyTime?: string;
    /** 昵称 */
    nickname?: string;
    organization?: Organization;
    /** 组织ID */
    organizationID?: number;
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

  type UserVO = {
    /** 年龄 */
    age?: number;
    /** 头像 */
    avatar?: string;
    /** 创建时间 */
    createTime?: string;
    /** 邮箱 */
    email?: string;
    /** 主键 */
    id?: number;
    /** 更新时间 */
    modifyTime?: string;
    /** 昵称 */
    nickname?: string;
    organization?: Organization;
    /** 组织ID */
    organizationID?: number;
    /** 密码 */
    password?: string;
    /** 手机号 */
    phone?: string;
    roles?: number[];
    /** 性别 0: 男 1: 女 */
    sex?: number;
    /** 账户名 */
    username: string;
  };
}
