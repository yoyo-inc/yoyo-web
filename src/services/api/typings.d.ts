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

  type deleteAlertPushIdParams = {
    /** 参数 */
    id: string;
  };

  type deleteReportIdParams = {
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

  type Dict = {
    /** 创建时间 */
    createTime?: string;
    description?: string;
    /** 主键 */
    id?: number;
    label?: string;
    /** 更新时间 */
    modifyTime?: string;
    type?: string;
    value?: string;
    valueType?: string;
  };

  type GenerateReportVO = {
    endTime: string;
    reportName?: string;
    startTime: string;
  };

  type getAlertAccessesParams = {
    accessIP?: string;
    /** 页数 */
    current?: number;
    /** 每页大小 */
    pageSize?: number;
    endTime?: string;
    starTime?: string;
  };

  type getAlertCountParams = {
    resolvedStatus?: number;
    status?: number;
  };

  type getAlertPushParams = {
    endTime?: string;
    starTime?: string;
  };

  type getAlertsParams = {
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
    startAt?: string;
    status?: number;
    type?: string;
    /** 页数 */
    current?: number;
    /** 每页大小 */
    pageSize?: number;
    endTime?: string;
    starTime?: string;
  };

  type getAlertTypesParams = {
    type?: number;
  };

  type getAuditLogsParams = {
    /** 页数 */
    current?: number;
    /** 每页大小 */
    pageSize?: number;
    ip?: string;
    module?: string;
    status?: number;
    userID?: string;
  };

  type getDictsParams = {
    /** 页数 */
    current?: number;
    /** 每页大小 */
    pageSize?: number;
  };

  type getReportsParams = {
    /** 页数 */
    current?: number;
    /** 每页大小 */
    pageSize?: number;
    reportName?: string;
    reportStatus?: string;
    reportType?: string;
  };

  type getResourceDownloadIdParams = {
    /** 参数 */
    id: string;
  };

  type getResourcesParams = {
    filename?: string;
    resourceType?: string;
  };

  type getRolesParams = {
    /** 页数 */
    current?: number;
    /** 每页大小 */
    pageSize?: number;
    /** 是否默认 */
    default?: boolean;
    /** 角色名 */
    name?: string;
  };

  type getRunlogDownloadParams = {
    filename: string;
    service: string;
  };

  type getRunlogsParams = {
    /** 页数 */
    current?: number;
    /** 每页大小 */
    pageSize?: number;
  };

  type getSchedjobsParams = {
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

  type IgnoreAlertVO = {
    id: number;
  };

  type LogConfig = {
    archive?: boolean;
    /** 创建时间 */
    createTime?: string;
    /** 主键 */
    id?: string;
    keepTime?: number;
    /** 更新时间 */
    modifyTime?: string;
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

  type postReportGenerateReportTypeParams = {
    /** 报告类型 */
    reportType: string;
  };

  type postResourceResourceTypeUploadParams = {
    /** 资源类型 */
    resourceType: string;
  };

  type Report = {
    /** 创建时间 */
    createTime?: string;
    /** 主键 */
    id?: number;
    /** 更新时间 */
    modifyTime?: string;
    reportName?: string;
    reportStatus?: number;
    reportType?: string;
    resource?: Resource;
    resourceID?: string;
  };

  type ReportConfig = {
    /** 创建时间 */
    createTime?: string;
    /** 主键 */
    id?: string;
    /** 更新时间 */
    modifyTime?: string;
    period?: string[];
    reportType?: string[];
  };

  type ResolveAlertVO = {
    content?: string;
    /** 创建时间 */
    createTime?: string;
    from?: string;
    id: number;
    level?: string;
    /** 更新时间 */
    modifyTime?: string;
    remark?: string;
    resolvedStatus?: number;
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
    resourceType?: string;
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

  type RunLogVO = {
    date?: string;
    filename?: string;
    filesize?: string;
    service?: string;
  };

  type SchedJob = {
    /** 创建时间 */
    createTime?: string;
    description?: string;
    /** 主键 */
    id?: number;
    jobID?: string;
    lastRunTime?: string;
    /** 更新时间 */
    modifyTime?: string;
    spec?: string;
    status?: number;
    type?: string;
  };

  type SystemSecurity = {
    /** 创建时间 */
    createTime?: string;
    forbidRepeatLogin?: boolean;
    /** 主键 */
    id?: number;
    loginExpireEnable?: boolean;
    loginExpireTime?: number;
    loginIPWhitelist?: Record<string, any>[];
    loginIPWhitelistEnable?: boolean;
    /** 更新时间 */
    modifyTime?: string;
  };

  type SystemSecurityVO = {
    /** 创建时间 */
    createTime?: string;
    forbidRepeatLogin?: boolean;
    /** 主键 */
    id?: number;
    loginExpireEnable?: boolean;
    loginExpireTime?: number;
    loginIPWhitelist?: Record<string, any>[];
    loginIPWhitelistEnable?: boolean;
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

  type UpdateReportConfigVo = {
    /** 创建时间 */
    createTime?: string;
    /** 主键 */
    id?: string;
    /** 更新时间 */
    modifyTime?: string;
    period?: string[];
    reportType?: string[];
  };

  type UpdateSchedJobVO = {
    id: number;
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
    /** 组织 */
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
    /** 组织 */
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
