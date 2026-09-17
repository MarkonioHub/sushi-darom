export interface Owner {
  id: string;
  name: string;
  inn: string;
  ogrn: string;
}

export interface CreateOwner {
  name: string;
  inn: string;
  ogrn: string;
}

export interface UpdateOwner {
  name: string;
  inn: string;
  ogrn: string;
}
