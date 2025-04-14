interface IEvent {
  _id?: string;
  name?: string;
  slug?: string;
  category?: string;
  isFeatured?: boolean;
  isPublished?: boolean;
  startDate?: string;
  endDate?: string;
  region: {
    region: string;
    coordinte: {
      x: number;
      y: number;
    };
  };
  description?: string;
  banner?: string | FileList;
}

export type { IEvent };
