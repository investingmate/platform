export interface ErrorInfo {
  error?: any
  url?: string
}
export interface IUser {
  username: string
  password: string
}
export interface INote {
  content: string;
  attachment?: string | null
  attachmentURL?: string | null
}
