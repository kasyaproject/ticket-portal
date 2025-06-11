interface IEvent {
  _id?: string;
  name?: string;
  slug?: string;
  category?: string;
  isFetured?: boolean | string;
  isPublish?: boolean | string;
  isOnline?: boolean | string;
  startDate?: string;
  endDate?: string;
  location?: {
    region: string | undefined;
    coordinates: number[];
    address: string | undefined;
  };
  description?: string;
  banner?: string | FileList;
}

interface IEventForm extends IEvent {
  startDate?: DateValue;
  endDate?: DateValue;
  region?: string;
  latitude?: string;
  longitude?: string;
  address?: string;
}

export type { IEvent, IEventForm };
