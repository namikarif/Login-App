export class UserDto {
  currency?: string;
  current_lang?: string;
  email?: string;
  id?: number;
  monthly_report?: number;
  name?: string;
  online?: number;
  online_date?: string;
  phone?: string;
  seflink?: string;
  status?: number;
  surname?: string;
  user_img?: string;
  base64_image?: string;
  rule?: any;
  password?: string;
  grant_type?: string;
  weekly_report?: number;
}

export class UserLogs {
  id?: number;
  log_date?: string;
  log_detail?: string;
  relation_id?: number;
  relation_type?: string;
}
