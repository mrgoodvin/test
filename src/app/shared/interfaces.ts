export interface User {
  first_name: string;
  last_name: string;
  id: number;
  email: string;
  gender: string;
  ip_address: string;
}

export interface Statistics {
  clicks: number;
  page_views: number;
  date: Date;
  user_id: number;
}
