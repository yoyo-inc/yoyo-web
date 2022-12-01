declare namespace API {
  type IResponse<T> = {
    code?: string;
    data?: T;
    message?: string;
    success?: boolean;
  };
}
